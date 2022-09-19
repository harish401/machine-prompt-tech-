

import React, { useEffect, Component,useState, } from "react";

import { NavigationContainer, useNavigation} from "@react-navigation/native";

import Home from "./Home";
import { createNativeStackNavigator, } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

import Profile from "./Profile.js";
import News from "./News"
import Calender from "./Calender";
import Notifications from "./Notifications";

const Tab = createBottomTabNavigator();


function HomeTabs() {
 
  
  return (
    <Tab.Navigator
   
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: "#007bff",
          tabBarInactiveTintColor: "silver",
          tabBarStyle: [
            {
              display: "flex",
            },
            null,
          ],
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = "md-home-sharp";
            } else if (route.name === "News") {
              iconName = "md-newspaper";
            } 
            else if (route.name === "Calender") {
              iconName = "options";
            } 
            else if (route.name === "Notifications") {
              iconName = "notifications";
            } 

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}>
     
      <Tab.Screen name="Home" component={Home}  options={{
        
            headerShown: false,
            

          }}
            />
      <Tab.Screen name="News" component={News} options={{
   
            backBehavior: "history",
            headerShown: false}}
             />
              
             <Tab.Screen name="Notifications" component={Notifications} options={{
         tabBarBadge: "",
         tabBarBadgeStyle:{backgroundColor:"#007bff",},
            backBehavior: "history",
            headerShown: true}}
             />
             <Tab.Screen name="Calender" component={Calender} options={{
 headerShown: true,
            backBehavior: "history",
           }}
             />
    </Tab.Navigator>
  );
}

const Stack = createNativeStackNavigator();

function App() {
 

  
  
  return (
    <NavigationContainer>
      
    <Stack.Navigator>
      
     
      <Stack.Screen name="Profile" component={Profile} options={{
          backBehavior: "history",
            headerShown: false}} />
      <Stack.Screen name="HomeTabs" component={HomeTabs} options={{
            backBehavior: "history",
            headerShown: false,
            headerStyle: {
              backgroundColor: "white",
            },
          }}
            />
      
 
    </Stack.Navigator>
   
    </NavigationContainer>
  
  );
}

export default App;