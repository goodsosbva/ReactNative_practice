import {useMutation} from 'react-query';
import {login} from '../api/auth';
import { AuthError } from '../api/types';
import { useNavigation } from '@react-navigation/core';
import { useUserState } from '../contexts/UserContext';
import { RootStackNavigationProp } from '../screens/types';
import { applyToken } from '../api/client';
import authStorage from '../storages/authStorage';
import useInform from './useInform';

export default function useLogin() {
    const inform = useInform();
    const navigation = useNavigation<RootStackNavigationProp>();
    const [, setUser] = useUserState();

    const mutation = useMutation(login, {
        onSuccess: (data) => {
            setUser(data.user);
            navigation.pop();
            applyToken(data.jwt);
            authStorage.set(data);
        },  
        onError: (error: AuthError) => {
            const message =
                error.response?.data?.data?.[0]?.messages?.[0]?.message ?? '로그인에 실패했습니다.';
            inform({
                title: '오류',
                message,
            })
        },
    });

    return mutation;
}

