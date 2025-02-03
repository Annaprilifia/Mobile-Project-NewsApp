import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import { NewsDataType } from '@/types'

type Props = {
    newsList: Array<NewsDataType>
}

const NewsList = ({ newsList }: Props) => { // Deconstruct newsList di sini
  return (
    <View style={styles.container}>
      {newsList.map((item, index) => ( // Gunakan newsList, bukan NewsList
        <View key={index} style={styles.itemContainer}>
          <Image source={{uri: item.image}} style={styles.itemImg} />
          <View style={styles.itemInfo}>
          <Text style={styles.itemCategory}> {item.category} </Text>
          <Text>{item.title}</Text>
          </View>
        </View>
      ))}
    </View>
  )
}

export default NewsList

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    flex: 1,
    gap: 10
  },
  itemImg: {
    width: 90,
    height: 100,
    borderRadius: 20,
    marginRight: 10
  }
})
