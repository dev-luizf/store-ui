import React from 'react';
import { CircularProgress } from '@mui/material';

export default function Loading() {
  return (
    <div className="flex flex-col items-center h-screen">
      <div className="h-2/3 flex flex-col items-center justify-center">
        <CircularProgress />
      </div>
    </div>
  );
}
