import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import NewOrders from "../HomeScreens/NewOrders";
import OrdersInProgress from "../HomeScreens/OrdersInProgress";
import SettingScreen from "../HomeScreens/Settings";
import OrderHistoryScreen from "../HomeScreens/OrderHistory";
import { createStackNavigator } from "@react-navigation/stack";
import ReadyForPickUp from "../HomeScreens/ReadyForPickUp";
import EditName from "../Edit/EditName";
import { Dimensions, View, TouchableWithoutFeedback } from "react-native";
import {
  MaterialCommunityIcons,
  Feather,
  FontAwesome5,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import DetailedOrder from "../StackScreens/DetailedOrder";
import InProgressDetailed from "../StackScreens/InProgressDetailed";
import CreateACartegory from "../Settings/CreateACartegory";
import CreateNewDish from "../Settings/CreateNewDish";
import Help from "../Settings/Help";
import Settings from "../Settings/Settings";
import SpecialOffers from "../Settings/SpecialOffers";
import ItemList from "../Settings/ItemList";
import Cartegories from "../Settings/Cartegories";
import CreateNewOffer from "../Settings/CreateNewOffer";
import ChatScreen from "../Chat";
import ChartList from "../Chat/ChartList";
import { useSelector } from "react-redux";
import Login from "../Auth/Login";
import ReadyForPickUpDetailed from "../StackScreens/ReadyForPickUpDetailed";
import Delivering from "../HomeScreens/Delivering";
import DeliveringDetailed from "../StackScreens/DeliveringDetailed";
import EditDish from "../Settings/EditDish";
import EditCartegory from "../Settings/EditCartegory";

function DrawerNav({ navigation }) {
  const windowWidth = Dimensions.get("window").width;
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator
      id="LeftDrawer"
      screenOptions={{
        headerLeft: false,
        headerRight: () => (
          <View style={{ marginRight: 20 }}>
            <TouchableWithoutFeedback
              onPress={() => navigation.navigate("chartList")}
            >
              <Ionicons
                name="ios-chatbubble-ellipses-sharp"
                size={30}
                color="#5cb1ff"
              />
            </TouchableWithoutFeedback>
          </View>
        ),

        drawerType: "permanent",
        drawerPosition: "left",
        headerShown: false,
        drawerContentContainerStyle: {
          marginTop: 100,
          justifyContent: "center",
          alignContent: "space-around",
          //alignItems: "center",
        },

        drawerContentStyle: {
          // backgroundColor: "#279eff",
          // backgroundColor: "#6e6eff",
          backgroundColor: "white",
        },

        drawerStyle: {
          // backgroundColor: "indigo",
          width: windowWidth / 12,
        },
      }}
      initialRouteName="entry"
    >
      <Drawer.Screen
        options={{
          headerShown: true,
          title: "",
          drawerIcon: ({ focused }) => (
            <MaterialIcons
              name="fiber-new"
              size={50}
              color={focused ? "#5cb1ff" : "rgba(39, 39, 39, 1)"}
            />
          ),
        }}
        name="New Orders"
        component={NewOrders}
      />
      <Drawer.Screen
        options={{
          // title: "",
          headerShown: true,

          drawerIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="progress-clock"
              size={50}
              color={focused ? "#5cb1ff" : "rgba(39, 39, 39, 1)"}
            />
          ),
        }}
        name="Orders in progress"
        component={OrdersInProgress}
      />
      <Drawer.Screen
        options={{
          title: "Ready For Pickup",
          headerShown: true,

          drawerIcon: ({ focused }) => (
            <MaterialIcons
              name="done-outline"
              size={50}
              color={focused ? "#5cb1ff" : "rgba(39, 39, 39, 1)"}
            />
          ),
        }}
        name="Order Ready For PickUp"
        component={ReadyForPickUp}
      />
      <Drawer.Screen
        options={{
          title: "",
          headerShown: true,

          drawerIcon: ({ focused }) => (
            <MaterialIcons
              name="delivery-dining"
              size={50}
              color={focused ? "#5cb1ff" : "rgba(39, 39, 39, 1)"}
            />
          ),
        }}
        name="delivering"
        component={Delivering}
      />
      <Drawer.Screen
        options={{
          title: "",
          headerShown: true,

          drawerIcon: ({ focused }) => (
            <FontAwesome5
              name="history"
              size={50}
              color={focused ? "#5cb1ff" : "rgba(39, 39, 39, 1)"}
            />
          ),
        }}
        name="Order History"
        component={OrderHistoryScreen}
      />
      <Drawer.Screen
        options={{
          title: "",
          headerShown: true,

          drawerIcon: ({ focused }) => (
            <Feather
              name="settings"
              size={50}
              color={focused ? "#5cb1ff" : "rgba(39, 39, 39, 1)"}
            />
          ),
        }}
        name="Settings"
        component={SettingScreen}
      />
    </Drawer.Navigator>
  );
}

export default function StackNav() {
  const Stack = createStackNavigator();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          animationTypeForReplace: "pop",
        }}
      >
        {isLoggedIn ? (
          <>
            <Stack.Screen
              name="draw"
              component={DrawerNav}
              options={{
                headerShown: false,
                animationTypeForReplace: "pop",
                title: "Home",
              }}
            />
            <Stack.Screen
              name="edit"
              component={EditName}
              options={{ headerShown: false, animationTypeForReplace: "pop" }}
            />
            <Stack.Screen
              name="detailedOrder"
              component={DetailedOrder}
              options={{ animationTypeForReplace: "pop", title: "New order" }}
            />
            <Stack.Screen
              name="inProgressDetailed"
              component={InProgressDetailed}
              options={{
                animationTypeForReplace: "pop",
                title: "Orders In Progress",
              }}
            />
            <Stack.Screen
              name="cartegories"
              component={Cartegories}
              options={({ navigation }) => ({
                animationTypeForReplace: "pop",
                //headerShown: false,
                title: "Cartegories",
                headerRight: () => (
                  <View
                    style={{
                      alignItems: "stretch",
                      flexDirection: "row",
                      backgroundColor: "#dcffee",
                      marginRight: 16,
                    }}
                  >
                    <Ionicons
                      name="search"
                      size={28}
                      color="black"
                      style={{
                        marginRight: 30,
                        padding: 10,
                      }}
                    />
                    <TouchableWithoutFeedback
                      onPress={() => navigation.navigate("createACartegory")}
                    >
                      <Ionicons
                        name="add-sharp"
                        size={40}
                        color="black"
                        style={{
                          justifyContent: "center",
                          alignContent: "center",
                          alignItems: "center",
                          paddingTop: 4,
                          padding: 8,
                        }}
                      />
                    </TouchableWithoutFeedback>
                  </View>
                ),
              })}
            />
            <Stack.Screen
              name="createACartegory"
              component={CreateACartegory}
              options={{
                animationTypeForReplace: "pop",
                title: "New Cartegory",
              }}
            />
            <Stack.Screen
              name="editCartegory"
              component={EditCartegory}
              options={{
                animationTypeForReplace: "pop",
                title: "Edit Cartegory",
              }}
            />
            <Stack.Screen
              name="createNewDish"
              component={CreateNewDish}
              options={{
                animationTypeForReplace: "pop",
                title: "New Item",
              }}
            />
            <Stack.Screen
              name="editDish"
              component={EditDish}
              options={{
                animationTypeForReplace: "pop",
                title: "Edit Item",
              }}
            />
            <Stack.Screen
              name="itemList"
              component={ItemList}
              options={({ navigation }) => ({
                animationTypeForReplace: "pop",
                //headerShown: false,
                title: "Available Items",
                headerRight: () => (
                  <View
                    style={{
                      alignItems: "stretch",
                      flexDirection: "row",
                      backgroundColor: "#dcffee",
                      marginRight: 16,
                    }}
                  >
                    <Ionicons
                      name="search"
                      size={28}
                      color="black"
                      style={{
                        marginRight: 30,
                        padding: 10,
                      }}
                    />
                    <TouchableWithoutFeedback
                      onPress={() => navigation.navigate("createNewDish")}
                    >
                      <Ionicons
                        name="add-sharp"
                        size={40}
                        color="black"
                        style={{
                          justifyContent: "center",
                          alignContent: "center",
                          alignItems: "center",
                          paddingTop: 4,
                          padding: 8,
                        }}
                      />
                    </TouchableWithoutFeedback>
                  </View>
                ),
              })}
            />
            <Stack.Screen
              name="help"
              component={Help}
              options={{
                animationTypeForReplace: "pop",
                title: "Help",
              }}
            />
            <Stack.Screen
              name="settings"
              component={Settings}
              options={{
                animationTypeForReplace: "pop",
                title: "Settings",
              }}
            />
            <Stack.Screen
              name="specialOffers"
              component={SpecialOffers}
              options={({ navigation }) => ({
                animationTypeForReplace: "pop",
                //headerShown: false,
                title: "Special Offers",
                headerRight: () => (
                  <View
                    style={{
                      alignItems: "stretch",
                      flexDirection: "row",
                      backgroundColor: "#dcffee",
                      marginRight: 16,
                    }}
                  >
                    <Ionicons
                      name="search"
                      size={28}
                      color="black"
                      style={{
                        marginRight: 30,
                        padding: 10,
                      }}
                    />
                    <TouchableWithoutFeedback
                      onPress={() => navigation.navigate("createNewOffer")}
                    >
                      <Ionicons
                        name="add-sharp"
                        size={40}
                        color="black"
                        style={{
                          justifyContent: "center",
                          alignContent: "center",
                          alignItems: "center",
                          paddingTop: 4,
                          padding: 8,
                        }}
                      />
                    </TouchableWithoutFeedback>
                  </View>
                ),
              })}
            />
            <Stack.Screen
              name="createNewOffer"
              component={CreateNewOffer}
              options={{
                animationTypeForReplace: "pop",
                title: "New Special Offer",
              }}
            />
            <Stack.Screen
              name="chartList"
              component={ChartList}
              options={{
                headerShown: true,
                animationTypeForReplace: "pop",
                title: "Messages",
              }}
            />
            <Stack.Screen
              name="chatScreen"
              component={ChatScreen}
              options={{
                animationTypeForReplace: "pop",
                title: "UsernameProps",
              }}
            />
            <Stack.Screen
              name="readyForPickUpDetailed"
              component={ReadyForPickUpDetailed}
              options={{
                animationTypeForReplace: "pop",
                title: "Ready",
              }}
            />
            <Stack.Screen
              name="deliveringDetailed"
              component={DeliveringDetailed}
              options={{
                animationTypeForReplace: "pop",
                title: "Ready",
              }}
            />
          </>
        ) : (
          <Stack.Screen
            options={{ headerShown: false }}
            name="login"
            component={Login}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
