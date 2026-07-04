import { useState } from 'react';
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

const conversations = [
  { id: 1, name: 'Emily Parker', avatar: 'EP', lastMessage: 'Sure! Let me share my screen with the design...', time: '9:41 AM', unread: 2, online: true },
  { id: 2, name: 'David Wilson', avatar: 'DW', lastMessage: 'Thanks for the session today! Really helpful.', time: 'Yesterday', unread: 0, online: false },
  { id: 3, name: 'Lisa Zhang', avatar: 'LZ', lastMessage: 'Can we reschedule our session to Friday?', time: 'Yesterday', unread: 1, online: true },
  { id: 4, name: 'James Chen', avatar: 'JC', lastMessage: 'I sent you the Figma file for review.', time: 'Mon', unread: 0, online: false },
  { id: 5, name: 'Sarah Kim', avatar: 'SK', lastMessage: 'Looking forward to our React session!', time: 'Mon', unread: 0, online: true },
  { id: 6, name: 'Marcus Rivera', avatar: 'MR', lastMessage: 'Do you have experience with Redux?', time: 'Last week', unread: 0, online: false },
];

const sampleMessages = [
  { id: 1, sender: 'Emily Parker', text: 'Hi Alex! Thanks for offering to help with JavaScript.', time: '9:30 AM', isMe: false },
  { id: 2, sender: 'Alex Chen', text: 'Of course! Happy to help. What specific topics are you struggling with?', time: '9:32 AM', isMe: true },
  { id: 3, sender: 'Emily Parker', text: 'I am having trouble understanding closures and async/await patterns.', time: '9:35 AM', isMe: false },
  { id: 4, sender: 'Alex Chen', text: 'Those are tricky concepts! Let me explain closures first with a simple example.', time: '9:38 AM', isMe: true },
  { id: 5, sender: 'Alex Chen', text: 'A closure is when a function remembers its outer scope even after the outer function has returned. Think of it like a backpack of variables the function carries around.', time: '9:38 AM', isMe: true },
  { id: 6, sender: 'Emily Parker', text: 'Oh, that backpack analogy actually makes a lot of sense!', time: '9:40 AM', isMe: false },
  { id: 7, sender: 'Emily Parker', text: 'Sure! Let me share my screen with the design prototype I am working on.', time: '9:41 AM', isMe: false },
];

export default function Messages() {
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messageText, setMessageText] = useState('');
  const [search, setSearch] = useState('');

  const filteredConversations = conversations.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const activeConversation = conversations.find((c) => c.id === selectedConversation);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-1 min-h-0 overflow-hidden"
    >
      <div className={`flex flex-col border-r border-neutral-200/60 bg-white ${
        selectedConversation ? 'hidden sm:flex sm:w-80 lg:w-96' : 'flex w-full sm:w-80 lg:w-96'
      }`}>
        <div className="border-b border-neutral-100 p-4">
          <h2 className="text-sm font-semibold text-neutral-900 mb-3">Messages</h2>
          <SearchBar placeholder="Search conversations..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <div className="flex-1 overflow-y-auto">
          {filteredConversations.length === 0 ? (
            <EmptyState
              icon={MessageSquare}
              title="No conversations"
              description="Start a conversation with a match to see it here."
            />
          ) : (
            filteredConversations.map((conv) => (
              <button
                key={conv.id}
                onClick={() => setSelectedConversation(conv.id)}
                className={`flex w-full items-center gap-3 p-4 text-left transition-colors hover:bg-neutral-50 ${
                  selectedConversation === conv.id ? 'bg-primary-50/50' : ''
                }`}
              >
                <div className="relative">
                  <Avatar initials={conv.avatar} />
                  {conv.online && (
                    <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-emerald-500" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-neutral-900">{conv.name}</p>
                    <span className="text-xs text-neutral-400">{conv.time}</span>
                  </div>
                  <p className="text-xs text-neutral-500 truncate mt-0.5">{conv.lastMessage}</p>
                </div>
                {conv.unread > 0 && (
                  <Badge color="primary" variant="solid">{conv.unread}</Badge>
                )}
              </button>
            ))
          )}
        </div>
      </div>

      <div className={`flex-1 flex flex-col bg-white ${
        !selectedConversation ? 'hidden sm:flex' : 'flex'
      }`}>
        {activeConversation ? (
          <>
            <div className="flex items-center justify-between border-b border-neutral-100 px-4 py-3">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setSelectedConversation(null)}
                  className="sm:hidden rounded-lg p-1 text-neutral-500 hover:bg-neutral-100"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <div className="relative">
                  <Avatar initials={activeConversation.avatar} />
                  {activeConversation.online && (
                    <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-emerald-500" />
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium text-neutral-900">{activeConversation.name}</p>
                  <p className="text-xs text-neutral-500">{activeConversation.online ? 'Online' : 'Offline'}</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon" icon={Phone} aria-label="Voice call" />
                <Button variant="ghost" size="icon" icon={Video} aria-label="Video call" />
                <Button variant="ghost" size="icon" icon={MoreVertical} aria-label="More options" />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {sampleMessages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] sm:max-w-[70%] rounded-2xl px-4 py-2.5 ${
                    msg.isMe
                      ? 'bg-primary-600 text-white rounded-br-md'
                      : 'bg-neutral-100 text-neutral-900 rounded-bl-md'
                  }`}>
                    <p className="text-sm leading-relaxed">{msg.text}</p>
                    <p className={`text-xs mt-1 ${msg.isMe ? 'text-primary-200' : 'text-neutral-400'}`}>
                      {msg.time}
                    </p>
                  </div>
                </div>
              ))}

              <div className="flex items-center gap-2 justify-center">
                <div className="flex gap-1">
                  <span className="h-2 w-2 rounded-full bg-neutral-300 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="h-2 w-2 rounded-full bg-neutral-300 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="h-2 w-2 rounded-full bg-neutral-300 animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
                <span className="text-xs text-neutral-400">Emily is typing...</span>
              </div>
            </div>

            <div className="border-t border-neutral-100 p-4">
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" icon={Paperclip} aria-label="Attach file" />
                <input
                  type="text"
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-50"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && messageText.trim()) {
                      setMessageText('');
                    }
                  }}
                />
                <Button variant="ghost" size="icon" icon={Smile} aria-label="Add emoji" />
                <Button size="icon" icon={Send} aria-label="Send message" />
              </div>
            </div>
          </>
        ) : (
          <div className="flex h-full items-center justify-center">
            <EmptyState
              icon={MessageSquare}
              title="Select a conversation"
              description="Choose a conversation from the list to start messaging."
              action={
                <Button icon={UserPlus}>Find a Match</Button>
              }
            />
          </div>
        )}
      </div>
    </motion.div>
  );
}
