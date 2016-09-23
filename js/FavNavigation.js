import React from 'react';
import {Navigator,Text,TouchableHighlight,Platform,StyleSheet} from 'react-native';
import LoginScreen from './LoginScreen';
import FavScreen from './FavScreen';

const renderScene = (route, navigator) => {
  if(route.name == 'login'){
    return <LoginScreen navigator={navigator}/>;
  }else{
    return <FavScreen navigator={navigator}/>
  }
}

export default FavNavigation = () => {
  return <Navigator
    initialRoute={{name:'fav'}}
    renderScene={renderScene}
    configureScene={(route, routeStack) => Navigator.SceneConfigs.FadeAndroid}
    />;
};
