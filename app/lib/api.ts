import { PaginatedResponse, TrackingItem } from '../types/tracking';
import config from '../../config';



export async function getTrackingData(page: number = 0, perPage: number = 5): Promise<PaginatedResponse> {
    const url = `${config.apiUrl}/api/tracking?page=${page}&perpage=${perPage}`;
  
    const response = await fetch(url, {
        cache: 'no-store',
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch tracking data: ${response.statusText}`);
    }

    return response.json();
}

export async function getTrackingItem(id: string): Promise<TrackingItem | null> {
    const response = await fetch(
        `${config.apiUrl}/api/tracking/item?id=${id}`, 
        {
            cache: 'no-store',
        }
    );

    if (!response.ok) {
        throw new Error(`Failed to fetch tracking item: ${response.statusText}`);
    }

    return response.json();
}

interface UploadResponse {
    success: boolean;
    message?: string;
}

export async function uploadTrackingFile(file: File, provider: string): Promise<UploadResponse> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('provider', provider);

    try {
        const response = await fetch(`${config.apiUrl}/api/tracking/upload`, {
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