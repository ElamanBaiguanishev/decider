export interface IResponseDeciderLoader {
    maps: IMap[]
}

// {
//     "Id": 1,
//     "Name": "Abandon All Hope",
//     "Mode": 2,
//     "Icon": "2p_abandon_all_hope.jpg",
//     "Description": "",
//     "Author": "",
//     "CreatedAt": 1715032249
//   },

export interface IMap {
    Id: number
    Name: string
    Mode: number
    Icon: string
    Description: string
    Author: string
    CreatedAt: number
}

export interface IDecider {
    title: string
    description: string
    maps: number[]
}