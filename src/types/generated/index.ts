import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Timestamp: { input: any; output: any; }
};

export type AuthResponse = {
  __typename?: 'AuthResponse';
  token: Scalars['String']['output'];
  user: Customer;
};

export type Company = {
  __typename?: 'Company';
  coverImage: Scalars['String']['output'];
  createdAt: Scalars['Timestamp']['output'];
  description: Scalars['String']['output'];
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  logo: Scalars['String']['output'];
  name: Scalars['String']['output'];
  phoneNumber: Scalars['String']['output'];
  updatedAt: Scalars['Timestamp']['output'];
};

export type CompanyAuthResponse = {
  __typename?: 'CompanyAuthResponse';
  token: Scalars['String']['output'];
  user: Company;
};

export type Customer = {
  __typename?: 'Customer';
  createdAt: Scalars['Timestamp']['output'];
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  lastName: Scalars['String']['output'];
  phoneNumber: Scalars['String']['output'];
  updatedAt: Scalars['Timestamp']['output'];
  username: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  loginAsCompany: CompanyAuthResponse;
  loginAsCustomer: AuthResponse;
  registerAsCustomer: AuthResponse;
};


export type MutationLoginAsCompanyArgs = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};


export type MutationLoginAsCustomerArgs = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};


export type MutationRegisterAsCustomerArgs = {
  input?: InputMaybe<RegisterAsCustomerInput>;
};

export type Query = {
  __typename?: 'Query';
  getCompany: Company;
  getCustomer: Customer;
  travel?: Maybe<Travel>;
  travels: Array<Travel>;
  travelsByCategory: Array<Travel>;
};


export type QueryGetCompanyArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetCustomerArgs = {
  id: Scalars['ID']['input'];
};


export type QueryTravelArgs = {
  id: Scalars['ID']['input'];
};


export type QueryTravelsByCategoryArgs = {
  categoryId: Scalars['Int']['input'];
};

export type RegisterAsCustomerInput = {
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  password: Scalars['String']['input'];
  phoneNumber: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type Travel = {
  __typename?: 'Travel';
  categoryId: Scalars['Int']['output'];
  company?: Maybe<Company>;
  companyId: Scalars['Int']['output'];
  coverImage: Scalars['String']['output'];
  createdAt: Scalars['Timestamp']['output'];
  description: Scalars['String']['output'];
  duration: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  maxGuests: Scalars['Int']['output'];
  price: Scalars['Float']['output'];
  rating?: Maybe<Scalars['Float']['output']>;
  reviewCount?: Maybe<Scalars['Int']['output']>;
  subCategoryId: Scalars['Int']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['Timestamp']['output'];
};

export type LoginAsCompanyMutationVariables = Exact<{
  username: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginAsCompanyMutation = { __typename?: 'Mutation', loginAsCompany: { __typename?: 'CompanyAuthResponse', token: string, user: { __typename?: 'Company', id: string, name: string, logo: string, coverImage: string, phoneNumber: string, email: string, description: string, createdAt: any, updatedAt: any } } };

export type LoginAsCustomerMutationVariables = Exact<{
  username: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginAsCustomerMutation = { __typename?: 'Mutation', loginAsCustomer: { __typename?: 'AuthResponse', token: string, user: { __typename?: 'Customer', id: string, username: string, firstName: string, lastName: string, phoneNumber: string, email: string, createdAt: any, updatedAt: any } } };

export type RegisterAsCustomerMutationVariables = Exact<{
  input?: InputMaybe<RegisterAsCustomerInput>;
}>;


export type RegisterAsCustomerMutation = { __typename?: 'Mutation', registerAsCustomer: { __typename?: 'AuthResponse', token: string, user: { __typename?: 'Customer', id: string, username: string, firstName: string, lastName: string, phoneNumber: string, email: string, createdAt: any, updatedAt: any } } };

export type GetTravelsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTravelsQuery = { __typename?: 'Query', travels: Array<{ __typename?: 'Travel', id: string, title: string, description: string, price: number, duration: string, maxGuests: number, coverImage: string, rating?: number | null, reviewCount?: number | null, createdAt: any, company?: { __typename?: 'Company', id: string, name: string, logo: string } | null }> };

export type GetTravelQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetTravelQuery = { __typename?: 'Query', travel?: { __typename?: 'Travel', id: string, title: string, description: string, price: number, duration: string, maxGuests: number, coverImage: string, rating?: number | null, reviewCount?: number | null, createdAt: any, company?: { __typename?: 'Company', id: string, name: string, logo: string, email: string, phoneNumber: string } | null } | null };


export const LoginAsCompanyDocument = gql`
    mutation LoginAsCompany($username: String!, $password: String!) {
  loginAsCompany(username: $username, password: $password) {
    token
    user {
      id
      name
      logo
      coverImage
      phoneNumber
      email
      description
      createdAt
      updatedAt
    }
  }
}
    `;
export type LoginAsCompanyMutationFn = Apollo.MutationFunction<LoginAsCompanyMutation, LoginAsCompanyMutationVariables>;

/**
 * __useLoginAsCompanyMutation__
 *
 * To run a mutation, you first call `useLoginAsCompanyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginAsCompanyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginAsCompanyMutation, { data, loading, error }] = useLoginAsCompanyMutation({
 *   variables: {
 *      username: // value for 'username'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginAsCompanyMutation(baseOptions?: Apollo.MutationHookOptions<LoginAsCompanyMutation, LoginAsCompanyMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginAsCompanyMutation, LoginAsCompanyMutationVariables>(LoginAsCompanyDocument, options);
      }
export type LoginAsCompanyMutationHookResult = ReturnType<typeof useLoginAsCompanyMutation>;
export type LoginAsCompanyMutationResult = Apollo.MutationResult<LoginAsCompanyMutation>;
export type LoginAsCompanyMutationOptions = Apollo.BaseMutationOptions<LoginAsCompanyMutation, LoginAsCompanyMutationVariables>;
export const LoginAsCustomerDocument = gql`
    mutation LoginAsCustomer($username: String!, $password: String!) {
  loginAsCustomer(username: $username, password: $password) {
    token
    user {
      id
      username
      firstName
      lastName
      phoneNumber
      email
      createdAt
      updatedAt
    }
  }
}
    `;
export type LoginAsCustomerMutationFn = Apollo.MutationFunction<LoginAsCustomerMutation, LoginAsCustomerMutationVariables>;

/**
 * __useLoginAsCustomerMutation__
 *
 * To run a mutation, you first call `useLoginAsCustomerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginAsCustomerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginAsCustomerMutation, { data, loading, error }] = useLoginAsCustomerMutation({
 *   variables: {
 *      username: // value for 'username'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginAsCustomerMutation(baseOptions?: Apollo.MutationHookOptions<LoginAsCustomerMutation, LoginAsCustomerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginAsCustomerMutation, LoginAsCustomerMutationVariables>(LoginAsCustomerDocument, options);
      }
export type LoginAsCustomerMutationHookResult = ReturnType<typeof useLoginAsCustomerMutation>;
export type LoginAsCustomerMutationResult = Apollo.MutationResult<LoginAsCustomerMutation>;
export type LoginAsCustomerMutationOptions = Apollo.BaseMutationOptions<LoginAsCustomerMutation, LoginAsCustomerMutationVariables>;
export const RegisterAsCustomerDocument = gql`
    mutation RegisterAsCustomer($input: RegisterAsCustomerInput) {
  registerAsCustomer(input: $input) {
    token
    user {
      id
      username
      firstName
      lastName
      phoneNumber
      email
      createdAt
      updatedAt
    }
  }
}
    `;
export type RegisterAsCustomerMutationFn = Apollo.MutationFunction<RegisterAsCustomerMutation, RegisterAsCustomerMutationVariables>;

/**
 * __useRegisterAsCustomerMutation__
 *
 * To run a mutation, you first call `useRegisterAsCustomerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterAsCustomerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerAsCustomerMutation, { data, loading, error }] = useRegisterAsCustomerMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRegisterAsCustomerMutation(baseOptions?: Apollo.MutationHookOptions<RegisterAsCustomerMutation, RegisterAsCustomerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterAsCustomerMutation, RegisterAsCustomerMutationVariables>(RegisterAsCustomerDocument, options);
      }
export type RegisterAsCustomerMutationHookResult = ReturnType<typeof useRegisterAsCustomerMutation>;
export type RegisterAsCustomerMutationResult = Apollo.MutationResult<RegisterAsCustomerMutation>;
export type RegisterAsCustomerMutationOptions = Apollo.BaseMutationOptions<RegisterAsCustomerMutation, RegisterAsCustomerMutationVariables>;
export const GetTravelsDocument = gql`
    query GetTravels {
  travels {
    id
    title
    description
    price
    duration
    maxGuests
    coverImage
    rating
    reviewCount
    createdAt
    company {
      id
      name
      logo
    }
  }
}
    `;

/**
 * __useGetTravelsQuery__
 *
 * To run a query within a React component, call `useGetTravelsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTravelsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTravelsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetTravelsQuery(baseOptions?: Apollo.QueryHookOptions<GetTravelsQuery, GetTravelsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTravelsQuery, GetTravelsQueryVariables>(GetTravelsDocument, options);
      }
export function useGetTravelsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTravelsQuery, GetTravelsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTravelsQuery, GetTravelsQueryVariables>(GetTravelsDocument, options);
        }
export function useGetTravelsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetTravelsQuery, GetTravelsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetTravelsQuery, GetTravelsQueryVariables>(GetTravelsDocument, options);
        }
export type GetTravelsQueryHookResult = ReturnType<typeof useGetTravelsQuery>;
export type GetTravelsLazyQueryHookResult = ReturnType<typeof useGetTravelsLazyQuery>;
export type GetTravelsSuspenseQueryHookResult = ReturnType<typeof useGetTravelsSuspenseQuery>;
export type GetTravelsQueryResult = Apollo.QueryResult<GetTravelsQuery, GetTravelsQueryVariables>;
export const GetTravelDocument = gql`
    query GetTravel($id: ID!) {
  travel(id: $id) {
    id
    title
    description
    price
    duration
    maxGuests
    coverImage
    rating
    reviewCount
    createdAt
    company {
      id
      name
      logo
      email
      phoneNumber
    }
  }
}
    `;

/**
 * __useGetTravelQuery__
 *
 * To run a query within a React component, call `useGetTravelQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTravelQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTravelQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetTravelQuery(baseOptions: Apollo.QueryHookOptions<GetTravelQuery, GetTravelQueryVariables> & ({ variables: GetTravelQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTravelQuery, GetTravelQueryVariables>(GetTravelDocument, options);
      }
export function useGetTravelLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTravelQuery, GetTravelQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTravelQuery, GetTravelQueryVariables>(GetTravelDocument, options);
        }
export function useGetTravelSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetTravelQuery, GetTravelQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetTravelQuery, GetTravelQueryVariables>(GetTravelDocument, options);
        }
export type GetTravelQueryHookResult = ReturnType<typeof useGetTravelQuery>;
export type GetTravelLazyQueryHookResult = ReturnType<typeof useGetTravelLazyQuery>;
export type GetTravelSuspenseQueryHookResult = ReturnType<typeof useGetTravelSuspenseQuery>;
export type GetTravelQueryResult = Apollo.QueryResult<GetTravelQuery, GetTravelQueryVariables>;