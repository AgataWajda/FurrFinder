// screens/RegisterScreen.js
import React, { useState } from "react";
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	KeyboardAvoidingView,
	Platform,
	ScrollView,
} from "react-native";
import { globalStyles } from "../styles/GlobalStyles";
import { loginStyles } from "../styles/LoginStyles"; // Wykorzystamy wspólne style

export default function RegisterScreen({ route }) {
	const { role } = route.params;

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === "ios" ? "padding" : "height"}
			style={{ flex: 1, backgroundColor: "#fff" }}
		>
			<ScrollView contentContainerStyle={globalStyles.innerContainer}>
				<Text style={loginStyles.logo}>FurrFinder</Text>

				<Text style={globalStyles.title}>Rejestracja</Text>
				<Text style={loginStyles.subtitle}>
					{role === "shelter" ? "Wpisz dane schroniska" : "Wpisz swoje dane"}
				</Text>

				<View style={{ width: "100%", marginTop: 20 }}>
					{role === "shelter" && (
						<>
							<TextInput
								placeholder="Nazwa schroniska"
								style={globalStyles.input}
								placeholderTextColor="#999"
							/>
							<TextInput
								placeholder="Ulica"
								style={globalStyles.input}
								placeholderTextColor="#999"
							/>
							<TextInput
								placeholder="Miasto"
								style={globalStyles.input}
								placeholderTextColor="#999"
							/>
						</>
					)}

					{role === "user" && (
						<>
							<TextInput
								placeholder="Imię"
								style={globalStyles.input}
								placeholderTextColor="#999"
							/>
							<TextInput
								placeholder="Nazwisko"
								style={globalStyles.input}
								placeholderTextColor="#999"
							/>
						</>
					)}

					{/* POLA WSPÓLNE */}
					<TextInput
						placeholder="Telefon"
						style={globalStyles.input}
						keyboardType="phone-pad"
						placeholderTextColor="#999"
					/>
					<TextInput
						placeholder="email@domena.com"
						style={globalStyles.input}
						autoCapitalize="none"
						placeholderTextColor="#999"
					/>
					<TextInput
						placeholder="Hasło"
						style={globalStyles.input}
						secureTextEntry
						placeholderTextColor="#999"
					/>
				</View>

				<TouchableOpacity style={globalStyles.mainButton}>
					<Text style={globalStyles.buttonText}>Kontynuuj</Text>
				</TouchableOpacity>
			</ScrollView>
		</KeyboardAvoidingView>
	);
}
