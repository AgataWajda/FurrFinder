let currentLastId = null;

export const fetchAvailableAnimals = async (userId, batchSize = 5) => {
	try {
		if (!userId) throw new Error("Brak identyfikatora użytkownika (userId).");

		let url = `${process.env.EXPO_PUBLIC_API_URL}/api/animals?userId=${userId}&limit=${batchSize}`;
		if (currentLastId) {
			url += `&lastId=${currentLastId}`;
		}

		const response = await fetch(url, {
			method: "GET",
			headers: { Accept: "application/json" },
		});

		const data = await response.json();

		if (!response.ok || !data.success) {
			throw new Error(
				data.error || "Nie udało się pobrać zwierzaków z serwera.",
			);
		}
		currentLastId = data.lastId;

		return data.animals;
	} catch (error) {
		console.error("Błąd w fetchAvailableAnimals:", error);
		throw error;
	}
};

export const resetPagination = () => {
	currentLastId = null;
};

export const saveSwipeAction = async (userId, petId, action = "LIKE") => {
	try {
		if (!userId || !petId) {
			throw new Error(
				"Brak wymaganych danych (userId lub petId) do zapisania swipe.",
			);
		}

		const response = await fetch(
			`${process.env.EXPO_PUBLIC_API_URL}/api/swipes`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
				},
				body: JSON.stringify({
					userId,
					petId,
					action,
					// Timestamp najlepiej wygenerować na backendzie za pomocą FieldValue.serverTimestamp()
				}),
			},
		);

		const data = await response.json();

		if (!response.ok || !data.success) {
			throw new Error(data.error || "Nie udało się zapisać akcji swipe.");
		}

		return data;
	} catch (error) {
		console.error("Błąd w saveSwipeAction:", error);
		throw error;
	}
};

export const fetchFavoriteAnimals = async (userId) => {
	try {
		if (!userId) throw new Error("Brak userId do pobrania ulubionych.");

		const response = await fetch(
			`${process.env.EXPO_PUBLIC_API_URL}/api/favorites?userId=${userId}`,
			{
				method: "GET",
				headers: {
					Accept: "application/json",
				},
			},
		);

		const data = await response.json();
		if (!response.ok)
			throw new Error(data.error || "Błąd pobierania ulubionych.");

		return data.favorites || [];
	} catch (error) {
		console.error("Błąd w fetchFavoriteAnimals:", error);
		throw error;
	}
};
