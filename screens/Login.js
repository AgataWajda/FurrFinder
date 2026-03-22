import { useState } from "react";
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
} from "react-native";

import { globalStyles } from "../styles/GlobalStyles";
import { loginStyles } from "../styles/LoginStyles";

export default function LoginScreen({ navigation }) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleLogin = () => {
		console.log("Logowanie dla:", email);
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

								<TouchableOpacity
									style={globalStyles.mainButton}
									onPress={handleLogin}
								>
									<Text style={globalStyles.buttonText}>Zaloguj się</Text>
								</TouchableOpacity>

								<View style={loginStyles.dividerContainer}>
									<View style={loginStyles.line} />
									<Text style={loginStyles.dividerText}>albo</Text>
									<View style={loginStyles.line} />
								</View>

								<TouchableOpacity
									style={[
										loginStyles.registerButton,
										loginStyles.withShadow,
										{ flexDirection: "row", gap: 10, justifyContent: "center" },
									]}
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
									style={[
										loginStyles.registerButton,
										{
											flexDirection: "row",
											gap: 10,
											justifyContent: "center",
											marginTop: 10,
										},
									]}
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
								<View style={globalStyles.footerContainer}>
									<Text style={globalStyles.footerText}>
										Kontynuując, akceptujesz nasz{" "}
										<Text
											style={globalStyles.linkText}
											onPress={() => console.log("Otwórz Regulamin")}
										>
											Regulamin
										</Text>{" "}
										oraz{" "}
										<Text
											style={globalStyles.linkText}
											onPress={() => console.log("Otwórz Politykę")}
										>
											Politykę Prywatności
										</Text>
										.
									</Text>
								</View>
							</View>
						</View>
					</ScrollView>
				</TouchableWithoutFeedback>
			</KeyboardAvoidingView>
		</View>
	);
}
