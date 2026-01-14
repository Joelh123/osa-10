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
	const { data: queryData } = useQuery(CURRENT_USER);

	const me = queryData?.me;

	const authStorage = useAuthStorage();
	const apolloClient = useApolloClient();

	const signOut = async () => {
		await authStorage.removeAccessToken();
		apolloClient.resetStore();
	};

	return (
		<View style={styles.container}>
			<ScrollView horizontal>
				<AppBarTab path={"/"} style={styles.tab} text={"Repositories"} />
				{me ? (
					<>
						<AppBarTab path={"/review"} style={styles.tab} text={"Create a review"} />
						<AppBarTab path={"/my-reviews"} style={styles.tab} text={"My reviews"} />
						<AppBarTab
							path={null}
							style={styles.tab}
							text={"Sign Out"}
							onPress={() => signOut()}
						/>
					</>
				) : (
					<>
						<AppBarTab path={"/login"} style={styles.tab} text={"Sign In"} />
						<AppBarTab path={"/register"} style={styles.tab} text={"Sign up"} />
					</>
				)}
			</ScrollView>
		</View>
	);
};

export default AppBar;
