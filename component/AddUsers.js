import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import { goDeliveryMenList, goProductList, goUserList, goCommandList, reset } from '../redux/view';
import { Button, TextInput, Snackbar } from 'react-native-paper';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function AddUsers() {

    const add = useSelector((state) => state.view.add)
    const update = useSelector((state) => state.view.update)
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [mail, setMail] = useState("");
    const [message, setMessage] = useState("");
    const [messageColor, setMessageColor] = useState("");
    const objectToUpdate = useSelector((state) => state.view.objectToUpdate)

    useEffect(() => {
        if (update) {
            setLogin(objectToUpdate.login);
            setMail(objectToUpdate.mail);
        }
    }, [update]);

    const dispatch = useDispatch();

    const comeBack = () => {
        dispatch(reset());
        dispatch(goUserList());
    };

    const handleClick = async () => {
        const userToken = await AsyncStorage.getItem('token');
        const headers = {
            'Authorization': `Bearer ${userToken}`
        };
        const userData = {
            login: login,
            password: password,
            mail: mail
        };
        if(update){
            try {
                const response =  await axios.put('http://localhost:5502/api/users/update', {
                    id: objectToUpdate._id,
                    ...userData
                    }, { headers: headers });
                setMessage(response.data.message);
                setMessageColor("green");
            } catch (error) {
                if (error.response) {
                    setMessage(error.response.data.message);
                    setMessageColor("red");
                } else {
                    console.error('Erreur:', error.message);
                }
            }
        } 
        if(add){
            try {
                const response = await axios.post('http://localhost:5502/api/users/add', userData, { headers: headers });
                setMessage(response.data.message);
                setLogin("")
                setPassword("")
                setMail("")
                setMessageColor("green");
            } catch (error) {
                if (error.response) {
                    setMessage(error.response.data.message);
                    setMessageColor("red");
                } else {
                    console.error('Erreur:', error.message);
                }
            }
        }
    };

    return (
        <ScrollView>
            {add && <Text>Ajouter un utilisateur :</Text>}
            {update && <Text>Modifier le utilisateur :</Text>}
            <Button onPress={comeBack}><Text>Retour</Text></Button>
            <TextInput placeholder="Login" value={login} onChangeText={(text) => setLogin(text)} />
            <TextInput placeholder="Password" value={password} onChangeText={(text) => setPassword(text)} />
            <TextInput placeholder="Mail" value={mail} onChangeText={(text) => setMail(text)} />
            {add && <Button onPress={handleClick}><Text>Ajouter le utilisateur</Text></Button>}
            {update && <Button onPress={handleClick}><Text>Modifier le utilisateur</Text></Button>}
            {message && <Text style={{ color: messageColor }}>{message}</Text>}
        </ScrollView>
    )
}