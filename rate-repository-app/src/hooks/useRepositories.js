import { useQuery } from "@apollo/client";
import { GET_REPOSITORIES } from "../graphql/queries";

const useRepositories = ({ order, searchKeyword }) => {
	const [orderBy, orderDirection] = order.split(" ");

	const { data, loading, fetchMore } = useQuery(GET_REPOSITORIES, {
		fetchPolicy: "cache-and-network",
		variables: { orderBy, orderDirection, searchKeyword, first: 8 },
	});

	const handleFetchMore = () => {
		const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;

		if (!canFetchMore) {
			return;
		}

		fetchMore({
			variables: {
				after: data.repositories.pageInfo.endCursor,
			},
		});
	};

	return {
		repositories: data?.repositories,
		fetchMore: handleFetchMore,
		loading,
	};
};

export default useRepositories;
