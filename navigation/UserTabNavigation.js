import React from "react";
import { Image, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import UserHome from "../screens/UserHome";
import LikedAnimalsScreen from "../screens/Favourites";
import FilterAnimalsScreen from "../screens/Filter";
import Colors from "../constants/Colors";

const Tab = createBottomTabNavigator();

export default function UserTabNavigator({ route }) {
	const { userId } = route.params || {};

	return (
		<Tab.Navigator
			screenOptions={({ route }) => ({
				headerShown: false,
				tabBarActiveTintColor: "#C2185B",
				tabBarInactiveTintColor: Colors.gray,
				tabBarStyle: styles.tabBar,
				tabBarLabelStyle: styles.tabBarLabel,
				tabBarIcon: ({ focused, color, size }) => {
					let iconSource;

					if (route.name === "Swipe") {
						iconSource = require("../assets/icons/home.png");
					} else if (route.name === "Polubione") {
						iconSource = require("../assets/icons/heart.png");
					} else if (route.name === "Filtruj") {
						iconSource = require("../assets/icons/settings.png");
					}

					return (
						<Image
							source={iconSource}
							style={[
								styles.tabIcon,
								{ tintColor: focused ? "#D11A5B" : Colors.gray },
							]}
						/>
					);
				},
			})}
		>
			<Tab.Screen
				name="Swipe"
				component={UserHome}
				initialParams={{ userId }}
			/>
			<Tab.Screen
				name="Polubione"
				component={LikedAnimalsScreen}
				initialParams={{ userId }}
			/>
			<Tab.Screen name="Filtruj" component={FilterAnimalsScreen} />
		</Tab.Navigator>
	);
}

const styles = StyleSheet.create({
	tabBar: {
		position: "absolute",
		bottom: 60,
		left: 20,
		right: 20,
		height: 70,
		paddingBottom: 9,
		paddingTop: 15,
		borderTopColor: Colors.gray,
		shadowOpacity: 0,
		shadowOffset: {
			width: 0,
			height: 0,
		},
		shadowRadius: 0,
		elevation: 0,
	},
	tabBarLabel: {
		fontFamily: "Inter-Regular",
		fontSize: 12,
	},
	tabIcon: {
		width: 24,
		height: 24,
		resizeMode: "contain",
	},
});
