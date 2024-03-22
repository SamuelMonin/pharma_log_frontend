import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { ScrollView, Text, View } from 'react-native';
import axios from 'axios';
import { goAddDeliveryMen, goMenu, wantToAdd, wantToUpdate, setObjectToUpdate, reset } from '../redux/view';
import { Card, Button } from 'react-native-paper';

export default function DeliveryMenList() {

    const dispatch = useDispatch();

    const [deliveryMen, setDeliveryMen] = useState([]);

    useEffect(() => {
        fetchDeliveryMen();
    }, []);

    const fetchDeliveryMen = () => {
        axios.get('http://localhost:5502/api/deliveryMen')
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
        try {
            await axios.post('http://localhost:5502/api/deliveryMen/delete', { id });
            fetchDeliveryMen();
        } catch (error) {
            console.error(error);
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
        </ScrollView>
    )
}