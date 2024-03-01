import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  StyleSheet,
  Pressable,
} from 'react-native';
import React, {useContext, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AuthStackParamList} from '../routes/AuthStack';
import {AppWriteContext} from '../appwrite/AppwriteContext';
import Snackbar from 'react-native-snackbar';
import {useNavigation} from '@react-navigation/native';

type LoginScreenPorps = NativeStackScreenProps<AuthStackParamList, 'Login'>;

const Login = ({navigation}: LoginScreenPorps) => {
  const {appwrite, setIsLoggedIn} = useContext(AppWriteContext);
  const [error, setError] = useState<string>('');

  const [email, setEmail] = useState<string>('');
  const [password, setPassowrd] = useState<string>('');
  const loginUser = () => {
    if (password.length < 1 || email.length < 1 || password) {
      setError('All Fields are required');
    } else {
      const user = {
        email,
        password,
      };
      appwrite
        .login(user)
        .then(res => {
          if (res) {
            setIsLoggedIn(true);
            Snackbar.show({
              text: 'login successfull',
              duration: Snackbar.LENGTH_SHORT,
            });
          }
        })
        .catch(err => {
          setError('Incorrect email or passwor');
        });
    }
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.appName}>Appwrite Auth</Text>

        {/* EMAIL  */}
        <TextInput
          keyboardType="email-address"
          value={email}
          onChangeText={val => setEmail(val)}
          placeholder="Email"
          placeholderTextColor={`#AEAEAE`}
          style={styles.input}
        />

        {/* PASSWORD  */}
        <TextInput
          value={password}
          onChangeText={val => setPassowrd(password)}
          placeholder="Password"
          placeholderTextColor={`#AEAEAE`}
          style={styles.input}
        />

        {/* Validation Error  */}

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        {/* Loging button  */}

        <Pressable
          style={[styles.btn, {marginTop: error ? 10 : 20}]}
          onPress={loginUser}>
          <Text style={styles.btnText}>Login</Text>
        </Pressable>

        {/* sigin up navigaion  */}

        <Pressable
          style={[styles.btn, {marginTop: error ? 10 : 20}]}
          onPress={() => navigation.navigate('SingUp')}>
          <Text style={styles.signUpContainer}>
            Don't have an accoutn?{''}
            <Text style={styles.signUpLabel}>Create an account</Text>
          </Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  formContainer: {
    justifyContent: 'center',
    alignContent: 'center',
    height: '100%',
  },
  appName: {
    color: '#f02e65',
    fontSize: 40,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#fef8fa',
    padding: 10,
    height: 40,
    alignSelf: 'center',
    borderRadius: 5,

    width: '80%',
    color: '#000000',

    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 1,
  },
  errorText: {
    color: 'red',
    alignSelf: 'center',
    marginTop: 10,
  },
  btn: {
    backgroundColor: '#ffffff',
    padding: 10,
    height: 45,

    alignSelf: 'center',
    borderRadius: 5,
    width: '80%',
    marginTop: 20,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 3,
  },
  btnText: {
    color: '#484848',
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 18,
  },
  signUpContainer: {
    marginTop: 80,
  },
  noAccountLabel: {
    color: '#484848',
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 15,
  },
  signUpLabel: {
    color: '#1d9bf0',
  },
});
