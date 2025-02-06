import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { router, Stack, useLocalSearchParams } from 'expo-router'
import { ScrollView} from 'react-native-gesture-handler'
import { Ionicons } from '@expo/vector-icons'
import axios from 'axios'
import { NewsDataType } from '@/types'
import Loading from '@/components/Loading'
import { Colors } from '@/constants/Colors'
import Moment from 'moment'
import AsyncStorage from '@react-native-async-storage/async-storage'

type Props = {}

const NewsDetails = (props: Props) => {
    const {id} = useLocalSearchParams<{id: string}> ();
    const [news, setNews] = useState <NewsDataType[]> ([]) ; 
    const [isLoading, setIsLoading] = useState(true);
    const [bookmark, setBookmark] = useState(false);

    useEffect(()=>{
      getNews();
    }, []);

    useEffect (() => {
      if ( !isLoading ){
        renderBookmark(news[0].article_id);
      }
    }, [isLoading]);

    const getNews = async () => {
      try {
        const URL = `https://api.worldnewsapi.com/search-news?api-key=${process.env.EXPO_PUBLIC_API_KEY}&id=${id}&language=en`;
        const response = await axios.get(URL);
    
        if (response && response.data.news.length > 0) {
          // Hapus duplikat berdasarkan URL artikel
          const uniqueArticles = response.data.news.filter(
            (article: any, index: number, self: any) =>
              index === self.findIndex((a: any) => a.url === article.url) // Bandingkan URL untuk menghindari duplikasi
          );
    
          // Batasi hasil ke 5 artikel pertama
          const limitedArticles = uniqueArticles.slice(0, 5);
    
          // Update data artikel dengan ID unik
          const updatedArticles = limitedArticles.map((article: any, index: number) => ({
            ...article,
            article_id: `${Date.now()}-${index}`, // Generate unique ID
          }));
    
          setNews(updatedArticles); // Set artikel hasil filter
          setIsLoading(false); // Ubah status loading
        } else {
          console.log("No articles found");
          setNews([]); // Pastikan state tetap diperbarui meski tanpa data
          setIsLoading(false);
        }
      } catch (err: any) {
        console.log('Error Message: ', err.message);
        setIsLoading(false); // Tetapkan loading ke false saat terjadi error
      }
    };
  
    const saveBookMark = async(newsId: string) => {
      setBookmark(true);
      await AsyncStorage.getItem("bookmark").then((token) => {
        const res = token ? JSON.parse(token) : [];
        if (!res.includes(newsId)) {
          res.push(newsId);
          AsyncStorage.setItem("bookmark", JSON.stringify(res));
          alert("News Saved!");
        }
      });
      
    };

    const removeBookmark = async (newsId: string) => {
      setBookmark (false);
      const bookmark = await AsyncStorage.getItem("bookmark").then ((token) => {
        const res = token ? JSON.parse(token) : [];
        return res.filter ((id: string) => id !== newsId);
      });
      await AsyncStorage.setItem("bookmark", JSON.stringify(bookmark));
      alert("News Unsaved!")
    }

    const renderBookmark = async (newsId: string) => {
      await AsyncStorage.getItem("bookmark").then ((token) => {
        const res = token ? JSON.parse(token) : [];
        if (res != null) {
          let data = res.find ((value: string) => value === newsId);
          return data == null ? setBookmark(false) : setBookmark (true);
        }
      })
    }

  return (
    <>
    <Stack.Screen options={{
      headerLeft: () => (
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name='arrow-back' size={22}/>
        </TouchableOpacity>
      ),
      headerRight: () => (
        news.length > 0 ? (
          <TouchableOpacity 
            onPress={() => 
              bookmark 
              ? removeBookmark(news[0].article_id) 
              : saveBookMark(news[0].article_id)
            }
          >
            <Ionicons 
              name={bookmark ? "heart" :'heart-outline'} 
              size={22} 
              color={bookmark ? "red" : Colors.black} 
            />
          </TouchableOpacity>
        ) : null
      ),
      
      title: ''
    }} />
    {isLoading ? (
      <Loading size={'large'} />
    ): (
    <ScrollView 
    contentContainerStyle={styles.contentContainer}
    style={styles.container}>
      <Text style={styles.title}>{news[0].title}</Text>
      <View style={styles.newsInfoWrapper}>
        <Text style={styles.newsInfo}>
          {Moment(news[0].publishedAt).format("MMMM DD, hh:mm a")}
        </Text>
        <Text style={styles.newsInfo}>{news[0].authors}</Text>
      </View>
      <Image source={{uri: news[0].image}} style={styles.newsImg}/>
      {news [0].text? (
        <Text style={styles.newsContent}>{news[0].text}</Text>
      ):(
        <Text style={styles.newsContent}>{news[0].summary}</Text>
      )}
      
    </ScrollView>
    )}
    </>
  )
}

export default NewsDetails

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.black,
    marginVertical: 10,
    letterSpacing: 0.6
  },
  newsImg: {
    width: '100%',
    height: 300,
    marginBottom: 20,
    borderRadius: 10,
  },
  newsInfoWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  newsInfo: {
    fontSize:12,
    color: Colors.darkGrey
  },
  newsContent: {
    fontSize: 14,
    color: '#555',
    letterSpacing: 0.8,
    lineHeight: 22
  }
})