import { useState, useCallback } from 'react';
import { Message } from '../types';
import { KimiService } from '../services/kimiService';
import { YayoiDataService } from '../services/yayoiDataService';

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const kimiService = KimiService.getInstance();
  const yayoiService = YayoiDataService.getInstance();

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const context = yayoiService.generateContext();
      const response = await kimiService.sendMessage(text, context);

      const yayoiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        sender: 'yayoi',
        timestamp: new Date(),
        type: 'text'
      };

      setMessages(prev => [...prev, yayoiMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsLoading(false);
    }
  }, [kimiService, yayoiService]);

  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  return {
    messages,
    isLoading,
    sendMessage,
    clearMessages
  };
};