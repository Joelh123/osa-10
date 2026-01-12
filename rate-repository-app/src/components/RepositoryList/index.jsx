import { FlatList, View, StyleSheet, Pressable } from "react-native";
import RepositoryItem from "./RepositoryItem";
import useRepositories from "../../hooks/useRepositories";
import Text from "../Text";
import { useNavigate } from "react-router-native";
import React, { useState } from "react";

import { useDebounce } from "use-debounce";
import RepositoryListHeader from "./RepositoryListHeader";

const styles = StyleSheet.create({
	separator: {
		height: 10,
		backgroundColor: "lightgray",
	},
});

const ItemSeparator = () => <View style={styles.separator} />;

export class RepositoryListContainer extends React.Component {
	renderHeader = () => {
		const props = this.props;

		return (
			<RepositoryListHeader
				order={props.order}
				setOrder={props.setOrder}
				filter={props.filter}
				setFilter={props.setFilter}
			/>
		);
	};
	render() {
		const props = this.props;

		const repositoryNodes = props.repositories
			? props.repositories.edges.map((edge) => edge.node)
			: [];

		return (
			<FlatList
				data={repositoryNodes}
				ItemSeparatorComponent={ItemSeparator}
				renderItem={({ item }) => (
					<Pressable onPress={() => this.props.navigate(item.id)}>
						<RepositoryItem data={item} />
					</Pressable>
				)}
				keyExtractor={(item) => item.id}
				ListHeaderComponent={this.renderHeader}
			/>
		);
	}
}

const RepositoryList = () => {
	const [order, setOrder] = useState("CREATED_AT DESC");
	const [filter, setFilter] = useState("");
	const [searchKeyword] = useDebounce(filter, 500);

	const { repositories } = useRepositories({ order, searchKeyword });
	const navigate = useNavigate();

	return (
		<RepositoryListContainer
			repositories={repositories}
			order={order}
			setOrder={setOrder}
			filter={filter}
			setFilter={setFilter}
			navigate={navigate}
		/>
	);
};

export default RepositoryList;
