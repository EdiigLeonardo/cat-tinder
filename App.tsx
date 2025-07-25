import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import CatsScreen from "containers/CatsScreen";
import MessagesScreen from "containers/MessagesScreen";
import ProfileScreen from "containers/ProfileScreen";
import { SafeAreaView, View } from "react-native";
import { scale, verticalScale } from "scaling";
import { transform } from "@babel/core";
import FavoritesScreen from "containers/Favorites";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <SafeAreaView
      style={{
        height: scale(615),
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: "#fdfbfd",
        marginTop: scale(20),
      }}
    >
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }: { route: { name: string } }) => ({
            headerShown: false,
            tabBarShowLabel: false,
            tabBarStyle: {
              display: "flex",
              backgroundColor: "#fdfbfd",
              justifyContent: "center",
              alignItems: "center",
              alignSelf: "center",
              borderRadius: scale(20),
              height: scale(40),
              width: "50%",
              elevation: 5,
              bottom: verticalScale(50),
              textAlign: "center",
              marginBottom: verticalScale(5),
            },
            tabBarIcon: ({
              focused,
              color,
              size,
            }: {
              focused: boolean;
              color: string;
              size: number;
            }) => {
              let iconName;
              if (route.name === "Cats")
                iconName = focused ? "paw" : "paw-outline";
              else if (route.name === "Messages")
                iconName = focused ? "chatbubble" : "chatbubble-outline";
              else iconName = focused ? "person" : "person-outline";

              return (
                <View
                  style={{
                    width: "100%",
                    height: scale(60),
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Ionicons
                    name={iconName as any}
                    size={scale(25)}
                    color={focused ? "#FF5E5E" : "gray"}
                  />
                </View>
              );
            },
          })}
        >
          <Tab.Screen name="Cats" component={CatsScreen} />
          <Tab.Screen name="Messages" component={MessagesScreen} />
          <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}
