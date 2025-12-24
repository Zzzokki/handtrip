import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null | undefined;
export type InputMaybe<T> = T | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
export type EnumResolverSignature<T, AllowedValues = any> = { [key in keyof T]?: AllowedValues };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Timestamp: { input: Date | string | number; output: Date | string | number; }
};

export type Agenda = {
  __typename?: 'Agenda';
  createdAt: Scalars['Timestamp']['output'];
  day: Scalars['Int']['output'];
  description: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  travelId: Scalars['Int']['output'];
  updatedAt: Scalars['Timestamp']['output'];
};

export type AgendaItemInput = {
  day: Scalars['Int']['input'];
  description: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type Category = {
  __typename?: 'Category';
  createdAt: Scalars['Timestamp']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  subCategories?: Maybe<Array<SubCategory>>;
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

export type CreateGuideInput = {
  description: Scalars['String']['input'];
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  phoneNumber: Scalars['String']['input'];
  profileImage: Scalars['String']['input'];
};

export type CreateOrderInput = {
  paymentIntentId: Scalars['String']['input'];
  travelSessionId: Scalars['Int']['input'];
  travelers: Array<TravelerInput>;
};

export type CreateOrderResponse = {
  __typename?: 'CreateOrderResponse';
  message: Scalars['String']['output'];
  order: Order;
  success: Scalars['Boolean']['output'];
};

export type CreateTravelInput = {
  agendas: Array<AgendaItemInput>;
  coverImage: Scalars['String']['input'];
  description: Scalars['String']['input'];
  destinationId: Scalars['Int']['input'];
  duration: Scalars['Int']['input'];
  gallery: Array<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  subCategoryIds: Array<Scalars['Int']['input']>;
  totalSeatNumber: Scalars['Int']['input'];
  travelSessions: Array<CreateTravelSessionInput>;
};

export type CreateTravelSessionInput = {
  endDate: Scalars['Timestamp']['input'];
  guideId: Scalars['Int']['input'];
  seatCost: Scalars['Int']['input'];
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

export type GetTravelsByCompanyInput = {
  filters?: InputMaybe<GetTravelsFilterInput>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};

export type GetTravelsByCompanyResult = {
  __typename?: 'GetTravelsByCompanyResult';
  currentPage: Scalars['Int']['output'];
  totalPages: Scalars['Int']['output'];
  totalTravels: Scalars['Int']['output'];
  travels: Array<Travel>;
};

export type GetTravelsFilterInput = {
  destinationIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  maxDuration?: InputMaybe<Scalars['Int']['input']>;
  maxPrice?: InputMaybe<Scalars['Int']['input']>;
  minDuration?: InputMaybe<Scalars['Int']['input']>;
  minPrice?: InputMaybe<Scalars['Int']['input']>;
  query?: InputMaybe<Scalars['String']['input']>;
  subCategoryIds?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type GetTravelsInput = {
  filters?: InputMaybe<GetTravelsFilterInput>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};

export type GetTravelsResult = {
  __typename?: 'GetTravelsResult';
  currentPage: Scalars['Int']['output'];
  totalPages: Scalars['Int']['output'];
  totalTravels: Scalars['Int']['output'];
  travels: Array<Travel>;
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
  createOrder: CreateOrderResponse;
  createTravelByCompany: Travel;
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


export type MutationcreateOrderArgs = {
  input: CreateOrderInput;
};


export type MutationcreateTravelByCompanyArgs = {
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
  stripePaymentIntentId?: Maybe<Scalars['String']['output']>;
  stripePaymentMethod?: Maybe<Scalars['String']['output']>;
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
  getGuideByCompany: Guide;
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
  getTravels: GetTravelsResult;
  getTravelsByCompany: GetTravelsByCompanyResult;
};


export type QuerygetCompanyArgs = {
  id: Scalars['Int']['input'];
};


export type QuerygetCustomerArgs = {
  id: Scalars['Int']['input'];
};


export type QuerygetGuideByCompanyArgs = {
  id: Scalars['Int']['input'];
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
  input: GetTravelsInput;
};


export type QuerygetTravelsByCompanyArgs = {
  input: GetTravelsByCompanyInput;
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
  status: SeatStatus;
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

export type SeatStatus =
  | 'AVAILABLE'
  | 'OCCUPIED'
  | 'RESERVED';

export type SubCategory = {
  __typename?: 'SubCategory';
  categoryId: Scalars['Int']['output'];
  createdAt: Scalars['Timestamp']['output'];
  id: Scalars['Int']['output'];
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
  gallery: Array<Scalars['String']['output']>;
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

export type TravelerInput = {
  dateOfBirth: Scalars['Timestamp']['input'];
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  phoneNumber: Scalars['String']['input'];
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
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  AgendaItemInput: AgendaItemInput;
  Category: ResolverTypeWrapper<Category>;
  Company: ResolverTypeWrapper<Company>;
  CreateCompanyInput: CreateCompanyInput;
  CreateCustomerInput: CreateCustomerInput;
  CreateGuideInput: CreateGuideInput;
  CreateOrderInput: CreateOrderInput;
  CreateOrderResponse: ResolverTypeWrapper<Omit<CreateOrderResponse, 'order'> & { order: ResolversTypes['Order'] }>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  CreateTravelInput: CreateTravelInput;
  CreateTravelSessionInput: CreateTravelSessionInput;
  Customer: ResolverTypeWrapper<Customer>;
  Destination: ResolverTypeWrapper<Destination>;
  GetTravelsByCompanyInput: GetTravelsByCompanyInput;
  GetTravelsByCompanyResult: ResolverTypeWrapper<GetTravelsByCompanyResult>;
  GetTravelsFilterInput: GetTravelsFilterInput;
  GetTravelsInput: GetTravelsInput;
  GetTravelsResult: ResolverTypeWrapper<GetTravelsResult>;
  Guide: ResolverTypeWrapper<Guide>;
  LoginAsCompanyResponse: ResolverTypeWrapper<LoginAsCompanyResponse>;
  LoginAsCustomerResponse: ResolverTypeWrapper<LoginAsCustomerResponse>;
  Mutation: ResolverTypeWrapper<Record<PropertyKey, never>>;
  Order: ResolverTypeWrapper<Omit<Order, 'travelers'> & { travelers: Array<ResolversTypes['Traveler']> }>;
  Payment: ResolverTypeWrapper<Payment>;
  Query: ResolverTypeWrapper<Record<PropertyKey, never>>;
  RegisterAsCustomerInput: RegisterAsCustomerInput;
  Seat: ResolverTypeWrapper<Omit<Seat, 'status'> & { status: ResolversTypes['SeatStatus'] }>;
  SeatCost: ResolverTypeWrapper<SeatCost>;
  SeatStatus: ResolverTypeWrapper<'AVAILABLE' | 'RESERVED' | 'OCCUPIED'>;
  SubCategory: ResolverTypeWrapper<SubCategory>;
  Timestamp: ResolverTypeWrapper<Scalars['Timestamp']['output']>;
  Travel: ResolverTypeWrapper<Travel>;
  TravelSession: ResolverTypeWrapper<TravelSession>;
  Traveler: ResolverTypeWrapper<Omit<Traveler, 'seat'> & { seat: ResolversTypes['Seat'] }>;
  TravelerInput: TravelerInput;
  UpdateCompanyInput: UpdateCompanyInput;
  UpdateCustomerInput: UpdateCustomerInput;
  UpdateGuideInput: UpdateGuideInput;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Agenda: Agenda;
  Int: Scalars['Int']['output'];
  String: Scalars['String']['output'];
  AgendaItemInput: AgendaItemInput;
  Category: Category;
  Company: Company;
  CreateCompanyInput: CreateCompanyInput;
  CreateCustomerInput: CreateCustomerInput;
  CreateGuideInput: CreateGuideInput;
  CreateOrderInput: CreateOrderInput;
  CreateOrderResponse: Omit<CreateOrderResponse, 'order'> & { order: ResolversParentTypes['Order'] };
  Boolean: Scalars['Boolean']['output'];
  CreateTravelInput: CreateTravelInput;
  CreateTravelSessionInput: CreateTravelSessionInput;
  Customer: Customer;
  Destination: Destination;
  GetTravelsByCompanyInput: GetTravelsByCompanyInput;
  GetTravelsByCompanyResult: GetTravelsByCompanyResult;
  GetTravelsFilterInput: GetTravelsFilterInput;
  GetTravelsInput: GetTravelsInput;
  GetTravelsResult: GetTravelsResult;
  Guide: Guide;
  LoginAsCompanyResponse: LoginAsCompanyResponse;
  LoginAsCustomerResponse: LoginAsCustomerResponse;
  Mutation: Record<PropertyKey, never>;
  Order: Omit<Order, 'travelers'> & { travelers: Array<ResolversParentTypes['Traveler']> };
  Payment: Payment;
  Query: Record<PropertyKey, never>;
  RegisterAsCustomerInput: RegisterAsCustomerInput;
  Seat: Seat;
  SeatCost: SeatCost;
  SubCategory: SubCategory;
  Timestamp: Scalars['Timestamp']['output'];
  Travel: Travel;
  TravelSession: TravelSession;
  Traveler: Omit<Traveler, 'seat'> & { seat: ResolversParentTypes['Seat'] };
  TravelerInput: TravelerInput;
  UpdateCompanyInput: UpdateCompanyInput;
  UpdateCustomerInput: UpdateCustomerInput;
  UpdateGuideInput: UpdateGuideInput;
};

export type AgendaResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Agenda'] = ResolversParentTypes['Agenda']> = {
  createdAt?: Resolver<ResolversTypes['Timestamp'], ParentType, ContextType>;
  day?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  travelId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Timestamp'], ParentType, ContextType>;
};

export type CategoryResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Category'] = ResolversParentTypes['Category']> = {
  createdAt?: Resolver<ResolversTypes['Timestamp'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  subCategories?: Resolver<Maybe<Array<ResolversTypes['SubCategory']>>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Timestamp'], ParentType, ContextType>;
};

export type CompanyResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Company'] = ResolversParentTypes['Company']> = {
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

export type CreateOrderResponseResolvers<ContextType = Context, ParentType extends ResolversParentTypes['CreateOrderResponse'] = ResolversParentTypes['CreateOrderResponse']> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  order?: Resolver<ResolversTypes['Order'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
};

export type CustomerResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Customer'] = ResolversParentTypes['Customer']> = {
  createdAt?: Resolver<ResolversTypes['Timestamp'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  firstName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  lastName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  phoneNumber?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Timestamp'], ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type DestinationResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Destination'] = ResolversParentTypes['Destination']> = {
  createdAt?: Resolver<ResolversTypes['Timestamp'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  location?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Timestamp'], ParentType, ContextType>;
};

export type GetTravelsByCompanyResultResolvers<ContextType = Context, ParentType extends ResolversParentTypes['GetTravelsByCompanyResult'] = ResolversParentTypes['GetTravelsByCompanyResult']> = {
  currentPage?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  totalPages?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  totalTravels?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  travels?: Resolver<Array<ResolversTypes['Travel']>, ParentType, ContextType>;
};

export type GetTravelsResultResolvers<ContextType = Context, ParentType extends ResolversParentTypes['GetTravelsResult'] = ResolversParentTypes['GetTravelsResult']> = {
  currentPage?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  totalPages?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  totalTravels?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  travels?: Resolver<Array<ResolversTypes['Travel']>, ParentType, ContextType>;
};

export type GuideResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Guide'] = ResolversParentTypes['Guide']> = {
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

export type LoginAsCompanyResponseResolvers<ContextType = Context, ParentType extends ResolversParentTypes['LoginAsCompanyResponse'] = ResolversParentTypes['LoginAsCompanyResponse']> = {
  company?: Resolver<ResolversTypes['Company'], ParentType, ContextType>;
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type LoginAsCustomerResponseResolvers<ContextType = Context, ParentType extends ResolversParentTypes['LoginAsCustomerResponse'] = ResolversParentTypes['LoginAsCustomerResponse']> = {
  customer?: Resolver<ResolversTypes['Customer'], ParentType, ContextType>;
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type MutationResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createCompany?: Resolver<ResolversTypes['Company'], ParentType, ContextType, RequireFields<MutationcreateCompanyArgs, 'input'>>;
  createCustomer?: Resolver<ResolversTypes['Customer'], ParentType, ContextType, RequireFields<MutationcreateCustomerArgs, 'input'>>;
  createDestination?: Resolver<ResolversTypes['Destination'], ParentType, ContextType, RequireFields<MutationcreateDestinationArgs, 'location' | 'name'>>;
  createGuide?: Resolver<ResolversTypes['Guide'], ParentType, ContextType, RequireFields<MutationcreateGuideArgs, 'input'>>;
  createOrder?: Resolver<ResolversTypes['CreateOrderResponse'], ParentType, ContextType, RequireFields<MutationcreateOrderArgs, 'input'>>;
  createTravelByCompany?: Resolver<ResolversTypes['Travel'], ParentType, ContextType, RequireFields<MutationcreateTravelByCompanyArgs, 'input'>>;
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

export type OrderResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Order'] = ResolversParentTypes['Order']> = {
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

export type PaymentResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Payment'] = ResolversParentTypes['Payment']> = {
  createdAt?: Resolver<ResolversTypes['Timestamp'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  isPaid?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  paidAt?: Resolver<Maybe<ResolversTypes['Timestamp']>, ParentType, ContextType>;
  stripePaymentIntentId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  stripePaymentMethod?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  total?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Timestamp'], ParentType, ContextType>;
};

export type QueryResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  getCategories?: Resolver<Array<ResolversTypes['Category']>, ParentType, ContextType>;
  getCompanies?: Resolver<Array<ResolversTypes['Company']>, ParentType, ContextType>;
  getCompany?: Resolver<ResolversTypes['Company'], ParentType, ContextType, RequireFields<QuerygetCompanyArgs, 'id'>>;
  getCustomer?: Resolver<ResolversTypes['Customer'], ParentType, ContextType, RequireFields<QuerygetCustomerArgs, 'id'>>;
  getDestinations?: Resolver<Array<ResolversTypes['Destination']>, ParentType, ContextType>;
  getGuideByCompany?: Resolver<ResolversTypes['Guide'], ParentType, ContextType, RequireFields<QuerygetGuideByCompanyArgs, 'id'>>;
  getGuidesByCompany?: Resolver<Array<ResolversTypes['Guide']>, ParentType, ContextType>;
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
  getTravels?: Resolver<ResolversTypes['GetTravelsResult'], ParentType, ContextType, RequireFields<QuerygetTravelsArgs, 'input'>>;
  getTravelsByCompany?: Resolver<ResolversTypes['GetTravelsByCompanyResult'], ParentType, ContextType, RequireFields<QuerygetTravelsByCompanyArgs, 'input'>>;
};

export type SeatResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Seat'] = ResolversParentTypes['Seat']> = {
  createdAt?: Resolver<ResolversTypes['Timestamp'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  seatCost?: Resolver<ResolversTypes['SeatCost'], ParentType, ContextType>;
  seatCostId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['SeatStatus'], ParentType, ContextType>;
  travelSessionId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Timestamp'], ParentType, ContextType>;
};

export type SeatCostResolvers<ContextType = Context, ParentType extends ResolversParentTypes['SeatCost'] = ResolversParentTypes['SeatCost']> = {
  cost?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Timestamp'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Timestamp'], ParentType, ContextType>;
};

export type SeatStatusResolvers = EnumResolverSignature<{ AVAILABLE?: any, OCCUPIED?: any, RESERVED?: any }, ResolversTypes['SeatStatus']>;

export type SubCategoryResolvers<ContextType = Context, ParentType extends ResolversParentTypes['SubCategory'] = ResolversParentTypes['SubCategory']> = {
  categoryId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Timestamp'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Timestamp'], ParentType, ContextType>;
};

export interface TimestampScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Timestamp'], any> {
  name: 'Timestamp';
}

export type TravelResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Travel'] = ResolversParentTypes['Travel']> = {
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
  gallery?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  subCategories?: Resolver<Array<ResolversTypes['SubCategory']>, ParentType, ContextType>;
  totalSeatNumber?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  travelSessions?: Resolver<Array<ResolversTypes['TravelSession']>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Timestamp'], ParentType, ContextType>;
};

export type TravelSessionResolvers<ContextType = Context, ParentType extends ResolversParentTypes['TravelSession'] = ResolversParentTypes['TravelSession']> = {
  createdAt?: Resolver<ResolversTypes['Timestamp'], ParentType, ContextType>;
  endDate?: Resolver<ResolversTypes['Timestamp'], ParentType, ContextType>;
  guide?: Resolver<ResolversTypes['Guide'], ParentType, ContextType>;
  guideId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  startDate?: Resolver<ResolversTypes['Timestamp'], ParentType, ContextType>;
  travelId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Timestamp'], ParentType, ContextType>;
};

export type TravelerResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Traveler'] = ResolversParentTypes['Traveler']> = {
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

export type Resolvers<ContextType = Context> = {
  Agenda?: AgendaResolvers<ContextType>;
  Category?: CategoryResolvers<ContextType>;
  Company?: CompanyResolvers<ContextType>;
  CreateOrderResponse?: CreateOrderResponseResolvers<ContextType>;
  Customer?: CustomerResolvers<ContextType>;
  Destination?: DestinationResolvers<ContextType>;
  GetTravelsByCompanyResult?: GetTravelsByCompanyResultResolvers<ContextType>;
  GetTravelsResult?: GetTravelsResultResolvers<ContextType>;
  Guide?: GuideResolvers<ContextType>;
  LoginAsCompanyResponse?: LoginAsCompanyResponseResolvers<ContextType>;
  LoginAsCustomerResponse?: LoginAsCustomerResponseResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Order?: OrderResolvers<ContextType>;
  Payment?: PaymentResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Seat?: SeatResolvers<ContextType>;
  SeatCost?: SeatCostResolvers<ContextType>;
  SeatStatus?: SeatStatusResolvers;
  SubCategory?: SubCategoryResolvers<ContextType>;
  Timestamp?: GraphQLScalarType;
  Travel?: TravelResolvers<ContextType>;
  TravelSession?: TravelSessionResolvers<ContextType>;
  Traveler?: TravelerResolvers<ContextType>;
};

