import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

export default AboutScreen = () => {
  return (
    <View style={styles.container}>
      <Image source={require('./images/avatar.jpeg')}/>
      <View style={styles.detail}>
        <Text>Author: Kai</Text>
        <Text>Email: kaixun@baojiayin.com</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:'center',
    justifyContent:'center'
  },
  detail:{
    paddingTop:10,
    alignItems:'center'
  }
});
