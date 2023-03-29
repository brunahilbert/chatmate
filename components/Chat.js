import { useEffect, useState } from 'react';
import { StyleSheet, View, KeyboardAvoidingView, Platform } from 'react-native';
import { GiftedChat, Bubble, InputToolbar } from 'react-native-gifted-chat';

const Chat = ({ route, navigation }) => {
  const { name } = route.params;
  const { color } = route.params;
  const [messages, setMessages] = useState([]);

  // The setter function can accept a callback function where its first
  // parameter represents a variable that refers to the latest value of the state
  const onSend = (newMessages) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, newMessages)
    );
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
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
      {
        _id: 2,
        text: `${name} has entered the chat`,
        createdAt: new Date(),
        system: true,
      },
    ]);
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
          _id: 1,
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
