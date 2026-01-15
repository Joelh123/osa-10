import { gql } from "@apollo/client";

export const GET_REPOSITORIES = gql`
	query (
		$orderBy: AllRepositoriesOrderBy
		$orderDirection: OrderDirection
		$searchKeyword: String
		$first: Int
		$after: String
	) {
		repositories(
			orderBy: $orderBy
			orderDirection: $orderDirection
			searchKeyword: $searchKeyword
			first: $first
			after: $after
		) {
			edges {
				node {
					description
					forksCount
					fullName
					language
					name
					id
					stargazersCount
					ratingAverage
					reviewCount
					ownerAvatarUrl
				}
				cursor
			}
			pageInfo {
				startCursor
				endCursor
				hasNextPage
			}
		}
	}
`;

// TODO: after
export const GET_REPOSITORY = gql`
	query ($id: ID!, $first: Int, $after: String) {
		repository(id: $id) {
			description
			forksCount
			fullName
			id
			language
			name
			ownerAvatarUrl
			ratingAverage
			reviewCount
			stargazersCount
			url
			reviews(first: $first, after: $after) {
				edges {
					cursor
					node {
						id
						text
						rating
						createdAt
						user {
							id
							username
						}
					}
				}
				pageInfo {
					startCursor
					endCursor
					hasNextPage
				}
			}
		}
	}
`;

export const CURRENT_USER = gql`
	query ($includeReviews: Boolean = false) {
		me {
			id
			username
			reviews @include(if: $includeReviews) {
				edges {
					node {
						repository {
							fullName
						}
						repositoryId
						text
						rating
						createdAt
						id
					}
				}
			}
		}
	}
`;
