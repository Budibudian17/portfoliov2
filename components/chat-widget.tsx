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
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { MessageCircle, X, Send, Reply, Edit, Trash2, MoreVertical, Maximize2, Minimize2 } from "lucide-react";

interface ChatMessage {
  id: string;
  text: string;
  createdAt: any;
  sender: "user" | "admin";
  userId: string;
  username?: string;
  replyTo?: {
    id: string;
    text: string;
    username?: string;
  };
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
  
  // New states for features
  const [replyTo, setReplyTo] = useState<{ id: string; text: string; username: string } | null>(null);
  const [editingMessage, setEditingMessage] = useState<string | null>(null);
  const [editText, setEditText] = useState("");
  const [showMenu, setShowMenu] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Format timestamp like WhatsApp
  const formatTimestamp = (timestamp: any) => {
    if (!timestamp) return "";
    
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 24) {
      return date.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
      });
    } else if (diffInHours < 48) {
      return "Yesterday";
    } else {
      return date.toLocaleDateString();
    }
  };

  // Handle right click for desktop
  const handleContextMenu = (e: React.MouseEvent, message: ChatMessage) => {
    e.preventDefault();
    setShowMenu(message.id); // Selalu tampilkan menu
  };

  // Handle click outside to close menu
  const handleClickOutside = () => {
    setShowMenu(null);
  };

  // Add click outside listener
  useEffect(() => {
    if (showMenu) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [showMenu]);

  // Handle long press for mobile
  const handleLongPress = (message: ChatMessage) => {
    setShowMenu(message.id); // Selalu tampilkan menu
  };

  // Handle reply
  const handleReply = (message: ChatMessage) => {
    setReplyTo({
      id: message.id,
      text: message.text,
      username: message.sender === "admin" ? "Hilmi" : (message.username || "User"),
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
      await updateDoc(doc(db, "chats", editingMessage), {
        text: editText.trim()
      });
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
    
    const messageData: any = {
      text: input,
      createdAt: serverTimestamp(),
      sender: "user",
      userId,
      username,
    };

    if (replyTo) {
      messageData.replyTo = {
        id: replyTo.id,
        text: replyTo.text,
        username: replyTo.username,
      };
    }

    await addDoc(collection(db, "chats"), messageData);
    setInput("");
    setReplyTo(null);
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
          className={`
            fixed z-50
            ${isFullscreen 
              ? 'inset-0 flex items-center justify-center bg-black/80' // overlay effect
              : 'bottom-4 right-2 w-[95vw] min-h-[320px] max-h-[80vh] max-w-[98vw] sm:bottom-6 sm:right-6 sm:w-96 sm:min-h-[480px] sm:max-h-[90vh] rounded-2xl'
            }
            text-white shadow-2xl flex-col overflow-hidden animate-fade-in-up border border-gray-800
          `}
          style={{ borderRadius: isFullscreen ? 24 : undefined }}
        >
          <div
            className={
              isFullscreen
                ? 'w-full h-full flex items-center justify-center'
                : ''
            }
          >
            <div
              className={
                isFullscreen
                  ? 'bg-gray-900 rounded-2xl w-full max-w-2xl h-[90vh] flex flex-col shadow-2xl border border-gray-800 mx-auto'
                  : 'w-full h-full flex flex-col'
              }
            >
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-3 bg-black/80 border-b border-gray-800 rounded-t-2xl">
                <div className="font-bold text-lg flex items-center gap-2">
                  <MessageCircle className="w-5 h-5" /> Chat
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsFullscreen(!isFullscreen)}
                    className="text-gray-400 hover:text-white p-1 rounded-full focus:outline-none"
                    aria-label={isFullscreen ? "Minimize chat" : "Maximize chat"}
                  >
                    {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
                  </button>
                  <button
                    onClick={() => setOpen(false)}
                    className="text-gray-400 hover:text-white p-1 rounded-full focus:outline-none"
                    aria-label="Close chat"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className={`flex-1 px-4 py-3 space-y-2 overflow-y-auto bg-gray-900 ${isFullscreen ? 'max-h-[70vh]' : 'max-h-[50vh]'} rounded-b-2xl`}>
                {messages.length === 0 && (
                  <div className="text-gray-500 text-sm text-center mt-8">Mulai chat, pesanmu akan muncul di sini.</div>
                )}
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                    onContextMenu={(e) => handleContextMenu(e, msg)}
                    onTouchStart={() => handleLongPress(msg)}
                  >
                    <div className="flex flex-col items-end max-w-[75%] relative">
                      <div
                        className={`px-4 py-2 rounded-3xl text-sm break-words shadow-lg font-semibold transition-all duration-200
                          ${msg.sender === "user"
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
                            >
                              ✓
                            </button>
                            <button
                              onClick={cancelEdit}
                              className="text-red-400 hover:text-red-300"
                            >
                              ✕
                            </button>
                          </div>
                        ) : (
                          <div>{msg.text}</div>
                        )}
                      </div>
                      {/* Timestamp di bawah bubble */}
                      <div className="text-xs mt-1 text-blue-200 italic font-light">
                        {formatTimestamp(msg.createdAt)}
                      </div>
                      {/* Menu for all messages: reply always, edit/delete only for own message */}
                      {showMenu === msg.id && (
                        <div className="absolute right-0 top-0 bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-1 z-10">
                          <button
                            onClick={() => handleReply(msg)}
                            className="flex items-center gap-2 w-full px-3 py-2 text-sm text-white hover:bg-gray-700 rounded"
                          >
                            <Reply className="w-4 h-4" />
                            Reply
                          </button>
                          {msg.sender === "user" && (
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
                      <div className="text-xs text-blue-400">Replying to {replyTo.username || "User"}</div>
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
              <div className="flex items-center gap-2 px-4 py-3 bg-black/80 border-t border-gray-800 rounded-b-2xl">
                <input
                  type="text"
                  className="flex-1 bg-gray-800 text-white rounded-xl px-3 py-2 text-sm focus:outline-none placeholder-gray-400"
                  placeholder="Tulis pesan..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
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
          </div>
        </div>
      )}
    </>
  );
} 