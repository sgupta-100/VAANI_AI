export enum MessageSender {
  USER = 'user',
  BOT = 'bot',
}

export interface ChatMessage {
  id: string;
  sender: MessageSender;
  text?: string;
  imageUrl?: string;
  qrCodeUrl?: string;
  isLoading?: boolean;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  qrCodeUrl: string;
}

export enum Language {
  ENGLISH = 'en',
  HINDI = 'hi',
  TAMIL = 'ta',
  TELUGU = 'te',
  MALAYALAM = 'ml',
}

export interface LanguageOption {
  code: Language;
  name: string;
}