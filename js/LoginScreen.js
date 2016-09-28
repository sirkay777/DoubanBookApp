import React from 'react';
import {TextInput, View, TouchableHighlight, Text, StyleSheet} from 'react-native';
import AV from 'leancloud-storage';
import {connect} from 'react-redux';
import { fetchFavList, logIn } from './actions';


export default Login= ({
  navigator,
  fetchFavList,
  logIn
}) => {
  let userName = '';
  let passWord = '';
  return (
    <View style={styles.container}>
      <View>
        <TextInput
            autoFocus={true}
            autoCapitalize='none'
            style={styles.input}
            onChangeText={(text) => {userName = text}}
            placeholder="请输入用户名"
          />
        <TextInput
            style={styles.input}
            onChangeText={(text) => {passWord = text}}
            placeholder="请输入密码"
            secureTextEntry={true}
          />
        <TouchableHighlight
          style={styles.button}
          onPress={()=>{
            AV.User.logIn(userName, passWord).then( (loginedUser) => {
               navigator.pop();
               logIn(loginedUser);
               fetchFavList();
             }).catch(
               (error) => console.log(error)
             );
          }}>
          <Text style={styles.buttonText}>登录</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
};

export default LoginScreen = connect(
  null,
  (dispatch) => {return{
    fetchFavList: ()=> dispatch(fetchFavList()),
    logIn: (user)=> dispatch(logIn(user))
  };}
)(Login);

const styles = StyleSheet.create({
  container:{
    flex:1,
    paddingTop:30,
    paddingHorizontal:5,
    justifyContent:'center'
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
    height:35,
    borderRadius: 8,
  },
  buttonText:{
    color:'white',
  }
});
