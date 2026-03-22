import { StyleSheet } from "react-native";
import Colors from "../constants/Colors";

export const loginStyles = StyleSheet.create({
	title: {
		marginTop: 132,
		textAlign: "center",
		fontSize: 36,
		fontFamily: "Inter-SemiBold",
		color: Colors.black,
	},
	subtitle: {
		textAlign: "center",
		fontSize: 14,
		fontFamily: "Inter-Regular",
		color: Colors.black,
		opacity: 0.9,
	},

	mainPanel: {
		paddingBottom: 97,
	},

	inputContainer: {
		width: "100%",
		marginTop: 24,
		marginBottom: 20,
	},
	dividerContainer: {
		flexDirection: "row",
		alignItems: "center",
		marginVertical: 24,
		width: "100%",
	},
	line: {
		flex: 1,
		height: 1,
		backgroundColor: "#E6E6E6",
	},
	dividerText: {
		marginHorizontal: 10,
		color: Colors.gray,
		fontFamily: "Inter-Regular",
		fontSize: 14,
	},
	registerButton: {
		height: 40,
		backgroundColor: "#EEEEEE",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		gap: 8,
		borderRadius: 12,
		marginBottom: 8,
		width: "100%",
	},
	withShadow: {
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 4,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 8,
	},
	registerText: {
		textAlign: "center",
		fontFamily: "Inter-BolderRegular",
		fontSize: 14,
		color: Colors.black,
	},

	icon: {
		width: 20,
		height: 20,
	},
});
