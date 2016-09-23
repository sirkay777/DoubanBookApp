import React from 'react';
import {Navigator,Text,TouchableHighlight,Platform,StyleSheet} from 'react-native';
import SearchScreen from './SearchScreen';
import BookDetailScreen from './BookDetailScreen';

const getNavigationBar = () => {
    return (
      <Navigator.NavigationBar
       routeMapper={{
         LeftButton: (route, navigator, index, navState) =>
          {
            if (route.name == 'home') {
              return null;
            } else {
              return (
                <TouchableHighlight onPress={() => navigator.pop()}
                  underlayColor='transparent'>
                  <Text style={styles.navLeftButton}>&lt; 返回</Text>
                </TouchableHighlight>
              );
            }
          },
          RightButton: (route, navigator, index, navState) =>
           { return null; },
          Title: (route, navigator, index, navState) =>
           { return (<Text style={styles.navTitle}>{route.title}</Text>); },
       }}
       style={styles.navBar}
     />
    );
};

const renderScene = (route, navigator) => {
  if(route.name == 'book_detail'){
    return <BookDetailScreen book={route.book} navigator={navigator}/>
  }else if (route.name == 'login') {
    return <LoginScreen navigator={navigator}/>;
  }else{
    return <SearchScreen navigator={navigator} tag={route.tag}/>;
  }
}

export default SearchNavigation = () => {
  return <Navigator style={{flex:1}}
    initialRoute={{name:'home', title:'首页', tag:'SICP'}}
    renderScene={renderScene}
    navigationBar={getNavigationBar()}
    configureScene={(route, routeStack) => Navigator.SceneConfigs.FadeAndroid}
    />;
};

const styles = StyleSheet.create({
    navBar: {
      backgroundColor: '#eaffea',
      height:50
    },
    navTitle: {
      fontWeight:'bold',
      paddingTop:(Platform.OS === 'ios') ? 5 : 20,
    },
    navLeftButton:{
      color:'blue',
      paddingTop:(Platform.OS === 'ios') ? 5 : 13,
      paddingLeft:(Platform.OS === 'ios') ? 5 : 0,
      fontWeight:'bold',
      height:50
    }
});
