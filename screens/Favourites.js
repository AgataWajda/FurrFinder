import React from "react";
import { View, Text } from "react-native";
import { globalStyles } from "../styles/GlobalStyles";

export default function LikedAnimalsScreen() {
	return (
		<View
			style={[
				globalStyles.container,
				{ justifyContent: "center", alignItems: "center" },
			]}
		>
			<Text style={globalStyles.title}>Polubione zwierzaki</Text>
			<Text style={globalStyles.subtitle}>Tutaj pojawią się Twoje matche!</Text>
		</View>
	);
}
