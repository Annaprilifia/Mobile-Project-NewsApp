import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Header from '@/components/Header'
import SearchBar from '@/components/SearchBar'
import axios from 'axios'
import { NewsDataType } from '@/types'
import BreakingNews from '@/components/BreakingNews'
import Categories from '@/components/Categories'
import NewsList from '@/components/NewsList'
import { ScrollView } from 'react-native-gesture-handler'
import { GestureHandlerRootView } from 'react-native-gesture-handler';


type Props = {}

const Page = (props: Props) => {
  const {top: safeTop} = useSafeAreaInsets();
  const [breakingNews, setBreakingNews] = useState <NewsDataType []> ([]) ; 
  const [isLoading, setIsLoading] = useState(true);


  useEffect (() => {
    getBreakingNews()
  }, []);

  const getBreakingNews = async () => {
    try {
      const URL = `https://gnews.io/api/v4/search?q=Apple&token=${process.env.EXPO_PUBLIC_API_KEY}`;
      const response = await axios.get(URL);
  
      if (response && response.data.articles.length > 0) {
        // Hapus duplikat berdasarkan URL artikel
        const uniqueArticles = response.data.articles.filter(
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
  
        setBreakingNews(updatedArticles); // Set artikel hasil filter
        setIsLoading(false); // Ubah status loading
      } else {
        console.log("No articles found");
        setBreakingNews([]); // Pastikan state tetap diperbarui meski tanpa data
        setIsLoading(false);
      }
    } catch (err: any) {
      console.log('Error Message: ', err.message);
      setIsLoading(false); // Tetapkan loading ke false saat terjadi error
    }
  };
  
  
  // Fungsi untuk mendapatkan ikon sumber
  const getFavicon = (url: string) => {
    try {
      const domain = new URL(url).hostname;
      return `https://www.google.com/s2/favicons?domain=${domain}`;
    } catch {
      return ''; // Kembalikan string kosong jika terjadi error
    }
  };
  
  const onCatChanged = (category: string) => {
    console.log ('Category: ', category);
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ScrollView style={[styles.container, { paddingTop: safeTop }]}>
        <Header />
        <SearchBar />
        {isLoading ? (
          <ActivityIndicator size={'large'} />
        ) : (
          <BreakingNews newsList={breakingNews} />
        )}
        <Categories onCategoryChanged={onCatChanged} />
        <NewsList newsList={breakingNews} />
      </ScrollView>
    </GestureHandlerRootView>
  );
  
}

export default Page

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})