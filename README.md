# 電脳弥生 - Dennou Yayoi

弥生とのLINE風AI会話アプリケーション

## 概要

このアプリケーションは、弥生（やよい）というキャラクターとLINEのようなインターフェースで会話できるAIチャットアプリです。
実際の弥生との会話データや、弥生に関する情報を基に、自然な会話を楽しむことができます。

## 機能

- 🗨️ LINE風のチャットインターフェース
- 🤖 Kimi APIを使用したAI会話
- 📊 弥生のデータを基にしたパーソナライズされた応答
- 💾 会話履歴の管理
- 📱 レスポンシブデザイン

## セットアップ

### 1. 依存関係のインストール

```bash
npm install
```

### 2. 環境変数の設定

`.env.example`をコピーして`.env`ファイルを作成し、Kimi APIキーを設定します。

```bash
cp .env.example .env
```

`.env`ファイルに以下を追加：
```
REACT_APP_KIMI_API_KEY=your-actual-kimi-api-key
```

### 3. 開発サーバーの起動

```bash
npm start
```

ブラウザで `http://localhost:3000` を開きます。

## データ構成

- `src/data/yayoi_data.json`: 弥生に関する情報（記事、好み、思い出など）
- `src/data/line_conversation.txt`: 実際のLINE会話履歴

## 技術スタック

- React + TypeScript
- Material-UI (MUI)
- Kimi API (Moonshot AI)
- Axios

## 使用方法

1. 起動後、画面下部のテキストフィールドにメッセージを入力
2. Enterキーまたは送信ボタンでメッセージを送信
3. 弥生からの返答を待つ
4. 会話を続ける

## カスタマイズ

### 弥生のキャラクター調整
`src/services/kimiService.ts`内のシステムプロンプトを編集することで、弥生の話し方や性格を調整できます。

### データの追加
`src/data/yayoi_data.json`に新しい記事や情報を追加することで、弥生の知識を拡張できます。

## トラブルシューティング

### APIキーエラー
`.env`ファイルに正しいKimi APIキーが設定されているか確認してください。

### ビルドエラー
```bash
npm run build
```

### 依存関係の問題
```bash
rm -rf node_modules package-lock.json
npm install
```

## ライセンス

MIT License
