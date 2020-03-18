import React, { useEffect, useState } from 'react'
import {
  View,
  StatusBar,
  Text,
  StyleSheet,
  Image,
  BackHandler,
  ToastAndroid,
  TouchableOpacity,
  RefreshControl
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FlatList } from 'react-native-gesture-handler'
import { useConnect } from 'remx';

import Sizes from '../../styles/Sizes'
import { Styles, Shadow, Colors } from '../../styles'
import { Fonts } from '../../assets'

import { fetchEmployees, createEmployee, updateEmployee, deleteEmployee } from '../../stores/employeesActions';
import store from '../../stores/employeesStore';
import { currencyFormat } from '../../utils/commonHelper';
import ModalTambah from '../../components/ModalTambah';
import ModalEdit from '../../components/ModalEdit';

const HomeScreen = ({ navigation, props }) => {
  const { employees } = connect(props);
  const [modalVisible, showModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [updateData, setUpdateData] = useState({ isVisible: false, data: { name: '', salary: '', age: '' } }); 
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

  async function getData() {
    try {
      setLoading(true)
      const response = await fetchEmployees();
      setLoading(false)
    } catch (err) {
      console.log('err', err);
      setLoading(false)
      alert(err);
    }
  } 

  useEffect(() => {
    getData()
  }, [])

  async function submitForm(values) {
    try {
      const response = await createEmployee(values);
      showModal(false)
      getData()
      console.log({response})
    } catch (err) {
      console.log('err', err);
      alert(err);
    }
  }

  async function submitFormUpdate({id, ...values}) {
    try {
      const response = await updateEmployee(id, values);
      console.log({response})
      await setUpdateData({ isVisible: false, data: {} })
      alert(response.status+ " updated data");
      getData()
    } catch (err) {
      console.log('err', err);
      alert(err);
    }
  }

  async function submitFormDelete(id) {
    console.log({submitFormDelete: id})
    try {
      const response = await deleteEmployee(id);
      if(response.status === "failed") throw response.message
      console.log({response})
      await setUpdateData({ isVisible: false, data: {} })
      alert(response.message);
      getData()
    } catch (err) {
      console.log('err', err);
      alert(err);
    }
  }

  return (
    <SafeAreaView style={styles.container} >
      <StatusBar backgroundColor={'#013c50'} />
      <View style={styles.header} >
        <Text style={styles.title}>Employees</Text>
        <Text style={styles.signOut}>Sign Out</Text>
      </View>

      <FlatList
        refreshControl={
          <RefreshControl
            colors={["#9Bd35A", "#689F38"]}
            refreshing={loading}
            onRefresh={() => getData()}
          />
        }
        keyExtractor={({ id }, idx) => 'Employee-'+idx}
        data={employees}
        contentContainerStyle={{ padding: Sizes.margin }}
        renderItem={({ item }) => {
          let { id, employee_name, employee_salary, employee_age, profile_image } = item
          let image = profile_image || employee_name.split(' ').map((e) => e[0]).join('')
          return (
            <TouchableOpacity style={styles.card} activeOpacity={.9} onPress={() => setUpdateData({ isVisible: true, data: { id: id, name: employee_name, salary: employee_salary, age: employee_age } })} >
              <View style={{ flexDirection: 'row' }}>
                <View style={styles.photoProfile} >
                  { profile_image
                      ? <Image source={{ uri: profile_image }} style={Styles.imageCover} />
                      : <Text style={styles.textProfile}>{image}</Text>
                  }
                </View>
                <View style={{ justifyContent: 'center' }}>
                  <Text style={styles.name}>{employee_name}</Text>
                  <Text style={styles.age}>{employee_age} years old</Text>
                  <Text style={styles.salary}>{currencyFormat(employee_salary)}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )
        }}
      />
      <TouchableOpacity onPress={() => showModal(true)} activeOpacity={.9} style={{ position: 'absolute', right: Sizes.margin, bottom: Sizes.margin * 2, justifyContent: 'center', alignItems: 'center', width: 70, height: 70, borderRadius: (70/2), backgroundColor: '#013c50' }}>
        <Text style={{ fontFamily: Fonts.OpenSans.Regular, color: Colors.primary.white, fontSize: 50 }}>+</Text>
      </TouchableOpacity>

      <ModalTambah
        isVisible={modalVisible}
        onRequestClose={() => showModal(false)}
        onSubmit={submitForm}
      />

      <ModalEdit 
        isVisible={updateData.isVisible}
        initialData={updateData.data}
        onRequestClose={() => setUpdateData({ isVisible: false, data: {} })}
        onSubmit={submitFormUpdate}
        onDelete={submitFormDelete}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary.white
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,
    backgroundColor: '#013c50'
  },
  title: {
    fontFamily: Fonts.OpenSans.Bold,
    fontSize: 18,
    textAlign: 'center',
    color: Colors.primary.white
  },
  signOut: {
    position: 'absolute',
    alignSelf: 'center',
    right: Sizes.margin,
    fontFamily: Fonts.OpenSans.Bold,
    fontSize: 12,
    textAlign: 'center',
    color: Colors.primary.white
  },
  wrapper: {
    flex: 1
  },
  card: { 
    ...Shadow(2), 
    padding: Sizes.margin,
    borderRadius: 5, 
    marginBottom: Sizes.margin 
  },
  photoProfile: {
    width: 70, height: 70, borderRadius: (70/2), overflow: 'hidden', marginRight: Sizes.margin, backgroundColor: '#CCC'
  },
  textProfile: {
    fontFamily: Fonts.OpenSans.Bold,
    fontSize: 25,
    color: Colors.primary.black,
    marginTop: 18, 
    textAlign: 'center'
  },
  name: {
    fontFamily: Fonts.OpenSans.Bold,
    fontSize: 18,
    color: Colors.primary.black
  },
  age: {
    fontFamily: Fonts.OpenSans.Regular,
    fontSize: 12,
    color: Colors.primary.black
  },
  salary: {
    fontFamily: Fonts.OpenSans.Regular,
    fontSize: 14,
    color: Colors.primary.black
  },
  modalCard: {
    ...Shadow(2), 
    backgroundColor: Colors.primary.white,
    padding: Sizes.margin,
    borderRadius: 5
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


const connect = props =>
  useConnect(() => ({
    employees: store.getEmployees()
  })
);

export default HomeScreen