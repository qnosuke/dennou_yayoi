import React, { useRef, useEffect } from 'react';
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  TextField,
  Paper,
  Avatar,
  CircularProgress
} from '@mui/material';
import { Send, MoreVert } from '@mui/icons-material';
import { useChat } from '../hooks/useChat';
import MessageBubble from './MessageBubble';

const ChatInterface: React.FC = () => {
  const [inputText, setInputText] = React.useState('');
  const { messages, isLoading, sendMessage } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (inputText.trim()) {
      await sendMessage(inputText);
      setInputText('');
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <AppBar position="static" sx={{ bgcolor: '#00B900' }}>
        <Toolbar>
          <Avatar
            src="/yayoi-avatar.jpg"
            alt="弥生"
            sx={{ width: 40, height: 40, mr: 2 }}
          />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            弥生
          </Typography>
          <IconButton color="inherit">
            <MoreVert />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Box sx={{ flexGrow: 1, overflow: 'hidden' }}>
        <Box
          sx={{
            height: 'calc(100vh - 140px)',
            overflowY: 'auto',
            p: 2,
            bgcolor: '#f5f5f5'
          }}
        >
          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}
          {isLoading && (
            <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Avatar
                  src="/yayoi-avatar.jpg"
                  alt="弥生"
                  sx={{ width: 32, height: 32 }}
                />
                <CircularProgress size={20} />
              </Box>
            </Box>
          )}
          <div ref={messagesEndRef} />
        </Box>
      </Box>

      <Paper elevation={3} sx={{ p: 2, bgcolor: '#fff' }}>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <TextField
            fullWidth
            multiline
            maxRows={4}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="メッセージを入力..."
            variant="outlined"
            size="small"
            disabled={isLoading}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 4,
              }
            }}
          />
          <IconButton
            color="primary"
            onClick={handleSend}
            disabled={!inputText.trim() || isLoading}
            sx={{
              bgcolor: '#00B900',
              color: 'white',
              '&:hover': {
                bgcolor: '#009900',
              },
              '&:disabled': {
                bgcolor: '#cccccc',
              }
            }}
          >
            <Send />
          </IconButton>
        </Box>
      </Paper>
    </Box>
  );
};

export default ChatInterface;