import React, { useState } from "react";
import {
	Text,
	View,
	TextInput,
	TouchableOpacity,
	TouchableWithoutFeedback,
	KeyboardAvoidingView,
	Platform,
	Keyboard,
	ScrollView,
	Image,
	ActivityIndicator,
	Alert,
} from "react-native";

import { globalStyles } from "../styles/GlobalStyles";
import { loginStyles } from "../styles/LoginStyles";
import { loginUser } from "../services/authService";

export default function LoginScreen({ navigation }) {
	const [emailOrLogin, setEmailOrLogin] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);

	const handleLogin = async () => {
		if (!emailOrLogin.trim() || !password) {
			Alert.alert("Błąd", "Wypełnij wszystkie pola.");
			return;
		}

		setLoading(true);
		try {
			const result = await loginUser(emailOrLogin, password);

			if (result.role === "shelter") {
				navigation.replace("ShelterHome");
			} else {
				navigation.replace("UserHome");
			}
		} catch (error) {
			console.error(error);
			let msg = "Błąd logowania.";

			if (error.message === "INVALID_FORMAT")
				msg = "Zły format e-mail lub loginu (.schronisko).";
			else if (error.code === "auth/invalid-credential")
				msg = "Błędny login lub hasło.";
			else if (error.message === "USER_NOT_FOUND_IN_DB")
				msg = "Konto istnieje, ale brak danych w bazie Firestore.";

			Alert.alert("Uwaga", msg);
		} finally {
			setLoading(false);
		}
	};

	return (
		<View style={globalStyles.container}>
			<KeyboardAvoidingView
				behavior={Platform.OS === "ios" ? "padding" : undefined}
				style={{ flex: 1 }}
			>
				<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
					<ScrollView
						contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
						keyboardShouldPersistTaps="handled"
						showsVerticalScrollIndicator={false}
					>
						<View style={globalStyles.innerContainer}>
							<View style={{ alignItems: "center", marginBottom: 30 }}>
								<Text style={loginStyles.title}>FurrFinder</Text>
								<Text style={loginStyles.subtitle}>
									Znajdź swojego przyjaciela
								</Text>
							</View>

							<View style={loginStyles.mainPanel}>
								<View style={globalStyles.inputContainer}>
									<Text style={globalStyles.title}>Zaloguj się</Text>
									<Text style={globalStyles.subtitle}>
										Wpisz E-mail lub login schroniska
									</Text>

									<TextInput
										placeholder="Email lub login"
										style={globalStyles.input}
										value={emailOrLogin}
										onChangeText={setEmailOrLogin}
										autoCapitalize="none"
										autoCorrect={false}
									/>
									<TextInput
										placeholder="Hasło"
										style={globalStyles.input}
										value={password}
										onChangeText={setPassword}
										secureTextEntry
									/>
								</View>

								<TouchableOpacity
									style={[globalStyles.mainButton, loading && { opacity: 0.7 }]}
									onPress={handleLogin}
									disabled={loading}
								>
									{loading ? (
										<ActivityIndicator color="#FFF" />
									) : (
										<Text style={globalStyles.buttonText}>Zaloguj się</Text>
									)}
								</TouchableOpacity>

								<View style={loginStyles.dividerContainer}>
									<View style={loginStyles.line} />
									<Text style={loginStyles.dividerText}>albo</Text>
									<View style={loginStyles.line} />
								</View>

								<TouchableOpacity
									style={[loginStyles.registerButton, loginStyles.withShadow]}
									onPress={() =>
										navigation.navigate("Register", { role: "user" })
									}
								>
									<Image
										source={require("../assets/icons/user.png")}
										style={loginStyles.icon}
									/>
									<Text style={loginStyles.registerText}>
										Zarejestruj się jako szukający
									</Text>
								</TouchableOpacity>

								<TouchableOpacity
									style={[loginStyles.registerButton, { marginTop: 10 }]}
									onPress={() =>
										navigation.navigate("Register", { role: "shelter" })
									}
								>
									<Image
										source={require("../assets/icons/pet.png")}
										style={loginStyles.icon}
									/>
									<Text style={loginStyles.registerText}>
										Zarejestruj jako schronisko
									</Text>
								</TouchableOpacity>
							</View>
						</View>
					</ScrollView>
				</TouchableWithoutFeedback>
			</KeyboardAvoidingView>
		</View>
	);
}
