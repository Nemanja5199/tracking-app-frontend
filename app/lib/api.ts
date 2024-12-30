import { PaginatedResponse, TrackingItem } from '../types/tracking';

const getBaseUrl = () => {
    return process.env.NODE_ENV === 'production'
        ? 'http://backend:8080'
        : 'http://localhost:8080';
};

export async function getTrackingData(page: number = 0, perPage: number = 5): Promise<PaginatedResponse> {
    const url = `${getBaseUrl()}/api/tracking?page=${page}&perpage=${perPage}`;
    console.log('Fetching:', url); // Debug log

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
        `${getBaseUrl()}/api/tracking/item?id=${id}`, 
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
        const response = await fetch(`${getBaseUrl()}/api/tracking/upload`, {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText || 'Upload failed');
        }

        return {
            success: true,
            message: 'File uploaded successfully'
        };
    } catch (error) {
        console.error('Upload error:', error);
        return {
            success: false,
            message: error instanceof Error ? error.message : 'Upload failed'
        };
    }
}