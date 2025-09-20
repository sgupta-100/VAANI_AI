import React, { useEffect, useRef } from 'react';
import { ChatMessage, MessageSender } from '../types';
import { VaaniLogo } from './Icons';

interface ChatWindowProps {
  messages: ChatMessage[];
}

const TypingIndicator = () => (
    <div className="flex items-center gap-2">
        <div className="w-2 h-2 bg-amber-600 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="w-2 h-2 bg-amber-600 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="w-2 h-2 bg-amber-600 rounded-full animate-bounce"></div>
    </div>
);


const ChatBubble: React.FC<{ message: ChatMessage }> = ({ message }) => {
    const isUser = message.sender === MessageSender.USER;
    
    return (
        <div className={`flex items-end gap-2 ${isUser ? 'justify-end' : 'justify-start'}`}>
            {!isUser && (
                 <div className="flex-shrink-0 w-8 h-8 rounded-full bg-amber-800 flex items-center justify-center text-white">
                    <VaaniLogo className="w-5 h-5"/>
                </div>
            )}
            <div
                className={`max-w-md lg:max-w-lg xl:max-w-2xl px-4 py-3 rounded-2xl ${
                isUser 
                    ? 'bg-amber-800 text-white rounded-br-none' 
                    : 'bg-white text-stone-800 rounded-bl-none shadow-sm'
                }`}
            >
                {message.isLoading ? <TypingIndicator /> : (
                    <div className="prose prose-sm max-w-none text-inherit">
                        {message.text && <p className="whitespace-pre-wrap">{message.text}</p>}
                        {message.imageUrl && (
                            <img src={message.imageUrl} alt="User upload" className="mt-2 rounded-lg max-w-xs max-h-64 object-contain" />
                        )}
                        {message.qrCodeUrl && (
                            <div className="mt-2 p-2 bg-white rounded-md inline-block">
                                <img src={message.qrCodeUrl} alt="Generated QR Code" className="w-32 h-32" />
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export const ChatWindow: React.FC<ChatWindowProps> = ({ messages }) => {
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <div className="flex-1 overflow-y-auto p-4 md:p-6">
            <div className="max-w-4xl mx-auto space-y-4">
                {messages.map((msg) => (
                    <ChatBubble key={msg.id} message={msg} />
                ))}
            </div>
            <div ref={scrollRef}></div>
        </div>
    );
};
