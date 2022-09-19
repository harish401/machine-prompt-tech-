import React, { useEffect, useState } from "react";

import {
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import {
  Box,
  Text,
  Heading,
  VStack,
  FormControl,
  Input,
  Link,
  HStack,
  Center,
  NativeBaseProvider,
  Icon,
} from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { MaterialIcons } from "@expo/vector-icons";
import { Button } from "react-native-paper";
function Profile({ navigation }) {
  const [text, onChangeText] = useState("");

  const [password, onChangeText2] = useState("");

  const [show, setShow] = useState(false);

  const Login = () => {
    var data = {
      email: text,
      password: password,
    };

    var requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };

    fetch(
      "https://betatask-admin.prompttechdemohosting.com/api/login",
      requestOptions
    )
      .then((response) => response.json())
      .then((responseJson) => {
        // storeData(responseJson.token)
        if (responseJson.token === undefined) {
          alert("Invalid email or password");
        } else {
          navigation.navigate("HomeTabs");
        }
      })
      .catch((error) => {
        console.error(error);
      });
    onChangeText("");
    onChangeText2("");
  };
  // const storeData = async (value) => {
  //   try {
  //     await AsyncStorage.setItem("TASK", JSON.stringify(value));
  //   } catch (e) {
  //     // saving error
  //   }
  // };

  return (
    <SafeAreaView
      style={{
        marginTop: 80,
        flex: 1,
        padding: 25,
      }}
    >
      <NativeBaseProvider>
        <View
          style={{
            justifyContent: "center",
            flexDirection: "column",

            marginTop: 80,

            flex: 1,
          }}
        >
          <View
            style={{
              justifyContent: "flex-start",
              paddingBottom: 20,
              alignItems: "flex-start",
            }}
          >
            <Heading
              size="lg"
              fontWeight="600"
              color="coolGray.800"
              _dark={{
                color: "warmGray.50",
              }}
            >
              <Heading
                letterSpacing="2xl"
                size="2xl"
                fontWeight="600"
                color="indigo.600"
                _dark={{
                  color: "warmGray.50",
                }}
              >
                Hi
              </Heading>
            </Heading>
            <Heading
              mt="1"
              _dark={{
                color: "warmGray.200",
              }}
              color="coolGray.600"
              fontWeight="medium"
              size="md"
            >
              Login Here
            </Heading>
          </View>

          <FormControl>
            <Input
              pb="3"
              placeholder="Email"
              onChangeText={onChangeText}
              value={text}
              placeholderTextColor="black"
            />
          </FormControl>
          <FormControl mt="4">
            <Input
              pb="3"
              placeholder="Password"
              onChangeText={onChangeText2}
              value={password}
              placeholderTextColor="black"
              type={show ? "text" : "password"}
              InputRightElement={
                <Icon
                  as={
                    <MaterialIcons
                      name={show ? "visibility" : "visibility-off"}
                    />
                  }
                  size={5}
                  mr="2"
                  color="muted.400"
                  onPress={() => setShow(!show)}
                />
              }
            />
          </FormControl>
          <View style={{ marginTop: 20 }}>
            <Button
              onPress={() => {
                Login();
              }}
              mode="contained"
            >
              Login
            </Button>
          </View>
        </View>
      </NativeBaseProvider>
    </SafeAreaView>
  );
}

export default Profile;
