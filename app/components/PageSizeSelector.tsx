'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

interface PageSizeSelectorProps {
  currentSize: number;
}

export const PageSizeSelector = ({ currentSize }: PageSizeSelectorProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newPerPage = event.target.value;
    const params = new URLSearchParams(searchParams.toString());
    params.set('perpage', newPerPage);
    params.set('page', '0'); 
    const newUrl = `/overview?${params.toString()}`;
    console.log('Navigating to:', newUrl); 
    router.push(newUrl);
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm">Items per page:</span>
      <select 
        className="select select-bordered select-sm w-20"
        value={currentSize}
        onChange={handleSizeChange}
      >
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="50">50</option>
      </select>
    </div>
  );
};