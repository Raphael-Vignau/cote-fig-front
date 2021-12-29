import {Tag} from "../../tag/data/tag";
import {User} from "../../user/data/User";

export interface Figurine {
    id: string;
    name: string;
    description: string;
    publisher: string;
    year: number;
    artist: string;
    game: string;
    material: string;
    scale: string;
    price: number;
    rating: number;

    img_figurine: File;
    img_original_name: string;
    img_name: string;

    tags: Tag[];
    holders: User[];
    researchers: User[];
}
