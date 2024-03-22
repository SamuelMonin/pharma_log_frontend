import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import { goDeliveryMenList, goProductList, goUserList, goCommandList, reset } from '../redux/view';
import { Button } from 'react-native-paper';
import axios from 'axios';

export default function AddCommand() {

    const dispatch = useDispatch();

    const comeBack = () => {
        dispatch(reset());
        dispatch(goDeliveryMenList());
    };

    return(
        <ScrollView>
            <Text>Ajouter une commande</Text>
            <Button onPress={() => comeBack()}><Text>Retour</Text></Button>
        </ScrollView>
    )

}