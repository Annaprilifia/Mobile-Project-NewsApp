import React from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Tabs } from 'expo-router'
import { TabBar } from '@/components/TabBar'

const TabLayout = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Tabs tabBar={(props) => <TabBar {...props} />} screenOptions={{headerShown: false}}>
        <Tabs.Screen name="index" options={{ title: "Home" }} />
        <Tabs.Screen name="discover" options={{ title: "Discover" }} />
        <Tabs.Screen name="saved" options={{ title: "Saved" }} />
        <Tabs.Screen name="settings" options={{ title: "Settings" }} />
      </Tabs>
    </GestureHandlerRootView>
  )
}

export default TabLayout
