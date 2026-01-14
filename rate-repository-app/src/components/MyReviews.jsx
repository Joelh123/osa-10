import { FlatList, StyleSheet, View, Pressable, Alert } from "react-native";
import Text from "./Text";
import { useMutation, useQuery } from "@apollo/client";
import { CURRENT_USER } from "../graphql/queries";
import { useNavigate } from "react-router-native";
import { useEffect } from "react";
import { format } from "date-fns";
import { DELETE_REVIEW } from "../graphql/mutations";

const styles = StyleSheet.create({
	separator: { height: 10, backgroundColor: "lightgray" },
	reviewContainer: {
		display: "flex",
		flexDirection: "row",
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
	buttonsContainer: {
		marginLeft: 45,
		marginTop: 8,
		marginBottom: 10,
		display: "flex",
		flexDirection: "row",
		gap: 40,
	},
	repoButton: {
		borderRadius: 4,
		backgroundColor: "blue",
		paddingVertical: 9,
		paddingHorizontal: 20,
		alignItems: "center",
	},
	deleteButton: {
		borderRadius: 4,
		backgroundColor: "red",
		paddingVertical: 9,
		paddingHorizontal: 20,
		alignItems: "center",
	},
});

const ReviewItem = ({ review, navigate, handleDeletion }) => {
	const showAlert = () => {
		Alert.alert(
			"Delete Review",
			"Are you sure you want to delete this review?",
			[
				{
					text: "Cancel",
					style: "cancel",
				},
				{
					text: "Delete",
					onPress: () => handleDeletion(review.id),
					style: "default",
				},
			],
			{
				cancelable: true,
			}
		);
	};

	return (
		<View style={{ backgroundColor: "white" }}>
			<View style={styles.reviewContainer}>
				<View style={{ padding: 10 }}>
					<Text fontWeight="bold" fontSize="subheading" style={styles.rating}>
						{review.rating}
					</Text>
				</View>
				<View style={styles.reviewText}>
					<Text fontWeight="bold">{review.repository.fullName}</Text>
					<Text>{format(new Date(review.createdAt), "dd.MM.yyyy")}</Text>
					<Text>{review.text}</Text>
				</View>
			</View>

			<View style={styles.buttonsContainer}>
				<Pressable
					style={styles.repoButton}
					onPress={() => navigate(`/${review.repositoryId}`)}
				>
					<Text color="textSecondary">View Repository</Text>
				</Pressable>
				<Pressable style={styles.deleteButton} onPress={() => showAlert()}>
					<Text color="textSecondary">Delete Review</Text>
				</Pressable>
			</View>
		</View>
	);
};

const ItemSeparator = () => <View style={styles.separator} />;

const MyReviews = () => {
	const {
		data: queryData,
		loading,
		refetch,
	} = useQuery(CURRENT_USER, {
		variables: { includeReviews: true },
	});
	const [mutate] = useMutation(DELETE_REVIEW);

	const navigate = useNavigate();

	const handleDeletion = async (id) => {
		await mutate({ variables: { deleteReviewId: id } });
		refetch();
	};

	const me = queryData?.me;

	useEffect(() => {
		if (!loading && !me) {
			navigate("/login");
		}
	}, [loading, me, navigate]);

	if (loading) {
		return <Text>Loading...</Text>;
	}

	if (!me || !me.reviews) {
		return null;
	}

	const reviewEdges = me.reviews.edges || [];

	if (reviewEdges.length < 1) {
		return <Text>No reviews yet</Text>;
	}

	const reviewNodes = reviewEdges.map((edge) => edge.node);

	return (
		<>
			<FlatList
				data={reviewNodes}
				renderItem={({ item }) => (
					<ReviewItem
						review={item}
						navigate={navigate}
						handleDeletion={handleDeletion}
					/>
				)}
				keyExtractor={({ id }) => id}
				ItemSeparatorComponent={ItemSeparator}
			/>
		</>
	);
};

export default MyReviews;
