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

export type AgendaItemInput = {
  day: Scalars['Int']['input'];
  description: Scalars['String']['input'];
  title: Scalars['String']['input'];
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

export type CreateAgendaInput = {
  items: Array<AgendaItemInput>;
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

export type CreateGuideInput = {
  description: Scalars['String']['input'];
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  phoneNumber: Scalars['String']['input'];
  profileImage: Scalars['String']['input'];
};

export type CreateTravelInput = {
  agenda: CreateAgendaInput;
  categoryIds: Array<Scalars['Int']['input']>;
  companyId: Scalars['Int']['input'];
  coverImage?: InputMaybe<Scalars['String']['input']>;
  description: Scalars['String']['input'];
  destinationId: Scalars['Int']['input'];
  duration: Scalars['Int']['input'];
  name: Scalars['String']['input'];
  subCategoryIds: Array<Scalars['Int']['input']>;
  totalSeatNumber: Scalars['Int']['input'];
  travelSessions: Array<CreateTravelSessionInput>;
};

export type CreateTravelSessionInput = {
  endDate: Scalars['Timestamp']['input'];
  guideId: Scalars['Int']['input'];
  seatCost: SeatCostInput;
  startDate: Scalars['Timestamp']['input'];
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

export type GetTravelsFilterInput = {
  destinationIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  maxDuration?: InputMaybe<Scalars['Int']['input']>;
  maxPrice?: InputMaybe<Scalars['Int']['input']>;
  minDuration?: InputMaybe<Scalars['Int']['input']>;
  minPrice?: InputMaybe<Scalars['Int']['input']>;
  subCategoryIds?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type Guide = {
  __typename?: 'Guide';
  companyId: Scalars['Int']['output'];
  createdAt: Scalars['Timestamp']['output'];
  description: Scalars['String']['output'];
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
  createGuide: Guide;
  createTravel: Travel;
  deleteCompany: Company;
  deleteCustomer: Customer;
  deleteGuide: Scalars['Boolean']['output'];
  deleteTravel: Travel;
  loginAsCompany: LoginAsCompanyResponse;
  loginAsCustomer: LoginAsCustomerResponse;
  registerAsCustomer: LoginAsCustomerResponse;
  updateCompany: Company;
  updateCustomer: Customer;
  updateGuide: Guide;
  updateTravel: Travel;
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


export type MutationcreateGuideArgs = {
  input: CreateGuideInput;
};


export type MutationcreateTravelArgs = {
  input: CreateTravelInput;
};


export type MutationdeleteCompanyArgs = {
  id: Scalars['Int']['input'];
};


export type MutationdeleteCustomerArgs = {
  id: Scalars['Int']['input'];
};


export type MutationdeleteGuideArgs = {
  id: Scalars['Int']['input'];
};


export type MutationdeleteTravelArgs = {
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


export type MutationupdateGuideArgs = {
  id: Scalars['Int']['input'];
  input: UpdateGuideInput;
};


export type MutationupdateTravelArgs = {
  id: Scalars['Int']['input'];
  input: CreateTravelInput;
};

export type Order = {
  __typename?: 'Order';
  createdAt: Scalars['Timestamp']['output'];
  customer: Customer;
  customerId: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  orderStatus: Scalars['Int']['output'];
  payment: Payment;
  paymentId: Scalars['Int']['output'];
  totalPrice: Scalars['Int']['output'];
  totalSeats: Scalars['Int']['output'];
  travelSession: TravelSession;
  travelSessionId: Scalars['Int']['output'];
  travelers: Array<Traveler>;
  updatedAt: Scalars['Timestamp']['output'];
};

export type Payment = {
  __typename?: 'Payment';
  createdAt: Scalars['Timestamp']['output'];
  id: Scalars['Int']['output'];
  isPaid: Scalars['Boolean']['output'];
  paidAt?: Maybe<Scalars['Timestamp']['output']>;
  total: Scalars['Int']['output'];
  updatedAt: Scalars['Timestamp']['output'];
};

export type Query = {
  __typename?: 'Query';
  getCategories: Array<Category>;
  getCompanies: Array<Company>;
  getCompany: Company;
  getCustomer: Customer;
  getDestinations: Array<Destination>;
  getGuidesByCompany: Array<Guide>;
  getMeAsCompany: Company;
  getMeAsCustomer: Customer;
  getOrder: Order;
  getOrders: Array<Order>;
  getOrdersByCompany: Array<Order>;
  getOrdersByCustomer: Array<Order>;
  getOrdersByTravelSession: Array<Order>;
  getPayment: Payment;
  getSeat: Seat;
  getSeatCost: SeatCost;
  getSeatCosts: Array<SeatCost>;
  getSeatsByTravelSession: Array<Seat>;
  getSubCategories: Array<SubCategory>;
  getSubCategoriesByCategory: Array<SubCategory>;
  getSubCategory: SubCategory;
  getTravel: Travel;
  getTraveler: Traveler;
  getTravelersByOrder: Array<Traveler>;
  getTravels: TravelsResult;
  getTravelsByCompany: Array<Travel>;
};


export type QuerygetCompanyArgs = {
  id: Scalars['Int']['input'];
};


export type QuerygetCustomerArgs = {
  id: Scalars['Int']['input'];
};


export type QuerygetGuidesByCompanyArgs = {
  companyId: Scalars['Int']['input'];
};


export type QuerygetOrderArgs = {
  id: Scalars['Int']['input'];
};


export type QuerygetOrdersByCompanyArgs = {
  companyId: Scalars['Int']['input'];
};


export type QuerygetOrdersByCustomerArgs = {
  customerId: Scalars['Int']['input'];
};


export type QuerygetOrdersByTravelSessionArgs = {
  travelSessionId: Scalars['Int']['input'];
};


export type QuerygetPaymentArgs = {
  id: Scalars['Int']['input'];
};


export type QuerygetSeatArgs = {
  id: Scalars['Int']['input'];
};


export type QuerygetSeatCostArgs = {
  id: Scalars['Int']['input'];
};


export type QuerygetSeatsByTravelSessionArgs = {
  travelSessionId: Scalars['Int']['input'];
};


export type QuerygetSubCategoriesByCategoryArgs = {
  categoryId: Scalars['Int']['input'];
};


export type QuerygetSubCategoryArgs = {
  id: Scalars['Int']['input'];
};


export type QuerygetTravelArgs = {
  id: Scalars['Int']['input'];
};


export type QuerygetTravelerArgs = {
  id: Scalars['Int']['input'];
};


export type QuerygetTravelersByOrderArgs = {
  orderId: Scalars['Int']['input'];
};


export type QuerygetTravelsArgs = {
  filters?: InputMaybe<GetTravelsFilterInput>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};


export type QuerygetTravelsByCompanyArgs = {
  companyId: Scalars['Int']['input'];
};

export type RegisterAsCustomerInput = {
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  password: Scalars['String']['input'];
  phoneNumber: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type Seat = {
  __typename?: 'Seat';
  createdAt: Scalars['Timestamp']['output'];
  id: Scalars['Int']['output'];
  seatCost: SeatCost;
  seatCostId: Scalars['Int']['output'];
  status: Scalars['String']['output'];
  travelSessionId: Scalars['Int']['output'];
  updatedAt: Scalars['Timestamp']['output'];
};

export type SeatCost = {
  __typename?: 'SeatCost';
  cost: Scalars['Int']['output'];
  createdAt: Scalars['Timestamp']['output'];
  id: Scalars['Int']['output'];
  updatedAt: Scalars['Timestamp']['output'];
};

export type SeatCostInput = {
  cost: Scalars['Int']['input'];
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

export type Traveler = {
  __typename?: 'Traveler';
  createdAt: Scalars['Timestamp']['output'];
  dateOfBirth: Scalars['Timestamp']['output'];
  email: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  orderId: Scalars['Int']['output'];
  phoneNumber: Scalars['String']['output'];
  seat: Seat;
  seatId: Scalars['Int']['output'];
  updatedAt: Scalars['Timestamp']['output'];
};

export type TravelsResult = {
  __typename?: 'TravelsResult';
  hasMore: Scalars['Boolean']['output'];
  total: Scalars['Int']['output'];
  travels: Array<Travel>;
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

export type UpdateGuideInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  profileImage?: InputMaybe<Scalars['String']['input']>;
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
  AgendaItemInput: AgendaItemInput;
  Category: ResolverTypeWrapper<Category>;
  Company: ResolverTypeWrapper<Company>;
  CreateAgendaInput: CreateAgendaInput;
  CreateCompanyInput: CreateCompanyInput;
  CreateCustomerInput: CreateCustomerInput;
  CreateGuideInput: CreateGuideInput;
  CreateTravelInput: CreateTravelInput;
  CreateTravelSessionInput: CreateTravelSessionInput;
  Customer: ResolverTypeWrapper<Customer>;
  Destination: ResolverTypeWrapper<Destination>;
  GetTravelsFilterInput: GetTravelsFilterInput;
  Guide: ResolverTypeWrapper<Guide>;
  LoginAsCompanyResponse: ResolverTypeWrapper<LoginAsCompanyResponse>;
  LoginAsCustomerResponse: ResolverTypeWrapper<LoginAsCustomerResponse>;
  Mutation: ResolverTypeWrapper<Record<PropertyKey, never>>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Order: ResolverTypeWrapper<Order>;
  Payment: ResolverTypeWrapper<Payment>;
  Query: ResolverTypeWrapper<Record<PropertyKey, never>>;
  RegisterAsCustomerInput: RegisterAsCustomerInput;
  Seat: ResolverTypeWrapper<Seat>;
  SeatCost: ResolverTypeWrapper<SeatCost>;
  SeatCostInput: SeatCostInput;
  SubCategory: ResolverTypeWrapper<SubCategory>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Timestamp: ResolverTypeWrapper<Scalars['Timestamp']['output']>;
  Travel: ResolverTypeWrapper<Travel>;
  TravelSession: ResolverTypeWrapper<TravelSession>;
  Traveler: ResolverTypeWrapper<Traveler>;
  TravelsResult: ResolverTypeWrapper<TravelsResult>;
  UpdateCompanyInput: UpdateCompanyInput;
  UpdateCustomerInput: UpdateCustomerInput;
  UpdateGuideInput: UpdateGuideInput;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Agenda: Agenda;
  String: Scalars['String']['output'];
  Int: Scalars['Int']['output'];
  AgendaItemInput: AgendaItemInput;
  Category: Category;
  Company: Company;
  CreateAgendaInput: CreateAgendaInput;
  CreateCompanyInput: CreateCompanyInput;
  CreateCustomerInput: CreateCustomerInput;
  CreateGuideInput: CreateGuideInput;
  CreateTravelInput: CreateTravelInput;
  CreateTravelSessionInput: CreateTravelSessionInput;
  Customer: Customer;
  Destination: Destination;
  GetTravelsFilterInput: GetTravelsFilterInput;
  Guide: Guide;
  LoginAsCompanyResponse: LoginAsCompanyResponse;
  LoginAsCustomerResponse: LoginAsCustomerResponse;
  Mutation: Record<PropertyKey, never>;
  Boolean: Scalars['Boolean']['output'];
  Order: Order;
  Payment: Payment;
  Query: Record<PropertyKey, never>;
  RegisterAsCustomerInput: RegisterAsCustomerInput;
  Seat: Seat;
  SeatCost: SeatCost;
  SeatCostInput: SeatCostInput;
  SubCategory: SubCategory;
  ID: Scalars['ID']['output'];
  Timestamp: Scalars['Timestamp']['output'];
  Travel: Travel;
  TravelSession: TravelSession;
  Traveler: Traveler;
  TravelsResult: TravelsResult;
  UpdateCompanyInput: UpdateCompanyInput;
  UpdateCustomerInput: UpdateCustomerInput;
  UpdateGuideInput: UpdateGuideInput;
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
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
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
  createGuide?: Resolver<ResolversTypes['Guide'], ParentType, ContextType, RequireFields<MutationcreateGuideArgs, 'input'>>;
  createTravel?: Resolver<ResolversTypes['Travel'], ParentType, ContextType, RequireFields<MutationcreateTravelArgs, 'input'>>;
  deleteCompany?: Resolver<ResolversTypes['Company'], ParentType, ContextType, RequireFields<MutationdeleteCompanyArgs, 'id'>>;
  deleteCustomer?: Resolver<ResolversTypes['Customer'], ParentType, ContextType, RequireFields<MutationdeleteCustomerArgs, 'id'>>;
  deleteGuide?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationdeleteGuideArgs, 'id'>>;
  deleteTravel?: Resolver<ResolversTypes['Travel'], ParentType, ContextType, RequireFields<MutationdeleteTravelArgs, 'id'>>;
  loginAsCompany?: Resolver<ResolversTypes['LoginAsCompanyResponse'], ParentType, ContextType, RequireFields<MutationloginAsCompanyArgs, 'password' | 'username'>>;
  loginAsCustomer?: Resolver<ResolversTypes['LoginAsCustomerResponse'], ParentType, ContextType, RequireFields<MutationloginAsCustomerArgs, 'password' | 'username'>>;
  registerAsCustomer?: Resolver<ResolversTypes['LoginAsCustomerResponse'], ParentType, ContextType, RequireFields<MutationregisterAsCustomerArgs, 'input'>>;
  updateCompany?: Resolver<ResolversTypes['Company'], ParentType, ContextType, RequireFields<MutationupdateCompanyArgs, 'input'>>;
  updateCustomer?: Resolver<ResolversTypes['Customer'], ParentType, ContextType, RequireFields<MutationupdateCustomerArgs, 'input'>>;
  updateGuide?: Resolver<ResolversTypes['Guide'], ParentType, ContextType, RequireFields<MutationupdateGuideArgs, 'id' | 'input'>>;
  updateTravel?: Resolver<ResolversTypes['Travel'], ParentType, ContextType, RequireFields<MutationupdateTravelArgs, 'id' | 'input'>>;
};

export type OrderResolvers<ContextType = any, ParentType extends ResolversParentTypes['Order'] = ResolversParentTypes['Order']> = {
  createdAt?: Resolver<ResolversTypes['Timestamp'], ParentType, ContextType>;
  customer?: Resolver<ResolversTypes['Customer'], ParentType, ContextType>;
  customerId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  orderStatus?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  payment?: Resolver<ResolversTypes['Payment'], ParentType, ContextType>;
  paymentId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  totalPrice?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  totalSeats?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  travelSession?: Resolver<ResolversTypes['TravelSession'], ParentType, ContextType>;
  travelSessionId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  travelers?: Resolver<Array<ResolversTypes['Traveler']>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Timestamp'], ParentType, ContextType>;
};

export type PaymentResolvers<ContextType = any, ParentType extends ResolversParentTypes['Payment'] = ResolversParentTypes['Payment']> = {
  createdAt?: Resolver<ResolversTypes['Timestamp'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  isPaid?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  paidAt?: Resolver<Maybe<ResolversTypes['Timestamp']>, ParentType, ContextType>;
  total?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Timestamp'], ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  getCategories?: Resolver<Array<ResolversTypes['Category']>, ParentType, ContextType>;
  getCompanies?: Resolver<Array<ResolversTypes['Company']>, ParentType, ContextType>;
  getCompany?: Resolver<ResolversTypes['Company'], ParentType, ContextType, RequireFields<QuerygetCompanyArgs, 'id'>>;
  getCustomer?: Resolver<ResolversTypes['Customer'], ParentType, ContextType, RequireFields<QuerygetCustomerArgs, 'id'>>;
  getDestinations?: Resolver<Array<ResolversTypes['Destination']>, ParentType, ContextType>;
  getGuidesByCompany?: Resolver<Array<ResolversTypes['Guide']>, ParentType, ContextType, RequireFields<QuerygetGuidesByCompanyArgs, 'companyId'>>;
  getMeAsCompany?: Resolver<ResolversTypes['Company'], ParentType, ContextType>;
  getMeAsCustomer?: Resolver<ResolversTypes['Customer'], ParentType, ContextType>;
  getOrder?: Resolver<ResolversTypes['Order'], ParentType, ContextType, RequireFields<QuerygetOrderArgs, 'id'>>;
  getOrders?: Resolver<Array<ResolversTypes['Order']>, ParentType, ContextType>;
  getOrdersByCompany?: Resolver<Array<ResolversTypes['Order']>, ParentType, ContextType, RequireFields<QuerygetOrdersByCompanyArgs, 'companyId'>>;
  getOrdersByCustomer?: Resolver<Array<ResolversTypes['Order']>, ParentType, ContextType, RequireFields<QuerygetOrdersByCustomerArgs, 'customerId'>>;
  getOrdersByTravelSession?: Resolver<Array<ResolversTypes['Order']>, ParentType, ContextType, RequireFields<QuerygetOrdersByTravelSessionArgs, 'travelSessionId'>>;
  getPayment?: Resolver<ResolversTypes['Payment'], ParentType, ContextType, RequireFields<QuerygetPaymentArgs, 'id'>>;
  getSeat?: Resolver<ResolversTypes['Seat'], ParentType, ContextType, RequireFields<QuerygetSeatArgs, 'id'>>;
  getSeatCost?: Resolver<ResolversTypes['SeatCost'], ParentType, ContextType, RequireFields<QuerygetSeatCostArgs, 'id'>>;
  getSeatCosts?: Resolver<Array<ResolversTypes['SeatCost']>, ParentType, ContextType>;
  getSeatsByTravelSession?: Resolver<Array<ResolversTypes['Seat']>, ParentType, ContextType, RequireFields<QuerygetSeatsByTravelSessionArgs, 'travelSessionId'>>;
  getSubCategories?: Resolver<Array<ResolversTypes['SubCategory']>, ParentType, ContextType>;
  getSubCategoriesByCategory?: Resolver<Array<ResolversTypes['SubCategory']>, ParentType, ContextType, RequireFields<QuerygetSubCategoriesByCategoryArgs, 'categoryId'>>;
  getSubCategory?: Resolver<ResolversTypes['SubCategory'], ParentType, ContextType, RequireFields<QuerygetSubCategoryArgs, 'id'>>;
  getTravel?: Resolver<ResolversTypes['Travel'], ParentType, ContextType, RequireFields<QuerygetTravelArgs, 'id'>>;
  getTraveler?: Resolver<ResolversTypes['Traveler'], ParentType, ContextType, RequireFields<QuerygetTravelerArgs, 'id'>>;
  getTravelersByOrder?: Resolver<Array<ResolversTypes['Traveler']>, ParentType, ContextType, RequireFields<QuerygetTravelersByOrderArgs, 'orderId'>>;
  getTravels?: Resolver<ResolversTypes['TravelsResult'], ParentType, ContextType, RequireFields<QuerygetTravelsArgs, 'limit' | 'page'>>;
  getTravelsByCompany?: Resolver<Array<ResolversTypes['Travel']>, ParentType, ContextType, RequireFields<QuerygetTravelsByCompanyArgs, 'companyId'>>;
};

export type SeatResolvers<ContextType = any, ParentType extends ResolversParentTypes['Seat'] = ResolversParentTypes['Seat']> = {
  createdAt?: Resolver<ResolversTypes['Timestamp'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  seatCost?: Resolver<ResolversTypes['SeatCost'], ParentType, ContextType>;
  seatCostId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  travelSessionId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Timestamp'], ParentType, ContextType>;
};

export type SeatCostResolvers<ContextType = any, ParentType extends ResolversParentTypes['SeatCost'] = ResolversParentTypes['SeatCost']> = {
  cost?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Timestamp'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Timestamp'], ParentType, ContextType>;
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

export type TravelerResolvers<ContextType = any, ParentType extends ResolversParentTypes['Traveler'] = ResolversParentTypes['Traveler']> = {
  createdAt?: Resolver<ResolversTypes['Timestamp'], ParentType, ContextType>;
  dateOfBirth?: Resolver<ResolversTypes['Timestamp'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  orderId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  phoneNumber?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  seat?: Resolver<ResolversTypes['Seat'], ParentType, ContextType>;
  seatId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Timestamp'], ParentType, ContextType>;
};

export type TravelsResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['TravelsResult'] = ResolversParentTypes['TravelsResult']> = {
  hasMore?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  total?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  travels?: Resolver<Array<ResolversTypes['Travel']>, ParentType, ContextType>;
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
  Order?: OrderResolvers<ContextType>;
  Payment?: PaymentResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Seat?: SeatResolvers<ContextType>;
  SeatCost?: SeatCostResolvers<ContextType>;
  SubCategory?: SubCategoryResolvers<ContextType>;
  Timestamp?: GraphQLScalarType;
  Travel?: TravelResolvers<ContextType>;
  TravelSession?: TravelSessionResolvers<ContextType>;
  Traveler?: TravelerResolvers<ContextType>;
  TravelsResult?: TravelsResultResolvers<ContextType>;
};

