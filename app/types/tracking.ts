export interface TrackingItem {
    status: string;
    poNumber: string | null;
    etd: string | null;
    eta: string | null;
    atd: string | null;
    ata: string | null;
    packages: number | null;
    weight: number;
    volume: number | null;
    shipper: string | null;
    shipperCountry: string;
    receiver: string;
    receiverCountry: string;
    houseAwb: string;
    shipperRefNo: string;
    carrier: string;
    incoTerm: string | null;
    flightNo: string | null;
    pickUpDate: string;
    latestCheckpoint: string;
    sourceFilename: string;
}

export interface Pageable {
    pageNumber: number;
    pageSize: number;
    sort: Sort;
    offset: number;
    paged: boolean;
    unpaged: boolean;
}

export interface Sort {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
}

export interface PaginatedResponse {
    content: TrackingItem[];
    pageable: Pageable;
    last: boolean;
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
    sort: Sort;
    first: boolean;
    numberOfElements: number;
    empty: boolean;
}