import axios from 'axios'
import { URLS } from '../constants/URLS'
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

////call axios
const getUser = async () => {
    const { data } = await axios.get(`${URLS.CHECK_AUTH}`)
    return data
}
const loginUser = async (formData) => {
    const { data } = await axios.post(`${URLS.LOGIN}`, formData)
    return data
}

const logoutUser = async () => {
    const { data } = await axios.post(`${URLS.LOGOUT}`)
    return data
}

const getListUser = async () => {
    const { data } = await axios.get(`${URLS.USER_LIST}`)
    return data
}

//// use react-query with axios
//useQuery
export const useGetUser = (option) => {
    const result = useQuery({
        queryKey: ['user'],
        queryFn: () => getUser(),
        ...option
    })
    return result
}

export const useGetListUser = () => {
    const result = useQuery({
        queryKey: ['user_list'],
        queryFn: () => getUser(),
    })
    return result
}

//useMutation
export const useLoginUser = () => {
    const queryClient = useQueryClient()
    const result = useMutation(loginUser, {
        onSuccess: (data) => {
            queryClient.invalidateQueries('loginUser')
        },
    })
    return result
}

export const useLogoutUser = () => {
    const queryClient = useQueryClient()
    const result = useMutation(logoutUser, {
        onSuccess: (data) => {
            queryClient.resetQueries('user')
        },
    })
    return result
}

