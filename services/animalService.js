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
