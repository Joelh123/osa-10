import { FlatList, View, StyleSheet, Pressable } from "react-native";
import RepositoryItem from "./RepositoryItem";
import useRepositories from "../../hooks/useRepositories";
import Text from "../Text";
import { useNavigate } from "react-router-native";

const styles = StyleSheet.create({
	separator: {
		height: 10,
		backgroundColor: "lightgray",
	},
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({ repositories }) => {
	const repositoryNodes = repositories
		? repositories.edges.map((edge) => edge.node)
		: [];

	const navigate = useNavigate();

	return (
		<FlatList
			data={repositoryNodes}
			ItemSeparatorComponent={ItemSeparator}
			renderItem={({ item }) => (
				<Pressable onPress={() => navigate(item.id)}>
					<RepositoryItem data={item} />
				</Pressable>
			)}
			keyExtractor={(item) => item.id}
		/>
	);
};

const RepositoryList = () => {
	const { repositories, loading } = useRepositories();

	if (loading) {
		return <Text>Loading...</Text>;
	}
	return <RepositoryListContainer repositories={repositories} />;
};

export default RepositoryList;
