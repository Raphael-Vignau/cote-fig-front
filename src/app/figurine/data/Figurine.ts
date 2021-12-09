export interface Figurine {
    id: string;
    name: string;
    description: string;
    publisher: string;
    year: number;
    artist: string;
    price: number;
    rating: number;

    img_figurine: File;
    img_original_name: string;
    img_name: string;
}
