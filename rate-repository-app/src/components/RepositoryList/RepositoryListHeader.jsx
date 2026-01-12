import { Picker } from "@react-native-picker/picker";
import { Searchbar } from "react-native-paper";

const RepositoryListHeader = ({ order, setOrder, filter, setFilter }) => {
	const onChangeFilter = (query) => setFilter(query);

	return (
		<>
			<Searchbar
				style={{ margin: 10, marginBottom: 0 }}
				placeholder="Search"
				onChangeText={onChangeFilter}
				value={filter}
			/>
			<Picker
				selectedValue={order}
				onValueChange={(itemValue, itemIndex) => setOrder(itemValue)}
			>
				<Picker.Item label="Latest repositories" value="CREATED_AT DESC" />
				<Picker.Item
					label="Highest rated repositories"
					value="RATING_AVERAGE DESC"
				/>
				<Picker.Item label="Lowest rated repositories" value="RATING_AVERAGE ASC" />
			</Picker>
		</>
	);
};

export default RepositoryListHeader;
