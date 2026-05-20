import React from "react";
import { View, Text } from "react-native";
import { globalStyles } from "../styles/GlobalStyles";

export default function FilterAnimalsScreen() {
	return (
		<View
			style={[
				globalStyles.container,
				{ justifyContent: "center", alignItems: "center" },
			]}
		>
			<Text style={globalStyles.title}>Filtruj ogłoszenia</Text>
			<Text style={globalStyles.subtitle}>
				Dostosuj odległość, wiek i rasę.
			</Text>
		</View>
	);
}
