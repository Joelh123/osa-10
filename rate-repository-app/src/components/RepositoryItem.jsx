import { View, Text, StyleSheet, Image } from "react-native";

const styles = StyleSheet.create({
	headerContainer: {
		marginLeft: 8,
		marginTop: 8,
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
		color: "white",
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
		<View style={{ backgroundColor: "white" }}>
			<View style={styles.headerContainer}>
				<Image style={styles.image} source={{ uri: data.ownerAvatarUrl }} />
				<View style={{ marginLeft: 10 }}>
					<Text style={{ fontWeight: 700 }}>{data.fullName}</Text>
					<Text>{data.description}</Text>
					<Text style={styles.language}>{data.language}</Text>
				</View>
			</View>
			<View style={styles.statsContainer}>
				<View>
					<Text style={{ fontWeight: 700 }}>
						{data.forksCount >= 1000
							? `${(data.forksCount / 1000).toFixed(1)}k`
							: data.forksCount}
					</Text>
					<Text>Forks</Text>
				</View>
				<View>
					<Text style={{ fontWeight: 700 }}>
						{data.stargazersCount >= 1000
							? `${(data.stargazersCount / 1000).toFixed(1)}k`
							: data.stargazersCount}
					</Text>
					<Text>Stars</Text>
				</View>
				<View>
					<Text style={{ fontWeight: 700 }}>{data.ratingAverage}</Text>
					<Text>Rating</Text>
				</View>
				<View>
					<Text style={{ fontWeight: 700 }}>
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
