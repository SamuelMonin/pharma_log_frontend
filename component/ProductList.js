import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { ScrollView, Text, View } from 'react-native';
import axios from 'axios';
import { goAddProducts, goMenu, wantToAdd, wantToUpdate, setObjectToUpdate, reset } from '../redux/view';
import { Card, Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProductList() {

    const dispatch = useDispatch();

    const [products, setProducts] = useState([]);
    const [message, setMessage] = useState("");
    const [messageColor, setMessageColor] = useState("");

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = () => {
        axios.get('http://localhost:5502/api/products')
        .then(response => {
            setProducts(response.data);
        })
        .catch(err => console.log(err));
    };

    const comeBack = () => {
        dispatch(reset());
        dispatch(goMenu());
    };

    const addProducts = () => {
        dispatch(reset());
        dispatch(goAddProducts());
        dispatch(wantToAdd());
    };

    const updateProducts = (product) => {
        dispatch(reset());
        dispatch(setObjectToUpdate(product));
        dispatch(goAddProducts());
        dispatch(wantToUpdate());
    };

    const deleteProduct = async (id) => {
        const userToken = await AsyncStorage.getItem('token');
        const headers = {
            'Authorization': `Bearer ${userToken}`
        };
        try {
            await axios.post('http://localhost:5502/api/products/delete', { id }, { headers });
            fetchProducts();
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
                <Text>Liste des produits :</Text>

                <Button onPress={() => comeBack()}><Text>Retour</Text></Button>
                <Button onPress={() => addProducts()}><Text>Ajouter un produit</Text></Button>

                {products.map((product) => (
                    <View key={product._id}>
                        <Card>
                            <Card.Content>
                                <Text>
                                    Description : {product.description}
                                </Text>
                                <Text>
                                    Prix : {product.price}
                                </Text>
                                <Text>
                                    Note : {product.score}
                                </Text>
                            </Card.Content>
                            <Card.Actions>
                                <Button onPress={() => updateProducts(product)}>Modifier</Button>
                                <Button onPress={() => deleteProduct(product._id)}>Supprimer</Button>
                            </Card.Actions>
                        </Card>
                    </View>
                ))}
                {message && <Text style={{ color: messageColor }}>{message}</Text>}
            </ScrollView>
    )
}