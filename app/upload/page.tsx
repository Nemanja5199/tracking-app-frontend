'use client';

import React, { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { uploadTrackingFile } from '../lib/api';

const UploadPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [selectedProvider, setSelectedProvider] = useState<string>('');
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const router = useRouter();
  
  const providers = ['DHL', 'Logwin', 'Hellmann'];

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.name.endsWith('.xlsx')) {
      setFile(droppedFile);
      setError(null);
    } else {
      setError('Please select an Excel (.xlsx) file');
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.name.endsWith('.xlsx')) {
        setFile(selectedFile);
        setError(null);
      } else {
        setError('Please select an Excel (.xlsx) file');
        setFile(null);
      }
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file');
      return;
    }
    
    if (!selectedProvider) {
      setError('Please select a provider');
      return;
    }

    try {
      setUploading(true);
      setError(null);

      const result = await uploadTrackingFile(file, selectedProvider);

      if (result.success) {
        router.replace('/overview');
      } else {
        setError(result.message || 'Upload failed');
      }
    } catch (err) {
      setError('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-4 md:p-6">
      <h1 className="text-2xl font-bold mb-6">Upload Tracking Data</h1>

      <div className="card bg-base-100 shadow-xl max-w-2xl mx-auto">
        <div className="card-body">
       
          <div className="form-control w-full mb-6">
            <label className="label">
              <span className="label-text">Select Provider</span>
            </label>
            <select 
              className="select select-bordered w-full"
              value={selectedProvider}
              onChange={(e) => setSelectedProvider(e.target.value)}
              disabled={uploading}
            >
              <option value="">Select a provider</option>
              {providers.map((provider) => (
                <option key={provider} value={provider}>
                  {provider}
                </option>
              ))}
            </select>
          </div>

        
          <div 
            className="flex flex-col items-center justify-center w-full"
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <label 
              htmlFor="dropzone-file" 
              className={`flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer 
                ${dragOver ? 'border-primary bg-base-200' : 'border-gray-300 hover:bg-base-200'}
                transition-colors duration-200`}
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                {uploading ? (
                  <span className="loading loading-spinner loading-lg text-primary"></span>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-4 text-base-content" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <p className="mb-2 text-sm text-base-content">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-base-content/70">
                      Excel files only (.xlsx)
                    </p>
                    {file && (
                      <div className="mt-2 text-sm">
                        <span className="text-success">Selected: </span>
                        <span className="font-semibold">{file.name}</span>
                      </div>
                    )}
                  </>
                )}
              </div>
              <input 
                id="dropzone-file" 
                type="file" 
                className="hidden" 
                accept=".xlsx"
                onChange={handleFileChange}
                disabled={uploading}
              />
            </label>
          </div>

      
          {error && (
            <div className="alert alert-error mt-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{error}</span>
            </div>
          )}

      
          <div className="card-actions justify-end mt-6">
            <button
              className={`btn btn-primary ${uploading ? 'loading' : ''}`}
              onClick={handleUpload}
              disabled={!file || !selectedProvider || uploading}
            >
              {uploading ? 'Uploading...' : 'Upload File'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadPage;