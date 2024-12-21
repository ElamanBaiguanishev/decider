import { IDecider } from "../decider/Decider"
import { IMapEntity } from "../map/MapEntity"

export interface IUser {
    id: number

    maps: IMapEntity[]

    deciders: IDecider[]
}