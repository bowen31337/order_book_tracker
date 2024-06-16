// src/components/SymbolList.tsx
import React from 'react';
import { List, ListItem, ListItemText } from '@mui/material';

interface SymbolListProps {
  symbols: string[];
  onSelectSymbol: (symbol: string) => void;
}

const SymbolList: React.FC<SymbolListProps> = ({ symbols, onSelectSymbol }) => {
  return (
    <List>
      {symbols.map((symbol) => (
        <ListItem button key={symbol} onClick={() => onSelectSymbol(symbol)}>
          <ListItemText primary={symbol} />
        </ListItem>
      ))}
    </List>
  );
};

export default SymbolList;
