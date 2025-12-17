import { View, StyleSheet, Image } from "react-native";
import Text from "../Text";

const styles = StyleSheet.create({
	headerContainer: {
		marginLeft: 8,
		marginTop: 8,
		marginRight: 60,
		display: "flex",
		flexDirection: "row",
	},
	image: {
		height: 50,
		width: 50,
		borderRadius: 10,
		overflow: "hidden",
	},
	language: {
		backgroundColor: "blue",
		padding: 5,
		borderRadius: 4,
		alignSelf: "flex-start",
	},
	statsContainer: {
		marginLeft: 40,
		marginTop: 8,
		marginBottom: 10,
		display: "flex",
		flexDirection: "row",
		gap: 40,
	},
});

const RepositoryItem = ({ data }) => {
	return (
		<View testID="repositoryItem" style={{ backgroundColor: "white" }}>
			<View style={styles.headerContainer}>
				<Image style={styles.image} source={{ uri: data.ownerAvatarUrl }} />
				<View style={{ marginLeft: 10 }}>
					<Text fontWeight="bold">{data.fullName}</Text>
					<Text>{data.description}</Text>
					<Text color="textSecondary" style={styles.language}>
						{data.language}
					</Text>
				</View>
			</View>
			<View style={styles.statsContainer}>
				<View>
					<Text fontWeight="bold">
						{data.forksCount >= 1000
							? `${(data.forksCount / 1000).toFixed(1)}k`
							: data.forksCount}
					</Text>
					<Text>Forks</Text>
				</View>
				<View>
					<Text fontWeight="bold">
						{data.stargazersCount >= 1000
							? `${(data.stargazersCount / 1000).toFixed(1)}k`
							: data.stargazersCount}
					</Text>
					<Text>Stars</Text>
				</View>
				<View>
					<Text fontWeight="bold">{data.ratingAverage}</Text>
					<Text>Rating</Text>
				</View>
				<View>
					<Text fontWeight="bold">
						{data.reviewCount >= 1000
							? `${(data.reviewCount / 1000).toFixed(1)}k`
							: data.reviewCount}
					</Text>
					<Text>Reviews</Text>
				</View>
			</View>
		</View>
	);
};

export default RepositoryItem;
