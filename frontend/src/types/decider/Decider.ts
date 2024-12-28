import { IMapEntity } from "../map/map-entity";
import { IUser } from "../user/user";

export interface IDecider {
    id: number;

    title: string;

    description: string;

    creator: IUser;

    maps: IMapEntity[];
}