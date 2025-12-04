import { View, StyleSheet, Text, Pressable } from "react-native";
import Constants from "expo-constants";

const styles = StyleSheet.create({
	container: {
		paddingTop: Constants.statusBarHeight,
		backgroundColor: "#24292e",
	},
	tab: {
		fontSize: 20,
		color: "white",
		marginBottom: 15,
		marginLeft: 15,
	},
});

const AppBar = () => {
	return (
		<View style={styles.container}>
			<Pressable>
				<Text style={styles.tab}>Repositories</Text>
			</Pressable>
		</View>
	);
};

export default AppBar;
