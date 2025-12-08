import { View, StyleSheet, ScrollView } from "react-native";
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
		margin: 10,
	},
});

const AppBar = () => {
	return (
		<View style={styles.container}>
			<ScrollView horizontal>
				<AppBarTab path={"/"} style={styles.tab} text={"Repository"} />
				<AppBarTab path={"/login"} style={styles.tab} text={"Sign In"} />
			</ScrollView>
		</View>
	);
};

export default AppBar;
