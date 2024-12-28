'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
}

export const PaginationControls = ({ currentPage, totalPages }: PaginationControlsProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const getPageNumbers = () => {
    let range = [];
    
  
    const windowSize = 3;
    const startPage = Math.max(0, currentPage - 1);
    
   
 
    const endPage = Math.min(startPage + windowSize - 1, totalPages - 1);

   
    for (let i = startPage; i <= endPage; i++) {
      range.push(i);
    }

  
    if (endPage < totalPages - 1) {
      range.push('...');
      range.push(totalPages - 1);
    }

    return range;
  };

  const handlePageChange = (page: number) => {
    if (page < 0 || page >= totalPages) return;
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());
    router.push(`/overview?${params.toString()}`);
  };

  return (
    <div className="join">
      <button 
        className="join-item btn"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 0}
      >
        «
      </button>
      
      {getPageNumbers().map((pageNumber, index) => (
        <button
          key={index}
          className={`join-item btn ${pageNumber === currentPage ? 'btn-active' : ''} 
            ${pageNumber === '...' ? 'btn-disabled' : ''}`}
          onClick={() => typeof pageNumber === 'number' && handlePageChange(pageNumber)}
          disabled={pageNumber === '...'}
        >
          {typeof pageNumber === 'number' ? pageNumber + 1 : pageNumber}
        </button>
      ))}
      
      <button 
        className="join-item btn"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages - 1}
      >
        »
      </button>
    </div>
  );
};