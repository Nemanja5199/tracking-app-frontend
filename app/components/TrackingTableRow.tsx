'use client';

import React from 'react';

import { useRouter, useSearchParams } from 'next/navigation';
import { TrackingItem } from '../types/tracking';

interface Props {
  item: TrackingItem;
}

export const TrackingTableRow = ({ item }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = searchParams.get('page') || '0';
  const currentPerPage = searchParams.get('perpage') || '5';
  
  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  };


  const handleClick = () => {
   
    const currentPage = searchParams.get('page') || '0';
    const currentPerPage = searchParams.get('perpage') || '5';
    const detailsUrl = `/tracking/${item.id}?returnPage=${currentPage}&returnPerPage=${currentPerPage}`;
    router.push(detailsUrl);
  };

  return (
    <tr 
      className="hover cursor-pointer"
      onClick={handleClick}
    >
      <td>
        <div className={`badge ${
          item.status === "Depart Facility" 
            ? "badge-info"
            : "badge-success"
        }`}>
          {item.status}
        </div>
      </td>
      <td>{item.houseAwb}</td>
      <td>{item.carrier}</td>
      <td>{item.receiver}</td>
      <td>{formatDate(item.eta)}</td>
      <td>
        <div className="flex items-center gap-2">
          <span className="badge badge-ghost">{item.shipperCountry}</span>
          →
          <span className="badge badge-ghost">{item.receiverCountry}</span>
        </div>
      </td>
    </tr>
  );
};