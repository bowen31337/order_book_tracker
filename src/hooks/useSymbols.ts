// src/hooks/useSymbols.ts
import { useState, useEffect, useCallback } from "react";
import axios from "axios";

const useSymbols = () => {
  const [symbols, setSymbols] = useState<string[]>([]);
  const [filteredSymbols, setFilteredSymbols] = useState<string[]>([]);
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    const fetchSymbols = async () => {
      const response = await axios.get(
        "https://api.binance.com/api/v3/exchangeInfo"
      );
      setSymbols(
        response.data.symbols
          .map((symbol: any) => symbol.symbol)
          .filter((symbol: string) => symbol.toLowerCase().includes("usdt"))
      );
    };

    fetchSymbols();
  }, []);

  const debounce = (func: any, wait: number) => {
    let timeout: NodeJS.Timeout;
    return (...args: unknown[]) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const updateFilteredSymbols = useCallback(
    debounce((searchTerm: string) => {
      setFilteredSymbols(
        symbols.filter((symbol) =>
          symbol.toUpperCase().includes(searchTerm.toUpperCase())
        )
      );
    }, 600),
    [symbols]
  );

  useEffect(() => {
    if (search.length < 3) return;
    updateFilteredSymbols(search);
  }, [search, updateFilteredSymbols]);

  return {
    search,
    setSearch,
    filteredSymbols,
  };
};

export default useSymbols;
