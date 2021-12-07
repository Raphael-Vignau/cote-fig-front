export interface Figurine {
    id: string;
    name: string;
    description: string;
    price: number;
    code: string;
    nbr_by_palette: number;
    internal_stock: number;
    internal_stock_dirty: number;

    img_figurine: File;
    img_original_name: string;
    img_name: string;

    pdf_figurine: File;
    pdf_original_name: string;
    pdf_name: string;
}
