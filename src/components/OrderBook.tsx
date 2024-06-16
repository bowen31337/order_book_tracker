// src/components/OrderBook.tsx
import React from 'react';
import { OrderBook as OrderBookType } from '../types';
import { Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import { formatQuantity } from '../utils/formatQuantity';

interface OrderBookProps {
  orderBook: OrderBookType | null;
  currentPrice: string;
}

const OrderBook: React.FC<OrderBookProps> = ({ orderBook, currentPrice }) => {
  if (!orderBook) return null;

  // Sort asks in descending order by quantity and take the top 10
  const sortedAsks = [...orderBook.asks]
    .sort((a, b) => parseFloat(b.quantity) - parseFloat(a.quantity))
    .slice(0, 10).reverse();

  // Sort bids in descending order by quantity and take the top 10
  const sortedBids = [...orderBook.bids]
    .sort((a, b) => parseFloat(b.quantity) - parseFloat(a.quantity))
    .slice(0, 10);

  // Add placeholders if there are fewer than 10 rows
  const askPlaceholders = Array(10 - sortedAsks.length).fill({ price: '-', quantity: '-' });
  const bidPlaceholders = Array(10 - sortedBids.length).fill({ price: '-', quantity: '-' });

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Order Book
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Price</TableCell>
            <TableCell>Quantity</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {askPlaceholders.concat(sortedAsks).map((ask, index) => (
            <TableRow key={index}>
              <TableCell style={{ color: 'red' }}>{ask.price}</TableCell>
              <TableCell>{ask.quantity !== '-' ? formatQuantity(ask.quantity) : '-'}</TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell colSpan={2} style={{ textAlign: 'center', fontWeight: 'bold' }}>
              Current Price: {currentPrice}
            </TableCell>
          </TableRow>
          {sortedBids.concat(bidPlaceholders).map((bid, index) => (
            <TableRow key={index}>
              <TableCell style={{ color: 'green' }}>{bid.price}</TableCell>
              <TableCell>{bid.quantity !== '-' ? formatQuantity(bid.quantity) : '-'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default OrderBook;
