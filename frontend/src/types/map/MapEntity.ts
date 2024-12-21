import { IDecider } from "../decider/Decider";
import { IUser } from "../user/IUser";

export interface IMapEntity {
    id: number;

    name: string;

    map_mode: string;

    icon_path: string;

    description: string;

    author: string;

    order: string;

    uploader: IUser

    deciders: IDecider[];
}