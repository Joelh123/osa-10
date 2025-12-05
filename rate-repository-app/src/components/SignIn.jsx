import { useFormik } from "formik";
import { Text, TextInput, View, StyleSheet, Pressable } from "react-native";

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

const SignIn = () => {
	const formik = useFormik({
		initialValues,
		onSubmit,
	});

	return (
		<View style={styles.container}>
			<View style={styles.inputsContainer}>
				<TextInput
					style={styles.input}
					placeholder="Username"
					value={formik.values.username}
					onChangeText={formik.handleChange("username")}
				/>
				<TextInput
					style={styles.input}
					placeholder="Password"
					value={formik.values.password}
					onChangeText={formik.handleChange("password")}
					secureTextEntry
				/>
				<Pressable style={styles.button} onPress={formik.handleSubmit}>
					<Text style={{ color: "white" }}>Sign In</Text>
				</Pressable>
			</View>
		</View>
	);
};

export default SignIn;
