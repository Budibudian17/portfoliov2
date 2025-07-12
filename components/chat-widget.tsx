// components/chat-widget.tsx
"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { db } from "@/lib/firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { MessageCircle, X, Send } from "lucide-react";

interface ChatMessage {
  id: string;
  text: string;
  createdAt: any;
  sender: "user" | "admin";
  userId: string; // Added userId to the interface
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [showUsernameModal, setShowUsernameModal] = useState(false);
  const [usernameInput, setUsernameInput] = useState("");

  // Generate or get userId from localStorage
  useEffect(() => {
    let id = localStorage.getItem("chat_user_id");
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem("chat_user_id", id);
    }
    setUserId(id);
    // Username
    const uname = localStorage.getItem("chat_username");
    if (uname) {
      setUsername(uname);
    }
  }, []);

  // Handle submit username
  const handleUsernameSubmit = useCallback((e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (usernameInput.trim().length < 2) return;
    localStorage.setItem("chat_username", usernameInput.trim());
    setUsername(usernameInput.trim());
    setShowUsernameModal(false);
  }, [usernameInput]);

  // Listen to Firestore messages (real-time)
  useEffect(() => {
    if (!userId) return;
    const q = query(
      collection(db, "chats"),
      orderBy("createdAt", "asc")
    );
    const unsub = onSnapshot(q, (snapshot) => {
      setMessages(
        snapshot.docs
          .map((doc) => ({
            id: doc.id,
            ...(doc.data() as Omit<ChatMessage, "id">),
          }))
          // Hanya tampilkan pesan untuk userId ini
          .filter((msg) => msg.userId === userId)
      );
    });
    return () => unsub();
  }, [userId]);

  // Scroll to bottom on new message
  useEffect(() => {
    if (open && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, open]);

  // Send message
  const sendMessage = async () => {
    if (!input.trim() || !userId) return;
    if (!username) {
      setShowUsernameModal(true);
      return;
    }
    setLoading(true);
    await addDoc(collection(db, "chats"), {
      text: input,
      createdAt: serverTimestamp(),
      sender: "user",
      userId,
      username,
    });
    setInput("");
    setLoading(false);
  };

  // Handle enter key
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  // Tambahkan deteksi admin
  const isAdmin = typeof window !== 'undefined' && window.location.pathname.includes('/admin');

  return (
    <>
      {/* Modal input username */}
      {showUsernameModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <form
            onSubmit={handleUsernameSubmit}
            className="bg-gray-900 border border-gray-800 rounded-2xl p-8 shadow-xl flex flex-col items-center gap-4 min-w-[300px]"
          >
            <div className="text-lg font-bold text-white mb-2">Masukkan Username</div>
            <input
              type="text"
              className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white focus:outline-none border border-gray-700"
              placeholder="Username..."
              value={usernameInput}
              onChange={e => setUsernameInput(e.target.value)}
              minLength={2}
              maxLength={32}
              autoFocus
            />
            <button
              type="submit"
              className="w-full bg-blue-700 text-white rounded-lg py-2 font-semibold hover:bg-blue-800 transition-colors mt-2 disabled:opacity-50"
              disabled={usernameInput.trim().length < 2}
            >
              Simpan
            </button>
          </form>
        </div>
      )}
      {/* Chat Bubble */}
      {!isAdmin && (
        <button
          className="fixed z-50 bottom-6 right-6 bg-black text-white rounded-full shadow-lg p-4 hover:bg-gray-800 transition-colors flex items-center justify-center focus:outline-none"
          onClick={() => setOpen(true)}
          aria-label="Open chat"
          style={{ display: open ? "none" : "flex" }}
        >
          <MessageCircle className="w-7 h-7" />
        </button>
      )}
      {/* Chat Window */}
      {!isAdmin && open && (
        <div
          className="
            fixed z-50 bottom-4 right-2
            w-[95vw] min-h-[320px] max-w-[98vw]
            sm:bottom-6 sm:right-6
            sm:w-96 sm:min-h-[480px]
            bg-gray-900 text-white rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-fade-in-up border border-gray-800
          "
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-black/80 border-b border-gray-800">
            <div className="font-bold text-lg flex items-center gap-2">
              <MessageCircle className="w-5 h-5" /> Chat
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-gray-400 hover:text-white p-1 rounded-full focus:outline-none"
              aria-label="Close chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 px-4 py-3 space-y-2 overflow-y-auto bg-gray-900" style={{ maxHeight: 520 }}>
            {messages.length === 0 && (
              <div className="text-gray-500 text-sm text-center mt-8">Mulai chat, pesanmu akan muncul di sini.</div>
            )}
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`px-3 py-2 rounded-xl text-sm max-w-[75%] break-words shadow-sm ${
                    msg.sender === "user"
                      ? "bg-gradient-to-br from-gray-700 to-black text-white"
                      : "bg-gray-800 text-gray-200"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="flex items-center gap-2 px-4 py-3 bg-black/80 border-t border-gray-800">
            <input
              type="text"
              className="flex-1 bg-gray-800 text-white rounded-xl px-3 py-2 text-sm focus:outline-none placeholder-gray-400"
              placeholder="Tulis pesan..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={loading}
              maxLength={500}
            />
            <button
              onClick={sendMessage}
              className="p-2 rounded-full bg-gradient-to-br from-gray-700 to-black text-white hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!input.trim() || loading}
              aria-label="Kirim"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </>
  );
} 