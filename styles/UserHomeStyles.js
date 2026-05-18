import { StyleSheet, Platform } from "react-native";
import Colors from "../constants/Colors";

export const userHomeStyles = StyleSheet.create({
	headerContainer: {
		marginTop: 50,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: 20,
		paddingTop: Platform.OS === "ios" ? 50 : 20,
		height: 100,
		backgroundColor: Colors.white,
	},
	title: {
		fontSize: 24,
		fontFamily: "Inter-SemiBold",
		color: Colors.black,
	},
	icon: {
		width: 28,
		height: 28,
		resizeMode: "contain",
	},
});
