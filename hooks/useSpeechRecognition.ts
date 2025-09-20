import { useState, useEffect, useRef } from 'react';
import { Language } from '../types';

interface SpeechRecognitionHook {
  isListening: boolean;
  transcript: string;
  startListening: (lang: Language) => void;
  stopListening: () => void;
  error: string | null;
  isSupported: boolean;
}

const getSpeechRecognition = () => {
  if (typeof window !== 'undefined') {
    // FIX: Cast window to `any` to access non-standard SpeechRecognition properties which are causing TS errors.
    return (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
  }
  return undefined;
};

const SpeechRecognitionAPI = getSpeechRecognition();

export const useSpeechRecognition = (): SpeechRecognitionHook => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState<string | null>(null);
  // FIX: Change SpeechRecognition type to `any` as it's not a standard type and causing a TS error.
  const recognitionRef = useRef<any | null>(null);

  useEffect(() => {
    if (!SpeechRecognitionAPI) {
      setError('Speech recognition is not supported in this browser.');
      return;
    }

    const recognition = new SpeechRecognitionAPI();
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onresult = (event: any) => {
      let finalTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        }
      }
      setTranscript(prev => prev + finalTranscript);
    };

    recognition.onerror = (event: any) => {
      setError(`Speech recognition error: ${event.error}`);
      setIsListening(false);
    };
    
    recognition.onend = () => {
        setIsListening(false);
    };
    
    recognitionRef.current = recognition;

    return () => {
        recognition.stop();
    };
  }, []);

  const startListening = (lang: Language) => {
    if (recognitionRef.current && !isListening) {
      recognitionRef.current.lang = lang;
      setTranscript('');
      setError(null);
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (e) {
          console.error("Speech recognition start error", e);
          setError("Could not start speech recognition. Please check microphone permissions.");
          setIsListening(false);
      }
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  return { isListening, transcript, startListening, stopListening, error, isSupported: !!SpeechRecognitionAPI };
};
