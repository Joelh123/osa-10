import { Pressable, StyleSheet } from "react-native";
import { View, Image } from "react-native";
import Text from "./Text";
import { useParams } from "react-router-native";
import { useQuery } from "@apollo/client";
import { GET_REPOSITORY } from "../graphql/queries";
import * as Linking from "expo-linking";

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
	repoButtonContainer: {
		paddingVertical: 10,
		paddingHorizontal: 15,
	},
	repoButton: {
		backgroundColor: "blue",
		padding: 8,
		borderRadius: 4,
		textAlign: "center",
	},
});

const SingleRepository = () => {
	const id = useParams().id;

	const data = useQuery(GET_REPOSITORY, { variables: { id: id } }).data
		.repository;

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
			<View style={styles.repoButtonContainer}>
				<Pressable onPress={() => Linking.openURL(data.url)}>
					<Text color="textSecondary" fontSize="big" style={styles.repoButton}>
						Open in Github
					</Text>
				</Pressable>
			</View>
		</View>
	);
};

export default SingleRepository;
