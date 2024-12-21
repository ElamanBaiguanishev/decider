import { IMapEntity } from "../map/MapEntity";
import { IUser } from "../user/IUser";

export interface IDecider {
    id: number;
    
    title: string;

    description: string;

    creator: IUser;

    maps: IMapEntity[];
}