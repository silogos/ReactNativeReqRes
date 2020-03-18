import React, { useEffect, useState } from 'react';
import { Image, View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useConnect } from 'remx';
import authStore from '../stores/authStore'
import * as authActions from '../stores/authActions'
const Stack = createStackNavigator()

import LoginScreen from '../screens/Login'
import HomeScreen from '../screens/Home';
import { Images } from '../assets';
import { Styles } from '../styles';
import Sizes from '../styles/Sizes';

const AppNavigator = () => {
  const [loading, setLoading] = useState(true)
  const { token } = useConnect(() => ({
    token: authStore.getToken()
  }));

  useEffect(() => {
    authActions.loadSession().then(() => {
      setLoading(false)
    })
  }, [])

  if (loading) {
    return (
      <View style={{ flex: 1, backgroundColor: '#013c50', justifyContent: 'center' }}>
        <View style={{ height: 60, marginBottom: Sizes.margin }}>
          <Image source={Images.img.logo} style={Styles.imageContain} />
        </View>
        <ActivityIndicator size={'large'} />
      </View>
    )
  }

  return (
    <NavigationContainer>
      <Stack.Navigator headerMode={'none'} >
        { 
          Boolean(token) ? (
            <>
              <Stack.Screen name={'HomeScreen'} component={HomeScreen} />
            </>  
          ) : (
            <>
              <Stack.Screen name={'LoginScreen'} component={LoginScreen} />
            </>  
          ) 
        }
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
