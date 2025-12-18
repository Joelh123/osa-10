import { StyleSheet, View } from "react-native";
import RepositoryList from "./RepositoryList";
import AppBar from "./AppBar";
import { Navigate, Route, Routes } from "react-router-native";
import SignIn from "./SignIn";
import SingleRepository from "./SingleRepository";

const styles = StyleSheet.create({
	container: {
		flexGrow: 1,
		flexShrink: 1,
		backgroundColor: "lightgray",
	},
});

const Main = () => {
	return (
		<View style={styles.container}>
			<AppBar />
			<Routes>
				<Route path="/" element={<RepositoryList />} />
				<Route path="*" element={<Navigate to="/" replace />} />
				<Route path="/login" element={<SignIn />} />
				<Route path="/:id" element={<SingleRepository />} />
			</Routes>
		</View>
	);
};

export default Main;
