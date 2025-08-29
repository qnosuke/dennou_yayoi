import React from 'react';
import { Box, Typography, Avatar, Paper } from '@mui/material';
import { Message } from '../types';

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUser = message.sender === 'user';

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: isUser ? 'flex-end' : 'flex-start',
        mb: 2,
        px: 1
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'flex-end',
          maxWidth: '70%',
          gap: 1
        }}
      >
        {!isUser && (
          <Avatar
            src="/yayoi-avatar.jpg"
            alt="弥生"
            sx={{ width: 32, height: 32, flexShrink: 0 }}
          />
        )}
        
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: isUser ? 'flex-end' : 'flex-start'
          }}
        >
          <Paper
            elevation={0}
            sx={{
              bgcolor: isUser ? '#DCF8C6' : '#FFFFFF',
              borderRadius: isUser ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
              px: 2,
              py: 1,
              wordBreak: 'break-word',
              boxShadow: '0 1px 2px rgba(0,0,0,0.1)'
            }}
          >
            <Typography
              variant="body2"
              sx={{
                color: '#000000',
                fontSize: '14px',
                lineHeight: 1.4
              }}
            >
              {message.text}
            </Typography>
          </Paper>
          
          <Typography
            variant="caption"
            sx={{
              color: '#999999',
              fontSize: '11px',
              mt: 0.5,
              px: 1
            }}
          >
            {message.timestamp.toLocaleTimeString('ja-JP', {
              hour: '2-digit',
              minute: '2-digit'
            })}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default MessageBubble;