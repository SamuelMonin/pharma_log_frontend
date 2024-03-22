import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { reset, goMenu } from '../redux/view';
import { showLogout } from '../redux/login';
import { TextInput, Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Login() {
    const dispatch = useDispatch();
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const log = async () => {
        try {
            const response = await axios.post('http://localhost:5502/api/administrators/login', { login, password });
            dispatch(reset());
            dispatch(goMenu());
            dispatch(showLogout());
            AsyncStorage.setItem("token", response.data.token);
        } catch (error) {
            if (error.response) {
                setError(error.response.data.message);
            } else {
                console.error('Erreur:', error.message);
            }
        }
    }    

    return (
        <View>
            <ScrollView>
                <Text>Se connecter :</Text>
                <TextInput variant="login" placeholder="Login" value={login} onChangeText={(text) => setLogin(text)} />
                <TextInput variant="password" secureTextEntry placeholder="Password" value={password} onChangeText={(text) => setPassword(text)} />
                {error && <Text style={{ color: 'red' }}>{error}</Text>}
                <Button onPress={log}><Text>Se connecter</Text></Button>
            </ScrollView>
        </View>
    );
}