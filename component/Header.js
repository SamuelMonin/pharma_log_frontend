import * as React from 'react';
import { Appbar } from 'react-native-paper';

export default function Header() {


    return(
            <Appbar.Header>
                {/* <Appbar.BackAction onPress={() => {}} /> */}
                <Appbar.Content title="Pharma log" />
                {/* <Appbar.Action icon="calendar" onPress={() => {}} />
                <Appbar.Action icon="magnify" onPress={() => {}} /> */}
            </Appbar.Header>
    )

}