import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { NewsDataType } from '@/types'
import { Colors } from '@/constants/Colors'
import Loading from '@/components/Loading'
import { Link } from 'expo-router'


type Props = {
    newsList: Array<NewsDataType> | undefined; 
}

const NewsList = ({ newsList }: Props) => {
  const [sourceIcons, setSourceIcons] = useState<any>({});

  
  const getFaviconUrl = (sourceUrl: string) => {
    try {
      const url = new URL(sourceUrl);
      return `https://logo.clearbit.com/${url.hostname}`; 
    } catch (error) {
      console.warn("Invalid URL for favicon:", sourceUrl);
      return 'https://example.com/default-icon.png'; 
    }
  };

  useEffect(() => {
  
    const fetchFavicon = async () => {
      if (!newsList) return; 
      const icons: any = {};
      for (let item of newsList) {
        let faviconUrl = item.source_icon || getFaviconUrl(item.url);
        if (!faviconUrl) {
          faviconUrl = 'https://example.com/default-icon.png';
        }
        icons[item.id] = faviconUrl;
      }
      setSourceIcons(icons);
    };

    fetchFavicon();
  }, [newsList]);

  // Pastikan newsList memiliki array yang valid
  if (!newsList || newsList.length === 0) {
    return <Text>No news available</Text>;
  }

  return (
    <View style={styles.container}>
      {newsList.length == 0 ? (
        <Loading size={'large'} />
      ) : (
      newsList.map((item, index) => (
        <Link href={`/news/${item.id}`} asChild key={index}>
            <TouchableOpacity>
              <NewsItem item={item}/>
            </TouchableOpacity>
        </Link>
      ))
      )}
    </View>
  );
};

export default NewsList;

export const NewsItem = ({ item }: { item: NewsDataType }) => {
  return (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.image }} style={styles.itemImg} />
      <View style={styles.itemInfo}>
        <Text style={styles.itemCategory}>{item.category}</Text>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <View style={styles.itemSourceInfo}>
          <Image
            source={{uri: item.source_icon}}
            style={styles.itemSourceImg}
          />
          <Text style={styles.itemSourceName}>{item.authors}</Text>
        </View>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginBottom: 50,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    flex: 1,
    gap: 10,
  },
  itemImg: {
    width: 90,
    height: 100,
    borderRadius: 20,
    marginRight: 10,
  },
  itemInfo: {
    flex: 1,
    gap: 10,
    justifyContent: 'space-between',
  },
  itemCategory: {
    fontSize: 12,
    color: Colors.darkGrey,
    textTransform: 'capitalize',
  },
  itemTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.black,
  },
  itemSourceInfo: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  itemSourceImg: {
    width: 20,
    height: 20,
    borderRadius: 20,
  },
  itemSourceName: {
    fontSize: 10,
    fontWeight: '400',
    color: Colors.darkGrey,
  },
});
