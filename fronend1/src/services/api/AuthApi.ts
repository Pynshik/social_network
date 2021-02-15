import { axios } from '../../core/axios';
import { LoginFormPropsInterface } from '../../pages/SignIn/components/LoginModal';
import { RegisterFormPropsInterface } from '../../pages/SignIn/components/RegisterModal';

interface ResponseAuthApiInterface {
    status: string;
    data: any;
}

export const AuthApi = {
    async signIn(postData: LoginFormPropsInterface): Promise<ResponseAuthApiInterface> {
        const {data} = await axios.post<ResponseAuthApiInterface>('http://localhost:8888/auth/login', { username: postData.email, password: postData.password });
        return data;
    },

    async signUp(postData: RegisterFormPropsInterface): Promise<ResponseAuthApiInterface> {
        const {data} = await axios.post<ResponseAuthApiInterface>('http://localhost:8888/auth/register', { email: postData.email, username: postData.username, fullname: postData.fullname, password: postData.password, password2: postData.password2 });
        return data;
    },

    async signUpGoogle(postData: RegisterFormPropsInterface): Promise<ResponseAuthApiInterface> {
        const {data} = await axios.post<ResponseAuthApiInterface>('http://localhost:8888/auth/google', { email: postData.email, username: postData.username, fullname: postData.fullname, avatarUrl: postData.avatarUrl });
        return data;
    },

    async getMe() {
        const {data} = await axios.get('http://localhost:8888/users/me');
        return data;
    },

    async getUserInfo(userId: string): Promise<ResponseAuthApiInterface> {
        const {data} = await axios.get('http://localhost:8888/users/' + userId);
        return data;
    }
}

//@ts-ignore
window.AuthApi = AuthApi;
