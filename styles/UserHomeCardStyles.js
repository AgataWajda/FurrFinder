import { StyleSheet, Dimensions } from "react-native";
import Colors from "../constants/Colors";

const { height } = Dimensions.get("window");

export const styles = StyleSheet.create({
	cardWrapper: {
		height: height * 0.6,
		borderRadius: 20,
		backgroundColor: Colors.white,
		elevation: 5, // Cień dla Androida
		shadowColor: "#000", // Cienie dla iOS
		shadowOffset: { width: 0, height: 10 },
		shadowOpacity: 0.15,
		shadowRadius: 10,
		overflow: "hidden",
	},
	cardImage: {
		width: "100%",
		height: "100%",
		resizeMode: "cover",
	},
	infoOverlay: {
		position: "absolute",
		bottom: 0,
		left: 0,
		right: 0,
		padding: 20,
		backgroundColor: "rgba(0, 0, 0, 0.35)",
	},
	animalName: {
		color: Colors.white,
		fontSize: 26,
		fontFamily: "Inter-SemiBold",
	},
	animalBreed: {
		color: Colors.white,
		fontSize: 16,
		fontFamily: "Inter-Regular",
		opacity: 0.9,
	},
});
