import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import { goDeliveryMenList, goProductList, goUserList, goCommandList, reset } from '../redux/view';
import { Button, TextInput, Snackbar } from 'react-native-paper';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function AddDeliveryMen() {

    const add = useSelector((state) => state.view.add)
    const update = useSelector((state) => state.view.update)
    const [name, setName] = useState("");
    const [lastname, setLastname] = useState("");
    const [message, setMessage] = useState("");
    const [messageColor, setMessageColor] = useState("");
    const objectToUpdate = useSelector((state) => state.view.objectToUpdate)


    useEffect(() => {
        if (update) {
            setLastname(objectToUpdate.lastname);
            setName(objectToUpdate.name);
        }
    }, [update]);

    const dispatch = useDispatch();

    const comeBack = () => {
        dispatch(reset());
        dispatch(goDeliveryMenList());
    };

    const handleClick = async () => {
        const userToken = await AsyncStorage.getItem('token');
        const headers = {
            'Authorization': `Bearer ${userToken}`
        };
        const deliveryManData = {
            name : name,
            lastname: lastname
        };
        if(update){
            try {
                const response = await axios.put('http://localhost:5502/api/deliveryMen/update', {
                    id: objectToUpdate._id,
                    ...deliveryManData
                }, { headers })
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
        } else {
            try {
                const response = await axios.post('http://localhost:5502/api/deliveryMen/add', deliveryManData, { headers })
                setMessage(response.data.message);
                setName("");
                setLastname("");
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

    return(
            <ScrollView>
                {add && <Text>Ajouter un livreur :</Text>}
                {update && <Text>Modifier le livreur :</Text>}
                <Button onPress={() => comeBack()}><Text>Retour</Text></Button>
                <TextInput placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                <TextInput placeholder="Lastname" value={lastname} onChange={(e) => setLastname(e.target.value)} />
                {add && <Button onPress={() => handleClick()}><Text>Ajouter le livreur</Text></Button>}
                {update && <Button onPress={() => handleClick()}><Text>Modifier le livreur</Text></Button>}
                {message && <Text style={{ color: messageColor }}>{message}</Text>}
            </ScrollView>
    )
}