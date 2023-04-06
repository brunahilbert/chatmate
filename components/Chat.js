import { useEffect, useState } from 'react';
import { StyleSheet, View, KeyboardAvoidingView, Platform } from 'react-native';
import { GiftedChat, Bubble, InputToolbar } from 'react-native-gifted-chat';
import CustomActions from './CustomActions';
import MapView from 'react-native-maps';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
} from 'firebase/firestore';

const Chat = ({ route, navigation, db, isConnected, storage }) => {
  const { userID } = route.params;
  const { name } = route.params;
  const { color } = route.params;
  const [messages, setMessages] = useState([]);

  // The message to be added is the first item in the newMessages array (newMessages[0])
  const onSend = (newMessages) => {
    addDoc(collection(db, 'messages'), newMessages[0]);
  };

  // Change background bubble color
  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#000',
          },
          left: {
            backgroundColor: '#FFF',
          },
        }}
      />
    );
  };

  // Fix short input space to type the message
  // Render InputToolbar if online
  const renderInputToolbar = (props) => {
    if (isConnected)
      return (
        <InputToolbar
          {...props}
          containerStyle={styles.inputContainer}
          primaryStyle={styles.inputPrimary}
        />
      );
    else return null;
  };

  let unsubMessages;

  useEffect(() => {
    navigation.setOptions({ title: name });
    // If there’s a connection, fetch data from the Firestore Database
    // Otherwise (else), call loadCachedLists()
    if (isConnected === true) {
      // Unregister current onSnapshot() listener to avoid registering
      // multiple listeners when useEffect code is re-executed.
      if (unsubMessages) unsubMessages();
      unsubMessages = null;
      // Define query
      const q = query(collection(db, 'messages'), orderBy('createdAt', 'desc'));
      unsubMessages = onSnapshot(q, (docs) => {
        let newMessages = [];
        docs.forEach((doc) => {
          newMessages.push({
            id: doc.id,
            ...doc.data(),
            createdAt: new Date(doc.data().createdAt.toMillis()),
          });
        });
        cacheMessages(newMessages);
        setMessages(newMessages);
      });
    } else loadCachedMessages();

    // Clean up code
    return () => {
      if (unsubMessages) unsubMessages();
    };
  }, [isConnected]);

  const cacheMessages = async (messagesToCache) => {
    try {
      await AsyncStorage.setItem('messages', JSON.stringify(messagesToCache));
    } catch (error) {
      console.log(error.message);
    }
  };

  const loadCachedMessages = async () => {
    const cachedMessages = (await AsyncStorage.getItem('messages')) || [];
    setLists(JSON.parse(cachedMessages));
  };

  // It is responsible for creating the "+" button
  const renderCustomActions = (props) => {
    return <CustomActions storage={storage} userID={userID} {...props} />;
  };

  const renderCustomView = (props) => {
    const { currentMessage} = props;
    if (currentMessage.location) {
      return (
          <MapView
            style={{width: 150,
              height: 100,
              borderRadius: 13,
              margin: 3}}
            region={{
              latitude: currentMessage.location.latitude,
              longitude: currentMessage.location.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          />
      );
    }
    return null;
  }

  return (
    <View style={[styles.container, { backgroundColor: color }]}>
      {/* Gifted Chat provides its own component */}
      <GiftedChat
        messages={messages}
        renderBubble={renderBubble}
        renderInputToolbar={renderInputToolbar}
        renderActions={renderCustomActions}
        renderCustomView={renderCustomView}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: userID,
          name: name,
        }}
      />
      {/* Fix the issue on android where the keyboard hides the message input field */}
      {Platform.OS === 'android' ? (
        <KeyboardAvoidingView behavior='height' />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputContainer: {
    minHeight: 50,
  },
  inputPrimary: {
    marginVertical: 4,
    marginHorizontal: 18,
  },
});

export default Chat;
