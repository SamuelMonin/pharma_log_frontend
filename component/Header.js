import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Appbar, Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { goLogin, reset } from '../redux/view';
import { hideLogout } from '../redux/login';

export default function Header() {

    const dispatch = useDispatch();
    const isLogoutVisible = useSelector((state) => state.login.isLogoutVisible)
    const handleClick = async () => {
        try {
            await AsyncStorage.removeItem('token');
            dispatch(reset());
            dispatch(goLogin());
            dispatch(hideLogout());
        } catch (error) {
            console.error('Erreur lors de la suppression du token :', error);
        }
        } 

    return(
            <Appbar.Header>
                <Appbar.Content title="Pharma log" />
                {isLogoutVisible && <Button icon="logout" onPress={() => handleClick()}></Button>}
            </Appbar.Header>
    )
}