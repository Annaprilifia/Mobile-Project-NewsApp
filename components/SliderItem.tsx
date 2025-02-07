import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { NewsDataType } from '@/types';
import Animated, { Extrapolation, interpolate, SharedValue, useAnimatedStyle } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '@/constants/Colors';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Link } from 'expo-router';

type Props = {
  slideItem: NewsDataType;
  index: number;
  scrollX: SharedValue<number>;
};

const { width } = Dimensions.get('screen');

const getFaviconUrl = (sourceUrl: string) => {
  try {
    const url = new URL(sourceUrl);
    return `https://logo.clearbit.com/${url.hostname}`;
  } catch (error) {
    console.warn("Invalid URL for favicon:", sourceUrl);
    return null;
  }
};

const SliderItem = ({ slideItem, index, scrollX }: Props) => {
    const rnStyle = useAnimatedStyle (() => {
        return {
            transform: [
                {
                    translateX: interpolate(
                        scrollX.value,
                        [(index -1) * width, index * width, (index + 1) * width],
                        [-width * 0.15, 0, width * 0.15],
                        Extrapolation.CLAMP
                    ),
                },
                {
                    scale: interpolate(
                        scrollX.value,
                        [(index - 1) * width, index * width, (index + 1) * width],
                        [0.9, 1, 0.9],
                        Extrapolation.CLAMP
                    ),
                },
            ],
        };
    });

  const [faviconUrl, setFaviconUrl] = useState<string | null>(null);

  useEffect(() => {
    if (slideItem.source_icon) {
      setFaviconUrl(slideItem.source_icon);
    } else {
      const faviconFallback = 'https://example.com/default-icon.png'; // Ganti dengan URL ikon default
      const faviconUrl = getFaviconUrl(slideItem.url);

      if (faviconUrl) {
        fetch(faviconUrl)
          .then((response) => {
            if (response.ok && response.headers.get('content-type')?.includes('image')) {
              setFaviconUrl(faviconUrl);
            } else {
              console.warn("Favicon not found, using fallback.");
              setFaviconUrl(faviconFallback);
            }
          })
          .catch((error) => {
            console.error("Failed to fetch favicon:", error);
            setFaviconUrl(faviconFallback);
          });
      } else {
        setFaviconUrl(faviconFallback);
      }
    }
  }, [slideItem.url, slideItem.source_icon]);

  return (
    <Link href={`/news/${slideItem.id}`} asChild>
    <TouchableOpacity>
    <Animated.View 
      style={[styles.itemWrapper, rnStyle]}
    >
      <Image source={{ uri: slideItem.image }} style={styles.image} />
      <LinearGradient colors={["transparent", 'rgba(0,0,0,0.8)']} style={styles.background}>
        <View style={styles.sourceInfo}>
          <Image
            source={{ uri: faviconUrl || 'https://example.com/default-icon.png' }}
            style={styles.sourceIcon}
          />
          <Text style={styles.sourceName}>{slideItem.authors}</Text>
        </View>
        <Text style={styles.title} numberOfLines={2}>{slideItem.title}</Text>
      </LinearGradient>
    </Animated.View>
    </TouchableOpacity>
    </Link>
  );
};

export default SliderItem;

const styles = StyleSheet.create({
  itemWrapper: {
    position: 'relative',
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: width - 60,
    height: 180,
    borderRadius: 20,
  },
  background: {
    position: 'absolute',
    left: 30,
    right: 0,
    top: 0,
    width: width - 60,
    height: 180,
    borderRadius: 20,
    padding: 20,
  },
  sourceIcon: {
    width: 25,
    height: 25,
    borderRadius: 20,
  },
  sourceInfo: {
    flexDirection: 'row',
    position: 'absolute',
    top: 85,
    paddingHorizontal: 20,
    alignItems: 'center',
    gap: 10,
  },
  sourceName: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: '600',
  },
  title: {
    fontSize: 14,
    color: Colors.white,
    position: 'absolute',
    top: 120,
    paddingHorizontal: 20,
    fontWeight: '600',
  },
});
