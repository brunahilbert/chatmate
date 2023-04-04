import { useState } from 'react';
import { getAuth, signInAnonymously } from 'firebase/auth';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ImageBackground,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';

const Start = ({ navigation }) => {
  const auth = getAuth();
  const [name, setName] = useState('');
  const [color, setColor] = useState('');

  const signInUser = () => {
    signInAnonymously(auth)
      .then((result) => {
        navigation.navigate('Chat', {
          userID: result.user.uid,
          name: name,
          color: color,
        });
        Alert.alert('Signed in Successfully!');
      })
      .catch((error) => {
        Alert.alert('Unable to sign in, try later again.');
      });
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../img/background-image.png')}
        style={styles.image}
      >
        <Text style={styles.appTitle}>Welcome to ChatMate</Text>
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
                onPress={() => setColor('#141E32')}
              ></TouchableOpacity>
              <TouchableOpacity
                accessible={true}
                accessibilityLabel='Gray'
                accessibilityHint='Lets you choose the chats background color'
                accessibilityRole='button'
                style={[styles.color, styles.gray]}
                onPress={() => setColor('#697C91')}
              ></TouchableOpacity>
              <TouchableOpacity
                accessible={true}
                accessibilityLabel='Green'
                accessibilityHint='Lets you choose the chats background color'
                accessibilityRole='button'
                style={[styles.color, styles.green]}
                onPress={() => setColor('#5A858A')}
              ></TouchableOpacity>
              <TouchableOpacity
                accessible={true}
                accessibilityLabel='Rose'
                accessibilityHint='Lets you choose the chats background color'
                accessibilityRole='button'
                style={[styles.color, styles.rose]}
                onPress={() => setColor('#B28C97')}
              ></TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity style={styles.button} onPress={signInUser}>
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
    backgroundColor: '#141E32',
  },
  gray: {
    backgroundColor: '#697C91',
  },
  green: {
    backgroundColor: '#5A858A',
  },
  rose: {
    backgroundColor: '#B28C97',
  },
  button: {
    width: '88%',
    padding: 20,
    marginBottom: 25,
    backgroundColor: '#1F435B',
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
