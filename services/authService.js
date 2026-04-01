import { auth, db } from "../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

export const loginUser = async (emailOrLogin, password) => {
	let finalEmail = "";

	if (emailOrLogin.includes("@")) {
		finalEmail = emailOrLogin.trim();
	} else if (emailOrLogin.toLowerCase().includes(".schronisko")) {
		finalEmail = `${emailOrLogin.trim()}@furrfinder.app`;
	} else {
		throw new Error("INVALID_FORMAT");
	}

	const userCredential = await signInWithEmailAndPassword(
		auth,
		finalEmail,
		password,
	);
	const uid = userCredential.user.uid;

	const shelterDoc = await getDoc(doc(db, "shelters", uid));
	if (shelterDoc.exists()) return { uid, role: "shelter" };

	const userDoc = await getDoc(doc(db, "users", uid));
	if (userDoc.exists()) return { uid, role: "user" };

	throw new Error("USER_NOT_FOUND_IN_DB");
};
