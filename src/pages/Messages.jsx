import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Search, Send, Phone, Video, MoreVertical, Paperclip,
  Smile, MessageSquare, ChevronLeft, UserPlus,
} from 'lucide-react';
import Badge from '../components/ui/Badge';
import Avatar from '../components/ui/Avatar';
import Button from '../components/ui/Button';
import SearchBar from '../components/ui/SearchBar';
import EmptyState from '../components/ui/EmptyState';
import * as messagesService from '../services/messages';

// ─── Component ────────────────────────────────────────────────────────────────
export default function Messages() {
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messagesList, setMessagesList] = useState([]);
  const [messageText, setMessageText] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function loadConvs() {
      const data = await messagesService.getConversations();
      setConversations(Array.isArray(data) ? data : []);
      if (data.length > 0 && !selectedConversation) {
        setSelectedConversation(data[0].id);
      }
    }
    loadConvs();
  }, []);

  useEffect(() => {
    if (!selectedConversation) return;
    async function loadMsgs() {
      const msgs = await messagesService.getMessages(selectedConversation);
      setMessagesList(Array.isArray(msgs) ? msgs : []);
    }
    loadMsgs();
  }, [selectedConversation]);

  const handleSend = async () => {
    if (!messageText.trim() || !selectedConversation) return;
    const textToSend = messageText.trim();
    setMessageText('');
    const newMsg = await messagesService.sendMessage(selectedConversation, textToSend);
    if (newMsg) {
      setMessagesList((prev) => [...prev, newMsg]);
    } else {
      setMessagesList((prev) => [
        ...prev,
        { id: Date.now(), text: textToSend, isMe: true, time: 'Just now' },
      ]);
    }
  };

  const filteredConversations = conversations.filter((c) =>
    (c.name || '').toLowerCase().includes(search.toLowerCase())
  );

  const activeConversation = conversations.find((c) => c.id === selectedConversation);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex min-h-0 flex-1 overflow-hidden"
    >
      {/* ── Conversation List Sidebar ──────────────────────────────────────── */}
      <div
        className={`flex flex-col border-r border-neutral-200/80 bg-white ${
          selectedConversation ? 'hidden sm:flex sm:w-80 lg:w-96' : 'flex w-full sm:w-80 lg:w-96'
        }`}
      >
        {/* Sidebar Header */}
        <div className="border-b border-neutral-100 px-5 py-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-bold tracking-tight text-neutral-900">Messages</h2>
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-600 shadow-sm">
              <MessageSquare className="h-4 w-4 text-white" />
            </div>
          </div>
          <SearchBar placeholder="Search conversations..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>

        {/* Conversation List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {filteredConversations.length === 0 ? (
            <div className="p-6">
              <EmptyState
                icon={MessageSquare}
                title="No conversations"
                description="Start a conversation with a match to see it here."
              />
            </div>
          ) : (
            <>
              {filteredConversations.map((conv) => (
                <button
                  key={conv.id}
                  onClick={() => setSelectedConversation(conv.id)}
                  className={`flex w-full items-center gap-3 rounded-xl p-3 text-left transition-all ${
                    selectedConversation === conv.id
                      ? 'bg-gradient-to-r from-indigo-50 to-transparent border-l-2 border-l-indigo-500'
                      : 'hover:bg-neutral-50'
                  }`}
                >
                  {/* Avatar with Online Status */}
                  <div className="relative shrink-0">
                    <Avatar initials={conv.avatar} size="md" />
                    {conv.online && (
                      <span className="absolute bottom-0.5 right-0.5 h-3 w-3 rounded-full border-2 border-white bg-emerald-500 shadow-sm" />
                    )}
                  </div>

                  {/* Conversation Info */}
                  <div className="min-w-0 flex-1">
                    <div className="mb-1 flex items-center justify-between gap-2">
                      <p
                        className={`truncate text-sm font-bold ${
                          conv.unread > 0 ? 'text-neutral-900' : 'text-neutral-700'
                        }`}
                      >
                        {conv.name}
                      </p>
                      <span
                        className={`shrink-0 text-xs ${
                          conv.unread > 0 ? 'font-semibold text-indigo-600' : 'text-neutral-400'
                        }`}
                      >
                        {conv.time}
                      </span>
                    </div>
                    <p
                      className={`truncate text-xs ${
                        conv.unread > 0 ? 'font-medium text-neutral-700' : 'text-neutral-500'
                      }`}
                    >
                      {conv.lastMessage}
                    </p>
                  </div>

                  {/* Unread Badge */}
                  {conv.unread > 0 && (
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-xs font-bold text-white shadow-sm shadow-indigo-500/40">
                      {conv.unread}
                    </span>
                  )}
                </button>
              ))}
            </>
          )}
        </div>
      </div>

      {/* ── Chat Area ────────────────────────────────────────────────────────── */}
      <div
        className={`flex flex-1 flex-col bg-neutral-50/50 ${
          !selectedConversation ? 'hidden sm:flex' : 'flex'
        }`}
      >
        {activeConversation ? (
          <>
            {/* Chat Header */}
            <div className="flex items-center justify-between border-b border-neutral-100 bg-white px-6 py-4 shadow-sm">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setSelectedConversation(null)}
                  className="rounded-xl p-2 text-neutral-500 transition-colors hover:bg-neutral-100 sm:hidden"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <div className="relative">
                  <Avatar initials={activeConversation.avatar} size="md" />
                  {activeConversation.online && (
                    <span className="absolute bottom-0.5 right-0.5 h-3 w-3 rounded-full border-2 border-white bg-emerald-500" />
                  )}
                </div>
                <div>
                  <p className="text-base font-bold text-neutral-900">{activeConversation.name}</p>
                  <div className="mt-0.5 flex items-center gap-1.5">
                    <span
                      className={`h-2 w-2 rounded-full ${
                        activeConversation.online ? 'bg-emerald-500' : 'bg-neutral-300'
                      }`}
                    />
                    <p className="text-xs font-medium text-neutral-500">
                      {activeConversation.online ? 'Active now' : 'Offline'}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon" icon={Phone} aria-label="Voice call" />
                <Button variant="ghost" size="icon" icon={Video} aria-label="Video call" />
                <Button variant="ghost" size="icon" icon={MoreVertical} aria-label="More options" />
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 space-y-1 overflow-y-auto px-6 py-6">
              <div className="flex flex-col gap-4">
                {messagesList.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex items-end gap-3 ${msg.isMe ? 'justify-end' : 'justify-start'}`}
                  >
                    {!msg.isMe && <Avatar initials={activeConversation.avatar} size="sm" className="mb-1 shrink-0" />}
                    <div
                      className={`flex max-w-[80%] flex-col gap-1 sm:max-w-[65%] ${
                        msg.isMe ? 'items-end' : 'items-start'
                      }`}
                    >
                      <div
                        className={`rounded-2xl px-5 py-3.5 shadow-sm ${
                          msg.isMe
                            ? 'gradient-primary rounded-br-sm text-white'
                            : 'rounded-bl-sm border border-neutral-100 bg-white text-neutral-900'
                        }`}
                      >
                        <p className="text-sm leading-relaxed">{msg.content || msg.text}</p>
                      </div>
                      <p className={`px-1 text-xs ${msg.isMe ? 'text-right text-neutral-400' : 'text-neutral-400'}`}>
                        {msg.time || (msg.created_at ? new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '')}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Message Input */}
            <div className="border-t border-neutral-200 bg-white p-5">
              <div className="flex items-center gap-3 rounded-2xl border-2 border-neutral-200 bg-neutral-50 px-4 py-2 shadow-sm transition-all duration-200 focus-within:border-indigo-400 focus-within:bg-white">
                <Button
                  variant="ghost"
                  size="icon"
                  icon={Paperclip}
                  aria-label="Attach file"
                  className="shrink-0 text-neutral-400"
                />
                <input
                  type="text"
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 bg-transparent py-2 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleSend();
                    }
                  }}
                />
                <Button variant="ghost" size="icon" icon={Smile} aria-label="Add emoji" className="shrink-0 text-neutral-400" />
                <button
                  onClick={handleSend}
                  aria-label="Send message"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl gradient-primary text-white shadow-md shadow-indigo-500/30 transition-all duration-150 hover:scale-105 hover:shadow-lg"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex h-full items-center justify-center">
            <EmptyState
              icon={MessageSquare}
              title="Select a conversation"
              description="Choose a conversation from the list to start messaging."
              action={<Button icon={UserPlus}>Find a Match</Button>}
            />
          </div>
        )}
      </div>
    </motion.div>
  );
}
