import yayoiData from '../data/yayoi_data.json';
import lineConversation from '../data/line_conversation.txt';
import { YayoiData } from '../types';

export class YayoiDataService {
  private static instance: YayoiDataService;

  public static getInstance(): YayoiDataService {
    if (!YayoiDataService.instance) {
      YayoiDataService.instance = new YayoiDataService();
    }
    return YayoiDataService.instance;
  }

  getYayoiData(): YayoiData {
    return yayoiData as YayoiData;
  }

  getLineConversation(): string {
    return lineConversation;
  }

  generateContext(): string {
    const data = this.getYayoiData();
    
    const context = data.articles.map(article => {
      return `タイトル: ${article.title}
内容: ${article.content}
日付: ${new Date(article.date).toLocaleDateString('ja-JP')}`;
    }).join('\n\n');

    return `弥生についての情報：

${context}

過去のLINE会話の雰囲気：
${this.getLineConversation().substring(0, 2000)}...`;
  }

  getRandomTopic(): string {
    const data = this.getYayoiData();
    const articles = data.articles;
    const randomArticle = articles[Math.floor(Math.random() * articles.length)];
    return randomArticle.content.substring(0, 100);
  }
}