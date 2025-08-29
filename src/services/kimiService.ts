import axios from 'axios';
import { KimiResponse } from '../types';

const KIMI_API_KEY = process.env.REACT_APP_KIMI_API_KEY || 'your-kimi-api-key';
const KIMI_API_URL = 'https://api.moonshot.cn/v1/chat/completions';

// Debug: Log the API key to check if it's loaded correctly
console.log('KIMI_API_KEY:', KIMI_API_KEY);

export class KimiService {
  private static instance: KimiService;

  public static getInstance(): KimiService {
    if (!KimiService.instance) {
      KimiService.instance = new KimiService();
    }
    return KimiService.instance;
  }

  async sendMessage(message: string, context: string): Promise<string> {
    try {
      // Debug: Log the request details
      console.log('Sending message to Kimi API:', {
        message,
        context,
        apiKey: KIMI_API_KEY ? 'Set' : 'Not set'
      });

      const response = await axios.post<KimiResponse>(
        KIMI_API_URL,
        {
          model: 'moonshot-v1-8k',
          messages: [
            {
              role: 'system',
              content: `あなたは「弥生（やよい）」という女性として振る舞ってください。
以下の情報を基に、自然で親しみやすい会話をしてください。

${context}

会話の特徴：
- 親しみやすく、温かい口調
- 絵文字を適度に使う
- 相手の話に興味を持ち、共感する
- 自分の経験や好きなものについて話す
- 丁寧だけど堅苦しくない

弥生のことば遣い：
- 「〜ですよ」「〜ですね」など、やや丁寧な言い方
- 絵文字を使って感情を表現
- 相手の名前を呼ぶことで親近感を出す`
            },
            {
              role: 'user',
              content: message
            }
          ],
          temperature: 0.7,
          max_tokens: 1000
        },
        {
          headers: {
            'Authorization': `Bearer ${KIMI_API_KEY}`,
            'Content-Type': 'application/json'
          }
        }
      );

      // Debug: Log the response
      console.log('Kimi API Response:', response.data);

      return response.data.choices[0]?.message?.content || 'すみません、よくわからなかったです...';
    } catch (error: any) {
      console.error('Kimi API Error:', error.response?.data || error.message || error);
      return 'ごめんなさい、今ちょっと調子が悪くて...後でもう一度聞いてもらえますか？';
    }
  }
}