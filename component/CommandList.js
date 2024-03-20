import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { StyleSheet, Text, View } from 'react-native';
import axios from 'axios';
import { goAddCommand, goMenu, reset } from '../redux/view';
import { Card, Button } from 'react-native-paper';

export default function CommandList() {

    const dispatch = useDispatch();

    const [commands, setCommands] = useState([]);

    useEffect(() => {
        fetchCommands();
    }, []);

    const fetchCommands = () => {
        axios.get('http://localhost:5502/api/commands')
        .then(response => {
            console.log(response.data);
            setCommands(response.data);
        })
        .catch(err => console.log(err));
    };

    const comeBack = () => {
        dispatch(reset());
        dispatch(goMenu());
    };

    const addCommand = () => {
        dispatch(reset());
        dispatch(goAddCommand());
    };

    const deleteCommand = async (id) => {
        try {
            await axios.post('http://localhost:5502/api/commands/delete', { id });
            console.log("Command deleted successfully");
            fetchCommands();
        } catch (error) {
            console.error(error);
        }
    };

    return(
        <View>

            <Text>Liste des commandes :</Text>

            <Button onPress={() => comeBack()}><Text>Retour</Text></Button>

            <Button onPress={() => addCommand()}><Text>Ajouter une commande</Text></Button>

            {commands.map((command) => (
                <View key={command._id}>
                    <Card>
                        <Card.Content>
                            <Text>
                                Id : {command._id}
                            </Text>
                            <Text>
                                User : {command.user.login}
                            </Text>
                            <Text>
                                Date : {command.date}
                            </Text>
                            <Text>
                                Adress : {command.adress}
                            </Text>
                        </Card.Content>
                        <Card.Actions>
                            <Button>Modifier</Button>
                            <Button onPress={() => deleteCommand(command._id)} >Supprimer</Button>
                        </Card.Actions>
                    </Card>
                </View>
            ))}
        </View>
    )
}