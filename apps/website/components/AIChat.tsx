'use client'

import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User, Loader2 } from 'lucide-react';
import { ChatMessage } from '@/types';
// import { sendMessageToGemini } from '@/services/geminiService';

const AIChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: 'درود! من دستیار هوشمند کیاوش هستم. درباره سیگنال‌ها یا دوره‌ها سوالی دارید؟',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userText = inputValue.trim();
    setInputValue('');
    
    // Add user message
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: userText,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);

    try {
        const history = messages.map(m => ({
            role: m.role,
            parts: [{ text: m.text }]
        }));
        // !!
        const responseText = "test";
        // const responseText = await sendMessageToGemini(userText, history);
        
        const aiMsg: ChatMessage = {
            id: (Date.now() + 1).toString(),
            role: 'model',
            text: responseText,
            timestamp: new Date()
        };
        setMessages(prev => [...prev, aiMsg]);
    } catch (error) {
        console.error("Chat Error", error);
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 end-6 z-50 p-4 rounded-full bg-primary-500 text-black shadow-[0_0_20px_rgba(245,158,11,0.5)] hover:bg-primary-400 transition-all duration-300 transform hover:scale-110 ${isOpen ? 'hidden' : 'flex'}`}
        aria-label="Chat with AI"
      >
        <MessageSquare className="w-6 h-6" />
      </button>

      {isOpen && (
        <div className="fixed bottom-6 end-6 z-50 w-full max-w-[350px] sm:max-w-md bg-surface rounded-2xl shadow-2xl overflow-hidden border border-border flex flex-col max-h-[600px] h-[80vh]">
          {/* Header */}
          <div className="bg-background p-4 flex justify-between items-center border-b border-border">
            <div className="flex items-center gap-2">
              <div className="bg-primary-500/20 p-1.5 rounded-full text-primary-500">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-foreground">دستیار کیاوش</h3>
                <p className="text-xs text-primary-500 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-primary-500 rounded-full animate-pulse"></span>
                  آنلاین
                </p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-muted hover:text-foreground transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 bg-background space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
              >
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${msg.role === 'user' ? 'bg-surface border border-border' : 'bg-primary-500/10 text-primary-500'}`}>
                  {msg.role === 'user' ? <User className="w-5 h-5 text-muted" /> : <Bot className="w-5 h-5" />}
                </div>
                <div
                  className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-primary-600 text-black font-medium rounded-ss-none'
                      : 'bg-surface text-foreground border border-border rounded-se-none'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-3">
                 <div className="bg-primary-500/10 text-primary-500 w-8 h-8 rounded-full flex items-center justify-center">
                    <Bot className="w-5 h-5" />
                 </div>
                 <div className="bg-surface p-3 rounded-2xl rounded-se-none border border-border flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin text-primary-500" />
                    <span className="text-xs text-muted">در حال تایپ...</span>
                 </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSendMessage} className="p-3 bg-background border-t border-border">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="پیام خود را بنویسید..."
                className="flex-1 bg-surface border border-border text-foreground text-sm rounded-lg focus:ring-1 focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 outline-none transition-all placeholder-muted"
              />
              <button
                type="submit"
                disabled={isLoading || !inputValue.trim()}
                className="bg-primary-500 text-black rounded-lg px-4 hover:bg-primary-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default AIChat;