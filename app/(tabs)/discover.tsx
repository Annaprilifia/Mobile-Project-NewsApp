import { StyleSheet, Text, View, Pressable } from 'react-native';
import React, { useState } from 'react';
import SearchBar from '@/components/SearchBar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '@/constants/Colors';
import CheckBox from '@/components/CheckBox';
import { useNewsCategories } from '@/hooks/useNewsCategories';
import { useNewsCountries } from '@/hooks/useNewsCountry';
import { Link } from 'expo-router';

type Props = {};

const Page = (props: Props) => {
  const { top: safeTop } = useSafeAreaInsets();

  // State untuk data pencarian
  const { newsCategories, toggleNewsCategory } = useNewsCategories();
  const { newsCountries, toggleNewsCountries } = useNewsCountries();
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('');
  const [country, setCountry] = useState('');

  return (
    <View style={[styles.container, { paddingTop: safeTop + 20 }]}>
      {/* Search Bar */}
      <SearchBar withHorizontalPadding={false} setSearchQuery={setSearchQuery} />

      {/* Categories */}
      <Text style={styles.title}>Categories</Text>
      <View style={styles.listContainer}>
        {newsCategories?.map((item) => (
          <CheckBox
            key={item.id}
            label={item.title}
            checked={item.selected}
            onPress={() => {
              toggleNewsCategory(item.id);
              setCategory((prev) => (prev === item.slug ? '' : item.slug));
            }}
          />
        ))}
      </View>

      {/* Countries */}
      <Text style={styles.title}>Country</Text>
      <View style={styles.listContainer}>
        {newsCountries?.map((item, index) => (
          <CheckBox
            key={index}
            label={item.name}
            checked={item.selected}
            onPress={() => {
              toggleNewsCountries(index);
              setCountry((prev) => (prev === item.code ? '' : item.code));
            }}
          />
        ))}
      </View>

      {/* Search Button */}
      <Pressable style={styles.searchBtn}>
        <Link
          href={{
            pathname: '/news/search',
            params: { query: searchQuery, category, country },
          }}
          asChild
        >
          <Text style={styles.searchBtnText}>Search</Text>
        </Link>
      </Pressable>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.black,
    marginBottom: 10,
  },
  listContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginTop: 12,
    marginBottom: 20,
  },
  searchBtn: {
    backgroundColor: Colors.tint,
    alignItems: 'center',
    padding: 14,
    borderRadius: 10,
    marginVertical: 10,
  },
  searchBtnText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
});
