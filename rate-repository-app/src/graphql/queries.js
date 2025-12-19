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

export const GET_REPOSITORY = gql`
	query ($id: ID!) {
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
			reviews {
				edges {
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
			}
		}
	}
`;

export const CURRENT_USER = gql`
	query {
		me {
			id
			username
		}
	}
`;
