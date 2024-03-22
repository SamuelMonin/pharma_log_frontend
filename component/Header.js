import * as React from 'react';
import { Appbar, Button } from 'react-native-paper';

export default function Header() {

    // const isConnected = useSelector((state) => state.view.isConnected)

    return(
            <Appbar.Header>
                <Appbar.Content title="Pharma log" />
                {true && <Button icon="logout">
                        </Button>}
            </Appbar.Header>
    )
}