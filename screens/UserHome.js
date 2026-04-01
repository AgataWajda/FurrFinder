import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { auth, db } from "../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { globalStyles } from "../styles/GlobalStyles";
import { loginStyles } from "../styles/LoginStyles";

export default function UserHome({ navigation }) {
	const [firstName, setFirstName] = useState("");

	useEffect(() => {
		const fetchUserData = async () => {
			const user = auth.currentUser;
			if (user) {
				const userDoc = await getDoc(doc(db, "users", user.uid));
				if (userDoc.exists()) {
					setFirstName(userDoc.data().firstName);
				}
			}
		};

		fetchUserData();
	}, []);

	const handleLogout = async () => {
		await auth.signOut();
		navigation.replace("Login");
	};

	return (
		<View
			style={[
				globalStyles.container,
				{ justifyContent: "center", alignItems: "center" },
			]}
		>
			<Text style={loginStyles.title}>
				Cześć, {firstName || "Użytkowniku"}!
			</Text>
			<Text style={globalStyles.subtitle}>Miło Cię widzieć w FurrFinder</Text>

			<TouchableOpacity
				style={[globalStyles.mainButton, { width: "80%", marginTop: 20 }]}
				onPress={handleLogout}
			>
				<Text style={globalStyles.buttonText}>Wyloguj się</Text>
			</TouchableOpacity>
		</View>
	);
}
