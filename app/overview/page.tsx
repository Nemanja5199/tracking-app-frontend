import React from 'react';
import { getTrackingData } from '../lib/api';
import { TrackingTableRow } from '../components/TrackingTableRow';
import { PaginationControls } from '../components/PaginationControles';
import { PageSizeSelector } from '../components/PageSizeSelector';


const OverviewPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const currentPage = Number(searchParams.page) || 0;
  const perPage = Number(searchParams.perpage) || 5;
  const data = await getTrackingData(currentPage, perPage);

  return (
    <div className="p-4 md:p-6">
      <h1 className="text-2xl font-bold mb-6">Tracking Overview</h1>
      
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Status</th>
              <th>AWB</th>
              <th>Carrier</th>
              <th>Receiver</th>
              <th>ETA</th>
              <th>Countries</th>
            </tr>
          </thead>
          <tbody>
            {data.content.map((item, index) => (
              <TrackingTableRow 
                key={`${item.houseAwb}-${item.eta}-${index}`} 
                item={item} 
              />
            ))}
          </tbody>
        </table>

        <div className="flex justify-between items-center py-4 px-2">
          <div className="flex-1 flex justify-center">
            <PaginationControls 
              currentPage={data.number} 
              totalPages={data.totalPages} 
            />
          </div>
          <PageSizeSelector currentSize={perPage} />
        </div>
      </div>
    </div>
  );
}

export default OverviewPage;