import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import ChatInterface from './components/ChatInterface';
import './App.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#00B900',
    },
    secondary: {
      main: '#ffffff',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <ChatInterface />
      </div>
    </ThemeProvider>
  );
}

export default App;
