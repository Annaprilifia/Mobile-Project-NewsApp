import { ActivityIndicator, StyleSheet, Text, View, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Header from '@/components/Header';
import SearchBar from '@/components/SearchBar';
import axios from 'axios';
import { NewsDataType } from '@/types';
import BreakingNews from '@/components/BreakingNews';
import Categories from '@/components/Categories';
import NewsList from '@/components/NewsList';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Loading from '@/components/Loading';

type Props = {};

const Page = (props: Props) => {
  const { top: safeTop } = useSafeAreaInsets();
  const [breakingNews, setBreakingNews] = useState<NewsDataType[]>([]);
  const [news, setNews] = useState<NewsDataType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(""); 

  useEffect(() => {
    getBreakingNews();
    getNews();
  }, []);

  const getBreakingNews = async () => {
    try {
      const URL = `https://api.worldnewsapi.com/search-news?api-key=${process.env.EXPO_PUBLIC_API_KEY}&language=en`;
      const response = await axios.get(URL);

      if (response && response.data.news.length > 0) {
        const uniqueArticles = response.data.news.filter(
          (article: any, index: number, self: any) =>
            index === self.findIndex((a: any) => a.url === article.url)
        );

        const limitedArticles = uniqueArticles.slice(0, 5);

        const updatedArticles = limitedArticles.map((article: any, index: number) => ({
          ...article,
          article_id: `${Date.now()}-${index}`,
        }));

        setBreakingNews(updatedArticles);
        setIsLoading(false);
      } else {
        console.log("No articles found");
        setBreakingNews([]);
        setIsLoading(false);
      }
    } catch (err: any) {
      console.log('Error Message: ', err.message);
      setIsLoading(false);
    }
  };

  const getNews = async (category: string = '') => {
    try {
      let categoryString = category.length !== 0 ? `&category=${category}` : '';
      let searchString = searchQuery.length !== 0 ? `&q=${searchQuery}` : '';

      const URL = `https://api.worldnewsapi.com/search-news?api-key=${process.env.EXPO_PUBLIC_API_KEY}&language=en${categoryString}${searchString}`;
      const response = await axios.get(URL);

      if (response && response.data.news.length > 0) {
        const uniqueArticles = response.data.news.filter(
          (article: any, index: number, self: any) =>
            index === self.findIndex((a: any) => a.url === article.url)
        );

        const limitedArticles = uniqueArticles.slice(0, 10);

        const updatedArticles = limitedArticles.map((article: any, index: number) => ({
          ...article,
          article_id: `${Date.now()}-${index}`,
        }));

        setNews(updatedArticles);
        setIsLoading(false);
      } else {
        console.log("No articles found");
        setNews([]);
        setIsLoading(false);
      }
    } catch (err: any) {
      console.log('Error Message: ', err.message);
      setIsLoading(false);
    }
  };

  const onCatChanged = (category: string) => {
    console.log('Category: ', category);
    setNews([]);
    getNews(category);
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ScrollView style={[styles.container, { paddingTop: safeTop }]}>
        <Header />
        <SearchBar withHorizontalPadding={true} setSearchQuery={setSearchQuery} /> 
        {isLoading ? (
          <Loading size={'large'} />
        ) : (
          <BreakingNews newsList={breakingNews} />
        )}
        <Categories onCategoryChanged={onCatChanged} />
        <NewsList newsList={news} />
      </ScrollView>
    </GestureHandlerRootView>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
