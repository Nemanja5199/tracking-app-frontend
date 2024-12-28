import { PaginatedResponse } from '../types/tracking';

export async function getTrackingData(page: number = 0, perPage: number = 5): Promise<PaginatedResponse> {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';
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