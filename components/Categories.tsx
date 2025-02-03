import { StyleSheet, View, Text } from 'react-native';
import React, { useRef, useState } from 'react';
import { Colors } from '@/constants/Colors';
import { GestureHandlerRootView, ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import newsCategoryList from '@/constants/Categories';

type Props = {
    onCategoryChanged: (category: string) => void;
};

const Categories = ({onCategoryChanged}: Props) => {
  const scrollRef = useRef<ScrollView>(null);
  const itemPositions = useRef<{ x: number; index: number }[]>([]); // Menyimpan posisi elemen
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSelectCategory = (index: number) => {
    const position = itemPositions.current.find((pos) => pos.index === index); // Cari posisi elemen berdasarkan index
    if (position) {
      console.log(`Scrolling to position: ${position.x}`); // Debug posisi scroll
      scrollRef.current?.scrollTo({ x: position.x - 20, y: 0, animated: true }); // Scroll ke posisi elemen
    }
    setActiveIndex(index); // Update state untuk elemen yang aktif
  
    onCategoryChanged (newsCategoryList[index].slug);

};

  return (
    <GestureHandlerRootView>
      <View>
        <Text style={styles.title}>Trending Right Now</Text>
        <ScrollView
          ref={scrollRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.itemsWrapper}
        >
          {newsCategoryList.map((item, index) => (
            <View
              key={index}
              onLayout={(event) => {
                const { x } = event.nativeEvent.layout; // Mendapatkan posisi elemen saat dirender
                itemPositions.current[index] = { x, index }; // Menyimpan posisi elemen
                console.log(`Item ${index} position: ${x}`); // Debug posisi elemen
              }}
            >
              <TouchableOpacity
                style={[styles.item, activeIndex === index && styles.itemActive]}
                onPress={() => handleSelectCategory(index)}
              >
                <Text style={[styles.itemText, activeIndex === index && styles.itemTextActive]}>{item.title}</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </View>
    </GestureHandlerRootView>
  );
};

export default Categories;

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.black,
    marginBottom: 10,
    marginLeft: 20,
  },
  itemsWrapper: {
    gap: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 10,
  },
  item: {
    borderWidth: 1,
    borderColor: Colors.darkGrey,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
  },
  itemActive: {
    backgroundColor: Colors.tint,
    borderColor: Colors.tint,
  },
  itemText: {
    fontSize: 14,
    color: Colors.darkGrey,
    letterSpacing: 0.5,
  },
  itemTextActive: {
    fontWeight: '600',
    color: Colors.white,
  },
});
