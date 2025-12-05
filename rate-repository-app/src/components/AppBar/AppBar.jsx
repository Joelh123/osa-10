import { View, StyleSheet } from "react-native";
import Constants from "expo-constants";
import AppBarTab from "./AppBarTab";

const styles = StyleSheet.create({
	container: {
		paddingTop: Constants.statusBarHeight,
		backgroundColor: "#24292e",
		display: "flex",
		flexDirection: "row",
	},
	tab: {
		fontSize: 20,
		color: "white",
		margin: 10,
	},
});

const AppBar = () => {
	return (
		<View style={styles.container}>
			<AppBarTab path={"/"} style={styles.tab} text={"Repository"} />
			<AppBarTab path={"/login"} style={styles.tab} text={"Sign In"} />
		</View>
	);
};

export default AppBar;
