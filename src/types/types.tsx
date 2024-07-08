export interface IResponseDeciderLoader {
    maps: IMap[]
}

export interface IResponseDeciderListLoader {
    deciders: IDecider[]
}

export interface IMap {
    Id: number
    Name: string
    Mode: string
    Icon: string
    Description: string
    Author: string
    Order: number
    UploaderId: number
}

export interface IDecider {
    ID: number
    Title: string
    CreatedAt: number
    Description: string
    Maps: number[]
    CreatorId: number
}