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

import { loginUser } from "../services/authService";

import { globalStyles } from "../styles/GlobalStyles";
import { loginStyles } from "../styles/LoginStyles";

export default function LoginScreen({ navigation }) {
	const [emailOrLogin, setEmailOrLogin] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);

	const handleLogin = async () => {
		if (!emailOrLogin || !password) {
			Alert.alert("Błąd", "Proszę uzupełnić adres email i hasło.");
			return;
		}

		try {
			setLoading(true);
			const user = await loginUser(emailOrLogin, password);

			if (user.role === "user") {
				console.log("Zalogowano jako Użytkownik");
				navigation.replace("UserHome", { userId: user.uid });
			} else if (user.role === "shelter") {
				console.log("Zalogowano jako Schronisko");
				navigation.replace("ShelterHome", { userId: user.uid });
			}
		} catch (error) {
			Alert.alert("Błąd logowania", error.message || "Serwer nie odpowiada.");
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<View style={globalStyles.container}>
			<KeyboardAvoidingView
				behavior={Platform.OS === "ios" ? "padding" : undefined}
				style={{ flex: 1 }}
				// POPRAWKA WEB 1: Kontener przepuszcza zdarzenia myszy do głębszych warstw w przeglądarce
				pointerEvents={Platform.OS === "web" ? "box-none" : "auto"}
			>
				{/* POPRAWKA WEB 2: Blokujemy chowanie klawiatury na kliknięcie tła tylko dla platformy Web */}
				<TouchableWithoutFeedback
					onPress={Platform.OS === "web" ? undefined : Keyboard.dismiss}
				>
					<ScrollView
						contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
						keyboardShouldPersistTaps="handled"
						showsVerticalScrollIndicator={false}
					>
						<View style={globalStyles.innerContainer}>
							<View style={loginStyles.titleContainer}>
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
										// Opcjonalne zabezpieczenie dla autouzupełniania przeglądarek
										autoComplete={Platform.OS === "web" ? "off" : "password"}
									/>
								</View>

								<TouchableOpacity
									style={globalStyles.mainButton}
									onPress={handleLogin}
									disabled={loading}
								>
									{loading ? (
										<ActivityIndicator style={loginStyles.loader} />
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
									style={loginStyles.registerButton}
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
