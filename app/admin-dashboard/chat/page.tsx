// app/admin-dashboard/chat/page.tsx
"use client";
import { useEffect, useState, useRef } from "react";
import { db } from "@/lib/firebase";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
  serverTimestamp,
  where,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { Send, Users, MessageCircle } from "lucide-react";

interface ChatMessage {
  id: string;
  text: string;
  createdAt: any;
  sender: "user" | "admin";
  userId: string;
}

export default function AdminChatPage() {
  const [users, setUsers] = useState<{ userId: string, username?: string }[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Listen to all users (userId + username)
  useEffect(() => {
    const q = query(collection(db, "chats"));
    const unsub = onSnapshot(q, (snapshot) => {
      const userMap = new Map();
      snapshot.docs.forEach((doc) => {
        const data = doc.data();
        if (data.userId) {
          // Simpan username terbaru jika ada
          userMap.set(data.userId, data.username || data.userId);
        }
      });
      setUsers(Array.from(userMap, ([userId, username]) => ({ userId, username })));
    });
    return () => unsub();
  }, []);

  // Listen to messages for selected user
  useEffect(() => {
    if (!selectedUserId) return;
    const q = query(
      collection(db, "chats"),
      where("userId", "==", selectedUserId),
      orderBy("createdAt", "asc")
    );
    const unsub = onSnapshot(q, (snapshot) => {
      setMessages(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<ChatMessage, "id">),
        }))
      );
    });
    return () => unsub();
  }, [selectedUserId]);

  // Auto-delete chat older than 15 days
  useEffect(() => {
    const q = query(collection(db, "chats"));
    const unsub = onSnapshot(q, async (snapshot) => {
      const now = Date.now();
      const FIFTEEN_DAYS = 15 * 24 * 60 * 60 * 1000;
      for (const docSnap of snapshot.docs) {
        const data = docSnap.data();
        let createdAt = data.createdAt;
        if (createdAt && createdAt.toMillis) {
          createdAt = createdAt.toMillis();
        } else if (createdAt && createdAt.seconds) {
          createdAt = createdAt.seconds * 1000;
        }
        if (createdAt && now - createdAt > FIFTEEN_DAYS) {
          await deleteDoc(doc(db, "chats", docSnap.id));
        }
      }
    });
    return () => unsub();
  }, []);

  // Scroll to bottom on new message
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Send admin message
  const sendMessage = async () => {
    if (!input.trim() || !selectedUserId) return;
    setLoading(true);
    await addDoc(collection(db, "chats"), {
      text: input,
      createdAt: serverTimestamp(),
      sender: "admin",
      userId: selectedUserId,
    });
    setInput("");
    setLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div className="min-h-[70vh] flex flex-col md:flex-row">
      {/* Sidebar user list */}
      <div className="w-full md:w-80 bg-gray-900 border-r border-gray-800 p-6 flex flex-col gap-4 rounded-2xl md:rounded-none md:rounded-l-2xl">
        <div className="flex items-center gap-2 mb-4">
          <Users className="w-5 h-5 text-gray-400" />
          <span className="text-white font-bold text-lg">User Chat</span>
        </div>
        <div className="flex-1 overflow-y-auto space-y-2">
          {users.length === 0 && (
            <div className="text-gray-500 text-sm">Belum ada user yang chat.</div>
          )}
          {users.map((user) => (
            <button
              key={user.userId}
              onClick={() => setSelectedUserId(user.userId)}
              className={`w-full text-left px-4 py-2 rounded-lg font-mono text-xs break-all transition-colors border border-gray-800 ${
                selectedUserId === user.userId
                  ? "bg-black text-white border-white"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              {user.username}
            </button>
          ))}
        </div>
      </div>

      {/* Chat window */}
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        {!selectedUserId ? (
          <div className="text-gray-500 flex flex-col items-center gap-2">
            <MessageCircle className="w-8 h-8" />
            <span>Pilih user untuk mulai chat.</span>
          </div>
        ) : (
          <div className="w-full max-w-lg bg-gray-900 rounded-2xl shadow-xl border border-gray-800 flex flex-col h-[70vh]">
            {/* Header */}
            <div className="flex items-center gap-2 px-6 py-4 border-b border-gray-800 bg-black/80 rounded-t-2xl">
              <Users className="w-5 h-5 text-gray-400" />
              <span className="font-bold text-white text-base font-mono">{users.find(u => u.userId === selectedUserId)?.username || selectedUserId}</span>
            </div>
            {/* Messages */}
            <div className="flex-1 px-6 py-4 space-y-2 overflow-y-auto bg-gray-900">
              {messages.length === 0 && (
                <div className="text-gray-500 text-sm text-center mt-8">Belum ada pesan.</div>
              )}
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === "admin" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`px-3 py-2 rounded-xl text-sm max-w-[75%] break-words shadow-sm ${
                      msg.sender === "admin"
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
            <div className="flex items-center gap-2 px-6 py-4 bg-black/80 border-t border-gray-800 rounded-b-2xl">
              <input
                type="text"
                className="flex-1 bg-gray-800 text-white rounded-xl px-3 py-2 text-sm focus:outline-none placeholder-gray-400"
                placeholder="Tulis pesan mu disini..."
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
      </div>
    </div>
  );
} 