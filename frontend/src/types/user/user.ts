import { IDecider } from "../decider/decider"
import { IMapEntity } from "../map/map-entity"

export interface IUser {
    id: number

    name: string

    maps?: IMapEntity[]

    deciders?: IDecider[]
}