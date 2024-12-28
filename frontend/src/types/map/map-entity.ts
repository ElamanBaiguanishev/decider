import { IDecider } from "../decider/decider";
import { IUser } from "../user/user";

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