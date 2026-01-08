import { useMutation } from "@apollo/client";
import { SIGN_IN } from "../graphql/mutations";
import useAuthStorage from "./useAuthStorage";
import { useNavigate } from "react-router-native";
import { useApolloClient } from "@apollo/client";

const useSignIn = () => {
	const authStorage = useAuthStorage();
	const [mutate, result] = useMutation(SIGN_IN);

	const navigate = useNavigate();
	const apolloClient = useApolloClient();

	const signIn = async ({ username, password }) => {
		const { data } = await mutate({
			variables: { credentials: { username, password } },
		});
		navigate("/");
		await authStorage.setAccessToken(data.authenticate.accessToken);
		apolloClient.resetStore();
		return data;
	};

	return [signIn, result];
};

export default useSignIn;
