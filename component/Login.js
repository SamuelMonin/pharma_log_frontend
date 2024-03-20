import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux'
import { setAdmin } from '../redux/login';
import { goMenu, reset } from '../redux/view';
import { TextInput, Button } from 'react-native-paper';

export default function Login() {

    const dispatch = useDispatch();

    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");


    const log = async () => {
        try {
            await axios.post('http://localhost:5502/api/administrators/login', { login, password })
            .then(response => {
                if(response.data) {
                    dispatch(reset());
                    dispatch(goMenu());
                } else {
                    console.log("Erreur de connection")
                }
            })
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <View>
        <Text>Se connecter :</Text>

        <TextInput variant="login" placeholder="Login" onChange={(e) => setLogin(e.target.value)} />

        <TextInput variant="password" secureTextEntry placeholder="Password" onChange={(e) => setPassword(e.target.value)} />

        <Button onPress={() => log()}><Text>Se connecter</Text></Button>

        </View>
    );
}
