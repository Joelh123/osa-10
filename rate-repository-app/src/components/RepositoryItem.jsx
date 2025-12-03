import { View, Text } from "react-native";

const RepositoryItem = ({ data }) => {
	return (
		<View>
			<Text>Fullname: {data.fullName}</Text>
			<Text>Description: {data.description}</Text>
			<Text>Language: {data.language}</Text>
			<Text>Forks: {data.forksCount}</Text>
			<Text>Stars: {data.stargazersCount}</Text>
			<Text>Rating average: {data.ratingAverage}</Text>
			<Text>Reviews: {data.reviewCount}</Text>
		</View>
	);
};

export default RepositoryItem;
