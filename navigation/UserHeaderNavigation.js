import {
	View,
	Text,
	TouchableOpacity,
	Image,
	ActivityIndicator,
} from "react-native";

import { userHomeStyles } from "../styles/UserHomeStyles";

export default function UserHeaderNavigator({ route }) {
	return (
		<View style={userHomeStyles.headerContainer}>
			<TouchableOpacity>
				<Image
					source={require("../assets/icons/menu.png")}
					style={userHomeStyles.icon}
				/>
			</TouchableOpacity>
			<Text style={userHomeStyles.title}>FurrFinder</Text>
			<TouchableOpacity>
				<Image
					source={require("../assets/icons/user.png")}
					style={userHomeStyles.icon}
				/>
			</TouchableOpacity>
		</View>
	);
}
