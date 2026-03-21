import { useCallback } from "react";
import { View } from "react-native"; // Dodaliśmy View
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as SplashScreen from "expo-splash-screen";
import {
	useFonts,
	Inter_400Regular,
	Inter_500Regular,
	Inter_600SemiBold,
} from "@expo-google-fonts/inter";
import Login from "./screens/Login";
import RegisterScreen from "./screens/Register";

const Stack = createNativeStackNavigator();

SplashScreen.preventAutoHideAsync();

export default function App() {
	const [fontsLoaded, fontError] = useFonts({
		"Inter-Regular": Inter_400Regular,
		"Inter-BolderRegular": Inter_500Regular,
		"Inter-SemiBold": Inter_600SemiBold,
	});

	const onLayoutRootView = useCallback(async () => {
		if (fontsLoaded || fontError) {
			await SplashScreen.hideAsync();
		}
	}, [fontsLoaded, fontError]);

	if (!fontsLoaded && !fontError) {
		return null;
	}

	return (
		<View style={{ flex: 1 }} onLayout={onLayoutRootView}>
			<NavigationContainer>
				<Stack.Navigator
					initialRouteName="Login"
					screenOptions={{ headerShown: false }}
				>
					<Stack.Screen name="Login" component={Login} />
					<Stack.Screen name="Register" component={RegisterScreen} />
				</Stack.Navigator>
			</NavigationContainer>
		</View>
	);
}
