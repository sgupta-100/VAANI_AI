import React, { useState, useRef, useEffect } from 'react';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';
import { Language } from '../types';
import { ImageIcon, MicIcon, SendIcon } from './Icons';

interface ChatInputProps {
  onSendMessage: (text: string, image?: File) => void;
  isLoading: boolean;
  currentLanguage: Language;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading, currentLanguage }) => {
  const [text, setText] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const { isListening, transcript, startListening, stopListening, isSupported } = useSpeechRecognition();

  useEffect(() => {
    if (transcript) {
      setText(transcript);
    }
  }, [transcript]);

  const handleSendMessage = () => {
    if ((text.trim() || imageFile) && !isLoading) {
      onSendMessage(text, imageFile ?? undefined);
      setText('');
      setImageFile(null);
      setImagePreview(null);
    }
  };

  const handleMicClick = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening(currentLanguage);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
    if(fileInputRef.current) fileInputRef.current.value = "";
  };


  return (
    <div className="bg-white/80 backdrop-blur-lg border-t border-stone-200 p-4">
      <div className="max-w-4xl mx-auto">
        {imagePreview && (
          <div className="relative inline-block mb-2">
            <img src={imagePreview} alt="Preview" className="h-20 w-auto rounded-lg" />
            <button
              onClick={removeImage}
              className="absolute -top-2 -right-2 bg-gray-700 text-white rounded-full h-6 w-6 flex items-center justify-center text-xs font-bold"
            >
              &times;
            </button>
          </div>
        )}
        <div className="flex items-center bg-stone-100 rounded-full p-2 border border-stone-300 focus-within:ring-2 focus-within:ring-amber-500 transition-shadow">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
            placeholder="Describe your product or ask a question..."
            className="flex-1 bg-transparent px-4 py-2 text-stone-800 placeholder-stone-500 focus:outline-none"
            disabled={isLoading}
          />
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="p-2 rounded-full text-stone-600 hover:bg-stone-200 transition-colors"
            aria-label="Upload Image"
          >
            <ImageIcon className="w-6 h-6" />
          </button>
          {isSupported && (
             <button
                onClick={handleMicClick}
                className={`p-2 rounded-full transition-colors ${
                isListening ? 'bg-red-500 text-white animate-pulse' : 'text-stone-600 hover:bg-stone-200'
                }`}
                aria-label={isListening ? 'Stop recording' : 'Start recording'}
            >
                <MicIcon className="w-6 h-6" />
            </button>
          )}
          <button
            onClick={handleSendMessage}
            disabled={isLoading || (!text.trim() && !imageFile)}
            className="ml-2 p-3 bg-amber-800 text-white rounded-full hover:bg-amber-900 disabled:bg-stone-400 disabled:cursor-not-allowed transition-colors"
            aria-label="Send message"
          >
            <SendIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
