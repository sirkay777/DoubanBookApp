import React from 'react';
import {View, Text, TabBarIOS} from 'react-native';
import {connect} from 'react-redux';
import SearchNavigation from './SearchNavigation';
import {changeTab} from './actions';

const tabBar = ({
  current,
  changeTab
}) => {
  const tabViewStyle =  {flex:1, alignItems:'center',justifyContent:'center'};
  return (
    <TabBarIOS
      unselectedTintColor='black'
      tintColor='white'
      barTintColor='yellowgreen'>
      <TabBarIOS.Item
        systemIcon='search'
        selected={current == 'search'}
        onPress={() => {changeTab('search')}}>
        <SearchNavigation/>
      </TabBarIOS.Item>
      <TabBarIOS.Item
        systemIcon='favorites'
        selected={current == 'favorites'}
        onPress={() => {changeTab('favorites')}}>
        <View style={tabViewStyle}><Text>Fav</Text></View>
      </TabBarIOS.Item>
      <TabBarIOS.Item
        systemIcon='more'
        selected={current == 'more'}
        onPress={() => {changeTab('more')}}>
        <View style={tabViewStyle}><Text>About</Text></View>
      </TabBarIOS.Item>
    </TabBarIOS>
  );
};

export default DoubanTabBar = connect(
  (state) => {return {
    current: state.tab
  }},
  (dispatch) => {return {
    changeTab: (tab)=>{
      console.log(changeTab(tab));
      console.log('will dispatch changeTab');
      dispatch(changeTab(tab));
    }
  }}
)(tabBar);
