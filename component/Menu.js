import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import { goDeliveryMenList, goProductList, goUserList, goCommandList, reset } from '../redux/view';
import { Divider, Button } from 'react-native-paper';

export default function Menu() {

    const dispatch = useDispatch();

    const command = () => {
        
        dispatch(reset())
        dispatch(goCommandList())

    };

    const deliver = () => {
        
        dispatch(reset())
        dispatch(goDeliveryMenList())

    };

    const user = () => {
        
        dispatch(reset())
        dispatch(goUserList())

    };

    const product = () => {
        
        dispatch(reset())
        dispatch(goProductList())

    };

    return(
        <View>
              <Button onPress={() => command()}><Text>Gérer les commandes</Text></Button>
              <Divider />
              <Button onPress={() => deliver()}><Text>Gérer les livreurs</Text></Button>
              <Divider />
              <Button onPress={() => user()}><Text>Gérer les utilisateurs</Text></Button>
              <Divider />
              <Button onPress={() => product()}><Text>Gérer les produits</Text></Button>
        </View>
    )

}