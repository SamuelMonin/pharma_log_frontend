import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import { goProductList, goUserList, goCommandList, reset } from '../redux/view';
import { Button, TextInput, Snackbar } from 'react-native-paper';
import axios from 'axios';

export default function AddProducts() {

    const add = useSelector((state) => state.view.add)
    const update = useSelector((state) => state.view.update)
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [score, setScore] = useState("");
    const [message, setMessage] = useState("");
    const [isVisible, setIsVisible] = useState(false);
    const onDismissSnackBar = () => setIsVisible(false);
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

    const handleClick = () => {

        if(update){

            axios.put('http://localhost:5502/api/products/update', {
                id: objectToUpdate._id, 
                description: description,
                price: price,
                score: score
            })
            .then(response => {
    
                setMessage(response.data.message)
                setIsVisible(true);
                })
                .catch(error => {
                console.error('Erreur lors de la requête :', error);
    
            });

        } else {
            axios.post('http://localhost:5502/api/products/add', {
                description: description,
                price: price,
                score: score
            })
            .then(response => {
    
                setMessage(response.data.message)
                setIsVisible(true);
    
                if (response.data.success) {
    
                    setDescription("");
                    setPrice("");
                    setScore("");
                    
                }
            })
    
                .catch(error => {
                console.error('Erreur lors de la requête :', error);
    
            });
        }

    };

    return(
        <View>
                {add && <Text>Ajouter un produit :</Text>}
                {update && <Text>Modifier le produit :</Text>}
                <Button onPress={() => comeBack()}><Text>Retour</Text></Button>
                <TextInput placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
                <TextInput placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} />
                <TextInput placeholder="Score" value={score} onChange={(e) => setScore(e.target.value)} />
                {add && <Button onPress={() => handleClick()}><Text>Ajouter le produit</Text></Button>}
                {update && <Button onPress={() => handleClick()}><Text>Modifier le produit</Text></Button>}
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