import axios from 'axios'
import { URLS } from '../constants/URLS'
import {useQuery } from "@tanstack/react-query";
// call axios
const getCalendar = async (id)=> {
    const {data} = await axios.get(`${URLS.CALENDAR}/${id}`)
    return data
}

// use react-query with axios
export const useGetCalendar =(id)=>{
    const result= useQuery({
        queryKey:['calendar', id],
        queryFn:()=>getCalendar(id)
    })
    return result
}


