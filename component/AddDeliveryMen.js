import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import { goDeliveryMenList, goProductList, goUserList, goCommandList, reset } from '../redux/view';
import { Button, TextInput, Snackbar } from 'react-native-paper';
import axios from 'axios';

export default function AddDeliveryMen() {

    const add = useSelector((state) => state.view.add)
    const update = useSelector((state) => state.view.update)
    const [name, setName] = useState("");
    const [lastname, setLastname] = useState("");
    const [message, setMessage] = useState("");
    const [isVisible, setIsVisible] = useState(false);
    const onDismissSnackBar = () => setIsVisible(false);
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

    const handleClick = () => {

        if(update){

            axios.put('http://localhost:5502/api/deliveryMen/update', {
                id: objectToUpdate._id, 
                name : name,
                lastname: lastname
            })
            .then(response => {
    
                setMessage(response.data.message)
                setIsVisible(true);
                })
                .catch(error => {
                console.error('Erreur lors de la requête :', error);
    
            });

        } else {
            axios.post('http://localhost:5502/api/deliveryMen/add', {
                name : name,
                lastname: lastname
            })
            .then(response => {
    
                setMessage(response.data.message)
                setIsVisible(true);
    
                if (response.data.success) {
    
                    setName("");
                    setLastname("");
                    
                }
            })
    
                .catch(error => {
                console.error('Erreur lors de la requête :', error);
    
            });
        }

    };

    return(
        <View>
                {add && <Text>Ajouter un livreur :</Text>}
                {update && <Text>Modifier le livreur :</Text>}
                <Button onPress={() => comeBack()}><Text>Retour</Text></Button>
                <TextInput placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                <TextInput placeholder="Lastname" value={lastname} onChange={(e) => setLastname(e.target.value)} />
                {add && <Button onPress={() => handleClick()}><Text>Ajouter le livreur</Text></Button>}
                {update && <Button onPress={() => handleClick()}><Text>Modifier le livreur</Text></Button>}
                <Snackbar
                    visible={isVisible}
                    onDismiss={onDismissSnackBar}
                    action={{
                    label: 'Undo',
                    onPress: () => {

                    },
                    }}>
                    {message}
                </Snackbar>
        </View>
    )
}