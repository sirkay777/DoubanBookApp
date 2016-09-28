import React from 'react';
import { TouchableHighlight, View, Image, Text, StyleSheet } from 'react-native';
export default BookCell = ({
  book,
  selectBook
})=>{
  return (
      <TouchableHighlight
        onPress={selectBook}
        underlayColor='transparent'>
        <View style={styles.bookRow}>
          <Image source={{uri:book.image}} style={styles.bookImage}/>
          <View style={styles.bookRowContent}>
            <Text>{book.title}</Text>
            <Text>{book.author}</Text>
            <Text>{book.rating.average}</Text>
          </View>
        </View>
      </TouchableHighlight>
  );
};
const styles = StyleSheet.create({
  bookRow:{
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderColor: '#cccccc',
  },
  bookRowContent:{
    marginLeft: 15,
  },
  bookImage:{
    width:100,
    height:140,
  }
});
