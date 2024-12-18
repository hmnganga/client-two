import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  TextInput,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Pressable,
  Alert,
  Modal,
  KeyboardAvoidingView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { EvilIcons, Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { CheckBox } from "@rneui/base";
import { Input } from "@rneui/themed";
import { Space } from "./components";
import { colors } from "./config";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const Layout = () => {
  const [prevModifires, setPrevModifires] = useState([]);
  const [isSubmitting, setisSubmitting] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const getPrevMofifires = () => {
    axios
      .get(`http://localhost:1337/api/modifiers/40`)
      .then((res) => {
        const {
          data: {
            attributes: { modifierChild },
          },
        } = res.data;
        setPrevModifires(modifierChild);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getPrevMofifires();
  }, []);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}></View>
      <View style={styles.title}>
        <Text style={{ fontSize: 18, fontWeight: "600" }}>Title</Text>
        <Space width={10} />
        <View style={{ width: windowWidth / 1.3 }}>
          <Input
            placeholder="Choice of Spice"
            onChangeText={(text) => this.setState({ choice: text })}
          />
        </View>
      </View>
      <View style={styles.question}>
        <Text style={{ fontSize: 18, fontWeight: "600" }}>
          How many items can the customer choose?
        </Text>
        <Space width={70} />

        <View style={{ width: windowWidth / 12 }}>
          <TextInput
            placeholder="1"
            style={styles.numberInput}
            // onChangeText={(text) => this.setState({ numerTo: text })}
            placeholderTextColor="black"
            keyboardType="number-pad"
          />
        </View>
      </View>
      <View style={styles.requied}>
        <CheckBox
          checked={true}
          checkedColor="#0F0"
          checkedTitle="Required"
          containerStyle={{ width: "40%" }}
          size={30}
          textStyle={{}}
          title="Required"
          titleProps={{}}
          uncheckedColor="#F00"
        />
        <CheckBox
          checked={true}
          checkedColor="#0F0"
          checkedTitle="Optional"
          containerStyle={{ width: "40%" }}
          size={30}
          textStyle={{}}
          title="Optional"
          titleProps={{}}
          uncheckedColor="#F00"
        />
      </View>
      <View style={styles.available}>
        <ScrollView
          style={{}}
          showsVerticalScrollIndicator={true}
          showsHorizontalScrollIndicator={true}
          indicatorStyle={{ colors: "#000" }}
        >
          {prevModifires?.map((item, i) => (
            <View
              style={{
                justifyContent: "center",
                alignContent: "center",
                alignItems: "center",
              }}
            >
              <View style={styles.layout}>
                <View
                  style={{
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexDirection: "row",
                    //  marginTop: 15,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                      alignContent: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 20,
                        // fontWeight: "bold",
                        marginLeft: 10,
                        color: "black",
                      }}
                    >
                      {item.meta_name}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                      alignContent: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 20,
                        // fontWeight: "bold",
                        marginLeft: 10,
                        color: "black",
                      }}
                    >
                      KSH {item.meta_value}
                    </Text>
                    <View style={{ marginRight: 20, marginLeft: 20 }}>
                      <EvilIcons name="trash" size={30} color="black" />
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexDirection: "row",
                    marginTop: 6,
                  }}
                ></View>
              </View>
              <View
                style={{ margin: 6, backgroundColor: "rgba(39, 39, 39, 1)" }}
              ></View>
            </View>
          ))}
        </ScrollView>
      </View>
      <View style={styles.add}>
        <TouchableOpacity
          style={{ flexDirection: "row", alignItems: "center" }}
          onPress={() => setModalVisible(true)}
        >
          <Ionicons name="add-sharp" size={28} color="#2196F3" />
          <Text style={{ color: "#2196F3", fontSize: 18 }}>
            ADD ANOTHER ITEM
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.savecancel}>
        <View
          style={{
            alignSelf: "flex-end",
            marginRight: 50,
            flexDirection: "row",
          }}
        >
          <Pressable
            onPress={() => this.props.navigation.goBack()}
            style={{
              backgroundColor: colors.dark_gray,
              padding: 20,
              alignItems: "center",
              marginLeft: 10,
              marginRight: 10,
              borderRadius: 4,
              marginBottom: "auto",
              padding: 10,
              elevation: 2,
              width: 120,
              height: 60,
              justifyContent: "center",
            }}
          >
            <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>
              CANCEL
            </Text>
          </Pressable>
          {isSubmitting === false ? (
            <Pressable
              onPress={() => check()}
              style={{
                backgroundColor: colors.slate,
                padding: 20,
                alignItems: "center",
                marginLeft: 10,
                marginRight: 10,
                borderRadius: 4,
                marginBottom: "auto",
                padding: 10,
                elevation: 2,
                width: 120,
                height: 60,
                justifyContent: "center",
              }}
            >
              <Text
                style={{ color: "white", fontSize: 20, fontWeight: "bold" }}
              >
                SAVE
              </Text>
            </Pressable>
          ) : (
            <Pressable
              style={{
                backgroundColor: colors.slate,
                padding: 20,
                alignItems: "center",
                marginLeft: 10,
                marginRight: 10,
                borderRadius: 4,
                marginBottom: "auto",
                padding: 10,
                elevation: 2,
                width: 120,
                height: 60,
                justifyContent: "center",
              }}
            >
              <ActivityIndicator color="white" size="large" />
            </Pressable>
          )}
        </View>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text
              style={{
                marginTop: 10,
                fontSize: 20,
                color: colors.slate,

                fontWeight: "600",
              }}
            >
              New Item
            </Text>

            <View style={styles.newinput}>
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexDirection: "row",
                  //  marginTop: 15,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    alignContent: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 20,
                      marginLeft: 10,
                      color: "black",
                    }}
                  >
                    Name
                  </Text>
                  <TextInput
                    style={{
                      height: 40,
                      width: windowWidth / 5,

                      margin: 12,
                      borderBottomWidth: 1,
                      padding: 10,
                    }}
                    placeholder="Name"
                    textAlign="left"
                  />
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    alignContent: "center",
                    marginTop: 4,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 20,
                      marginLeft: 10,
                      color: "black",
                    }}
                  >
                    KSH
                  </Text>
                  <TextInput
                    style={{
                      height: 40,
                      width: windowWidth / 16,
                      borderWidth: 1,

                      margin: 12,
                      borderBottomWidth: 1,
                      padding: 10,
                    }}
                    placeholder="0"
                    textAlign="center"
                    keyboardAppearance="default"
                    keyboardType="number-pad"
                  />
                  <View style={{ marginRight: 20, marginLeft: 20 }}>
                    <EvilIcons name="trash" size={30} color="black" />
                  </View>
                </View>
              </View>
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexDirection: "row",
                  marginTop: 6,
                }}
              ></View>
            </View>
            <View style={{ marginLeft: 35 }}>
              <Text
                style={{
                  marginTop: 10,
                  fontSize: 20,
                  color: colors.slate,
                  fontWeight: "600",
                }}
              >
                SAVE
              </Text>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Layout;

const styles = StyleSheet.create({
  safe: { flex: 1 },
  header: { flex: 0.07 },
  title: {
    flex: 0.06,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  question: {
    flex: 0.08,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  requied: {
    flex: 0.13,
    backgroundColor: "pink",
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  available: {
    flex: 0.52,
    // backgroundColor: "yellow",
  },
  add: {
    flex: 0.05,
    justifyContent: "center",
    alignItems: "center",
  },
  savecancel: {
    flex: 0.09,
    justifyContent: "center",
  },
  layout: {
    backgroundColor: "white",
    shadowColor: "#000",

    shadowOffset: {
      width: 0,
      height: 2,
    },
    borderRadius: 8,

    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: windowWidth / 2,
    height: 50,
    justifyContent: "center",
    alignContent: "center",
  },
  input: {
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    borderRadius: 8,
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: windowWidth / 2,
    height: 50,
    justifyContent: "center",
    alignContent: "center",
  },
  newinput: {
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    borderRadius: 8,
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: windowWidth / 1.8,
    height: 50,
    justifyContent: "center",
    alignContent: "center",
  },
  numberInput: {
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    borderRadius: 2,
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    height: 40,
    margin: 12,
    borderWidth: 1,
    //padding: 10,
    textAlign: "center",
  },
  centeredView: {
    //flex: 1,
    justifyContent: "center",
    //alignItems: "center",
    marginTop: 120,
    backgroundColor: "white",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    height: 100,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    flexDirection: "row",
    justifyContent: "space-around",
    alignContent: "center",
  },
});
