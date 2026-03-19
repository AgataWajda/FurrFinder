import { StyleSheet } from "react-native";
import Colors from "../constants/Colors";

export const globalStyles = StyleSheet.create({
	container: {
		flex: 1,
	},
	innerContainer: {
		flex: 1,
		justifyContent: "center",
		padding: 40,
	},
	title: {
		marginBottom: 5,
		textAlign: "center",
		fontSize: 16,
		fontWeight: "bold",
	},
	subtitle: {
		marginBottom: 15,
		textAlign: "center",
		color: "#282727",
	},
	input: {
		backgroundColor: "rgba(255, 255, 255, 0.2)",
		paddingHorizontal: 15,
		paddingVertical: 12,
		borderRadius: 10,
		color: Colors.white,
		marginBottom: 10,
		borderWidth: 1,
		borderColor: "rgba(255, 255, 255, 0.3)",
	},
	mainButton: {
		backgroundColor: Colors.black,
		padding: 15,
		borderRadius: 10,
		alignItems: "center",
		shadowColor: Colors.black,
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 5,
		elevation: 3,
	},
	buttonText: {
		color: Colors.white,
		fontWeight: "bold",
		fontSize: 16,
	},
});
