import React, { useState, useEffect, useCallback } from "react";
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  StatusBar,
  Keyboard,
  KeyboardAvoidingView,
ScrollView,

  Modal,
} from "react-native";

import Icon from "react-native-vector-icons/Entypo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {  Searchbar, TextInput } from "react-native-paper";
import { FAB, Button } from "react-native-paper";
import Ionicons from "react-native-vector-icons/Ionicons";

import { AntDesign, FontAwesome } from "@expo/vector-icons";

function Home ({ navigation })  {
  // const [filteredDataSource, setFilteredDataSource] = useState([]);

  const [todos, setTodos] = useState([]);
  const [textInput, setTextInput] = useState("");
  const [search, setSearch] = useState("");

  // field in api but which in post method  for standard listitem call mostly as get method but in api it is post method
  // const [title, setTitle] = useState("");

   
  useEffect(() => {
   
    getItem();
    saveItem(todos);
    
  }, []);


//  if you want search please unhide
  //  const searchFilterFunction = (text) => {
  //   if (text) {
  //     const newData = todos.filter(function (item) {
  //       const itemData = item.task ? item.task.toUpperCase() : "".toUpperCase();
  //       const textData = text.toUpperCase();
  //       return itemData.indexOf(textData) > -1;
  //     });
  //     setFilteredDataSource(newData);
  //     setSearch(text);
  //   } else {
  //     setFilteredDataSource(todos);
  //     setSearch(text);
  //   }
  // };


  // post method for call list why i didn't used mention in mail
  // const UpdateFamily = () => {

  //   var data = {
  //     name: textInput,

  // }

  //   var requestOptions = {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(data),

  //   };

  //   fetch("https://betatask-admin.prompttechdemohosting.com/api/create/task", requestOptions)
  //   .then((response) => response.json())
  //   .then((responseJson) => {
  //     alert(JSON.stringify(responseJson.name))
  //     setTitle(responseJson)

  //   })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // };

  const addItem = () => {
    Keyboard.dismiss();
    if (textInput == "") {
      Alert.alert("Error", "Please write something");
    } else {
      const newData = {
        id: Math.random(),
        task: textInput,
        completed: false,
      };
      setTodos([...todos, newData]);
      setTextInput("");
      saveItem([...todos, newData]);
    }
  };

  const saveItem = async (todos) => {
    try {
      const stringifyTodos = JSON.stringify(todos);
      await AsyncStorage.setItem("todos", stringifyTodos);
    } catch (error) {
      console.log(error);
    }
  };

  const getItem = async () => {
    try {
      const getData = await AsyncStorage.getItem("todos");
      if (getData != null) {
        setTodos(JSON.parse(getData));
        // whole data to searchfunction
        // setFilteredDataSource(JSON.parse(getData));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const markTodoComplete = (todoId) => {
    const newTodosItem = todos.map((item) => {
      if (item.id == todoId) {
        return { ...item, completed: true };
      }
      return item;
    });
    setTodos(newTodosItem);
  };
  const deleteTodo = (todoId) => {
    const newTodosItem = todos.filter((item) => item.id != todoId);
    Alert.alert("Confirm", "Delete this task?", [
      {
        text: "Yes",
        onPress: () => {
          setTodos(newTodosItem);
          saveItem(newTodosItem);
        },
      },
      {
        text: "No",
      },
    ]);
  };
  const ListEmptyComponent = () => {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          padding: 20,
        }}
      >
        <Text style={{ fontSize: 15, fontWeight: "700", color: "red" }}>
     Add Items to display
        </Text>
      </View>
    );
  };

  const ListItem = ({ todo }) => {
    return (
    
        <View
          style={{
            backgroundColor: "white",
            flexDirection: "row",
            marginBottom: 10,
            borderRadius: 10,
            padding: 10,
          }}
        >
          {!todo?.completed && (
            <TouchableOpacity
              onPress={() => {
                markTodoComplete(todo.id);
              }}
            >
              <FontAwesome
                name="check-square"
                size={25}
                style={{ marginTop: 5 }}
                color="#007bff"
              />
            </TouchableOpacity>
          )}

          <View style={{ flex: 1, padding: 10 }}>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 14,
                color: "black",
                textDecorationLine: todo?.completed ? "line-through" : "none",
              }}
            >
              {todo?.task}
            </Text>
          </View>
          {todo?.completed && (
            <TouchableOpacity onPress={() => deleteTodo(todo.id)}>
              <Ionicons name="trash" size={25} color="#07b6ff" />
            </TouchableOpacity>
          )}
          <Icon name="dots-three-vertical" size={25} color="silver"></Icon>
        </View>
   
    );
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#E8EAED",
        paddingBottom: 5,
      }}
    >
      <StatusBar backgroundColor="black" barStyle="light-content" />

      <View style={{padding:5}}>
        <Searchbar style={{backgroundColor:'#E8EAED'}}
          value={search}
          placeholderTextColor="#007bff"
          onChangeText={setSearch}
          // onChangeText={searchFilterFunction}
        />
      </View>

      <View
        style={{
          padding: 3,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 27,
            color: "#007bff",
            paddingLeft: 10,
          }}
        >
          Task
        </Text>
      </View>
      <ScrollView >
      <View>
        <FlatList
          contentContainerStyle={{ padding: 10 }}
          data={todos.sort((a, b) => a.task.localeCompare(b.task))}
          renderItem={({ item }) => <ListItem todo={item} />}
          ListEmptyComponent={ListEmptyComponent}
      
        />
      </View>
      </ScrollView>

      <View
        style={{
          flexDirection: "row",
          flex: 1,
          justifyContent: "flex-end",
          alignItems: "flex-end",
          position: "absolute",
          bottom: 0,
          right: 0,
        }}
      >
        <View style={{ flex: 1, padding: 10 }}>
          <KeyboardAvoidingView behavior={"height"}>
            <TextInput
              value={textInput}
              placeholder="Enter your Task"
              placeholderTextColor="silver"
              onChangeText={(text) => setTextInput(text)}
              mode="outlined"
              activeoutlineColor="white"
              dense="true"
              selectionColor="black"
              theme={{
                colors: {
                  primary: "silver",
                  underlineColor: "transparent",
                  borderWidth: 0.2,
                },
              }}
            />
          </KeyboardAvoidingView>
        </View>

        <TouchableOpacity
          style={{ marginBottom: 5, padding: 5 }}
          activeOpacity={0.7}
          onPress={()=>addItem()}
        >
          <FAB
            small
            style={{
              backgroundColor: "#007bff",
            }}
            icon="plus"
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Home;
