import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { ScrollView, Text, View } from 'react-native';
import axios from 'axios';
import { goAddDeliveryMen, goMenu, wantToAdd, wantToUpdate, setObjectToUpdate, reset } from '../redux/view';
import { Card, Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function DeliveryMenList() {

    const dispatch = useDispatch();

    const [deliveryMen, setDeliveryMen] = useState([]);
    const [message, setMessage] = useState("");
    const [messageColor, setMessageColor] = useState("");

    useEffect(() => {
        fetchDeliveryMen();
    }, []);

    const fetchDeliveryMen = () => {
        axios.get('https://pharma-log-backend.onrender.com/api/deliveryMen')
        .then(response => {
            setDeliveryMen(response.data);
        })
        .catch(err => console.log(err));
    };

    const comeBack = () => {
        dispatch(reset());
        dispatch(goMenu());
    };

    const addDeliveryMen = () => {
        dispatch(reset());
        dispatch(goAddDeliveryMen());
        dispatch(wantToAdd());
    };

    const updateDeliveryMen = (deliveryMan) => {
        dispatch(reset());
        dispatch(setObjectToUpdate(deliveryMan));
        dispatch(goAddDeliveryMen());
        dispatch(wantToUpdate());
    };

    const deleteDeliveryMan = async (id) => {
        const userToken = await AsyncStorage.getItem('token');
        const headers = {
            'Authorization': `Bearer ${userToken}`
        };
        try {
            await axios.post('https://pharma-log-backend.onrender.com/api/deliveryMen/delete', { id }, { headers });
            fetchDeliveryMen();
        } catch (error) {
            if (error.response) {
                setMessage(error.response.data.message);
                setMessageColor("red");
            } else {
                console.error('Erreur:', error.message);
            }
        }
    };

    return(
        <ScrollView>

            <Button onPress={() => comeBack()}><Text>Retour</Text></Button>
            <Button onPress={() => addDeliveryMen()}><Text>Ajouter un livreur</Text></Button>
            
            <Text>Liste des livreurs :</Text>

            {deliveryMen.map((deliveryMan) => (
                <View key={deliveryMan._id}>
                    <Card>
                        <Card.Content>
                            <Text>
                                Id : {deliveryMan._id}
                            </Text>
                            <Text>
                                Nom : {deliveryMan.name}
                            </Text>
                            <Text>
                                Prénom : {deliveryMan.lastname}
                            </Text>
                        </Card.Content>
                        <Card.Actions>
                            <Button onPress={() => updateDeliveryMen(deliveryMan)}>Modifier</Button>
                            <Button onPress={() => deleteDeliveryMan(deliveryMan._id)} >Supprimer</Button>
                        </Card.Actions>
                    </Card>
                </View>
            ))}
            {message && <Text style={{ color: messageColor }}>{message}</Text>} 
        </ScrollView>
    )
}