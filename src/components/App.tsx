// src/components/App.tsx
import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, Paper, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import SearchInput from './SearchInput';
import OrderBook from './OrderBook';
import VolatilityTable from './VolatilityTable';
import useSymbols from '../hooks/useSymbols';
import { getVolatilityData } from '../services/bianceApi';
import { OrderBook as OrderBookType, VolatilityPeriod } from '../types';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

const App: React.FC = () => {
  const { search, setSearch, filteredSymbols } = useSymbols();
  const [orderBook, setOrderBook] = useState<OrderBookType | null>(null);
  const [volatility, setVolatility] = useState<VolatilityPeriod[] | null>(null);
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [currentPrice, setCurrentPrice] = useState<string>('');

  useEffect(() => {
    if (socket) {
      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);

        const asks = data.a.slice(0, 5).map((ask: [string, string]) => ({ price: ask[0], quantity: ask[1] }));
        const bids = data.b.slice(0, 5).map((bid: [string, string]) => ({ price: bid[0], quantity: bid[1] }));

        setOrderBook({ asks, bids });
        
        // Update current price based on the latest trade data
        if (bids.length > 0) {
          setCurrentPrice(bids[0].price);
        }
      };

      return () => {
        socket.close();
      };
    }
  }, [socket]);

  const handleSymbolChange = async (symbol: string) => {
    setSearch(symbol);

    const volatilityData = await getVolatilityData(symbol);
    console.log(volatilityData)
    setVolatility(volatilityData);

    if (socket) {
      socket.close();
    }

    const newSocket = new WebSocket(`wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}@depth`);
    setSocket(newSocket);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container>
        <Typography variant="h4" component="h1" gutterBottom>
          Order Book Tracker
        </Typography>
        <SearchInput search={search} setSearch={setSearch} symbols={filteredSymbols} onSelectSymbol={handleSymbolChange} />
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} style={{ padding: '16px' }}>
              <OrderBook orderBook={orderBook} currentPrice={currentPrice} />
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} style={{ padding: '16px' }}>
              <VolatilityTable volatility={volatility} />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
};

export default App;
