import { StyleSheet } from "react-native";
import Colors from "../constants/Colors";

export const loginStyles = StyleSheet.create({
	title: {
		textAlign: "center",
		fontSize: 42,
		fontWeight: "bold",
		color: Colors.black,
		marginBottom: 5,
	},
	subtitle: {
		textAlign: "center",
		fontSize: 16,
		color: Colors.black,
		marginBottom: 150,
		opacity: 0.9,
	},
	inputContainer: {
		width: "100%",
		marginBottom: 20,
	},
	dividerContainer: {
		flexDirection: "row",
		alignItems: "center",
		marginVertical: 20,
		width: "100%",
	},
	line: {
		flex: 1,
		height: 1,
		backgroundColor: "#E0E0E0",
	},
	dividerText: {
		marginHorizontal: 10,
		color: "#999",
		fontSize: 14,
	},
	registerButton: {
		backgroundColor: "#e6e6e6",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		gap: 5,
		padding: 15,
		borderRadius: 12,
		marginBottom: 15,
		width: "100%",
	},
	withShadow: {
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.08,
		shadowRadius: 4,
		elevation: 3,
	},
	registerText: {
		textAlign: "center",
		color: Colors.darkGray,
	},
});
