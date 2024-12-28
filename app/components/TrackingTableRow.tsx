'use client';

import React from 'react';

import { useRouter } from 'next/navigation';
import { TrackingItem } from '../types/tracking';

interface Props {
  item: TrackingItem;
}

export const TrackingTableRow = ({ item }: Props) => {
  const router = useRouter();

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  };

  return (
    <tr 
      className="hover cursor-pointer"
      onClick={() => router.push(`/tracking/${item.houseAwb}`)}
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