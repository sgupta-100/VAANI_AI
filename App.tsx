import React, { useState, useEffect } from 'react';
import { Language, ChatMessage, MessageSender, Product } from './types';
import { MOCK_PRODUCTS } from './constants';
import Header from './components/Header';
import { ChatWindow } from './components/ChatWindow';
import ChatInput from './components/ChatInput';
import ProductCatalogModal from './components/ProductCatalogModal';
import { generateBotResponse } from './services/geminiService';

const App: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState<Language>(Language.ENGLISH);
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);

  useEffect(() => {
    // Welcome message on initial load
    setMessages([
      {
        id: 'welcome-1',
        sender: MessageSender.BOT,
        text: "Hello! I'm VAANI, your personal marketing assistant. How can I help you with your beautiful crafts today?",
      },
      {
        id: 'welcome-2',
        sender: MessageSender.BOT,
        text: "You can describe your product, upload a photo to enhance, or ask me for marketing ideas.",
      }
    ]);
  }, []);

  const handleSendMessage = async (text: string, image?: File) => {
    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: MessageSender.USER,
      text: text,
    };
    if (image) {
      userMessage.imageUrl = URL.createObjectURL(image);
    }
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    const loadingMessageId = `bot-loading-${Date.now()}`;
    const loadingMessage: ChatMessage = {
      id: loadingMessageId,
      sender: MessageSender.BOT,
      isLoading: true,
    }
    setMessages((prev) => [...prev, loadingMessage]);

    try {
      const response = await generateBotResponse(text, image);
      const botMessage: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: MessageSender.BOT,
        text: response.text,
        imageUrl: response.enhancedImageUrl,
        qrCodeUrl: response.qrCodeUrl,
      };

      setMessages((prev) => prev.filter(m => m.id !== loadingMessageId));
      setMessages((prev) => [...prev, botMessage]);

    } catch (error) {
      console.error('Failed to get bot response:', error);
      const errorMessage: ChatMessage = {
        id: `bot-error-${Date.now()}`,
        sender: MessageSender.BOT,
        text: "Sorry, I encountered an error. Please try again.",
      };
      setMessages((prev) => prev.filter(m => m.id !== loadingMessageId));
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="h-screen w-screen flex flex-col font-sans antialiased text-stone-800">
      <Header
        currentLanguage={currentLanguage}
        onLanguageChange={setCurrentLanguage}
        onMarketingClick={() => setIsCatalogOpen(true)}
      />
      <main className="flex-1 flex flex-col bg-stone-100 overflow-hidden">
        <ChatWindow messages={messages} />
        <ChatInput
          onSendMessage={handleSendMessage}
          isLoading={isLoading}
          currentLanguage={currentLanguage}
        />
      </main>
      <ProductCatalogModal
        isOpen={isCatalogOpen}
        onClose={() => setIsCatalogOpen(false)}
        products={products}
      />
    </div>
  );
};

export default App;
