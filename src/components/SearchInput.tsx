// src/components/SearchInput.tsx
import React, { useState } from 'react';
import { TextField, List, ListItem, ListItemText } from '@mui/material';

interface SearchInputProps {
  search: string;
  setSearch: (value: string) => void;
  symbols: string[];
  onSelectSymbol: (symbol: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ search, setSearch, symbols, onSelectSymbol }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleSelectSymbol = (symbol: string) => {
    setSearch(symbol);
    onSelectSymbol(symbol);
    setShowDropdown(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value.toUpperCase());
    setShowDropdown(true);
  };

  return (
    <div>
      <TextField
        fullWidth
        label="Search for a trading pair..."
        variant="outlined"
        value={search}
        onChange={handleInputChange}
        margin="normal"
        onFocus={() => setShowDropdown(true)}
      />
      {showDropdown && search && symbols.length > 0 && (
        <List>
          {symbols.map((symbol) => (
            <ListItem button key={symbol} onClick={() => handleSelectSymbol(symbol)}>
              <ListItemText primary={symbol} />
            </ListItem>
          ))}
        </List>
      )}
    </div>
  );
};

export default SearchInput;
