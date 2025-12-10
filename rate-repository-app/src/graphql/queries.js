import { gql } from "@apollo/client";

export const GET_REPOSITORIES = gql`
	query {
		repositories {
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
			}
		}
	}
`;
