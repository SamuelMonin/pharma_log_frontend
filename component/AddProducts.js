import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import { goProductList, goUserList, goCommandList, reset } from '../redux/view';
import { Button, TextInput, Snackbar } from 'react-native-paper';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function AddProducts() {

    const add = useSelector((state) => state.view.add)
    const update = useSelector((state) => state.view.update)
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [score, setScore] = useState("");
    const [message, setMessage] = useState("");
    const [messageColor, setMessageColor] = useState("");
    const objectToUpdate = useSelector((state) => state.view.objectToUpdate)

    useEffect(() => {
        if (update) {
            setDescription(objectToUpdate.description);
            setPrice(objectToUpdate.price);
            setScore(objectToUpdate.score);
        }
    }, [update]);

    const dispatch = useDispatch();

    const comeBack = () => {
        dispatch(reset());
        dispatch(goProductList());
    };

    const handleClick = async () => {
        const userToken = await AsyncStorage.getItem('token');
        const headers = {
            'Authorization': `Bearer ${userToken}`
        };
        const productData = {
            description: description,
            price: price,
            score: score
        };
        if(update){
            try {
                const response = await axios.put('https://pharma-log-backend.onrender.com/api/products/update', {
                    id: objectToUpdate._id, 
                    ...productData
                }, { headers: headers })
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
        if(add) {
            try {
                const response = await axios.post('https://pharma-log-backend.onrender.com/api/products/add', productData, { headers: headers })
                setMessage(response.data.message);
                setDescription("");
                setPrice("");
                setScore("");
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
                {add && <Text>Ajouter un produit :</Text>}
                {update && <Text>Modifier le produit :</Text>}
                <Button onPress={() => comeBack()}><Text>Retour</Text></Button>
                <TextInput placeholder="Description" value={description} onChangeText={(text) => setDescription(text)} />
                <TextInput placeholder="Price" value={price} onChangeText={(text) => setPrice(text)} />
                <TextInput placeholder="Score" value={score} onChangeText={(text) => setScore(text)} />
                {add && <Button onPress={() => handleClick()}><Text>Ajouter le produit</Text></Button>}
                {update && <Button onPress={() => handleClick()}><Text>Modifier le produit</Text></Button>}
                {message && <Text style={{ color: messageColor }}>{message}</Text>}
            </ScrollView>
    )
}