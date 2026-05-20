import React, { useState, useEffect } from "react";
import {
	View,
	Text,
	TouchableOpacity,
	Image,
	ActivityIndicator,
} from "react-native";
import Swiper from "react-native-deck-swiper";
import { fetchAvailableAnimals } from "../services/animalService";
import { globalStyles } from "../styles/GlobalStyles";
import { userHomeStyles } from "../styles/UserHomeStyles";
import { styles } from "../styles/UserHomeCardStyles";

export default function UserHome({ route }) {
	const { userId } = route.params || {};

	const [animals, setAnimals] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		loadData();
	}, []);

	const loadData = async () => {
		try {
			const data = await fetchAvailableAnimals(userId);
			setAnimals(data);
		} catch (err) {
			alert("Nie udało się pobrać danych zwierzaków.");
		} finally {
			setLoading(false);
		}
	};

	const handleSwiped = async (index) => {
		console.log(`Swajpnięto kartę o indeksie: ${index}`);

		if (index >= animals.length - 2) {
			try {
				console.log("Mało kart! Pobieram nową porcję z GCP...");

				const newData = await fetchAvailableAnimals(userId, 5);

				if (newData.length > 0) {
					setAnimals((prev) => [...prev, ...newData]);
				} else {
					console.log("Baza pusta, wracamy do początku.");
					resetPagination();

					const initialData = await fetchAvailableAnimals(userId, 5);
					setAnimals((prev) => [...prev, ...initialData]);
				}
			} catch (err) {
				console.error("Błąd podczas doczytywania porcji:", err);
			}
		}
	};

	if (loading) {
		return (
			<View style={[globalStyles.container, { justifyContent: "center" }]}>
				<ActivityIndicator size="large" color="#000" />
			</View>
		);
	}

	return (
		<View style={globalStyles.container}>
			<View style={{ flex: 1, marginBottom: 90 }}>
				{animals.length > 0 ? (
					<Swiper
						cards={animals}
						renderCard={(animal) => (
							<View style={styles.cardWrapper}>
								<Image
									source={{ uri: animal.imageUrl }}
									style={styles.cardImage}
								/>
								<View style={styles.infoOverlay}>
									<Text style={styles.animalName}>
										{animal.name}, {animal.age} l.
									</Text>
									<Text style={styles.animalBreed}>{animal.breed}</Text>
								</View>
							</View>
						)}
						onSwiped={(index) => handleSwiped(index)}
						onSwipedRight={(index) => console.log("Match!", animals[index].id)}
						stackSize={3}
						cardIndex={0}
						backgroundColor={"transparent"}
					/>
				) : (
					<Text style={{ textAlign: "center", marginTop: 100 }}>
						Brak nowych ogłoszeń
					</Text>
				)}
			</View>
		</View>
	);
}
