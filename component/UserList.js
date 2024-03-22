import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { ScrollView, Text, View } from 'react-native';
import axios from 'axios';
import { goMenu, reset, goAddUsers, wantToAdd, wantToUpdate, setObjectToUpdate } from '../redux/view';
import { Card, Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function UserList() {

    const dispatch = useDispatch();

    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState("");
    const [messageColor, setMessageColor] = useState("");

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = () => {
        axios.get('http://localhost:5502/api/users')
        .then(response => {
            setUsers(response.data);
        })
        .catch(err => console.log(err));
    };

    const comeBack = () => {
        dispatch(reset());
        dispatch(goMenu());
    };

    const addUsers = () => {
        dispatch(reset());
        dispatch(goAddUsers());
        dispatch(wantToAdd());
    };

    const updateUsers = (user) => {
        dispatch(reset());
        dispatch(setObjectToUpdate(user));
        dispatch(goAddUsers());
        dispatch(wantToUpdate());
    };

    const deleteUser = async (id) => {
        const userToken = await AsyncStorage.getItem('token');
        const headers = {
            'Authorization': `Bearer ${userToken}`
        };
        try {
            await axios.post('http://localhost:5502/api/users/delete', { id }, { headers });
            fetchUsers();
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
                <Text>Liste des utilisateurs :</Text>

                <Button onPress={() => comeBack()}><Text>Retour</Text></Button>
                <Button onPress={() => addUsers()}><Text>Ajouter un utilisateur</Text></Button>

                {users.map((user) => (
                    <View key={user._id}>
                        <Card>
                            <Card.Content>
                                <Text>
                                    login : {user.login}
                                </Text>
                                <Text>
                                    password : {user.password}
                                </Text>
                                <Text>
                                    mail : {user.mail}
                                </Text>
                            </Card.Content>
                            <Card.Actions>
                                <Button onPress={() => updateUsers(user)}>Modifier</Button>
                                <Button onPress={() => deleteUser(user._id)} >Supprimer</Button>
                            </Card.Actions>
                        </Card>
                    </View>
                ))}
                {message && <Text style={{ color: messageColor }}>{message}</Text>}
            </ScrollView>
    )
}