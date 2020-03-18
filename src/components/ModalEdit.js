import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native'
import { TextInput } from "react-native-gesture-handler";
import { Formik } from 'formik';
import * as Yup from 'yup';
import Modal from "react-native-modal";
import { Fonts } from '../assets'
import { Sizes, Shadow, Colors } from '../styles'

export default ModalEdit = ({ initialData, isVisible, onRequestClose, onSubmit, onDelete }) => {
  const employeeSchema = Yup.object().shape({
    name: Yup.string().required('Masukan Name').min(5),
    salary: Yup.string().required('Masukkan salary'),
    age: Yup.string().required('Masukan Umur')
  });

  return (
    <Modal 
      isVisible={isVisible}
      useNativeDriver={true}
      animationIn={'slideInDown'}
      onBackButtonPress={onRequestClose}
    >
      <Formik
        enableReinitialize
        initialValues={initialData}
        validationSchema={employeeSchema}
        onSubmit={onSubmit}
      > 
        { props => {
            const isError = field => props.touched[field] && props.errors[field];
            return (
              <View style={styles.modalCard}>
                <View style={styles.row}>
                  <Text style={styles.label}>Name</Text>
                  <TextInput 
                    style={styles.value} 
                    value={props.values.name}
                    onBlur={props.handleBlur('name')}
                    onChangeText={props.handleChange('name')} 
                  />
                  <View style={styles.border} />
                  <Text style={styles.error}>{isError('name') && props.errors.name}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.label}>Salary</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={styles.value}>Rp</Text>
                    <TextInput 
                      style={[styles.value, { flex: 1 }]} 
                      value={props.values.salary}
                      onBlur={props.handleBlur('salary')}
                      onChangeText={props.handleChange('salary')} 
                      keyboardType={'number-pad'}
                    />
                  </View>
                  <View style={styles.border} />
                  <Text style={styles.error}>{isError('salary') && props.errors.salary}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.label}>Age</Text>
                  <TextInput 
                    style={styles.value} 
                    value={props.values.age}
                    onBlur={props.handleBlur('age')}
                    onChangeText={props.handleChange('age')} 
                    keyboardType={'number-pad'}
                  />
                  <View style={styles.border} />
                  <Text style={styles.error}>{isError('age') && props.errors.age}</Text>
                </View>
                <View style={[styles.row, { flexDirection: 'row' }]}>
                  <TouchableOpacity onPress={props.handleSubmit} activeOpacity={.9} style={styles.button}>
                    <Text style={styles.buttonText}>UPDATE</Text>
                  </TouchableOpacity>
                  <View style={{ width: Sizes.gutter }} />
                  <TouchableOpacity onPress={() => onDelete(props.values.id)} activeOpacity={.9} style={[styles.button, { backgroundColor: 'red' }]}>
                    <Text style={styles.buttonText}>DELETE</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )
        }}
      </Formik>
    </Modal>
  )
}


const styles = StyleSheet.create({
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
    flex: 1,
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