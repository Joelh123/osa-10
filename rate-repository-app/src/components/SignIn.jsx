import { useFormik } from "formik";
import { Text, TextInput, View, StyleSheet, Pressable } from "react-native";
import * as yup from "yup";

const initialValues = {
	username: "",
	password: "",
};

const onSubmit = (values) => {
	console.log(values);
};

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

const validationSchema = yup.object().shape({
	username: yup.string().required("Username is required"),
	password: yup.string().required("Password is required"),
});

const SignIn = () => {
	const formik = useFormik({
		initialValues,
		validationSchema,
		onSubmit,
	});

	return (
		<View style={styles.container}>
			<View style={styles.inputsContainer}>
				<TextInput
					style={[
						styles.input,
						formik.touched.username &&
							formik.errors.username && { borderColor: "red" },
					]}
					placeholder="Username"
					value={formik.values.username}
					onChangeText={formik.handleChange("username")}
				/>
				{formik.touched.username && formik.errors.username && (
					<Text style={{ color: "red" }}>{formik.errors.username}</Text>
				)}
				<TextInput
					style={[
						styles.input,
						formik.touched.password &&
							formik.errors.password && { borderColor: "red" },
					]}
					placeholder="Password"
					value={formik.values.password}
					onChangeText={formik.handleChange("password")}
					secureTextEntry
				/>
				{formik.touched.password && formik.errors.password && (
					<Text style={{ color: "red" }}>{formik.errors.password}</Text>
				)}
				<Pressable style={styles.button} onPress={formik.handleSubmit}>
					<Text style={{ color: "white" }}>Sign In</Text>
				</Pressable>
			</View>
		</View>
	);
};

export default SignIn;
