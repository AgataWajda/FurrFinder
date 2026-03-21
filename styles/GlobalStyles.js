import { StyleSheet } from "react-native";
import Colors from "../constants/Colors";

export const globalStyles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.white,
	},
	innerContainer: {
		flex: 1,
		justifyContent: "space-between",
		padding: 38,
	},
	title: {
		paddingBottom: 3,
		textAlign: "center",
		fontSize: 16,
		fontFamily: "Inter-SemiBold",
	},
	subtitle: {
		marginBottom: 15,
		textAlign: "center",
		fontSize: 14,
		fontFamily: "Inter-Regular",
	},
	input: {
		height: 40,
		paddingHorizontal: 16,
		paddingVertical: 8,
		borderRadius: 8,
		marginBottom: 16,
		fontFamily: "Inter-Regular",
		fontSize: 14,
		color: Colors.gray,
		borderWidth: 1,
		borderColor: "#E0E0E0",
	},
	mainButton: {
		height: 40,
		backgroundColor: Colors.black,
		borderRadius: 8,
		alignItems: "center",
		justifyContent: "center",
	},
	buttonText: {
		color: Colors.white,
		fontFamily: "Inter-BolderRegular",
		fontSize: 14,
	},
});
