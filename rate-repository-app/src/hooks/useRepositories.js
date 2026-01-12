import { useQuery } from "@apollo/client";
import { GET_REPOSITORIES } from "../graphql/queries";

const useRepositories = ({ order, searchKeyword }) => {
	const [orderBy, orderDirection] = order.split(" ");

	const { data, loading } = useQuery(GET_REPOSITORIES, {
		fetchPolicy: "cache-and-network",
		variables: { orderBy, orderDirection, searchKeyword },
	});

	return {
		repositories: data?.repositories,
		loading,
	};
};

export default useRepositories;
