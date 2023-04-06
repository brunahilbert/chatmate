import Start from './components/Start';
import Chat from './components/Chat';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import {
  getFirestore,
  disableNetwork,
  enableNetwork,
} from 'firebase/firestore';
import { useNetInfo } from '@react-native-community/netinfo';
import { useEffect } from 'react';
import { Alert } from 'react-native';

const Stack = createNativeStackNavigator();

const App = () => {
  const firebaseConfig = {
    apiKey: 'AIzaSyD0v6CrAIurHvI0sUhypcnxtXf-0oBv0cM',
    authDomain: 'chatmate-app-demo.firebaseapp.com',
    projectId: 'chatmate-app-demo',
    storageBucket: 'chatmate-app-demo.appspot.com',
    messagingSenderId: '482813963044',
    appId: '1:482813963044:web:de37cc0cb1375d97bf21b1',
  };
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  // Initialize Cloud Firestore and get a reference to the service
  const db = getFirestore(app);

  // Initialize the storage handler
  const storage = getStorage(app);

  // Define a state that represents the network connectivity status
  const connectionStatus = useNetInfo();

  useEffect(() => {
    if (connectionStatus.isConnected === false) {
      Alert.alert('Connection Lost!');
      disableNetwork(db);
    } else if (connectionStatus.isConnected === true) {
      enableNetwork(db);
    }
  }, [connectionStatus.isConnected]);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Start'>
        <Stack.Screen name='Start' component={Start} />
        <Stack.Screen name='Chat'>
          {(props) => (
            <Chat
              isConnected={connectionStatus.isConnected}
              db={db}
              storage={storage}
              {...props}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
