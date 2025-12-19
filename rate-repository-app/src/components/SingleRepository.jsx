import { FlatList, Pressable, StyleSheet } from "react-native";
import { View, Image } from "react-native";
import Text from "./Text";
import { useParams } from "react-router-native";
import { useQuery } from "@apollo/client";
import { GET_REPOSITORY } from "../graphql/queries";
import * as Linking from "expo-linking";
import { format } from "date-fns";

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
	separator: { height: 10, backgroundColor: "lightgray" },
	reviewContainer: {
		display: "flex",
		flexDirection: "row",
		backgroundColor: "white",
	},
	rating: {
		width: 40,
		height: 40,
		borderWidth: 2,
		borderColor: "blue",
		borderRadius: 20,
		textAlign: "center",
		textAlignVertical: "center",
		color: "blue",
	},
	reviewText: {
		paddingVertical: 10,
		marginRight: 70,
		gap: 5,
	},
});

const RepositoryInfo = ({ data }) => {
	return (
		<>
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
						<Text
							color="textSecondary"
							fontSize="subheading"
							style={styles.repoButton}
						>
							Open in Github
						</Text>
					</Pressable>
				</View>
			</View>
			<ItemSeparator />
		</>
	);
};

const ReviewItem = ({ review }) => {
	return (
		<View style={styles.reviewContainer}>
			<View style={{ padding: 10 }}>
				<Text fontWeight="bold" fontSize="subheading" style={styles.rating}>
					{review.rating}
				</Text>
			</View>
			<View style={styles.reviewText}>
				<Text fontWeight="bold">{review.user.username}</Text>
				<Text>{format(new Date(review.createdAt), "dd.MM.yyyy")}</Text>
				<Text>{review.text}</Text>
			</View>
		</View>
	);
};

const ItemSeparator = () => <View style={styles.separator} />;

const SingleRepository = () => {
	const id = useParams().id;

	const { data: queryData, loading } = useQuery(GET_REPOSITORY, {
		variables: { id: id },
	});

	if (loading) {
		return <Text>Loading...</Text>;
	}

	const data = queryData?.repository;

	if (!data) {
		return <Text>No repository found.</Text>;
	}

	return (
		<FlatList
			data={data.reviews?.edges.map((edge) => edge.node) || []}
			renderItem={({ item }) => <ReviewItem review={item} />}
			keyExtractor={({ id }) => id}
			ListHeaderComponent={() => <RepositoryInfo data={data} />}
			ItemSeparatorComponent={ItemSeparator}
		/>
	);
};

export default SingleRepository;
