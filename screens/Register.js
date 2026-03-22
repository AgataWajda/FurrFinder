import React from "react";
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	KeyboardAvoidingView,
	Platform,
	TouchableWithoutFeedback,
	Keyboard,
} from "react-native";

import { globalStyles } from "../styles/GlobalStyles";
import { registerStyles } from "../styles/RegisterStyles";

export default function RegisterScreen({ route, navigation }) {
	const { role } = route.params;

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<View style={globalStyles.container}>
				<KeyboardAvoidingView
					behavior={Platform.OS === "ios" ? "padding" : "height"}
					keyboardVerticalOffset={Platform.OS === "ios" ? 40 : 0}
					style={[
						globalStyles.innerContainer,
						role === "shelter"
							? registerStyles.shelterContainer
							: registerStyles.userContainer,
					]}
				>
					<TouchableOpacity
						onPress={() => navigation.goBack()}
					></TouchableOpacity>

					<Text style={registerStyles.header}>FurrFinder</Text>
					<View>
						<View>
							<Text
								style={[
									globalStyles.title,
									role == "shelter"
										? registerStyles.shelterTitle
										: registerStyles.userTitle,
								]}
							>
								Rejestracja
							</Text>
							<Text style={globalStyles.subtitle}>
								{role === "shelter"
									? "Wpisz dane schroniska"
									: "Wpisz swoje dane"}
							</Text>
						</View>
						<View>
							{role === "shelter" ? (
								<>
									<TextInput
										placeholder="Nazwa schroniska"
										style={globalStyles.input}
									/>
									<TextInput
										placeholder="Ulica i numer"
										style={globalStyles.input}
									/>
									<TextInput placeholder="Miasto" style={globalStyles.input} />
								</>
							) : (
								<>
									<TextInput placeholder="Imię" style={globalStyles.input} />
									<TextInput
										placeholder="Nazwisko"
										style={globalStyles.input}
									/>
								</>
							)}
							<TextInput
								placeholder="Numer telefonu"
								style={globalStyles.input}
								autoCapitalize="none"
								keyboardType="phone"
							/>
							<TextInput
								placeholder="Email"
								style={globalStyles.input}
								autoCapitalize="none"
								keyboardType="email-address"
							/>
							<TextInput
								placeholder="Hasło"
								style={globalStyles.input}
								secureTextEntry
							/>
						</View>

						<TouchableOpacity
							style={[globalStyles.mainButton, { marginTop: 20 }]}
							onPress={() => {
								/* Logika rejestracji */
							}}
						>
							<Text style={globalStyles.buttonText}>Kontynuuj</Text>
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
				</KeyboardAvoidingView>
			</View>
		</TouchableWithoutFeedback>
	);
}
