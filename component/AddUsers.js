import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import { goDeliveryMenList, goProductList, goUserList, goCommandList, reset } from '../redux/view';
import { Button, TextInput, Snackbar } from 'react-native-paper';
import axios from 'axios';

export default function AddUsers() {

    const add = useSelector((state) => state.view.add)
    const update = useSelector((state) => state.view.update)
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [mail, setMail] = useState("");
    const [message, setMessage] = useState("");
    const [isVisible, setIsVisible] = useState(false);
    const onDismissSnackBar = () => setIsVisible(false);
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

    const handleClick = () => {

        if(update){

            axios.put('http://localhost:5502/api/users/update', {
                id: objectToUpdate._id, 
                login : login,
                password: password,
                mail: mail
            })
            .then(response => {
                setPassword("")
                setMessage(response.data.message)
                setIsVisible(true);
                })
                .catch(error => {
                console.error('Erreur lors de la requête :', error);
    
            });

        } else {

            console.log("Ici")

            axios.post('http://localhost:5502/api/users/add', {
                login : login,
                password: password,
                mail: mail
            })
            .then(response => {
    
                setMessage(response.data.message)
                setIsVisible(true);
    
                if (response.data.success) {
    
                    setLogin("");
                    setPassword("");
                    setMail("");
                    
                }
            })
    
                .catch(error => {
                console.error('Erreur lors de la requête :', error);
    
            });
        }

    };

    return(
        <View>
                {add && <Text>Ajouter un utilisateur :</Text>}
                {update && <Text>Modifier le utilisateur :</Text>}
                <Button onPress={() => comeBack()}><Text>Retour</Text></Button>
                <TextInput placeholder="Login" value={login} onChange={(e) => setLogin(e.target.value)} />
                <TextInput placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <TextInput placeholder="Mail" value={mail} onChange={(e) => setMail(e.target.value)} />
                {add && <Button onPress={() => handleClick()}><Text>Ajouter le utilisateur</Text></Button>}
                {update && <Button onPress={() => handleClick()}><Text>Modifier le utilisateur</Text></Button>}
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