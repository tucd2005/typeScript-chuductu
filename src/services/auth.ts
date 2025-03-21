import { LoginSchemaType } from "../components/auth/Login";
import { RegisterSchemaType } from "../components/auth/Register";
import { ILoginResponse } from "../types/auth";
import instanceAxios from "../ultis/configAxios"


const register = async (user: RegisterSchemaType) => {
    try {
        const { data } = await instanceAxios.post('/register', user);
        return data
    } catch (error) {
        console.log(error);
    }
}

const login = async (user: LoginSchemaType) => {
    try {
        const { data } = await instanceAxios.post<ILoginResponse>('/login', user);
        return data;

    } catch (error) {
        console.log(error);
    }
}

export const authServices = {
    register,
    login,
}