import { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  TextInput,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import BackgroundImage from '../img/background-image.png';

const Start = ({ navigation }) => {
  const [name, setName] = useState('');
  const [color, setColor] = useState('');

  return (
    <View style={styles.container}>
      <ImageBackground source={BackgroundImage} style={styles.image}>
        <Text style={styles.appTitle}>Welcome to ChatMate</Text>
        <View style={styles.box}>
          <TextInput
            style={styles.usernameInput}
            value={name}
            onChangeText={setName}
            placeholder='Your Name'
          />
          <Text style={[styles.usernameInput, styles.colorSelector]}>
            Choose Background Color:
          </Text>
          <View style={styles.colorWrapper}>
            <TouchableOpacity
              style={[styles.color, styles.black]}
              onPress={() => setColor('#090C08')}
            ></TouchableOpacity>
            <TouchableOpacity
              style={[styles.color, styles.purple]}
              onPress={() => setColor('#474056')}
            ></TouchableOpacity>
            <TouchableOpacity
              style={[styles.color, styles.blue]}
              onPress={() => setColor('#8A95A5')}
            ></TouchableOpacity>
            <TouchableOpacity
              style={[styles.color, styles.green]}
              onPress={() => setColor('#B9C6AE')}
            ></TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Chat', { name: name, color: color})}
          >
            <Text style={styles.buttonText}>Start Chatting</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
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
    alignSelf: 'center',
  },
  box: {
    flex: 100,
    marginBottom: 30,
    width: '88%',
    alignSelf: 'center',
    backgroundColor: '#FFFFFF',
  },
  usernameInput: {
    width: '88%',
    padding: 15,
    borderWidth: 1,
    marginTop: 25,
    marginBottom: 20,
    fontSize: 16,
    fontWeight: '300',
    color: '#757083',
    opacity: 0.5,
    alignSelf: 'center',
  },
  colorSelector: {
    opacity: 1,
    borderWidth: 0,
    padding: 0,
  },
  colorWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  color: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 45,
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
    backgroundColor: '#757083',
    alignItems: 'center',
    alignSelf: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  }
});

export default Start;
