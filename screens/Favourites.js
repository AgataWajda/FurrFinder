import React, { useState, useCallback } from "react";
import {
	View,
	Text,
	FlatList,
	ImageBackground,
	StyleSheet,
	ActivityIndicator,
	Dimensions,
	RefreshControl,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { fetchFavoriteAnimals } from "../services/animalService";
import Colors from "../constants/Colors";

const { width } = Dimensions.get("window");
const CARD_WIDTH = (width - 48) / 2;

export default function LikedAnimalsScreen({ route }) {
	const { userId } = route.params || {};

	const [favorites, setFavorites] = useState([]);
	const [loading, setLoading] = useState(true);
	const [refreshing, setRefreshing] = useState(false);

	const loadFavorites = async () => {
		if (!userId) {
			console.warn("[Favourites] Oczekiwanie na identyfikator użytkownika...");
			return;
		}

		try {
			const data = await fetchFavoriteAnimals(userId);
			setFavorites(data);
		} catch (error) {
			console.error("[Favourites] Błąd podczas ładowania ulubionych:", error);
		} finally {
			setLoading(false);
			setRefreshing(false);
		}
	};

	useFocusEffect(
		useCallback(() => {
			loadFavorites();
		}, [userId]),
	);

	const onRefresh = useCallback(() => {
		setRefreshing(true);
		loadFavorites();
	}, [userId]);

	const renderPetCard = ({ item }) => (
		<View style={styles.card}>
			<ImageBackground
				source={{ uri: item.imageUrl }}
				style={styles.imageBackground}
				imageStyle={{ borderRadius: 16 }}
			>
				<View style={styles.cardOverlay}>
					<View style={styles.infoContainer}>
						<Text style={styles.petName} numberOfLines={1}>
							{item.name}
						</Text>
						<Text style={styles.petAge}>
							{item.age}{" "}
							{item.age === 1 ? "rok" : item.age < 5 ? "lata" : "lat"}
						</Text>
					</View>
					<View style={styles.statusBadge} />
				</View>
			</ImageBackground>
		</View>
	);

	if (loading && !userId) {
		return (
			<View style={styles.centerContainer}>
				<ActivityIndicator size="large" color="#C2185B" />
			</View>
		);
	}

	return (
		<View style={styles.container}>
			<View style={styles.headerContainer}>
				<Text style={styles.headerTitle}>Ulubione</Text>
				<Text style={styles.headerSubtitle}>
					{favorites.length === 0
						? "Brak polubionych pupili"
						: `${favorites.length} ${favorites.length === 1 ? "pupil czeka" : "pupili czeka"} na kontakt`}
				</Text>
			</View>

			<FlatList
				data={favorites}
				keyExtractor={(item) => item.id}
				renderItem={renderPetCard}
				numColumns={2}
				columnWrapperStyle={styles.row}
				contentContainerStyle={styles.listContent}
				showsVerticalScrollIndicator={false}
				refreshControl={
					<RefreshControl
						refreshing={refreshing}
						onRefresh={onRefresh}
						tintColor="#C2185B"
					/>
				}
				ListEmptyComponent={
					<View style={styles.emptyContainer}>
						<Text style={styles.emptyText}>
							Tutaj pojawią się Twoje matche!
						</Text>
					</View>
				}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.white,
		paddingTop: 30,
	},
	centerContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: Colors.white,
	},
	headerContainer: {
		paddingHorizontal: 20,
		marginBottom: 20,
	},
	headerTitle: {
		fontFamily: "Inter-SemiBold",
		fontSize: 28,
		color: Colors.black,
	},
	headerSubtitle: {
		fontFamily: "Inter-Regular",
		fontSize: 14,
		color: Colors.gray,
		marginTop: 4,
	},
	listContent: {
		paddingHorizontal: 16,
		paddingBottom: 140,
	},
	row: {
		justifyContent: "space-between",
		marginBottom: 16,
	},
	card: {
		width: CARD_WIDTH,
		height: CARD_WIDTH * 1.3,
		borderRadius: 16,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 3,
	},
	imageBackground: {
		flex: 1,
		justifyContent: "flex-end",
	},
	cardOverlay: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "flex-end",
		backgroundColor: "rgba(0, 0, 0, 0.4)",
		padding: 12,
		borderBottomLeftRadius: 16,
		borderBottomRightRadius: 16,
	},
	infoContainer: {
		flex: 1,
		marginRight: 4,
	},
	petName: {
		fontFamily: "Inter-SemiBold",
		fontSize: 16,
		color: Colors.white,
	},
	petAge: {
		fontFamily: "Inter-Regular",
		fontSize: 12,
		color: "#E0E0E0",
		marginTop: 2,
	},
	statusBadge: {
		width: 10,
		height: 10,
		borderRadius: 5,
		backgroundColor: "#27AE60",
		marginBottom: 4,
	},
	emptyContainer: {
		alignItems: "center",
		justifyContent: "center",
		marginTop: 100,
	},
	emptyText: {
		fontFamily: "Inter-Regular",
		fontSize: 16,
		color: Colors.gray,
		textAlign: "center",
	},
});
