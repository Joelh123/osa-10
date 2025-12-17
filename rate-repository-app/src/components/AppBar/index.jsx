import { View, StyleSheet, ScrollView } from "react-native";
import Constants from "expo-constants";
import AppBarTab from "./AppBarTab";
import { useApolloClient, useQuery } from "@apollo/client";
import { CURRENT_USER } from "../../graphql/queries";
import useAuthStorage from "../../hooks/useAuthStorage";
import Text from "../Text";

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
	const { data } = useQuery(CURRENT_USER);

	const authStorage = useAuthStorage();
	const apolloClient = useApolloClient();

	const signOut = async () => {
		await authStorage.removeAccessToken();
		apolloClient.resetStore();
	};

	if (!data) {
		return <Text>Loading...</Text>;
	}

	return (
		<View style={styles.container}>
			<ScrollView horizontal>
				<AppBarTab path={"/"} style={styles.tab} text={"Repository"} />
				{data.me ? (
					<AppBarTab
						path={null}
						style={styles.tab}
						text={"Sign Out"}
						onPress={() => signOut()}
					/>
				) : (
					<AppBarTab
						path={"/login"}
						style={styles.tab}
						text={"Sign In"}
						onPress={null}
					/>
				)}
			</ScrollView>
		</View>
	);
};

export default AppBar;
