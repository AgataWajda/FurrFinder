import React, { useState } from "react";
import {
	StyleSheet,
	Text,
	View,
	TextInput,
	TouchableOpacity,
	KeyboardAvoidingView,
	Platform,
} from "react-native";

import { FontAwesome5 } from "@expo/vector-icons";
import { globalStyles } from "../styles/GlobalStyles";
import { loginStyles } from "../styles/LoginStyles";

export default function LoginScreen({ navigation }) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleLogin = () => {
		console.log("Logowanie dla:", email);
		// Place to add Firebase logic
	};

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === "ios" ? "padding" : "height"}
			style={globalStyles.container}
		>
			<View style={globalStyles.innerContainer}>
				<Text style={loginStyles.title}>FurrFinder</Text>
				<Text style={loginStyles.subtitle}>Znajdź swojego przyjaciela</Text>

				<View style={globalStyles.inputContainer}>
					<Text style={globalStyles.title}>Zaloguj się</Text>
					<Text style={globalStyles.subtitle}>
						Wpisz E-mail oraz hasło aby się zalogować
					</Text>
					<TextInput
						placeholder="Email"
						style={globalStyles.input}
						value={email}
						onChangeText={setEmail}
						autoCapitalize="none"
					/>
					<TextInput
						placeholder="Hasło"
						style={globalStyles.input}
						value={password}
						onChangeText={setPassword}
						secureTextEntry
					/>
				</View>

				<TouchableOpacity style={globalStyles.mainButton} onPress={handleLogin}>
					<Text style={globalStyles.buttonText}>Zaloguj się</Text>
				</TouchableOpacity>
				<View style={loginStyles.dividerContainer}>
					<View style={loginStyles.line} />
					<Text style={loginStyles.dividerText}>albo</Text>
					<View style={loginStyles.line} />
				</View>
				<TouchableOpacity
					style={[loginStyles.registerButton, loginStyles.withShadow]}
				>
					<FontAwesome5 name="user" size={18} color="#333" />
					<Text
						style={loginStyles.registerText}
						onPress={() => navigation.navigate("Register", { role: "user" })}
					>
						Zarejestruj się jako szukający
					</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={loginStyles.registerButton}
					onPress={() => navigation.navigate("Register", { role: "shelter" })}
				>
					<FontAwesome5 name="dog" size={18} color="#333" />
					<Text style={loginStyles.registerText}>
						Zarejestruj jako schronisko
					</Text>
				</TouchableOpacity>
			</View>
		</KeyboardAvoidingView>
	);
}
