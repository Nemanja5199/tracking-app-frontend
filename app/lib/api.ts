import { PaginatedResponse, TrackingItem } from '../types/tracking';

export async function getTrackingData(page: number = 0, perPage: number = 5): Promise<PaginatedResponse> {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://backend:8080';
    const url = `${baseUrl}/api/tracking?page=${page}&perpage=${perPage}`;
    console.log('Fetching:', url); // Debug log

    const response = await fetch(url, {
        cache: 'no-store',
    });

    if (!response.ok) {
        throw new Error('Failed to fetch tracking data');
    }

    return response.json();
}


export async function getTrackingItem(id: string): Promise<TrackingItem| null>{


    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://backend:8080';

    const response = await fetch(
        `${baseUrl}/api/tracking/item?id=${id}`, 
        {
            cache: 'no-store',
        }
    );

    if (!response.ok) {
        throw new Error('Failed to fetch tracking item');
    }

    return response.json()
}


interface UploadResponse {
    success: boolean;
    message?: string;
  }


  export async function uploadTrackingFile(file: File, provider: string): Promise<UploadResponse> {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://backend:8080';
    
    const formData = new FormData();
    formData.append('file', file);
    formData.append('provider', provider);

    try {
        const response = await fetch(`${baseUrl}/api/tracking/upload`, {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error('Upload failed');
        }

        return {
            success: true,
            message: 'File uploaded successfully'
        };
    } catch (error) {
        return {
            success: false,
            message: error instanceof Error ? error.message : 'Upload failed'
        };
    }
}