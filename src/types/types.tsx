export interface IResponseDeciderLoader {
    maps: IMap[]
}

export interface IMap {
    id: number
    name: string
    map_mode: string
    icon_path: string
    description: string
    author: string
    order: number
    uploader_id: number
}

export interface IDecider {
    title: string
    description: string
    maps: number[]
}