import {useMutation} from 'react-query';
import {login} from '../api/auth';
import { AuthError } from '../api/types';
import { useNavigation } from '@react-navigation/core';
import { useUserState } from '../contexts/UserContext';
import { RootStackNavigationProp } from '../screens/types';
import { applyToken } from '../api/client';

export default function useLogin() {
    const navigation = useNavigation<RootStackNavigationProp>();
    const [, setUser] = useUserState();

    const mutation = useMutation(login, {
        onSuccess: (data) => {
            setUser(data.user);
            navigation.pop();
            applyToken(data.jwt);
        },
        onError: (error: AuthError) => {
            console.log(error);
        },
    });

    return mutation;
}

