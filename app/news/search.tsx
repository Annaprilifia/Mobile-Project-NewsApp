import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Link, router, Stack, useLocalSearchParams } from 'expo-router'
import { NewsDataType } from '@/types'
import axios from 'axios'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'
import { Ionicons } from '@expo/vector-icons'
import Loading from '@/components/Loading'
import { NewsItem } from '@/components/NewsList'

type Props = {}

const Page = (props: Props) => {
  const {query, category, country} = useLocalSearchParams <{
    query: string;
    category: string;
    country: string;
  }>();

  const [news, setNews] = useState <NewsDataType[]> ([]) ; 
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getNews();
  }, []);

  const getNews = async (category:string = '') => {
    try {
      let categoryString = '';
      let countryString = '';
      let queryString = '';
      if (category) {
        categoryString = `&category=${category}`
      }
      if (country) {
        countryString = `&country=${country}`
      }
      if (query) {
        queryString = `&q=${query}`
      }
      const URL = `https://api.worldnewsapi.com/search-news?api-key=${process.env.EXPO_PUBLIC_API_KEY}&language=en&${categoryString}${countryString}${queryString}`;
      const response = await axios.get(URL);
  
      if (response && response.data.news.length > 0) {
        // Hapus duplikat berdasarkan URL artikel
        const uniqueArticles = response.data.news.filter(
          (article: any, index: number, self: any) =>
            index === self.findIndex((a: any) => a.url === article.url) // Bandingkan URL untuk menghindari duplikasi
        );
  
        // Batasi hasil ke 10 artikel pertama
        const limitedArticles = uniqueArticles.slice(0, 10);
  
        // Update data artikel dengan ID unik
        const updatedArticles = limitedArticles.map((article: any, index: number) => ({
          ...article,
          article_id: `${Date.now()}-${index}`, // Generate unique ID
        }));
  
        setNews(updatedArticles); // Ganti dengan setNews
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

  return (
    <>
      <Stack.Screen
        options={{
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={22} />
            </TouchableOpacity>
          ),
          title: 'Search',
        }}
      />

      <View style={styles.container}>
        {isLoading ? (
          <Loading size="large" />
        ) : (
          <FlatList
            data={news}
            keyExtractor={(_,index) => `list_item${index}`}
            showsVerticalScrollIndicator={false}
            renderItem={({ index, item }) => (
              <Link href={`/news/${item.article_id}`} asChild key={index}>
                <TouchableOpacity>
                  <NewsItem item={item} />
                </TouchableOpacity>
              </Link>
            )}
          />
        )}
      </View>
    </>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
    marginVertical: 20,
  },
});