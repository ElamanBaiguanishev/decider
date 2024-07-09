import axios from "axios";

export const instance = axios.create({
    baseURL: 'http://1.mkolchurin.ru:9988/api/v1/db',
    // headers: {
    //     Authorization: 'Bearer ' + getTokenFromLocalStorage() || "",
    // }
})

export const fileServer = "http://1.mkolchurin.ru:9988/api/v1/storage/maps/"