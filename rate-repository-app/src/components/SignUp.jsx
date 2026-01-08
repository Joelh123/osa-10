import { useFormik } from "formik";
import { TextInput, View, StyleSheet, Pressable } from "react-native";
import Text from "./Text";
import * as yup from "yup";
import useSignIn from "../hooks/useSignIn";
import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../graphql/mutations";

const initialValues = {
	username: "",
	password: "",
	passwordConfirm: "",
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
	username: yup
		.string()
		.min(5, "Username must be 5-30 characters")
		.max(30, "Username must be 5-30 characters")
		.required("Username is required"),
	password: yup
		.string()
		.min(5, "Password must be 5-50 characters")
		.max(50, "Password must be 5-50 characters")
		.required("Password is required"),
	passwordConfirm: yup
		.string()
		.oneOf([yup.ref("password")], "Passwords don't match")
		.required("Password confirmation is required"),
});

export const SignUpContainer = ({ onSubmit }) => {
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
					<Text color="error">{formik.errors.username}</Text>
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
					<Text color="error">{formik.errors.password}</Text>
				)}
				<TextInput
					style={[
						styles.input,
						formik.touched.passwordConfirm &&
							formik.errors.passwordConfirm && { borderColor: "red" },
					]}
					placeholder="Confirm password"
					value={formik.values.passwordConfirm}
					onChangeText={formik.handleChange("passwordConfirm")}
					secureTextEntry
				/>
				{formik.touched.passwordConfirm && formik.errors.passwordConfirm && (
					<Text color="error">{formik.errors.passwordConfirm}</Text>
				)}
				<Pressable style={styles.button} onPress={formik.handleSubmit}>
					<Text color="textSecondary">Sign Up</Text>
				</Pressable>
			</View>
		</View>
	);
};

const SignUp = () => {
	const [signUp] = useMutation(CREATE_USER);
	const [signIn] = useSignIn();

	const onSubmit = async (values) => {
		const { username, password } = values;

		try {
			const signUpData = await signUp({
				variables: { user: { username, password } },
			});
			console.log("Sign up", signUpData);
			const signIndata = await signIn({ username, password });
			console.log("Sign in", signIndata);
		} catch (e) {
			console.log(e);
		}
	};

	return <SignUpContainer onSubmit={onSubmit} />;
};

export default SignUp;
