import { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ImageBackground,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

const Start = ({ navigation }) => {
  const [name, setName] = useState('');
  const [color, setColor] = useState('');

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../img/background-image.png')}
        style={styles.image}
      >
        <Text style={styles.appTitle}>Welcome to ChatMate!</Text>
        <View style={styles.box}>
          <TextInput
            style={styles.usernameInput}
            value={name}
            onChangeText={setName}
            placeholder='Your Name'
          />
          <View style={styles.colorSelectorWrapper}>
            <Text style={[styles.usernameInput, styles.colorSelector]}>
              Choose Background Color:
            </Text>
            <View style={styles.colorWrapper}>
              <TouchableOpacity
                accessible={true}
                accessibilityLabel='Black'
                accessibilityHint='Lets you choose the chats background color'
                accessibilityRole='button'
                style={[styles.color, styles.black]}
                onPress={() => setColor('#090C08')}
              ></TouchableOpacity>
              <TouchableOpacity
                accessible={true}
                accessibilityLabel='Purple'
                accessibilityHint='Lets you choose the chats background color'
                accessibilityRole='button'
                style={[styles.color, styles.purple]}
                onPress={() => setColor('#474056')}
              ></TouchableOpacity>
              <TouchableOpacity
                accessible={true}
                accessibilityLabel='Light blue'
                accessibilityHint='Lets you choose the chats background color'
                accessibilityRole='button'
                style={[styles.color, styles.blue]}
                onPress={() => setColor('#8A95A5')}
              ></TouchableOpacity>
              <TouchableOpacity
                accessible={true}
                accessibilityLabel='Light green'
                accessibilityHint='Lets you choose the chats background color'
                accessibilityRole='button'
                style={[styles.color, styles.green]}
                onPress={() => setColor('#B9C6AE')}
              ></TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              navigation.navigate('Chat', { name: name, color: color })
            }
          >
            <Text style={styles.buttonText}>Start Chatting</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
      {/* Fix the issue on iOS where the keyboard covers almost all of the name 
          and background color picker form on the Start screen */}
      {Platform.OS === 'ios' ? (
        <KeyboardAvoidingView behavior='padding' />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  appTitle: {
    flex: 95,
    marginTop: 100,
    fontSize: 45,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  box: {
    flex: 100,
    marginBottom: 30,
    width: '88%',
    alignSelf: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
  },
  usernameInput: {
    width: '88%',
    padding: 15,
    borderWidth: 1,
    borderColor: '#757083',
    marginTop: 25,
    fontSize: 16,
    fontWeight: '300',
    color: '#757083',
    opacity: 0.8,
    alignSelf: 'center',
  },
  colorSelectorWrapper: {
    marginVertical: 10,
  },
  colorSelector: {
    opacity: 1,
    borderWidth: 0,
    padding: 0,
    marginBottom: 15,
    marginTop: 0,
  },
  colorWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  color: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  black: {
    backgroundColor: '#090C08',
  },
  purple: {
    backgroundColor: '#474056',
  },
  blue: {
    backgroundColor: '#8A95A5',
  },
  green: {
    backgroundColor: '#B9C6AE',
  },
  button: {
    width: '88%',
    padding: 20,
    marginBottom: 25,
    backgroundColor: '#757083',
    alignItems: 'center',
    alignSelf: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

export default Start;
