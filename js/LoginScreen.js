import React from 'react';
import {TextInput, View, TouchableHighlight, Text, StyleSheet} from 'react-native';

export default LoginScreen = () => {
  let userName = '';
  let passWord = '';
  return (
    <View style={styles.container}>
      <TextInput
          style={styles.input}
          onChangeText={(text) => {userName = text}}
          placeholder="请输入用户名"
        />
      <TextInput
      style={styles.input}
          onChangeText={(text) => {passWord = text}}
          placeholder="请输入密码"
        />
      <TouchableHighlight
        style={styles.button}
        onPress={()=>{}}>
        <Text style={styles.buttonText}>登录</Text>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  container:{
    paddingTop:30,
    paddingHorizontal:5
  },
  input: {
    flex:1,
    height:30,
    padding:3,
    marginVertical:5,
    borderColor:'gray',
    borderWidth:1
  },
  button:{
    flex:1,
    alignItems:'center',
    padding:10,
    backgroundColor:'green',
    height:35
  },
  buttonText:{
    color:'white',
  }
});
