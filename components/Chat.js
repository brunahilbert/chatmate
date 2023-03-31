import { useEffect, useState } from 'react';
import { StyleSheet, View, KeyboardAvoidingView, Platform } from 'react-native';
import { GiftedChat, Bubble, InputToolbar } from 'react-native-gifted-chat';
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
} from 'firebase/firestore';

const Chat = ({ route, navigation, db }) => {
  const { userID } = route.params;
  const { name } = route.params;
  const { color } = route.params;
  const [messages, setMessages] = useState([]);

  // useEffect(() => {
  //   navigation.setOptions({ title: name });
  //   // Define query
  //   const q = query(collection(db, 'messages'), orderBy('createdAt', 'desc'));
  //   const unsubMessages = onSnapshot(q, (docs) => {
  //     let newMessages = [];
  //     docs.forEach((doc) => {
  //       newMessages.push({
  //         id: doc.id,
  //         ...doc.data(),
  //         createdAt: new Date(doc.data().createdAt.toMillis()),
  //       });
  //     });
  //     setMessages(newMessages);
  //   });
  //   // Clean up code
  //   return () => {
  //     if (unsubMessages) unsubMessages();
  //   };
  // }, []);


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
  const renderInputToolbar = (props) => {
    return (
      <InputToolbar
        {...props}
        containerStyle={styles.inputContainer}
        primaryStyle={styles.inputPrimary}
      />
    );
  };

  useEffect(() => {
    navigation.setOptions({ title: name });
    // Define query
    const q = query(collection(db, 'messages'), orderBy('createdAt', 'desc'));
    const unsubMessages = onSnapshot(q, (docs) => {
      let newMessages = [];
      docs.forEach((doc) => {
        newMessages.push({
          id: doc.id,
          ...doc.data(),
          createdAt: new Date(doc.data().createdAt.toMillis()),
        });
      });
      setMessages(newMessages);
    });
    // Clean up code
    return () => {
      if (unsubMessages) unsubMessages();
    };
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: color }]}>
      {/* Gifted Chat provides its own component */}
      <GiftedChat
        messages={messages}
        renderBubble={renderBubble}
        renderInputToolbar={renderInputToolbar}
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
