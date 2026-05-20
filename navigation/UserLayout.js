import React from "react";
import { View } from "react-native";
import UserHeaderNavigator from "./UserHeaderNavigation";
import UserTabNavigator from "./UserTabNavigation";

export default function UserLayout({ route }) {
	const { userId } = route.params || {};

	return (
		<View style={{ flex: 1 }}>
			<UserHeaderNavigator route={route} />

			<UserTabNavigator route={route} />
		</View>
	);
}
