import { FlatList, View, StyleSheet, Pressable } from "react-native";
import RepositoryItem from "./RepositoryItem";
import useRepositories from "../../hooks/useRepositories";
import Text from "../Text";
import { useNavigate } from "react-router-native";
import { useState } from "react";
import { Picker } from "@react-native-picker/picker";

const styles = StyleSheet.create({
	separator: {
		height: 10,
		backgroundColor: "lightgray",
	},
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({ repositories, order, setOrder }) => {
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
			ListHeaderComponent={
				<Picker
					selectedValue={order}
					onValueChange={(itemValue, itemIndex) => setOrder(itemValue)}
				>
					<Picker.Item label="Latest repositories" value="CREATED_AT DESC" />
					<Picker.Item
						label="Highest rated repositories"
						value="RATING_AVERAGE DESC"
					/>
					<Picker.Item
						label="Lowest rated repositories"
						value="RATING_AVERAGE ASC"
					/>
				</Picker>
			}
		/>
	);
};

const RepositoryList = () => {
	const [order, setOrder] = useState("CREATED_AT DESC");

	const { repositories, loading } = useRepositories({ order });

	if (loading) {
		return <Text>Loading...</Text>;
	}
	return (
		<RepositoryListContainer
			repositories={repositories}
			order={order}
			setOrder={setOrder}
		/>
	);
};

export default RepositoryList;
