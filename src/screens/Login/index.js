import React, { useEffect } from 'react'
import {
  View,
  StatusBar,
  Text,
  StyleSheet,
  Image,
  BackHandler,
  ToastAndroid
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import { Formik } from 'formik';
import * as Yup from 'yup';
import { login } from '../../stores/authActions';
import store from '../../stores/authStore';
import Sizes from '../../styles/Sizes'
import { Images } from '../../assets'
import { Styles, Shadow } from '../../styles'
import Colors from '../../styles/Colors'
import { Fonts } from '../../assets'

// import { Images, Fonts } from '../../assets';

const LoginScreen = ({ navigation }) => {
  let backToExit = false;
  function handleBackButtonPressAndroid() {
    console.log({backToExit, navigation});
    if (backToExit) {
      return false;
    }
    if (navigation.isFocused()) {
      backToExit = true;
      ToastAndroid.show('Press back again to exit the app', ToastAndroid.SHORT);
      setTimeout(() => {
        backToExit = false;
      }, 1000);
    }
    return true;
  }

  useEffect(() => {
    BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackButtonPressAndroid,
    );
    return () =>
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonPressAndroid,
      );
  });

  const loginSchema = Yup.object().shape({
    email: Yup.string().required('Masukan Email').email('Invalid email address'),
    password: Yup.string().min(5).required('Masukkan password'),
  });

  async function submitForm(values) {
    const {email, password} = values;
    try {
      const response = await login(email, password);
      store.setToken(response.data.token)
      console.log({response})
    } catch (err) {
      console.log('err', err);
      alert(err);
    }
    
  }

  return (
    <SafeAreaView style={styles.container} >
      <StatusBar backgroundColor={'#013c50'} />
      <View style={styles.bgAbsolute} >
        <View style={styles.logo}>
          <Image source={Images.img.logo} style={Styles.imageContain} />
        </View>
      </View>
      <ScrollView style={styles.wrapper}>
        <Formik
          enableReinitialize
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={loginSchema}
          onSubmit={submitForm}
        > 
          { props => {
              const isError = field => props.touched[field] && props.errors[field];
              
              return (
                <View style={styles.card}>
                  <Text style={styles.title}>LOGIN</Text>
                  <View style={styles.row}>
                    <Text style={styles.label}>Email</Text>
                    <TextInput 
                      style={styles.value} 
                      value={props.values.email}
                      onBlur={props.handleBlur('email')}
                      onChangeText={props.handleChange('email')} 
                    />
                    <View style={styles.border} />
                    <Text style={styles.error}>{isError('email') && props.errors.email}</Text>
                  </View>
                  <View style={styles.row}>
                    <Text style={styles.label}>Password</Text>
                    <TextInput 
                      style={styles.value} 
                      secureTextEntry={true} 
                      value={props.values.password}
                      onBlur={props.handleBlur('password')}
                      onChangeText={props.handleChange('password')} 
                    />
                    <View style={styles.border} />
                    <Text style={styles.error}>{isError('password') && props.errors.password}</Text>
                  </View>
                  <View style={styles.row}>
                    <TouchableOpacity onPress={props.handleSubmit} activeOpacity={.9} style={styles.button}>
                      <Text style={styles.buttonText}>LOGIN</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )
          }}
        </Formik>

      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary.white
  },
  bgAbsolute: {
    position: 'absolute', left: 0, top: 0, right: 0, height: 300, justifyContent: 'center', backgroundColor: '#013c50'
  },
  logo: {
    height: 60
  },
  wrapper: {
    flex: 1
  },
  card: {
    margin: Sizes.margin, 
    marginTop: 250, 
    backgroundColor: Colors.primary.white,
    borderRadius: 5,
    padding: Sizes.gutter,
    ...Shadow(2)
  },
  title: {
    fontFamily: Fonts.OpenSans.Bold,
    fontSize: 21,
    textAlign: 'center',
    marginBottom: Sizes.margin
  },
  row: {
    marginBottom: Sizes.margin
  },
  label: {
    fontFamily: Fonts.OpenSans.Bold,
    fontSize: 18,
    color: '#013c50'
  },
  value: {
    fontFamily: Fonts.OpenSans.Regular,
    fontSize: 16,
    color: '#013c50'
  },
  error: {
    fontFamily: Fonts.OpenSans.Regular,
    fontSize: 12,
    color: 'red'
  },
  border: { 
    height: 1,
    backgroundColor: '#013c50'
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 56, 
    backgroundColor: '#013c50', 
    borderRadius: 5
  },
  buttonText: {
    fontFamily: Fonts.OpenSans.Bold,
    fontSize: 16,
    color: '#FFF'
  }
})

export default LoginScreen