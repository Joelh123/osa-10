import { gql } from "@apollo/client";

export const SIGN_IN = gql`
	mutation ($credentials: AuthenticateInput) {
		authenticate(credentials: $credentials) {
			accessToken
		}
	}
`;

export const CREATE_REVIEW = gql`
	mutation ($review: CreateReviewInput) {
		createReview(review: $review) {
			id
			createdAt
			rating
			repositoryId
			userId
			text
		}
	}
`;

export const CREATE_USER = gql`
	mutation CreateUser($user: CreateUserInput) {
		createUser(user: $user) {
			createdAt
			id
			reviewCount
			username
		}
	}
`;
