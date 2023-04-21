import axios from 'axios'
import { URLS } from '../constants/URLS'
import {useQuery } from "@tanstack/react-query";

// call axios
const getUser = async ()=> {
    const {data} = await axios.get(`${URLS.CHECK_AUTH}`)
    return data
}

// use react-query with axios
export const useGetUser =()=>{
    const result= useQuery({
        queryKey:['user'],
        queryFn:()=>getUser()
    })
    return result
}
