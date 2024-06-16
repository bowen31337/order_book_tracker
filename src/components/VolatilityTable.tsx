// src/components/VolatilityTable.tsx
import React from 'react';
import { VolatilityPeriod } from '../types';
import { Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';

interface VolatilityTableProps {
  volatility: VolatilityPeriod[] | null;
}

const VolatilityTable: React.FC<VolatilityTableProps> = ({ volatility }) => {
  if (!volatility) return null;

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Most Volatile Periods
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Hour</TableCell>
            <TableCell>Volatility Score</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {volatility.map((period, index) => (
            <TableRow key={index}>
              <TableCell>{period.hour}</TableCell>
              <TableCell>{period.score.toFixed(10)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default VolatilityTable;
