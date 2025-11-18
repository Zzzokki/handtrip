import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null | undefined;
export type InputMaybe<T> = T | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string | number; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Timestamp: { input: Date | string | number; output: Date | string | number; }
};

export type Agenda = {
  __typename?: 'Agenda';
  createdAt: Scalars['Timestamp']['output'];
  description: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  travelId: Scalars['Int']['output'];
  updatedAt: Scalars['Timestamp']['output'];
};

export type Category = {
  __typename?: 'Category';
  createdAt: Scalars['Timestamp']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['Timestamp']['output'];
};

export type Company = {
  __typename?: 'Company';
  coverImage: Scalars['String']['output'];
  createdAt: Scalars['Timestamp']['output'];
  description: Scalars['String']['output'];
  email: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  logo: Scalars['String']['output'];
  name: Scalars['String']['output'];
  phoneNumber: Scalars['String']['output'];
  updatedAt: Scalars['Timestamp']['output'];
  username: Scalars['String']['output'];
};

export type CreateCompanyInput = {
  coverImage: Scalars['String']['input'];
  description: Scalars['String']['input'];
  email: Scalars['String']['input'];
  logo: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  phoneNumber: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type CreateCustomerInput = {
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  password: Scalars['String']['input'];
  phoneNumber: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type Customer = {
  __typename?: 'Customer';
  createdAt: Scalars['Timestamp']['output'];
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  lastName: Scalars['String']['output'];
  phoneNumber: Scalars['String']['output'];
  updatedAt: Scalars['Timestamp']['output'];
  username: Scalars['String']['output'];
};

export type Destination = {
  __typename?: 'Destination';
  createdAt: Scalars['Timestamp']['output'];
  id: Scalars['Int']['output'];
  location: Scalars['String']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['Timestamp']['output'];
};

export type Guide = {
  __typename?: 'Guide';
  companyId: Scalars['Int']['output'];
  createdAt: Scalars['Timestamp']['output'];
  email: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  phoneNumber: Scalars['String']['output'];
  profileImage: Scalars['String']['output'];
  updatedAt: Scalars['Timestamp']['output'];
};

export type LoginAsCompanyResponse = {
  __typename?: 'LoginAsCompanyResponse';
  company: Company;
  token: Scalars['String']['output'];
};

export type LoginAsCustomerResponse = {
  __typename?: 'LoginAsCustomerResponse';
  customer: Customer;
  token: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createCompany: Company;
  createCustomer: Customer;
  createDestination: Destination;
  deleteCompany: Company;
  deleteCustomer: Customer;
  loginAsCompany: LoginAsCompanyResponse;
  loginAsCustomer: LoginAsCustomerResponse;
  registerAsCustomer: LoginAsCustomerResponse;
  updateCompany: Company;
  updateCustomer: Customer;
};


export type MutationcreateCompanyArgs = {
  input: CreateCompanyInput;
};


export type MutationcreateCustomerArgs = {
  input: CreateCustomerInput;
};


export type MutationcreateDestinationArgs = {
  location: Scalars['String']['input'];
  name: Scalars['String']['input'];
};


export type MutationdeleteCompanyArgs = {
  id: Scalars['Int']['input'];
};


export type MutationdeleteCustomerArgs = {
  id: Scalars['Int']['input'];
};


export type MutationloginAsCompanyArgs = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};


export type MutationloginAsCustomerArgs = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};


export type MutationregisterAsCustomerArgs = {
  input: RegisterAsCustomerInput;
};


export type MutationupdateCompanyArgs = {
  input: UpdateCompanyInput;
};


export type MutationupdateCustomerArgs = {
  input: UpdateCustomerInput;
};

export type Query = {
  __typename?: 'Query';
  getCategories: Array<Category>;
  getCompany: Company;
  getCustomer: Customer;
  getDestinations: Array<Destination>;
  getSubCategories: Array<SubCategory>;
  getTravel: Travel;
  getTravels: Array<Travel>;
  getTravelsBySubCategory: Array<Travel>;
};


export type QuerygetCompanyArgs = {
  id: Scalars['Int']['input'];
};


export type QuerygetCustomerArgs = {
  id: Scalars['Int']['input'];
};


export type QuerygetTravelArgs = {
  id: Scalars['Int']['input'];
};


export type QuerygetTravelsBySubCategoryArgs = {
  subCategoryId: Scalars['Int']['input'];
};

export type RegisterAsCustomerInput = {
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  password: Scalars['String']['input'];
  phoneNumber: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type SubCategory = {
  __typename?: 'SubCategory';
  categoryId: Scalars['Int']['output'];
  createdAt: Scalars['Timestamp']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['Timestamp']['output'];
};

export type Travel = {
  __typename?: 'Travel';
  agenda: Agenda;
  agendaId: Scalars['Int']['output'];
  categories: Array<Category>;
  company: Company;
  companyId: Scalars['Int']['output'];
  coverImage?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['Timestamp']['output'];
  description: Scalars['String']['output'];
  destination: Destination;
  destinationId: Scalars['Int']['output'];
  duration: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  subCategories: Array<SubCategory>;
  totalSeatNumber: Scalars['Int']['output'];
  travelSessions: Array<TravelSession>;
  updatedAt: Scalars['Timestamp']['output'];
};

export type TravelSession = {
  __typename?: 'TravelSession';
  createdAt: Scalars['Timestamp']['output'];
  endDate: Scalars['Timestamp']['output'];
  guide: Guide;
  guideId: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  startDate: Scalars['Timestamp']['output'];
  travelId: Scalars['Int']['output'];
  updatedAt: Scalars['Timestamp']['output'];
};

export type UpdateCompanyInput = {
  coverImage?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Int']['input'];
  logo?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateCustomerInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Int']['input'];
  lastName?: InputMaybe<Scalars['String']['input']>;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>, TArgs = Record<PropertyKey, never>> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>, TArgs = Record<PropertyKey, never>> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = Record<PropertyKey, never>, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>, TArgs = Record<PropertyKey, never>> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;





/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Agenda: ResolverTypeWrapper<Agenda>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Category: ResolverTypeWrapper<Category>;
  Company: ResolverTypeWrapper<Company>;
  CreateCompanyInput: CreateCompanyInput;
  CreateCustomerInput: CreateCustomerInput;
  Customer: ResolverTypeWrapper<Customer>;
  Destination: ResolverTypeWrapper<Destination>;
  Guide: ResolverTypeWrapper<Guide>;
  LoginAsCompanyResponse: ResolverTypeWrapper<LoginAsCompanyResponse>;
  LoginAsCustomerResponse: ResolverTypeWrapper<LoginAsCustomerResponse>;
  Mutation: ResolverTypeWrapper<Record<PropertyKey, never>>;
  Query: ResolverTypeWrapper<Record<PropertyKey, never>>;
  RegisterAsCustomerInput: RegisterAsCustomerInput;
  SubCategory: ResolverTypeWrapper<SubCategory>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Timestamp: ResolverTypeWrapper<Scalars['Timestamp']['output']>;
  Travel: ResolverTypeWrapper<Travel>;
  TravelSession: ResolverTypeWrapper<TravelSession>;
  UpdateCompanyInput: UpdateCompanyInput;
  UpdateCustomerInput: UpdateCustomerInput;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Agenda: Agenda;
  String: Scalars['String']['output'];
  Int: Scalars['Int']['output'];
  Category: Category;
  Company: Company;
  CreateCompanyInput: CreateCompanyInput;
  CreateCustomerInput: CreateCustomerInput;
  Customer: Customer;
  Destination: Destination;
  Guide: Guide;
  LoginAsCompanyResponse: LoginAsCompanyResponse;
  LoginAsCustomerResponse: LoginAsCustomerResponse;
  Mutation: Record<PropertyKey, never>;
  Query: Record<PropertyKey, never>;
  RegisterAsCustomerInput: RegisterAsCustomerInput;
  SubCategory: SubCategory;
  ID: Scalars['ID']['output'];
  Timestamp: Scalars['Timestamp']['output'];
  Travel: Travel;
  TravelSession: TravelSession;
  UpdateCompanyInput: UpdateCompanyInput;
  UpdateCustomerInput: UpdateCustomerInput;
  Boolean: Scalars['Boolean']['output'];
};

export type AgendaResolvers<ContextType = any, ParentType extends ResolversParentTypes['Agenda'] = ResolversParentTypes['Agenda']> = {
  createdAt?: Resolver<ResolversTypes['Timestamp'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  travelId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Timestamp'], ParentType, ContextType>;
};

export type CategoryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Category'] = ResolversParentTypes['Category']> = {
  createdAt?: Resolver<ResolversTypes['Timestamp'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Timestamp'], ParentType, ContextType>;
};

export type CompanyResolvers<ContextType = any, ParentType extends ResolversParentTypes['Company'] = ResolversParentTypes['Company']> = {
  coverImage?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Timestamp'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  logo?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  phoneNumber?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Timestamp'], ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type CustomerResolvers<ContextType = any, ParentType extends ResolversParentTypes['Customer'] = ResolversParentTypes['Customer']> = {
  createdAt?: Resolver<ResolversTypes['Timestamp'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  firstName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  lastName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  phoneNumber?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Timestamp'], ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type DestinationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Destination'] = ResolversParentTypes['Destination']> = {
  createdAt?: Resolver<ResolversTypes['Timestamp'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  location?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Timestamp'], ParentType, ContextType>;
};

export type GuideResolvers<ContextType = any, ParentType extends ResolversParentTypes['Guide'] = ResolversParentTypes['Guide']> = {
  companyId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Timestamp'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  phoneNumber?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  profileImage?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Timestamp'], ParentType, ContextType>;
};

export type LoginAsCompanyResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['LoginAsCompanyResponse'] = ResolversParentTypes['LoginAsCompanyResponse']> = {
  company?: Resolver<ResolversTypes['Company'], ParentType, ContextType>;
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type LoginAsCustomerResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['LoginAsCustomerResponse'] = ResolversParentTypes['LoginAsCustomerResponse']> = {
  customer?: Resolver<ResolversTypes['Customer'], ParentType, ContextType>;
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createCompany?: Resolver<ResolversTypes['Company'], ParentType, ContextType, RequireFields<MutationcreateCompanyArgs, 'input'>>;
  createCustomer?: Resolver<ResolversTypes['Customer'], ParentType, ContextType, RequireFields<MutationcreateCustomerArgs, 'input'>>;
  createDestination?: Resolver<ResolversTypes['Destination'], ParentType, ContextType, RequireFields<MutationcreateDestinationArgs, 'location' | 'name'>>;
  deleteCompany?: Resolver<ResolversTypes['Company'], ParentType, ContextType, RequireFields<MutationdeleteCompanyArgs, 'id'>>;
  deleteCustomer?: Resolver<ResolversTypes['Customer'], ParentType, ContextType, RequireFields<MutationdeleteCustomerArgs, 'id'>>;
  loginAsCompany?: Resolver<ResolversTypes['LoginAsCompanyResponse'], ParentType, ContextType, RequireFields<MutationloginAsCompanyArgs, 'password' | 'username'>>;
  loginAsCustomer?: Resolver<ResolversTypes['LoginAsCustomerResponse'], ParentType, ContextType, RequireFields<MutationloginAsCustomerArgs, 'password' | 'username'>>;
  registerAsCustomer?: Resolver<ResolversTypes['LoginAsCustomerResponse'], ParentType, ContextType, RequireFields<MutationregisterAsCustomerArgs, 'input'>>;
  updateCompany?: Resolver<ResolversTypes['Company'], ParentType, ContextType, RequireFields<MutationupdateCompanyArgs, 'input'>>;
  updateCustomer?: Resolver<ResolversTypes['Customer'], ParentType, ContextType, RequireFields<MutationupdateCustomerArgs, 'input'>>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  getCategories?: Resolver<Array<ResolversTypes['Category']>, ParentType, ContextType>;
  getCompany?: Resolver<ResolversTypes['Company'], ParentType, ContextType, RequireFields<QuerygetCompanyArgs, 'id'>>;
  getCustomer?: Resolver<ResolversTypes['Customer'], ParentType, ContextType, RequireFields<QuerygetCustomerArgs, 'id'>>;
  getDestinations?: Resolver<Array<ResolversTypes['Destination']>, ParentType, ContextType>;
  getSubCategories?: Resolver<Array<ResolversTypes['SubCategory']>, ParentType, ContextType>;
  getTravel?: Resolver<ResolversTypes['Travel'], ParentType, ContextType, RequireFields<QuerygetTravelArgs, 'id'>>;
  getTravels?: Resolver<Array<ResolversTypes['Travel']>, ParentType, ContextType>;
  getTravelsBySubCategory?: Resolver<Array<ResolversTypes['Travel']>, ParentType, ContextType, RequireFields<QuerygetTravelsBySubCategoryArgs, 'subCategoryId'>>;
};

export type SubCategoryResolvers<ContextType = any, ParentType extends ResolversParentTypes['SubCategory'] = ResolversParentTypes['SubCategory']> = {
  categoryId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Timestamp'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Timestamp'], ParentType, ContextType>;
};

export interface TimestampScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Timestamp'], any> {
  name: 'Timestamp';
}

export type TravelResolvers<ContextType = any, ParentType extends ResolversParentTypes['Travel'] = ResolversParentTypes['Travel']> = {
  agenda?: Resolver<ResolversTypes['Agenda'], ParentType, ContextType>;
  agendaId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  categories?: Resolver<Array<ResolversTypes['Category']>, ParentType, ContextType>;
  company?: Resolver<ResolversTypes['Company'], ParentType, ContextType>;
  companyId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  coverImage?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Timestamp'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  destination?: Resolver<ResolversTypes['Destination'], ParentType, ContextType>;
  destinationId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  duration?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  subCategories?: Resolver<Array<ResolversTypes['SubCategory']>, ParentType, ContextType>;
  totalSeatNumber?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  travelSessions?: Resolver<Array<ResolversTypes['TravelSession']>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Timestamp'], ParentType, ContextType>;
};

export type TravelSessionResolvers<ContextType = any, ParentType extends ResolversParentTypes['TravelSession'] = ResolversParentTypes['TravelSession']> = {
  createdAt?: Resolver<ResolversTypes['Timestamp'], ParentType, ContextType>;
  endDate?: Resolver<ResolversTypes['Timestamp'], ParentType, ContextType>;
  guide?: Resolver<ResolversTypes['Guide'], ParentType, ContextType>;
  guideId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  startDate?: Resolver<ResolversTypes['Timestamp'], ParentType, ContextType>;
  travelId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Timestamp'], ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Agenda?: AgendaResolvers<ContextType>;
  Category?: CategoryResolvers<ContextType>;
  Company?: CompanyResolvers<ContextType>;
  Customer?: CustomerResolvers<ContextType>;
  Destination?: DestinationResolvers<ContextType>;
  Guide?: GuideResolvers<ContextType>;
  LoginAsCompanyResponse?: LoginAsCompanyResponseResolvers<ContextType>;
  LoginAsCustomerResponse?: LoginAsCustomerResponseResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  SubCategory?: SubCategoryResolvers<ContextType>;
  Timestamp?: GraphQLScalarType;
  Travel?: TravelResolvers<ContextType>;
  TravelSession?: TravelSessionResolvers<ContextType>;
};

