export const loginUser = async (emailOrLogin, password) => {
	try {
		const response = await fetch(
			`${process.env.EXPO_PUBLIC_API_URL}/api/login`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
				},
				body: JSON.stringify({
					email: emailOrLogin.trim(),
					password: password,
				}),
			},
		);

		const data = await response.json();

		if (!response.ok || !data.success) {
			throw new Error(data.error || "Błąd logowania.");
		}
		return data.user;
	} catch (error) {
		throw error;
	}
};
