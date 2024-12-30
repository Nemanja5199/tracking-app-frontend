import React from 'react';
import Link from 'next/link';
import { getTrackingItem } from '../../lib/api';

interface PageProps {
    params: {
      id: string;
    };
    searchParams: {
      returnPage?: string;
      returnPerPage?: string;
    };
  }

const TrackingDetailsPage = async ({ 
    params,
    searchParams 
  }: { 
    params: { id: string },
    searchParams: { returnPage?: string, returnPerPage?: string }
  }) => {
  const item = await getTrackingItem(params.id);
  const returnPage = searchParams.returnPage || '0';
  const returnPerPage = searchParams.returnPerPage || '5';
  const returnUrl = `/overview?page=${returnPage}&perpage=${returnPerPage}`;



  if (!item) {
    return (
      <div className="p-4 md:p-6">
        <Link href={returnUrl} className="btn btn-ghost btn-sm gap-2">
          ← Back to Overview
        </Link>
        <div className="alert alert-error mt-4">
          Tracking item not found
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '--';
    return new Date(dateString).toLocaleDateString('en-US');
  };

 
  const getStatusColor = (status: string, carrier: string) => {
    const statusLower = status.toLowerCase();
    if (statusLower.includes('completed')) return 'badge-success';
    if (statusLower.includes('arrived')) return 'badge-success';
    if (statusLower.includes('depart')) return 'badge-info';
    return 'badge-warning';
  };

  return (
    <div className="p-4 md:p-6">
     
      <div className="mb-6">
        <Link href={returnUrl} className="btn btn-ghost btn-sm gap-2">
          ← Back to Overview
        </Link>
      </div>

      
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold">Tracking Details</h1>
          <div className={`badge badge-lg ${
            item.carrier === 'DHL' ? 'badge-warning' :
            item.carrier === 'Logwin' ? 'badge-info' :
            'badge-neutral'
          }`}>
            {item.carrier}
          </div>
        </div>
        <div className="badge badge-lg">{item.houseAwb}</div>
      </div>

     
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Shipment Status</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Status</p>
                <div className={`badge mt-1 ${getStatusColor(item.status, item.carrier)}`}>
                  {item.status}
                </div>
              </div>
              {item.poNumber && (
                <div>
                  <p className="text-sm text-gray-500">PO Number</p>
                  <p className="font-medium">{item.poNumber}</p>
                </div>
              )}
              {item.shipperRefNo && (
                <div>
                  <p className="text-sm text-gray-500">Reference No.</p>
                  <p className="font-medium">{item.shipperRefNo}</p>
                </div>
              )}
              {item.flightNo && (
                <div>
                  <p className="text-sm text-gray-500">Flight Number</p>
                  <p className="font-medium">{item.flightNo}</p>
                </div>
              )}
            </div>
          </div>
        </div>

    
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Timeline</h2>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'ETD', value: item.etd },
                { label: 'ETA', value: item.eta },
                { label: 'ATD', value: item.atd },
                { label: 'ATA', value: item.ata },
                { label: 'Pickup Date', value: item.pickUpDate },
              ].map(({ label, value }) => value && (
                <div key={label}>
                  <p className="text-sm text-gray-500">{label}</p>
                  <p className="font-medium">{formatDate(value)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Shipment Details</h2>
            <div className="grid grid-cols-2 gap-4">
              {item.weight && (
                <div>
                  <p className="text-sm text-gray-500">Weight</p>
                  <p className="font-medium">{item.weight} kg</p>
                </div>
              )}
              {item.volume && (
                <div>
                  <p className="text-sm text-gray-500">Volume</p>
                  <p className="font-medium">{item.volume} m³</p>
                </div>
              )}
              {item.packages && (
                <div>
                  <p className="text-sm text-gray-500">Packages</p>
                  <p className="font-medium">{item.packages}</p>
                </div>
              )}
              {item.incoTerm && (
                <div>
                  <p className="text-sm text-gray-500">Incoterm</p>
                  <p className="font-medium">{item.incoTerm}</p>
                </div>
              )}
            </div>
          </div>
        </div>

    
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Route Information</h2>
            <div className="grid grid-cols-2 gap-4">
              {(item.shipperCountry || item.shipper) && (
                <div>
                  <p className="text-sm text-gray-500">From</p>
                  <p className="font-medium">{item.shipper || item.shipperCountry}</p>
                </div>
              )}
              {(item.receiverCountry || item.receiver) && (
                <div>
                  <p className="text-sm text-gray-500">To</p>
                  <p className="font-medium">{item.receiver || item.receiverCountry}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

     
      <div className="mt-6 text-sm text-gray-500">
        Source File: {item.sourceFilename}
      </div>
    </div>
  );
};

export default TrackingDetailsPage;