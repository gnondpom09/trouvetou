export interface Marker {
    id: string;
    name: string;
    thumbnail?: string;
    description?: string;
    sector?: string;
    state?: boolean;
    authorId: string;
    longitude: any;
    latitude: any;
}