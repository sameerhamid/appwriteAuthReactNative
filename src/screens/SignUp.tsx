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

type SingUpScreenPorps = NativeStackScreenProps<AuthStackParamList, 'SingUp'>;

const SignUp = ({navigation}: SingUpScreenPorps) => {
  const {appwrite, setIsLoggedIn} = useContext(AppWriteContext);
  const [error, setError] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassowrd] = useState<string>('');
  const [repeatPassword, setRepeatPassword] = useState<string>('');
  const handleSignUp = () => {
    if (
      name.length < 1 ||
      email.length < 1 ||
      password.length < 1 ||
      repeatPassword.length < 1
    ) {
      setError('All fields are required');
    } else if (password !== repeatPassword) {
      setError('Password do not match');
    } else {
      const user = {
        email,
        password,
        name,
      };

      appwrite
        .createAccount(user)
        .then(res => {
          if (res) {
            setIsLoggedIn(true);
            Snackbar.show({
              text: 'Singup success',
              duration: Snackbar.LENGTH_SHORT,
            });
          }
        })
        .catch(err => {
          console.log(err);
          setError(err.message);
        });
    }
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.appName}>Appwrite Auth</Text>

        {/* Name  */}

        <TextInput
          value={name}
          onChangeText={text => {
            setError('');
            setName(text);
          }}
          placeholderTextColor={'#AEAEAE'}
          placeholder="Name"
          style={styles.input}
        />
        {/* Email  */}

        <TextInput
          value={email}
          onChangeText={text => {
            setError('');
            setEmail(text);
          }}
          placeholderTextColor={'#AEAEAE'}
          placeholder="Email"
          style={styles.input}
        />

        {/* Password  */}

        <TextInput
          value={password}
          onChangeText={text => {
            setError('');
            setPassowrd(text);
          }}
          placeholderTextColor={'#AEAEAE'}
          placeholder="Password"
          style={styles.input}
        />

        {/* Repeat password  */}

        <TextInput
          value={repeatPassword}
          onChangeText={text => {
            setError('');
            setRepeatPassword(text);
          }}
          placeholderTextColor={'#AEAEAE'}
          placeholder="Confirm password"
          style={styles.input}
        />

        {/* Validation  */}
        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        {/* Singup button  */}

        <Pressable
          onPress={handleSignUp}
          style={[styles.btn, {marginTop: error ? 10 : 20}]}>
          <Text>Sign Up</Text>
        </Pressable>

        {/* Login navigate  */}

        <Pressable
          style={styles.loginContainer}
          onPress={() => navigation.navigate('Login')}>
          <Text style={styles.haveAccountLabel}>
            Already have an accoutn?{''}
            <Text style={styles.loginLabel}>Login</Text>
          </Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
};

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
    marginTop: 10,

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
  loginContainer: {
    marginTop: 60,
  },
  haveAccountLabel: {
    color: '#484848',
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 15,
  },
  loginLabel: {
    color: '#1d9bf0',
  },
});

export default SignUp;
