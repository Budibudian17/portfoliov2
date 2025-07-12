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
  updateDoc,
} from "firebase/firestore";
import { Send, Users, MessageCircle, Reply, Edit, Trash2, X } from "lucide-react";

interface ChatMessage {
  id: string;
  text: string;
  createdAt: any;
  sender: "user" | "admin";
  userId: string;
  replyTo?: {
    id: string;
    text: string;
    username?: string;
  };
}

export default function AdminChatPage() {
  const [users, setUsers] = useState<{ userId: string, username?: string }[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  // Ubah state replyTo agar tidak pakai tipe ChatMessage, cukup object biasa
  const [replyTo, setReplyTo] = useState<{ id: string; text: string; username: string } | null>(null);
  const [editingMessage, setEditingMessage] = useState<string | null>(null);
  const [editText, setEditText] = useState("");
  const [showMenu, setShowMenu] = useState<string | null>(null);

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

  // Format timestamp like WhatsApp
  const formatTimestamp = (timestamp: any) => {
    if (!timestamp) return "";
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    if (diffInHours < 24) {
      return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
    } else if (diffInHours < 48) {
      return "Yesterday";
    } else {
      return date.toLocaleDateString();
    }
  };

  // Handle right click for desktop
  const handleContextMenu = (e: React.MouseEvent, message: ChatMessage) => {
    e.preventDefault();
    setShowMenu(message.id);
  };
  // Handle long press for mobile
  const handleLongPress = (message: ChatMessage) => {
    setShowMenu(message.id);
  };
  // Handle click outside to close menu
  const handleClickOutside = () => {
    setShowMenu(null);
  };
  useEffect(() => {
    if (showMenu) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [showMenu]);
  // Handle reply
  const handleReply = (message: ChatMessage) => {
    setReplyTo({
      id: message.id,
      text: message.text,
      username: message.sender === "admin" ? "Hilmi" : ((message as any).username ? (message as any).username : "User"),
    });
    setShowMenu(null);
  };
  // Check if message can be edited (within 5 minutes)
  const canEditMessage = (message: ChatMessage) => {
    if (!message.createdAt) return false;
    const messageTime = message.createdAt.toDate ? message.createdAt.toDate() : new Date(message.createdAt);
    const now = new Date();
    const diffInMinutes = (now.getTime() - messageTime.getTime()) / (1000 * 60);
    return diffInMinutes <= 5;
  };

  // Handle edit
  const handleEdit = (message: ChatMessage) => {
    if (!canEditMessage(message)) return;
    setEditingMessage(message.id);
    setEditText(message.text);
    setShowMenu(null);
  };
  // Handle delete
  const handleDelete = async (messageId: string) => {
    try {
      await deleteDoc(doc(db, "chats", messageId));
      setShowMenu(null);
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };
  // Save edit
  const saveEdit = async () => {
    if (!editingMessage || !editText.trim()) return;
    try {
      await updateDoc(doc(db, "chats", editingMessage), { text: editText.trim() });
      setEditingMessage(null);
      setEditText("");
    } catch (error) {
      console.error("Error updating message:", error);
    }
  };
  // Cancel edit
  const cancelEdit = () => {
    setEditingMessage(null);
    setEditText("");
  };
  // Cancel reply
  const cancelReply = () => {
    setReplyTo(null);
  };

  // Send admin message
  const sendMessage = async () => {
    if (!input.trim() || !selectedUserId) return;
    setLoading(true);
    
    // Ambil username user target
    const targetUser = users.find(u => u.userId === selectedUserId);
    
    const messageData: any = {
      text: input,
      createdAt: serverTimestamp(),
      sender: "admin",
      userId: selectedUserId,
      username: targetUser?.username || selectedUserId, // Tambahkan username user target
    };
    // Saat mengirim pesan, assign replyTo langsung
    if (replyTo) {
      messageData.replyTo = replyTo;
    }
    await addDoc(collection(db, "chats"), messageData);
    setInput("");
    setReplyTo(null);
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
                  onContextMenu={(e) => handleContextMenu(e, msg)}
                  onTouchStart={() => handleLongPress(msg)}
                >
                  <div className="flex flex-col items-end max-w-[75%] relative">
                    <div
                      className={`px-4 py-2 rounded-3xl text-sm break-words shadow-lg font-semibold transition-all duration-200
                        ${msg.sender === "admin"
                          ? "bg-gradient-to-br from-black via-gray-900 to-white/10 text-white border border-white/10"
                          : "bg-white/10 text-gray-100 border border-white/20"}
                      `}
                      style={{backdropFilter: 'blur(2px)'}}
                    >
                      {/* Reply indicator */}
                      {msg.replyTo && (
                        <div className="mb-1 px-3 py-1 bg-white/10 border-l-4 border-white/40 rounded-l-2xl text-xs text-gray-200">
                          <div className="font-bold text-white/80">
                            {msg.replyTo?.username || "User"}
                          </div>
                          <div className="truncate text-gray-300">
                            {msg.replyTo.text}
                          </div>
                        </div>
                      )}
                      {/* Message text */}
                      {editingMessage === msg.id ? (
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={editText}
                            onChange={(e) => setEditText(e.target.value)}
                            className="flex-1 bg-transparent border-none outline-none text-white font-semibold"
                            autoFocus
                          />
                          <button
                            onClick={saveEdit}
                            className="text-green-400 hover:text-green-300"
                          >✓</button>
                          <button
                            onClick={cancelEdit}
                            className="text-red-400 hover:text-red-300"
                          >✕</button>
                        </div>
                      ) : (
                        <div>{msg.text}</div>
                      )}
                    </div>
                    {/* Timestamp di bawah bubble */}
                    <div className="text-xs mt-1 text-blue-200 italic font-light">
                      {formatTimestamp(msg.createdAt)}
                    </div>
                    {/* Menu untuk pesan admin */}
                    {showMenu === msg.id && (
                      <div className="absolute right-0 top-0 bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-1 z-10">
                        <button
                          onClick={() => handleReply(msg)}
                          className="flex items-center gap-2 w-full px-3 py-2 text-sm text-white hover:bg-gray-700 rounded"
                        >
                          <Reply className="w-4 h-4" />
                          Reply
                        </button>
                        {msg.sender === "admin" && (
                          <>
                            {canEditMessage(msg) && (
                              <button
                                onClick={() => handleEdit(msg)}
                                className="flex items-center gap-2 w-full px-3 py-2 text-sm text-white hover:bg-gray-700 rounded"
                              >
                                <Edit className="w-4 h-4" />
                                Edit
                              </button>
                            )}
                            <button
                              onClick={() => handleDelete(msg.id)}
                              className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-400 hover:bg-gray-700 rounded"
                            >
                              <Trash2 className="w-4 h-4" />
                              Delete
                            </button>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            {/* Reply indicator */}
            {replyTo && (
              <div className="px-4 py-2 bg-gray-800 border-t border-gray-700">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="text-xs text-blue-400">Replying to {replyTo?.username || "User"}</div>
                    <div className="text-sm text-gray-300 truncate">{replyTo.text}</div>
                  </div>
                  <button
                    onClick={cancelReply}
                    className="text-gray-400 hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
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