import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {FAB, Image} from '@rneui/themed';
import {AppWriteContext} from '../appwrite/AppwriteContext';
import Snackbar from 'react-native-snackbar';

type UserObj = {
  name: string;
  email: string;
};

const Home = () => {
  const [userData, setUserData] = useState<UserObj>();
  const {appwrite, setIsLoggedIn} = useContext(AppWriteContext);
  const handleLogout = () => {
    appwrite.logout().then(() => {
      setIsLoggedIn(false);
      Snackbar.show({
        text: 'Logout succesful',
        duration: Snackbar.LENGTH_SHORT,
      });
    });
  };

  useEffect(() => {
    appwrite.getCurrentUser().then(res => {
      if (res) {
        const user: UserObj = {
          name: res.name,
          email: res.email,
        };
        setUserData(user);
      }
    });
  }, [appwrite]);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.welcomeContainer}>
        <Image
          source={{uri: '', width: 400, height: 300}}
          resizeMode="contain"
        />
        <Text style={styles.message}>
          Build fast. Scale Big. All in one place
        </Text>
        {userData && (
          <View style={styles.userContainer}>
            <Text style={styles.userDetails}>Name: {userData.name}</Text>
            <Text style={styles.userDetails}>Email: {userData.email}</Text>
          </View>
        )}
      </View>
      <FAB
        placement="right"
        color="#f02e65"
        size="large"
        title="Logout"
        icon={{name: 'logout', color: '#FFFFFF'}}
        onPress={handleLogout}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B0D32',
  },
  welcomeContainer: {
    padding: 12,
    flex: 1,
    alignItems: 'center',
  },
  message: {
    fontSize: 26,
    fontWeight: '500',
    color: '#FFFFF',
  },
  userContainer: {
    marginTop: 20,
  },
  userDetails: {
    fontSize: 20,
    color: '#FFFFF',
  },
});

export default Home;
