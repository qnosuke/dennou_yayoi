export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'yayoi';
  timestamp: Date;
  type?: 'text' | 'image' | 'sticker';
}

export interface YayoiData {
  articles: Article[];
}

export interface Article {
  id: string;
  title: string;
  content: string;
  images: string[];
  date: string;
}

export interface KimiResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}