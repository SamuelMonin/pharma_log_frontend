import React from 'react';
import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import store from './redux/store'
import Header from './component/Header';
import Body from './component/Body';

function App() {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <Header/>
        <Body/>
      </Provider>
    </SafeAreaProvider>
  )
}

export default App;
