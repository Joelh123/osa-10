import { FlatList, StyleSheet, View } from "react-native";
import Text from "./Text";
import { useQuery } from "@apollo/client";
import { CURRENT_USER } from "../graphql/queries";
import { useNavigate } from "react-router-native";
import { useEffect } from "react";
import { format } from "date-fns";

const styles = StyleSheet.create({
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

const ReviewItem = ({ review }) => {
	return (
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
	);
};

const ItemSeparator = () => <View style={styles.separator} />;

const MyReviews = () => {
	const { data: queryData, loading } = useQuery(CURRENT_USER, {
		variables: { includeReviews: true },
	});
	const navigate = useNavigate();

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
				renderItem={({ item }) => <ReviewItem review={item} />}
				keyExtractor={({ id }) => id}
				ItemSeparatorComponent={ItemSeparator}
			/>
		</>
	);
};

export default MyReviews;
