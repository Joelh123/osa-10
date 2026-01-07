import { View, StyleSheet, TextInput, Pressable } from "react-native";
import Text from "./Text";
import * as yup from "yup";
import { useFormik } from "formik";
import { useMutation } from "@apollo/client";
import { CREATE_REVIEW } from "../graphql/mutations";
import { useNavigate } from "react-router-native";

const initialValues = {
	ownerName: "",
	repoName: "",
	rating: null,
	review: "",
};

const validationSchema = yup.object().shape({
	ownerName: yup.string().required("Repository owner name is required"),
	repoName: yup.string().required("Repository name is required"),
	rating: yup
		.number()
		.min(0, "Minimum number for rating is 0")
		.max(100, "Maximum number for rating is 100")
		.required("Rating is required"),
	review: yup.string(),
});

const styles = StyleSheet.create({
	container: {
		backgroundColor: "white",
	},
	inputsContainer: {
		marginHorizontal: 35,
		marginVertical: 20,
		gap: 7,
	},
	input: {
		borderWidth: 2,
		borderColor: "lightgray",
		borderRadius: 4,
		padding: 0,
		paddingLeft: 5,
	},
	button: {
		borderRadius: 4,
		backgroundColor: "blue",
		padding: 5,
		alignItems: "center",
	},
});

const ReviewForm = () => {
	const [mutate] = useMutation(CREATE_REVIEW);

	const navigate = useNavigate();

	const onSubmit = async (values) => {
		const { ownerName, repoName, rating, review } = values;

		try {
			const { data } = await mutate({
				variables: {
					review: {
						ownerName: ownerName,
						repositoryName: repoName,
						rating: Number(rating),
						text: review,
					},
				},
			});
			console.log("SUCCESS", data);
			console.log(data.createReview);
			navigate(`/${data.createReview.repositoryId}`);
		} catch (e) {
			console.log("ERROR", e);
		}
	};

	const formik = useFormik({ initialValues, validationSchema, onSubmit });

	return (
		<View style={styles.container}>
			<View style={styles.inputsContainer}>
				<TextInput
					style={[
						styles.input,
						formik.touched.ownerName &&
							formik.errors.ownerName && { borderColor: "red" },
					]}
					value={formik.values.ownerName}
					onChangeText={formik.handleChange("ownerName")}
					placeholder="Repository owner name"
				/>
				{formik.touched.ownerName && formik.errors.ownerName && (
					<Text color="error">{formik.errors.ownerName}</Text>
				)}
				<TextInput
					style={[
						styles.input,
						formik.touched.repoName &&
							formik.errors.repoName && { borderColor: "red" },
					]}
					value={formik.values.repoName}
					onChangeText={formik.handleChange("repoName")}
					placeholder="Repository name"
				/>
				{formik.touched.repoName && formik.errors.repoName && (
					<Text color="error">{formik.errors.repoName}</Text>
				)}
				<TextInput
					style={[
						styles.input,
						formik.touched.rating && formik.errors.rating && { borderColor: "red" },
					]}
					value={
						formik.values.rating !== null && formik.values.rating !== undefined
							? String(formik.values.rating)
							: ""
					}
					onChangeText={formik.handleChange("rating")}
					placeholder="Rating 0-100"
					keyboardType="numeric"
				/>
				{formik.touched.rating && formik.errors.rating && (
					<Text color="error">{formik.errors.rating}</Text>
				)}
				<TextInput
					style={styles.input}
					value={formik.values.review}
					onChangeText={formik.handleChange("review")}
					placeholder="Review"
				/>
				<Pressable style={styles.button} onPress={formik.handleSubmit}>
					<Text color="textSecondary">Submit review</Text>
				</Pressable>
			</View>
		</View>
	);
};

export default ReviewForm;
