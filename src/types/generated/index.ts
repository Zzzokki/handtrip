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

export type Admin = {
  __typename?: 'Admin';
  createdAt: Scalars['Timestamp']['output'];
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  lastName: Scalars['String']['output'];
  updatedAt: Scalars['Timestamp']['output'];
  username: Scalars['String']['output'];
};

export type AdminStats = {
  __typename?: 'AdminStats';
  activeOrders: Scalars['Int']['output'];
  pendingCompanies: Scalars['Int']['output'];
  todayOrders: Scalars['Int']['output'];
  todayRevenue: Scalars['Float']['output'];
  totalRevenue: Scalars['Float']['output'];
  totalUsers: Scalars['Int']['output'];
  verifiedCompanies: Scalars['Int']['output'];
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

export type CancelOrderResponse = {
  __typename?: 'CancelOrderResponse';
  message: Scalars['String']['output'];
  order: Order;
  success: Scalars['Boolean']['output'];
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
  paymentIntentId?: InputMaybe<Scalars['String']['input']>;
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
  companyId?: InputMaybe<Scalars['Int']['input']>;
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

export type LoginAsAdminResponse = {
  __typename?: 'LoginAsAdminResponse';
  admin: Admin;
  token: Scalars['String']['output'];
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

export type LoginAsManagerResponse = {
  __typename?: 'LoginAsManagerResponse';
  manager: Manager;
  token: Scalars['String']['output'];
};

export type Manager = {
  __typename?: 'Manager';
  company?: Maybe<Company>;
  companyId?: Maybe<Scalars['Int']['output']>;
  createdAt: Scalars['Timestamp']['output'];
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  lastName: Scalars['String']['output'];
  phoneNumber?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['Timestamp']['output'];
  username: Scalars['String']['output'];
};

export type ManagerStats = {
  __typename?: 'ManagerStats';
  activeTravels: Scalars['Int']['output'];
  pendingCompanies: Scalars['Int']['output'];
  todayOrders: Scalars['Int']['output'];
  totalCompanies: Scalars['Int']['output'];
  totalOrders: Scalars['Int']['output'];
  totalRevenue: Scalars['Float']['output'];
  totalUsers: Scalars['Int']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  cancelOrder: CancelOrderResponse;
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
  loginAsAdmin: LoginAsAdminResponse;
  loginAsCompany: LoginAsCompanyResponse;
  loginAsCustomer: LoginAsCustomerResponse;
  loginAsManager: LoginAsManagerResponse;
  registerAsCustomer: LoginAsCustomerResponse;
  updateCompany: Company;
  updateCustomer: Customer;
  updateGuide: Guide;
  updateOrderPayment: UpdateOrderPaymentResponse;
  updatePaymentIntent: UpdatePaymentIntentResponse;
  updateTravel: Travel;
};


export type MutationCancelOrderArgs = {
  orderId: Scalars['Int']['input'];
};


export type MutationCreateCompanyArgs = {
  input: CreateCompanyInput;
};


export type MutationCreateCustomerArgs = {
  input: CreateCustomerInput;
};


export type MutationCreateDestinationArgs = {
  location: Scalars['String']['input'];
  name: Scalars['String']['input'];
};


export type MutationCreateGuideArgs = {
  input: CreateGuideInput;
};


export type MutationCreateOrderArgs = {
  input: CreateOrderInput;
};


export type MutationCreateTravelByCompanyArgs = {
  input: CreateTravelInput;
};


export type MutationDeleteCompanyArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteCustomerArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteGuideArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteTravelArgs = {
  id: Scalars['Int']['input'];
};


export type MutationLoginAsAdminArgs = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};


export type MutationLoginAsCompanyArgs = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};


export type MutationLoginAsCustomerArgs = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};


export type MutationLoginAsManagerArgs = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};


export type MutationRegisterAsCustomerArgs = {
  input: RegisterAsCustomerInput;
};


export type MutationUpdateCompanyArgs = {
  input: UpdateCompanyInput;
};


export type MutationUpdateCustomerArgs = {
  input: UpdateCustomerInput;
};


export type MutationUpdateGuideArgs = {
  id: Scalars['Int']['input'];
  input: UpdateGuideInput;
};


export type MutationUpdateOrderPaymentArgs = {
  orderId: Scalars['Int']['input'];
  paymentIntentId: Scalars['String']['input'];
};


export type MutationUpdatePaymentIntentArgs = {
  orderId: Scalars['Int']['input'];
  paymentIntentId: Scalars['String']['input'];
};


export type MutationUpdateTravelArgs = {
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
  getAdminStats: AdminStats;
  getCategories: Array<Category>;
  getCompanies: Array<Company>;
  getCompany: Company;
  getCustomer: Customer;
  getCustomers: Array<Customer>;
  getDestinations: Array<Destination>;
  getGuideByCompany: Guide;
  getGuidesByCompany: Array<Guide>;
  getManagerStats: ManagerStats;
  getMeAsAdmin: Admin;
  getMeAsCompany: Company;
  getMeAsCustomer: Customer;
  getMeAsManager: Manager;
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


export type QueryGetCompanyArgs = {
  id: Scalars['Int']['input'];
};


export type QueryGetCustomerArgs = {
  id: Scalars['Int']['input'];
};


export type QueryGetGuideByCompanyArgs = {
  id: Scalars['Int']['input'];
};


export type QueryGetOrderArgs = {
  id: Scalars['Int']['input'];
};


export type QueryGetOrdersByCompanyArgs = {
  companyId: Scalars['Int']['input'];
};


export type QueryGetOrdersByCustomerArgs = {
  customerId: Scalars['Int']['input'];
};


export type QueryGetOrdersByTravelSessionArgs = {
  travelSessionId: Scalars['Int']['input'];
};


export type QueryGetPaymentArgs = {
  id: Scalars['Int']['input'];
};


export type QueryGetSeatArgs = {
  id: Scalars['Int']['input'];
};


export type QueryGetSeatCostArgs = {
  id: Scalars['Int']['input'];
};


export type QueryGetSeatsByTravelSessionArgs = {
  travelSessionId: Scalars['Int']['input'];
};


export type QueryGetSubCategoriesByCategoryArgs = {
  categoryId: Scalars['Int']['input'];
};


export type QueryGetSubCategoryArgs = {
  id: Scalars['Int']['input'];
};


export type QueryGetTravelArgs = {
  id: Scalars['Int']['input'];
};


export type QueryGetTravelerArgs = {
  id: Scalars['Int']['input'];
};


export type QueryGetTravelersByOrderArgs = {
  orderId: Scalars['Int']['input'];
};


export type QueryGetTravelsArgs = {
  input: GetTravelsInput;
};


export type QueryGetTravelsByCompanyArgs = {
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

export enum SeatStatus {
  Available = 'available',
  Occupied = 'occupied',
  Reserved = 'reserved'
}

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
  seats: Array<Seat>;
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

export type UpdateOrderPaymentResponse = {
  __typename?: 'UpdateOrderPaymentResponse';
  message: Scalars['String']['output'];
  order: Order;
  success: Scalars['Boolean']['output'];
};

export type UpdatePaymentIntentResponse = {
  __typename?: 'UpdatePaymentIntentResponse';
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type GetMeAsAdminQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMeAsAdminQuery = { __typename?: 'Query', getMeAsAdmin: { __typename?: 'Admin', id: number, firstName: string, lastName: string, email: string, username: string, createdAt: any, updatedAt: any } };

export type GetMeAsManagerQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMeAsManagerQuery = { __typename?: 'Query', getMeAsManager: { __typename?: 'Manager', id: number, firstName: string, lastName: string, email: string, phoneNumber?: string | null, username: string, companyId?: number | null, createdAt: any, updatedAt: any, company?: { __typename?: 'Company', id: number, name: string, logo: string, email: string } | null } };

export type LoginAsCompanyMutationVariables = Exact<{
  username: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginAsCompanyMutation = { __typename?: 'Mutation', loginAsCompany: { __typename?: 'LoginAsCompanyResponse', token: string, company: { __typename?: 'Company', id: number, name: string, logo: string, coverImage: string, phoneNumber: string, email: string, description: string, createdAt: any, updatedAt: any } } };

export type LoginAsAdminMutationVariables = Exact<{
  username: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginAsAdminMutation = { __typename?: 'Mutation', loginAsAdmin: { __typename?: 'LoginAsAdminResponse', token: string, admin: { __typename?: 'Admin', id: number, firstName: string, lastName: string, email: string, username: string, createdAt: any, updatedAt: any } } };

export type LoginAsManagerMutationVariables = Exact<{
  username: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginAsManagerMutation = { __typename?: 'Mutation', loginAsManager: { __typename?: 'LoginAsManagerResponse', token: string, manager: { __typename?: 'Manager', id: number, firstName: string, lastName: string, email: string, phoneNumber?: string | null, username: string, companyId?: number | null, createdAt: any, updatedAt: any } } };

export type GetCustomerQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type GetCustomerQuery = { __typename?: 'Query', getCustomer: { __typename?: 'Customer', id: number, firstName: string, lastName: string, phoneNumber: string, email: string, username: string, createdAt: any, updatedAt: any } };

export type LoginAsCustomerMutationVariables = Exact<{
  username: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginAsCustomerMutation = { __typename?: 'Mutation', loginAsCustomer: { __typename?: 'LoginAsCustomerResponse', token: string, customer: { __typename?: 'Customer', id: number, firstName: string, lastName: string, phoneNumber: string, email: string, username: string, createdAt: any, updatedAt: any } } };

export type RegisterAsCustomerMutationVariables = Exact<{
  input: RegisterAsCustomerInput;
}>;


export type RegisterAsCustomerMutation = { __typename?: 'Mutation', registerAsCustomer: { __typename?: 'LoginAsCustomerResponse', token: string, customer: { __typename?: 'Customer', id: number, firstName: string, lastName: string, phoneNumber: string, email: string, username: string, createdAt: any, updatedAt: any } } };

export type GetCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCategoriesQuery = { __typename?: 'Query', getCategories: Array<{ __typename?: 'Category', id: number, name: string, createdAt: any, updatedAt: any, subCategories?: Array<{ __typename?: 'SubCategory', id: number, name: string, categoryId: number, createdAt: any, updatedAt: any }> | null }> };

export type GetSubCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSubCategoriesQuery = { __typename?: 'Query', getSubCategories: Array<{ __typename?: 'SubCategory', id: number, name: string, categoryId: number, createdAt: any, updatedAt: any }> };

export type GetSubCategoriesByCategoryQueryVariables = Exact<{
  categoryId: Scalars['Int']['input'];
}>;


export type GetSubCategoriesByCategoryQuery = { __typename?: 'Query', getSubCategoriesByCategory: Array<{ __typename?: 'SubCategory', id: number, name: string, categoryId: number, createdAt: any, updatedAt: any }> };

export type GetCompaniesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCompaniesQuery = { __typename?: 'Query', getCompanies: Array<{ __typename?: 'Company', id: number, name: string, logo: string, coverImage: string, phoneNumber: string, email: string, description: string, username: string, createdAt: any, updatedAt: any }> };

export type GetCompanyQueryVariables = Exact<{
  getCompanyId: Scalars['Int']['input'];
}>;


export type GetCompanyQuery = { __typename?: 'Query', getCompany: { __typename?: 'Company', id: number, name: string, logo: string, coverImage: string, phoneNumber: string, email: string, description: string, username: string, createdAt: any, updatedAt: any } };

export type GetCustomersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCustomersQuery = { __typename?: 'Query', getCustomers: Array<{ __typename?: 'Customer', id: number, firstName: string, lastName: string, phoneNumber: string, email: string, username: string, createdAt: any, updatedAt: any }> };

export type GetDestinationsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetDestinationsQuery = { __typename?: 'Query', getDestinations: Array<{ __typename?: 'Destination', id: number, name: string, location: string, createdAt: any, updatedAt: any }> };

export type CreateDestinationMutationVariables = Exact<{
  name: Scalars['String']['input'];
  location: Scalars['String']['input'];
}>;


export type CreateDestinationMutation = { __typename?: 'Mutation', createDestination: { __typename?: 'Destination', id: number, name: string, location: string, createdAt: any, updatedAt: any } };

export type CustomerFieldsFragment = { __typename?: 'Customer', id: number, firstName: string, lastName: string, phoneNumber: string, email: string, username: string, createdAt: any, updatedAt: any };

export type CompanyFieldsFragment = { __typename?: 'Company', id: number, name: string, logo: string, coverImage: string, phoneNumber: string, email: string, description: string, username: string, createdAt: any, updatedAt: any };

export type CategoryFieldsFragment = { __typename?: 'Category', id: number, name: string, createdAt: any, updatedAt: any };

export type SubCategoryFieldsFragment = { __typename?: 'SubCategory', id: number, name: string, categoryId: number, createdAt: any, updatedAt: any };

export type DestinationFieldsFragment = { __typename?: 'Destination', id: number, name: string, location: string, createdAt: any, updatedAt: any };

export type AgendaFieldsFragment = { __typename?: 'Agenda', id: number, day: number, name: string, description: string, travelId: number, createdAt: any, updatedAt: any };

export type GuideFieldsFragment = { __typename?: 'Guide', id: number, name: string, description: string, email: string, phoneNumber: string, profileImage: string, companyId: number, createdAt: any, updatedAt: any };

export type TravelSessionFieldsFragment = { __typename?: 'TravelSession', id: number, startDate: any, endDate: any, travelId: number, guideId: number, createdAt: any, updatedAt: any };

export type TravelSessionWithGuideFragment = { __typename?: 'TravelSession', id: number, startDate: any, endDate: any, travelId: number, guideId: number, createdAt: any, updatedAt: any, guide: { __typename?: 'Guide', id: number, name: string, description: string, email: string, phoneNumber: string, profileImage: string, companyId: number, createdAt: any, updatedAt: any }, seats: Array<{ __typename?: 'Seat', id: number, status: SeatStatus, travelSessionId: number, seatCostId: number, createdAt: any, updatedAt: any, seatCost: { __typename?: 'SeatCost', id: number, cost: number, createdAt: any, updatedAt: any } }> };

export type TravelSessionWithRelationsFragment = { __typename?: 'TravelSession', id: number, startDate: any, endDate: any, travelId: number, guideId: number, createdAt: any, updatedAt: any, guide: { __typename?: 'Guide', id: number, name: string, description: string, email: string, phoneNumber: string, profileImage: string, companyId: number, createdAt: any, updatedAt: any }, seats: Array<{ __typename?: 'Seat', id: number, status: SeatStatus, travelSessionId: number, seatCostId: number, createdAt: any, updatedAt: any, seatCost: { __typename?: 'SeatCost', id: number, cost: number, createdAt: any, updatedAt: any } }> };

export type SeatCostFieldsFragment = { __typename?: 'SeatCost', id: number, cost: number, createdAt: any, updatedAt: any };

export type SeatFieldsFragment = { __typename?: 'Seat', id: number, status: SeatStatus, travelSessionId: number, seatCostId: number, createdAt: any, updatedAt: any };

export type SeatWithCostFragment = { __typename?: 'Seat', id: number, status: SeatStatus, travelSessionId: number, seatCostId: number, createdAt: any, updatedAt: any, seatCost: { __typename?: 'SeatCost', id: number, cost: number, createdAt: any, updatedAt: any } };

export type PaymentFieldsFragment = { __typename?: 'Payment', id: number, total: number, isPaid: boolean, paidAt?: any | null, stripePaymentIntentId?: string | null, stripePaymentMethod?: string | null, createdAt: any, updatedAt: any };

export type TravelerFieldsFragment = { __typename?: 'Traveler', id: number, name: string, email: string, phoneNumber: string, dateOfBirth: any, orderId: number, seatId: number, createdAt: any, updatedAt: any };

export type TravelerWithSeatFragment = { __typename?: 'Traveler', id: number, name: string, email: string, phoneNumber: string, dateOfBirth: any, orderId: number, seatId: number, createdAt: any, updatedAt: any, seat: { __typename?: 'Seat', id: number, status: SeatStatus, travelSessionId: number, seatCostId: number, createdAt: any, updatedAt: any, seatCost: { __typename?: 'SeatCost', id: number, cost: number, createdAt: any, updatedAt: any } } };

export type OrderFieldsFragment = { __typename?: 'Order', id: number, totalSeats: number, totalPrice: number, orderStatus: number, customerId: number, travelSessionId: number, paymentId: number, createdAt: any, updatedAt: any };

export type OrderWithRelationsFragment = { __typename?: 'Order', id: number, totalSeats: number, totalPrice: number, orderStatus: number, customerId: number, travelSessionId: number, paymentId: number, createdAt: any, updatedAt: any, customer: { __typename?: 'Customer', id: number, firstName: string, lastName: string, phoneNumber: string, email: string, username: string, createdAt: any, updatedAt: any }, travelSession: { __typename?: 'TravelSession', id: number, startDate: any, endDate: any, travelId: number, guideId: number, createdAt: any, updatedAt: any, guide: { __typename?: 'Guide', id: number, name: string, description: string, email: string, phoneNumber: string, profileImage: string, companyId: number, createdAt: any, updatedAt: any }, seats: Array<{ __typename?: 'Seat', id: number, status: SeatStatus, travelSessionId: number, seatCostId: number, createdAt: any, updatedAt: any, seatCost: { __typename?: 'SeatCost', id: number, cost: number, createdAt: any, updatedAt: any } }> }, payment: { __typename?: 'Payment', id: number, total: number, isPaid: boolean, paidAt?: any | null, stripePaymentIntentId?: string | null, stripePaymentMethod?: string | null, createdAt: any, updatedAt: any }, travelers: Array<{ __typename?: 'Traveler', id: number, name: string, email: string, phoneNumber: string, dateOfBirth: any, orderId: number, seatId: number, createdAt: any, updatedAt: any, seat: { __typename?: 'Seat', id: number, status: SeatStatus, travelSessionId: number, seatCostId: number, createdAt: any, updatedAt: any, seatCost: { __typename?: 'SeatCost', id: number, cost: number, createdAt: any, updatedAt: any } } }> };

export type TravelFieldsFragment = { __typename?: 'Travel', id: number, name: string, description: string, coverImage?: string | null, duration: number, totalSeatNumber: number, companyId: number, destinationId: number, gallery: Array<string>, createdAt: any, updatedAt: any };

export type TravelWithRelationsFragment = { __typename?: 'Travel', id: number, name: string, description: string, coverImage?: string | null, duration: number, totalSeatNumber: number, companyId: number, destinationId: number, gallery: Array<string>, createdAt: any, updatedAt: any, company: { __typename?: 'Company', id: number, name: string, logo: string, coverImage: string, phoneNumber: string, email: string, description: string, username: string, createdAt: any, updatedAt: any }, agenda: { __typename?: 'Agenda', id: number, day: number, name: string, description: string, travelId: number, createdAt: any, updatedAt: any }, destination: { __typename?: 'Destination', id: number, name: string, location: string, createdAt: any, updatedAt: any }, categories: Array<{ __typename?: 'Category', id: number, name: string, createdAt: any, updatedAt: any }>, subCategories: Array<{ __typename?: 'SubCategory', id: number, name: string, categoryId: number, createdAt: any, updatedAt: any }>, travelSessions: Array<{ __typename?: 'TravelSession', id: number, startDate: any, endDate: any, travelId: number, guideId: number, createdAt: any, updatedAt: any, guide: { __typename?: 'Guide', id: number, name: string, description: string, email: string, phoneNumber: string, profileImage: string, companyId: number, createdAt: any, updatedAt: any }, seats: Array<{ __typename?: 'Seat', id: number, status: SeatStatus, travelSessionId: number, seatCostId: number, createdAt: any, updatedAt: any, seatCost: { __typename?: 'SeatCost', id: number, cost: number, createdAt: any, updatedAt: any } }> }> };

export type GetGuidesByCompanyQueryVariables = Exact<{ [key: string]: never; }>;


export type GetGuidesByCompanyQuery = { __typename?: 'Query', getGuidesByCompany: Array<{ __typename?: 'Guide', id: number, name: string, description: string, email: string, phoneNumber: string, profileImage: string, companyId: number, createdAt: any, updatedAt: any }> };

export type GetGuideByCompanyQueryVariables = Exact<{
  getGuideId: Scalars['Int']['input'];
}>;


export type GetGuideByCompanyQuery = { __typename?: 'Query', getGuideByCompany: { __typename?: 'Guide', id: number, name: string, description: string, email: string, phoneNumber: string, profileImage: string, companyId: number, createdAt: any, updatedAt: any } };

export type CreateGuideMutationVariables = Exact<{
  input: CreateGuideInput;
}>;


export type CreateGuideMutation = { __typename?: 'Mutation', createGuide: { __typename?: 'Guide', id: number, name: string, description: string, email: string, phoneNumber: string, profileImage: string, companyId: number, createdAt: any, updatedAt: any } };

export type UpdateGuideMutationVariables = Exact<{
  updateGuideId: Scalars['Int']['input'];
  input: UpdateGuideInput;
}>;


export type UpdateGuideMutation = { __typename?: 'Mutation', updateGuide: { __typename?: 'Guide', id: number, name: string, description: string, email: string, phoneNumber: string, profileImage: string, companyId: number, createdAt: any, updatedAt: any } };

export type DeleteGuideMutationVariables = Exact<{
  deleteGuideId: Scalars['Int']['input'];
}>;


export type DeleteGuideMutation = { __typename?: 'Mutation', deleteGuide: boolean };

export type CreateCompanyMutationVariables = Exact<{
  input: CreateCompanyInput;
}>;


export type CreateCompanyMutation = { __typename?: 'Mutation', createCompany: { __typename?: 'Company', id: number, name: string, logo: string, coverImage: string, phoneNumber: string, email: string, description: string, username: string, createdAt: any, updatedAt: any } };

export type GetManagerStatsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetManagerStatsQuery = { __typename?: 'Query', getManagerStats: { __typename?: 'ManagerStats', totalCompanies: number, totalOrders: number, totalUsers: number, totalRevenue: number, activeTravels: number, todayOrders: number, pendingCompanies: number } };

export type GetAdminStatsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAdminStatsQuery = { __typename?: 'Query', getAdminStats: { __typename?: 'AdminStats', totalUsers: number, verifiedCompanies: number, totalRevenue: number, activeOrders: number, todayRevenue: number, todayOrders: number, pendingCompanies: number } };

export type CreateOrderMutationVariables = Exact<{
  input: CreateOrderInput;
}>;


export type CreateOrderMutation = { __typename?: 'Mutation', createOrder: { __typename?: 'CreateOrderResponse', success: boolean, message: string, order: { __typename?: 'Order', id: number, totalSeats: number, totalPrice: number, orderStatus: number, customerId: number, travelSessionId: number, paymentId: number, createdAt: any, updatedAt: any, customer: { __typename?: 'Customer', id: number, firstName: string, lastName: string, phoneNumber: string, email: string, username: string, createdAt: any, updatedAt: any }, travelSession: { __typename?: 'TravelSession', id: number, startDate: any, endDate: any, travelId: number, guideId: number, createdAt: any, updatedAt: any, guide: { __typename?: 'Guide', id: number, name: string, description: string, email: string, phoneNumber: string, profileImage: string, companyId: number, createdAt: any, updatedAt: any }, seats: Array<{ __typename?: 'Seat', id: number, status: SeatStatus, travelSessionId: number, seatCostId: number, createdAt: any, updatedAt: any, seatCost: { __typename?: 'SeatCost', id: number, cost: number, createdAt: any, updatedAt: any } }> }, payment: { __typename?: 'Payment', id: number, total: number, isPaid: boolean, paidAt?: any | null, stripePaymentIntentId?: string | null, stripePaymentMethod?: string | null, createdAt: any, updatedAt: any }, travelers: Array<{ __typename?: 'Traveler', id: number, name: string, email: string, phoneNumber: string, dateOfBirth: any, orderId: number, seatId: number, createdAt: any, updatedAt: any, seat: { __typename?: 'Seat', id: number, status: SeatStatus, travelSessionId: number, seatCostId: number, createdAt: any, updatedAt: any, seatCost: { __typename?: 'SeatCost', id: number, cost: number, createdAt: any, updatedAt: any } } }> } } };

export type UpdateOrderPaymentMutationVariables = Exact<{
  orderId: Scalars['Int']['input'];
  paymentIntentId: Scalars['String']['input'];
}>;


export type UpdateOrderPaymentMutation = { __typename?: 'Mutation', updateOrderPayment: { __typename?: 'UpdateOrderPaymentResponse', success: boolean, message: string, order: { __typename?: 'Order', id: number, totalSeats: number, totalPrice: number, orderStatus: number, customerId: number, travelSessionId: number, paymentId: number, createdAt: any, updatedAt: any, customer: { __typename?: 'Customer', id: number, firstName: string, lastName: string, phoneNumber: string, email: string, username: string, createdAt: any, updatedAt: any }, travelSession: { __typename?: 'TravelSession', id: number, startDate: any, endDate: any, travelId: number, guideId: number, createdAt: any, updatedAt: any, guide: { __typename?: 'Guide', id: number, name: string, description: string, email: string, phoneNumber: string, profileImage: string, companyId: number, createdAt: any, updatedAt: any }, seats: Array<{ __typename?: 'Seat', id: number, status: SeatStatus, travelSessionId: number, seatCostId: number, createdAt: any, updatedAt: any, seatCost: { __typename?: 'SeatCost', id: number, cost: number, createdAt: any, updatedAt: any } }> }, payment: { __typename?: 'Payment', id: number, total: number, isPaid: boolean, paidAt?: any | null, stripePaymentIntentId?: string | null, stripePaymentMethod?: string | null, createdAt: any, updatedAt: any }, travelers: Array<{ __typename?: 'Traveler', id: number, name: string, email: string, phoneNumber: string, dateOfBirth: any, orderId: number, seatId: number, createdAt: any, updatedAt: any, seat: { __typename?: 'Seat', id: number, status: SeatStatus, travelSessionId: number, seatCostId: number, createdAt: any, updatedAt: any, seatCost: { __typename?: 'SeatCost', id: number, cost: number, createdAt: any, updatedAt: any } } }> } } };

export type UpdatePaymentIntentMutationVariables = Exact<{
  orderId: Scalars['Int']['input'];
  paymentIntentId: Scalars['String']['input'];
}>;


export type UpdatePaymentIntentMutation = { __typename?: 'Mutation', updatePaymentIntent: { __typename?: 'UpdatePaymentIntentResponse', success: boolean, message: string } };

export type CancelOrderMutationVariables = Exact<{
  orderId: Scalars['Int']['input'];
}>;


export type CancelOrderMutation = { __typename?: 'Mutation', cancelOrder: { __typename?: 'CancelOrderResponse', success: boolean, message: string, order: { __typename?: 'Order', id: number, totalSeats: number, totalPrice: number, orderStatus: number, customerId: number, travelSessionId: number, paymentId: number, createdAt: any, updatedAt: any, customer: { __typename?: 'Customer', id: number, firstName: string, lastName: string, phoneNumber: string, email: string, username: string, createdAt: any, updatedAt: any }, travelSession: { __typename?: 'TravelSession', id: number, startDate: any, endDate: any, travelId: number, guideId: number, createdAt: any, updatedAt: any, guide: { __typename?: 'Guide', id: number, name: string, description: string, email: string, phoneNumber: string, profileImage: string, companyId: number, createdAt: any, updatedAt: any }, seats: Array<{ __typename?: 'Seat', id: number, status: SeatStatus, travelSessionId: number, seatCostId: number, createdAt: any, updatedAt: any, seatCost: { __typename?: 'SeatCost', id: number, cost: number, createdAt: any, updatedAt: any } }> }, payment: { __typename?: 'Payment', id: number, total: number, isPaid: boolean, paidAt?: any | null, stripePaymentIntentId?: string | null, stripePaymentMethod?: string | null, createdAt: any, updatedAt: any }, travelers: Array<{ __typename?: 'Traveler', id: number, name: string, email: string, phoneNumber: string, dateOfBirth: any, orderId: number, seatId: number, createdAt: any, updatedAt: any, seat: { __typename?: 'Seat', id: number, status: SeatStatus, travelSessionId: number, seatCostId: number, createdAt: any, updatedAt: any, seatCost: { __typename?: 'SeatCost', id: number, cost: number, createdAt: any, updatedAt: any } } }> } } };

export type GetOrdersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetOrdersQuery = { __typename?: 'Query', getOrders: Array<{ __typename?: 'Order', id: number, totalSeats: number, totalPrice: number, orderStatus: number, customerId: number, travelSessionId: number, paymentId: number, createdAt: any, updatedAt: any, customer: { __typename?: 'Customer', id: number, firstName: string, lastName: string, phoneNumber: string, email: string, username: string, createdAt: any, updatedAt: any }, travelSession: { __typename?: 'TravelSession', id: number, startDate: any, endDate: any, travelId: number, guideId: number, createdAt: any, updatedAt: any, guide: { __typename?: 'Guide', id: number, name: string, description: string, email: string, phoneNumber: string, profileImage: string, companyId: number, createdAt: any, updatedAt: any }, seats: Array<{ __typename?: 'Seat', id: number, status: SeatStatus, travelSessionId: number, seatCostId: number, createdAt: any, updatedAt: any, seatCost: { __typename?: 'SeatCost', id: number, cost: number, createdAt: any, updatedAt: any } }> }, payment: { __typename?: 'Payment', id: number, total: number, isPaid: boolean, paidAt?: any | null, stripePaymentIntentId?: string | null, stripePaymentMethod?: string | null, createdAt: any, updatedAt: any }, travelers: Array<{ __typename?: 'Traveler', id: number, name: string, email: string, phoneNumber: string, dateOfBirth: any, orderId: number, seatId: number, createdAt: any, updatedAt: any, seat: { __typename?: 'Seat', id: number, status: SeatStatus, travelSessionId: number, seatCostId: number, createdAt: any, updatedAt: any, seatCost: { __typename?: 'SeatCost', id: number, cost: number, createdAt: any, updatedAt: any } } }> }> };

export type GetOrderQueryVariables = Exact<{
  getOrderId: Scalars['Int']['input'];
}>;


export type GetOrderQuery = { __typename?: 'Query', getOrder: { __typename?: 'Order', id: number, totalSeats: number, totalPrice: number, orderStatus: number, customerId: number, travelSessionId: number, paymentId: number, createdAt: any, updatedAt: any, customer: { __typename?: 'Customer', id: number, firstName: string, lastName: string, phoneNumber: string, email: string, username: string, createdAt: any, updatedAt: any }, travelSession: { __typename?: 'TravelSession', id: number, startDate: any, endDate: any, travelId: number, guideId: number, createdAt: any, updatedAt: any, guide: { __typename?: 'Guide', id: number, name: string, description: string, email: string, phoneNumber: string, profileImage: string, companyId: number, createdAt: any, updatedAt: any }, seats: Array<{ __typename?: 'Seat', id: number, status: SeatStatus, travelSessionId: number, seatCostId: number, createdAt: any, updatedAt: any, seatCost: { __typename?: 'SeatCost', id: number, cost: number, createdAt: any, updatedAt: any } }> }, payment: { __typename?: 'Payment', id: number, total: number, isPaid: boolean, paidAt?: any | null, stripePaymentIntentId?: string | null, stripePaymentMethod?: string | null, createdAt: any, updatedAt: any }, travelers: Array<{ __typename?: 'Traveler', id: number, name: string, email: string, phoneNumber: string, dateOfBirth: any, orderId: number, seatId: number, createdAt: any, updatedAt: any, seat: { __typename?: 'Seat', id: number, status: SeatStatus, travelSessionId: number, seatCostId: number, createdAt: any, updatedAt: any, seatCost: { __typename?: 'SeatCost', id: number, cost: number, createdAt: any, updatedAt: any } } }> } };

export type GetOrdersByCompanyQueryVariables = Exact<{
  companyId: Scalars['Int']['input'];
}>;


export type GetOrdersByCompanyQuery = { __typename?: 'Query', getOrdersByCompany: Array<{ __typename?: 'Order', id: number, totalSeats: number, totalPrice: number, orderStatus: number, customerId: number, travelSessionId: number, paymentId: number, createdAt: any, updatedAt: any, customer: { __typename?: 'Customer', id: number, firstName: string, lastName: string, phoneNumber: string, email: string, username: string, createdAt: any, updatedAt: any }, travelSession: { __typename?: 'TravelSession', id: number, startDate: any, endDate: any, travelId: number, guideId: number, createdAt: any, updatedAt: any, guide: { __typename?: 'Guide', id: number, name: string, description: string, email: string, phoneNumber: string, profileImage: string, companyId: number, createdAt: any, updatedAt: any }, seats: Array<{ __typename?: 'Seat', id: number, status: SeatStatus, travelSessionId: number, seatCostId: number, createdAt: any, updatedAt: any, seatCost: { __typename?: 'SeatCost', id: number, cost: number, createdAt: any, updatedAt: any } }> }, payment: { __typename?: 'Payment', id: number, total: number, isPaid: boolean, paidAt?: any | null, stripePaymentIntentId?: string | null, stripePaymentMethod?: string | null, createdAt: any, updatedAt: any }, travelers: Array<{ __typename?: 'Traveler', id: number, name: string, email: string, phoneNumber: string, dateOfBirth: any, orderId: number, seatId: number, createdAt: any, updatedAt: any, seat: { __typename?: 'Seat', id: number, status: SeatStatus, travelSessionId: number, seatCostId: number, createdAt: any, updatedAt: any, seatCost: { __typename?: 'SeatCost', id: number, cost: number, createdAt: any, updatedAt: any } } }> }> };

export type GetOrdersByCustomerQueryVariables = Exact<{
  customerId: Scalars['Int']['input'];
}>;


export type GetOrdersByCustomerQuery = { __typename?: 'Query', getOrdersByCustomer: Array<{ __typename?: 'Order', id: number, totalSeats: number, totalPrice: number, orderStatus: number, customerId: number, travelSessionId: number, paymentId: number, createdAt: any, updatedAt: any, customer: { __typename?: 'Customer', id: number, firstName: string, lastName: string, phoneNumber: string, email: string, username: string, createdAt: any, updatedAt: any }, travelSession: { __typename?: 'TravelSession', id: number, startDate: any, endDate: any, travelId: number, guideId: number, createdAt: any, updatedAt: any, guide: { __typename?: 'Guide', id: number, name: string, description: string, email: string, phoneNumber: string, profileImage: string, companyId: number, createdAt: any, updatedAt: any }, seats: Array<{ __typename?: 'Seat', id: number, status: SeatStatus, travelSessionId: number, seatCostId: number, createdAt: any, updatedAt: any, seatCost: { __typename?: 'SeatCost', id: number, cost: number, createdAt: any, updatedAt: any } }> }, payment: { __typename?: 'Payment', id: number, total: number, isPaid: boolean, paidAt?: any | null, stripePaymentIntentId?: string | null, stripePaymentMethod?: string | null, createdAt: any, updatedAt: any }, travelers: Array<{ __typename?: 'Traveler', id: number, name: string, email: string, phoneNumber: string, dateOfBirth: any, orderId: number, seatId: number, createdAt: any, updatedAt: any, seat: { __typename?: 'Seat', id: number, status: SeatStatus, travelSessionId: number, seatCostId: number, createdAt: any, updatedAt: any, seatCost: { __typename?: 'SeatCost', id: number, cost: number, createdAt: any, updatedAt: any } } }> }> };

export type GetOrdersByTravelSessionQueryVariables = Exact<{
  travelSessionId: Scalars['Int']['input'];
}>;


export type GetOrdersByTravelSessionQuery = { __typename?: 'Query', getOrdersByTravelSession: Array<{ __typename?: 'Order', id: number, totalSeats: number, totalPrice: number, orderStatus: number, customerId: number, travelSessionId: number, paymentId: number, createdAt: any, updatedAt: any, customer: { __typename?: 'Customer', id: number, firstName: string, lastName: string, phoneNumber: string, email: string, username: string, createdAt: any, updatedAt: any }, travelSession: { __typename?: 'TravelSession', id: number, startDate: any, endDate: any, travelId: number, guideId: number, createdAt: any, updatedAt: any, guide: { __typename?: 'Guide', id: number, name: string, description: string, email: string, phoneNumber: string, profileImage: string, companyId: number, createdAt: any, updatedAt: any }, seats: Array<{ __typename?: 'Seat', id: number, status: SeatStatus, travelSessionId: number, seatCostId: number, createdAt: any, updatedAt: any, seatCost: { __typename?: 'SeatCost', id: number, cost: number, createdAt: any, updatedAt: any } }> }, payment: { __typename?: 'Payment', id: number, total: number, isPaid: boolean, paidAt?: any | null, stripePaymentIntentId?: string | null, stripePaymentMethod?: string | null, createdAt: any, updatedAt: any }, travelers: Array<{ __typename?: 'Traveler', id: number, name: string, email: string, phoneNumber: string, dateOfBirth: any, orderId: number, seatId: number, createdAt: any, updatedAt: any, seat: { __typename?: 'Seat', id: number, status: SeatStatus, travelSessionId: number, seatCostId: number, createdAt: any, updatedAt: any, seatCost: { __typename?: 'SeatCost', id: number, cost: number, createdAt: any, updatedAt: any } } }> }> };

export type UpdateTravelMutationVariables = Exact<{
  updateTravelId: Scalars['Int']['input'];
  input: CreateTravelInput;
}>;


export type UpdateTravelMutation = { __typename?: 'Mutation', updateTravel: { __typename?: 'Travel', id: number, name: string, description: string, coverImage?: string | null, duration: number, totalSeatNumber: number, destinationId: number, destination: { __typename?: 'Destination', id: number, name: string }, categories: Array<{ __typename?: 'Category', id: number, name: string }>, subCategories: Array<{ __typename?: 'SubCategory', id: number, name: string }> } };

export type DeleteTravelMutationVariables = Exact<{
  deleteTravelId: Scalars['Int']['input'];
}>;


export type DeleteTravelMutation = { __typename?: 'Mutation', deleteTravel: { __typename?: 'Travel', id: number, name: string } };

export type GetTravelsQueryVariables = Exact<{
  input: GetTravelsInput;
}>;


export type GetTravelsQuery = { __typename?: 'Query', getTravels: { __typename?: 'GetTravelsResult', totalPages: number, totalTravels: number, currentPage: number, travels: Array<{ __typename?: 'Travel', id: number, name: string, description: string, coverImage?: string | null, duration: number, totalSeatNumber: number, companyId: number, destinationId: number, gallery: Array<string>, createdAt: any, updatedAt: any, company: { __typename?: 'Company', id: number, name: string, logo: string, coverImage: string, phoneNumber: string, email: string, description: string, username: string, createdAt: any, updatedAt: any }, agenda: { __typename?: 'Agenda', id: number, day: number, name: string, description: string, travelId: number, createdAt: any, updatedAt: any }, destination: { __typename?: 'Destination', id: number, name: string, location: string, createdAt: any, updatedAt: any }, categories: Array<{ __typename?: 'Category', id: number, name: string, createdAt: any, updatedAt: any }>, subCategories: Array<{ __typename?: 'SubCategory', id: number, name: string, categoryId: number, createdAt: any, updatedAt: any }>, travelSessions: Array<{ __typename?: 'TravelSession', id: number, startDate: any, endDate: any, travelId: number, guideId: number, createdAt: any, updatedAt: any, guide: { __typename?: 'Guide', id: number, name: string, description: string, email: string, phoneNumber: string, profileImage: string, companyId: number, createdAt: any, updatedAt: any }, seats: Array<{ __typename?: 'Seat', id: number, status: SeatStatus, travelSessionId: number, seatCostId: number, createdAt: any, updatedAt: any, seatCost: { __typename?: 'SeatCost', id: number, cost: number, createdAt: any, updatedAt: any } }> }> }> } };

export type GetTravelQueryVariables = Exact<{
  getTravelId: Scalars['Int']['input'];
}>;


export type GetTravelQuery = { __typename?: 'Query', getTravel: { __typename?: 'Travel', id: number, name: string, description: string, coverImage?: string | null, duration: number, totalSeatNumber: number, companyId: number, destinationId: number, gallery: Array<string>, createdAt: any, updatedAt: any, company: { __typename?: 'Company', id: number, name: string, logo: string, coverImage: string, phoneNumber: string, email: string, description: string, username: string, createdAt: any, updatedAt: any }, agenda: { __typename?: 'Agenda', id: number, day: number, name: string, description: string, travelId: number, createdAt: any, updatedAt: any }, destination: { __typename?: 'Destination', id: number, name: string, location: string, createdAt: any, updatedAt: any }, categories: Array<{ __typename?: 'Category', id: number, name: string, createdAt: any, updatedAt: any }>, subCategories: Array<{ __typename?: 'SubCategory', id: number, name: string, categoryId: number, createdAt: any, updatedAt: any }>, travelSessions: Array<{ __typename?: 'TravelSession', id: number, startDate: any, endDate: any, travelId: number, guideId: number, createdAt: any, updatedAt: any, guide: { __typename?: 'Guide', id: number, name: string, description: string, email: string, phoneNumber: string, profileImage: string, companyId: number, createdAt: any, updatedAt: any }, seats: Array<{ __typename?: 'Seat', id: number, status: SeatStatus, travelSessionId: number, seatCostId: number, createdAt: any, updatedAt: any, seatCost: { __typename?: 'SeatCost', id: number, cost: number, createdAt: any, updatedAt: any } }> }> } };

export type GetTravelsByCompanyQueryVariables = Exact<{
  input: GetTravelsByCompanyInput;
}>;


export type GetTravelsByCompanyQuery = { __typename?: 'Query', getTravelsByCompany: { __typename?: 'GetTravelsByCompanyResult', totalPages: number, totalTravels: number, currentPage: number, travels: Array<{ __typename?: 'Travel', id: number, name: string, description: string, coverImage?: string | null, duration: number, totalSeatNumber: number, companyId: number, destinationId: number, gallery: Array<string>, createdAt: any, updatedAt: any, company: { __typename?: 'Company', id: number, name: string, logo: string, coverImage: string, phoneNumber: string, email: string, description: string, username: string, createdAt: any, updatedAt: any }, agenda: { __typename?: 'Agenda', id: number, day: number, name: string, description: string, travelId: number, createdAt: any, updatedAt: any }, destination: { __typename?: 'Destination', id: number, name: string, location: string, createdAt: any, updatedAt: any }, categories: Array<{ __typename?: 'Category', id: number, name: string, createdAt: any, updatedAt: any }>, subCategories: Array<{ __typename?: 'SubCategory', id: number, name: string, categoryId: number, createdAt: any, updatedAt: any }>, travelSessions: Array<{ __typename?: 'TravelSession', id: number, startDate: any, endDate: any, travelId: number, guideId: number, createdAt: any, updatedAt: any, guide: { __typename?: 'Guide', id: number, name: string, description: string, email: string, phoneNumber: string, profileImage: string, companyId: number, createdAt: any, updatedAt: any }, seats: Array<{ __typename?: 'Seat', id: number, status: SeatStatus, travelSessionId: number, seatCostId: number, createdAt: any, updatedAt: any, seatCost: { __typename?: 'SeatCost', id: number, cost: number, createdAt: any, updatedAt: any } }> }> }> } };

export type CreateTravelByCompanyMutationVariables = Exact<{
  input: CreateTravelInput;
}>;


export type CreateTravelByCompanyMutation = { __typename?: 'Mutation', createTravelByCompany: { __typename?: 'Travel', id: number, name: string, description: string, coverImage?: string | null, duration: number, totalSeatNumber: number, companyId: number, destinationId: number, gallery: Array<string>, createdAt: any, updatedAt: any, company: { __typename?: 'Company', id: number, name: string, logo: string, coverImage: string, phoneNumber: string, email: string, description: string, username: string, createdAt: any, updatedAt: any }, agenda: { __typename?: 'Agenda', id: number, day: number, name: string, description: string, travelId: number, createdAt: any, updatedAt: any }, destination: { __typename?: 'Destination', id: number, name: string, location: string, createdAt: any, updatedAt: any }, categories: Array<{ __typename?: 'Category', id: number, name: string, createdAt: any, updatedAt: any }>, subCategories: Array<{ __typename?: 'SubCategory', id: number, name: string, categoryId: number, createdAt: any, updatedAt: any }>, travelSessions: Array<{ __typename?: 'TravelSession', id: number, startDate: any, endDate: any, travelId: number, guideId: number, createdAt: any, updatedAt: any, guide: { __typename?: 'Guide', id: number, name: string, description: string, email: string, phoneNumber: string, profileImage: string, companyId: number, createdAt: any, updatedAt: any }, seats: Array<{ __typename?: 'Seat', id: number, status: SeatStatus, travelSessionId: number, seatCostId: number, createdAt: any, updatedAt: any, seatCost: { __typename?: 'SeatCost', id: number, cost: number, createdAt: any, updatedAt: any } }> }> } };

export const OrderFieldsFragmentDoc = gql`
    fragment OrderFields on Order {
  id
  totalSeats
  totalPrice
  orderStatus
  customerId
  travelSessionId
  paymentId
  createdAt
  updatedAt
}
    `;
export const CustomerFieldsFragmentDoc = gql`
    fragment CustomerFields on Customer {
  id
  firstName
  lastName
  phoneNumber
  email
  username
  createdAt
  updatedAt
}
    `;
export const TravelSessionFieldsFragmentDoc = gql`
    fragment TravelSessionFields on TravelSession {
  id
  startDate
  endDate
  travelId
  guideId
  createdAt
  updatedAt
}
    `;
export const GuideFieldsFragmentDoc = gql`
    fragment GuideFields on Guide {
  id
  name
  description
  email
  phoneNumber
  profileImage
  companyId
  createdAt
  updatedAt
}
    `;
export const SeatFieldsFragmentDoc = gql`
    fragment SeatFields on Seat {
  id
  status
  travelSessionId
  seatCostId
  createdAt
  updatedAt
}
    `;
export const SeatCostFieldsFragmentDoc = gql`
    fragment SeatCostFields on SeatCost {
  id
  cost
  createdAt
  updatedAt
}
    `;
export const SeatWithCostFragmentDoc = gql`
    fragment SeatWithCost on Seat {
  ...SeatFields
  seatCost {
    ...SeatCostFields
  }
}
    ${SeatFieldsFragmentDoc}
${SeatCostFieldsFragmentDoc}`;
export const TravelSessionWithRelationsFragmentDoc = gql`
    fragment TravelSessionWithRelations on TravelSession {
  ...TravelSessionFields
  guide {
    ...GuideFields
  }
  seats {
    ...SeatWithCost
  }
}
    ${TravelSessionFieldsFragmentDoc}
${GuideFieldsFragmentDoc}
${SeatWithCostFragmentDoc}`;
export const PaymentFieldsFragmentDoc = gql`
    fragment PaymentFields on Payment {
  id
  total
  isPaid
  paidAt
  stripePaymentIntentId
  stripePaymentMethod
  createdAt
  updatedAt
}
    `;
export const TravelerFieldsFragmentDoc = gql`
    fragment TravelerFields on Traveler {
  id
  name
  email
  phoneNumber
  dateOfBirth
  orderId
  seatId
  createdAt
  updatedAt
}
    `;
export const TravelerWithSeatFragmentDoc = gql`
    fragment TravelerWithSeat on Traveler {
  ...TravelerFields
  seat {
    ...SeatWithCost
  }
}
    ${TravelerFieldsFragmentDoc}
${SeatWithCostFragmentDoc}`;
export const OrderWithRelationsFragmentDoc = gql`
    fragment OrderWithRelations on Order {
  ...OrderFields
  customer {
    ...CustomerFields
  }
  travelSession {
    ...TravelSessionWithRelations
  }
  payment {
    ...PaymentFields
  }
  travelers {
    ...TravelerWithSeat
  }
}
    ${OrderFieldsFragmentDoc}
${CustomerFieldsFragmentDoc}
${TravelSessionWithRelationsFragmentDoc}
${PaymentFieldsFragmentDoc}
${TravelerWithSeatFragmentDoc}`;
export const TravelFieldsFragmentDoc = gql`
    fragment TravelFields on Travel {
  id
  name
  description
  coverImage
  duration
  totalSeatNumber
  companyId
  destinationId
  gallery
  createdAt
  updatedAt
}
    `;
export const CompanyFieldsFragmentDoc = gql`
    fragment CompanyFields on Company {
  id
  name
  logo
  coverImage
  phoneNumber
  email
  description
  username
  createdAt
  updatedAt
}
    `;
export const AgendaFieldsFragmentDoc = gql`
    fragment AgendaFields on Agenda {
  id
  day
  name
  description
  travelId
  createdAt
  updatedAt
}
    `;
export const DestinationFieldsFragmentDoc = gql`
    fragment DestinationFields on Destination {
  id
  name
  location
  createdAt
  updatedAt
}
    `;
export const CategoryFieldsFragmentDoc = gql`
    fragment CategoryFields on Category {
  id
  name
  createdAt
  updatedAt
}
    `;
export const SubCategoryFieldsFragmentDoc = gql`
    fragment SubCategoryFields on SubCategory {
  id
  name
  categoryId
  createdAt
  updatedAt
}
    `;
export const TravelSessionWithGuideFragmentDoc = gql`
    fragment TravelSessionWithGuide on TravelSession {
  ...TravelSessionFields
  guide {
    ...GuideFields
  }
  seats {
    ...SeatWithCost
  }
}
    ${TravelSessionFieldsFragmentDoc}
${GuideFieldsFragmentDoc}
${SeatWithCostFragmentDoc}`;
export const TravelWithRelationsFragmentDoc = gql`
    fragment TravelWithRelations on Travel {
  ...TravelFields
  company {
    ...CompanyFields
  }
  agenda {
    ...AgendaFields
  }
  destination {
    ...DestinationFields
  }
  categories {
    ...CategoryFields
  }
  subCategories {
    ...SubCategoryFields
  }
  travelSessions {
    ...TravelSessionWithGuide
  }
}
    ${TravelFieldsFragmentDoc}
${CompanyFieldsFragmentDoc}
${AgendaFieldsFragmentDoc}
${DestinationFieldsFragmentDoc}
${CategoryFieldsFragmentDoc}
${SubCategoryFieldsFragmentDoc}
${TravelSessionWithGuideFragmentDoc}`;
export const GetMeAsAdminDocument = gql`
    query GetMeAsAdmin {
  getMeAsAdmin {
    id
    firstName
    lastName
    email
    username
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useGetMeAsAdminQuery__
 *
 * To run a query within a React component, call `useGetMeAsAdminQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMeAsAdminQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMeAsAdminQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMeAsAdminQuery(baseOptions?: Apollo.QueryHookOptions<GetMeAsAdminQuery, GetMeAsAdminQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMeAsAdminQuery, GetMeAsAdminQueryVariables>(GetMeAsAdminDocument, options);
      }
export function useGetMeAsAdminLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMeAsAdminQuery, GetMeAsAdminQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMeAsAdminQuery, GetMeAsAdminQueryVariables>(GetMeAsAdminDocument, options);
        }
export function useGetMeAsAdminSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetMeAsAdminQuery, GetMeAsAdminQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetMeAsAdminQuery, GetMeAsAdminQueryVariables>(GetMeAsAdminDocument, options);
        }
export type GetMeAsAdminQueryHookResult = ReturnType<typeof useGetMeAsAdminQuery>;
export type GetMeAsAdminLazyQueryHookResult = ReturnType<typeof useGetMeAsAdminLazyQuery>;
export type GetMeAsAdminSuspenseQueryHookResult = ReturnType<typeof useGetMeAsAdminSuspenseQuery>;
export type GetMeAsAdminQueryResult = Apollo.QueryResult<GetMeAsAdminQuery, GetMeAsAdminQueryVariables>;
export const GetMeAsManagerDocument = gql`
    query GetMeAsManager {
  getMeAsManager {
    id
    firstName
    lastName
    email
    phoneNumber
    username
    companyId
    company {
      id
      name
      logo
      email
    }
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useGetMeAsManagerQuery__
 *
 * To run a query within a React component, call `useGetMeAsManagerQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMeAsManagerQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMeAsManagerQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMeAsManagerQuery(baseOptions?: Apollo.QueryHookOptions<GetMeAsManagerQuery, GetMeAsManagerQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMeAsManagerQuery, GetMeAsManagerQueryVariables>(GetMeAsManagerDocument, options);
      }
export function useGetMeAsManagerLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMeAsManagerQuery, GetMeAsManagerQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMeAsManagerQuery, GetMeAsManagerQueryVariables>(GetMeAsManagerDocument, options);
        }
export function useGetMeAsManagerSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetMeAsManagerQuery, GetMeAsManagerQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetMeAsManagerQuery, GetMeAsManagerQueryVariables>(GetMeAsManagerDocument, options);
        }
export type GetMeAsManagerQueryHookResult = ReturnType<typeof useGetMeAsManagerQuery>;
export type GetMeAsManagerLazyQueryHookResult = ReturnType<typeof useGetMeAsManagerLazyQuery>;
export type GetMeAsManagerSuspenseQueryHookResult = ReturnType<typeof useGetMeAsManagerSuspenseQuery>;
export type GetMeAsManagerQueryResult = Apollo.QueryResult<GetMeAsManagerQuery, GetMeAsManagerQueryVariables>;
export const LoginAsCompanyDocument = gql`
    mutation LoginAsCompany($username: String!, $password: String!) {
  loginAsCompany(username: $username, password: $password) {
    token
    company {
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
export const LoginAsAdminDocument = gql`
    mutation LoginAsAdmin($username: String!, $password: String!) {
  loginAsAdmin(username: $username, password: $password) {
    token
    admin {
      id
      firstName
      lastName
      email
      username
      createdAt
      updatedAt
    }
  }
}
    `;
export type LoginAsAdminMutationFn = Apollo.MutationFunction<LoginAsAdminMutation, LoginAsAdminMutationVariables>;

/**
 * __useLoginAsAdminMutation__
 *
 * To run a mutation, you first call `useLoginAsAdminMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginAsAdminMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginAsAdminMutation, { data, loading, error }] = useLoginAsAdminMutation({
 *   variables: {
 *      username: // value for 'username'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginAsAdminMutation(baseOptions?: Apollo.MutationHookOptions<LoginAsAdminMutation, LoginAsAdminMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginAsAdminMutation, LoginAsAdminMutationVariables>(LoginAsAdminDocument, options);
      }
export type LoginAsAdminMutationHookResult = ReturnType<typeof useLoginAsAdminMutation>;
export type LoginAsAdminMutationResult = Apollo.MutationResult<LoginAsAdminMutation>;
export type LoginAsAdminMutationOptions = Apollo.BaseMutationOptions<LoginAsAdminMutation, LoginAsAdminMutationVariables>;
export const LoginAsManagerDocument = gql`
    mutation LoginAsManager($username: String!, $password: String!) {
  loginAsManager(username: $username, password: $password) {
    token
    manager {
      id
      firstName
      lastName
      email
      phoneNumber
      username
      companyId
      createdAt
      updatedAt
    }
  }
}
    `;
export type LoginAsManagerMutationFn = Apollo.MutationFunction<LoginAsManagerMutation, LoginAsManagerMutationVariables>;

/**
 * __useLoginAsManagerMutation__
 *
 * To run a mutation, you first call `useLoginAsManagerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginAsManagerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginAsManagerMutation, { data, loading, error }] = useLoginAsManagerMutation({
 *   variables: {
 *      username: // value for 'username'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginAsManagerMutation(baseOptions?: Apollo.MutationHookOptions<LoginAsManagerMutation, LoginAsManagerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginAsManagerMutation, LoginAsManagerMutationVariables>(LoginAsManagerDocument, options);
      }
export type LoginAsManagerMutationHookResult = ReturnType<typeof useLoginAsManagerMutation>;
export type LoginAsManagerMutationResult = Apollo.MutationResult<LoginAsManagerMutation>;
export type LoginAsManagerMutationOptions = Apollo.BaseMutationOptions<LoginAsManagerMutation, LoginAsManagerMutationVariables>;
export const GetCustomerDocument = gql`
    query GetCustomer($id: Int!) {
  getCustomer(id: $id) {
    id
    firstName
    lastName
    phoneNumber
    email
    username
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useGetCustomerQuery__
 *
 * To run a query within a React component, call `useGetCustomerQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCustomerQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCustomerQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetCustomerQuery(baseOptions: Apollo.QueryHookOptions<GetCustomerQuery, GetCustomerQueryVariables> & ({ variables: GetCustomerQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCustomerQuery, GetCustomerQueryVariables>(GetCustomerDocument, options);
      }
export function useGetCustomerLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCustomerQuery, GetCustomerQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCustomerQuery, GetCustomerQueryVariables>(GetCustomerDocument, options);
        }
export function useGetCustomerSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetCustomerQuery, GetCustomerQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCustomerQuery, GetCustomerQueryVariables>(GetCustomerDocument, options);
        }
export type GetCustomerQueryHookResult = ReturnType<typeof useGetCustomerQuery>;
export type GetCustomerLazyQueryHookResult = ReturnType<typeof useGetCustomerLazyQuery>;
export type GetCustomerSuspenseQueryHookResult = ReturnType<typeof useGetCustomerSuspenseQuery>;
export type GetCustomerQueryResult = Apollo.QueryResult<GetCustomerQuery, GetCustomerQueryVariables>;
export const LoginAsCustomerDocument = gql`
    mutation LoginAsCustomer($username: String!, $password: String!) {
  loginAsCustomer(username: $username, password: $password) {
    token
    customer {
      id
      firstName
      lastName
      phoneNumber
      email
      username
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
    mutation RegisterAsCustomer($input: RegisterAsCustomerInput!) {
  registerAsCustomer(input: $input) {
    token
    customer {
      id
      firstName
      lastName
      phoneNumber
      email
      username
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
export const GetCategoriesDocument = gql`
    query GetCategories {
  getCategories {
    ...CategoryFields
    subCategories {
      ...SubCategoryFields
    }
  }
}
    ${CategoryFieldsFragmentDoc}
${SubCategoryFieldsFragmentDoc}`;

/**
 * __useGetCategoriesQuery__
 *
 * To run a query within a React component, call `useGetCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCategoriesQuery(baseOptions?: Apollo.QueryHookOptions<GetCategoriesQuery, GetCategoriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCategoriesQuery, GetCategoriesQueryVariables>(GetCategoriesDocument, options);
      }
export function useGetCategoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCategoriesQuery, GetCategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCategoriesQuery, GetCategoriesQueryVariables>(GetCategoriesDocument, options);
        }
export function useGetCategoriesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetCategoriesQuery, GetCategoriesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCategoriesQuery, GetCategoriesQueryVariables>(GetCategoriesDocument, options);
        }
export type GetCategoriesQueryHookResult = ReturnType<typeof useGetCategoriesQuery>;
export type GetCategoriesLazyQueryHookResult = ReturnType<typeof useGetCategoriesLazyQuery>;
export type GetCategoriesSuspenseQueryHookResult = ReturnType<typeof useGetCategoriesSuspenseQuery>;
export type GetCategoriesQueryResult = Apollo.QueryResult<GetCategoriesQuery, GetCategoriesQueryVariables>;
export const GetSubCategoriesDocument = gql`
    query GetSubCategories {
  getSubCategories {
    ...SubCategoryFields
  }
}
    ${SubCategoryFieldsFragmentDoc}`;

/**
 * __useGetSubCategoriesQuery__
 *
 * To run a query within a React component, call `useGetSubCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSubCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSubCategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetSubCategoriesQuery(baseOptions?: Apollo.QueryHookOptions<GetSubCategoriesQuery, GetSubCategoriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSubCategoriesQuery, GetSubCategoriesQueryVariables>(GetSubCategoriesDocument, options);
      }
export function useGetSubCategoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSubCategoriesQuery, GetSubCategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSubCategoriesQuery, GetSubCategoriesQueryVariables>(GetSubCategoriesDocument, options);
        }
export function useGetSubCategoriesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetSubCategoriesQuery, GetSubCategoriesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetSubCategoriesQuery, GetSubCategoriesQueryVariables>(GetSubCategoriesDocument, options);
        }
export type GetSubCategoriesQueryHookResult = ReturnType<typeof useGetSubCategoriesQuery>;
export type GetSubCategoriesLazyQueryHookResult = ReturnType<typeof useGetSubCategoriesLazyQuery>;
export type GetSubCategoriesSuspenseQueryHookResult = ReturnType<typeof useGetSubCategoriesSuspenseQuery>;
export type GetSubCategoriesQueryResult = Apollo.QueryResult<GetSubCategoriesQuery, GetSubCategoriesQueryVariables>;
export const GetSubCategoriesByCategoryDocument = gql`
    query GetSubCategoriesByCategory($categoryId: Int!) {
  getSubCategoriesByCategory(categoryId: $categoryId) {
    ...SubCategoryFields
  }
}
    ${SubCategoryFieldsFragmentDoc}`;

/**
 * __useGetSubCategoriesByCategoryQuery__
 *
 * To run a query within a React component, call `useGetSubCategoriesByCategoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSubCategoriesByCategoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSubCategoriesByCategoryQuery({
 *   variables: {
 *      categoryId: // value for 'categoryId'
 *   },
 * });
 */
export function useGetSubCategoriesByCategoryQuery(baseOptions: Apollo.QueryHookOptions<GetSubCategoriesByCategoryQuery, GetSubCategoriesByCategoryQueryVariables> & ({ variables: GetSubCategoriesByCategoryQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSubCategoriesByCategoryQuery, GetSubCategoriesByCategoryQueryVariables>(GetSubCategoriesByCategoryDocument, options);
      }
export function useGetSubCategoriesByCategoryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSubCategoriesByCategoryQuery, GetSubCategoriesByCategoryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSubCategoriesByCategoryQuery, GetSubCategoriesByCategoryQueryVariables>(GetSubCategoriesByCategoryDocument, options);
        }
export function useGetSubCategoriesByCategorySuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetSubCategoriesByCategoryQuery, GetSubCategoriesByCategoryQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetSubCategoriesByCategoryQuery, GetSubCategoriesByCategoryQueryVariables>(GetSubCategoriesByCategoryDocument, options);
        }
export type GetSubCategoriesByCategoryQueryHookResult = ReturnType<typeof useGetSubCategoriesByCategoryQuery>;
export type GetSubCategoriesByCategoryLazyQueryHookResult = ReturnType<typeof useGetSubCategoriesByCategoryLazyQuery>;
export type GetSubCategoriesByCategorySuspenseQueryHookResult = ReturnType<typeof useGetSubCategoriesByCategorySuspenseQuery>;
export type GetSubCategoriesByCategoryQueryResult = Apollo.QueryResult<GetSubCategoriesByCategoryQuery, GetSubCategoriesByCategoryQueryVariables>;
export const GetCompaniesDocument = gql`
    query GetCompanies {
  getCompanies {
    ...CompanyFields
  }
}
    ${CompanyFieldsFragmentDoc}`;

/**
 * __useGetCompaniesQuery__
 *
 * To run a query within a React component, call `useGetCompaniesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCompaniesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCompaniesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCompaniesQuery(baseOptions?: Apollo.QueryHookOptions<GetCompaniesQuery, GetCompaniesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCompaniesQuery, GetCompaniesQueryVariables>(GetCompaniesDocument, options);
      }
export function useGetCompaniesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCompaniesQuery, GetCompaniesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCompaniesQuery, GetCompaniesQueryVariables>(GetCompaniesDocument, options);
        }
export function useGetCompaniesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetCompaniesQuery, GetCompaniesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCompaniesQuery, GetCompaniesQueryVariables>(GetCompaniesDocument, options);
        }
export type GetCompaniesQueryHookResult = ReturnType<typeof useGetCompaniesQuery>;
export type GetCompaniesLazyQueryHookResult = ReturnType<typeof useGetCompaniesLazyQuery>;
export type GetCompaniesSuspenseQueryHookResult = ReturnType<typeof useGetCompaniesSuspenseQuery>;
export type GetCompaniesQueryResult = Apollo.QueryResult<GetCompaniesQuery, GetCompaniesQueryVariables>;
export const GetCompanyDocument = gql`
    query GetCompany($getCompanyId: Int!) {
  getCompany(id: $getCompanyId) {
    ...CompanyFields
  }
}
    ${CompanyFieldsFragmentDoc}`;

/**
 * __useGetCompanyQuery__
 *
 * To run a query within a React component, call `useGetCompanyQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCompanyQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCompanyQuery({
 *   variables: {
 *      getCompanyId: // value for 'getCompanyId'
 *   },
 * });
 */
export function useGetCompanyQuery(baseOptions: Apollo.QueryHookOptions<GetCompanyQuery, GetCompanyQueryVariables> & ({ variables: GetCompanyQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCompanyQuery, GetCompanyQueryVariables>(GetCompanyDocument, options);
      }
export function useGetCompanyLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCompanyQuery, GetCompanyQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCompanyQuery, GetCompanyQueryVariables>(GetCompanyDocument, options);
        }
export function useGetCompanySuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetCompanyQuery, GetCompanyQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCompanyQuery, GetCompanyQueryVariables>(GetCompanyDocument, options);
        }
export type GetCompanyQueryHookResult = ReturnType<typeof useGetCompanyQuery>;
export type GetCompanyLazyQueryHookResult = ReturnType<typeof useGetCompanyLazyQuery>;
export type GetCompanySuspenseQueryHookResult = ReturnType<typeof useGetCompanySuspenseQuery>;
export type GetCompanyQueryResult = Apollo.QueryResult<GetCompanyQuery, GetCompanyQueryVariables>;
export const GetCustomersDocument = gql`
    query GetCustomers {
  getCustomers {
    ...CustomerFields
  }
}
    ${CustomerFieldsFragmentDoc}`;

/**
 * __useGetCustomersQuery__
 *
 * To run a query within a React component, call `useGetCustomersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCustomersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCustomersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCustomersQuery(baseOptions?: Apollo.QueryHookOptions<GetCustomersQuery, GetCustomersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCustomersQuery, GetCustomersQueryVariables>(GetCustomersDocument, options);
      }
export function useGetCustomersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCustomersQuery, GetCustomersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCustomersQuery, GetCustomersQueryVariables>(GetCustomersDocument, options);
        }
export function useGetCustomersSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetCustomersQuery, GetCustomersQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCustomersQuery, GetCustomersQueryVariables>(GetCustomersDocument, options);
        }
export type GetCustomersQueryHookResult = ReturnType<typeof useGetCustomersQuery>;
export type GetCustomersLazyQueryHookResult = ReturnType<typeof useGetCustomersLazyQuery>;
export type GetCustomersSuspenseQueryHookResult = ReturnType<typeof useGetCustomersSuspenseQuery>;
export type GetCustomersQueryResult = Apollo.QueryResult<GetCustomersQuery, GetCustomersQueryVariables>;
export const GetDestinationsDocument = gql`
    query GetDestinations {
  getDestinations {
    ...DestinationFields
  }
}
    ${DestinationFieldsFragmentDoc}`;

/**
 * __useGetDestinationsQuery__
 *
 * To run a query within a React component, call `useGetDestinationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDestinationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDestinationsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetDestinationsQuery(baseOptions?: Apollo.QueryHookOptions<GetDestinationsQuery, GetDestinationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetDestinationsQuery, GetDestinationsQueryVariables>(GetDestinationsDocument, options);
      }
export function useGetDestinationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetDestinationsQuery, GetDestinationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetDestinationsQuery, GetDestinationsQueryVariables>(GetDestinationsDocument, options);
        }
export function useGetDestinationsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetDestinationsQuery, GetDestinationsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetDestinationsQuery, GetDestinationsQueryVariables>(GetDestinationsDocument, options);
        }
export type GetDestinationsQueryHookResult = ReturnType<typeof useGetDestinationsQuery>;
export type GetDestinationsLazyQueryHookResult = ReturnType<typeof useGetDestinationsLazyQuery>;
export type GetDestinationsSuspenseQueryHookResult = ReturnType<typeof useGetDestinationsSuspenseQuery>;
export type GetDestinationsQueryResult = Apollo.QueryResult<GetDestinationsQuery, GetDestinationsQueryVariables>;
export const CreateDestinationDocument = gql`
    mutation CreateDestination($name: String!, $location: String!) {
  createDestination(name: $name, location: $location) {
    ...DestinationFields
  }
}
    ${DestinationFieldsFragmentDoc}`;
export type CreateDestinationMutationFn = Apollo.MutationFunction<CreateDestinationMutation, CreateDestinationMutationVariables>;

/**
 * __useCreateDestinationMutation__
 *
 * To run a mutation, you first call `useCreateDestinationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateDestinationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createDestinationMutation, { data, loading, error }] = useCreateDestinationMutation({
 *   variables: {
 *      name: // value for 'name'
 *      location: // value for 'location'
 *   },
 * });
 */
export function useCreateDestinationMutation(baseOptions?: Apollo.MutationHookOptions<CreateDestinationMutation, CreateDestinationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateDestinationMutation, CreateDestinationMutationVariables>(CreateDestinationDocument, options);
      }
export type CreateDestinationMutationHookResult = ReturnType<typeof useCreateDestinationMutation>;
export type CreateDestinationMutationResult = Apollo.MutationResult<CreateDestinationMutation>;
export type CreateDestinationMutationOptions = Apollo.BaseMutationOptions<CreateDestinationMutation, CreateDestinationMutationVariables>;
export const GetGuidesByCompanyDocument = gql`
    query GetGuidesByCompany {
  getGuidesByCompany {
    ...GuideFields
  }
}
    ${GuideFieldsFragmentDoc}`;

/**
 * __useGetGuidesByCompanyQuery__
 *
 * To run a query within a React component, call `useGetGuidesByCompanyQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetGuidesByCompanyQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetGuidesByCompanyQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetGuidesByCompanyQuery(baseOptions?: Apollo.QueryHookOptions<GetGuidesByCompanyQuery, GetGuidesByCompanyQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetGuidesByCompanyQuery, GetGuidesByCompanyQueryVariables>(GetGuidesByCompanyDocument, options);
      }
export function useGetGuidesByCompanyLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetGuidesByCompanyQuery, GetGuidesByCompanyQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetGuidesByCompanyQuery, GetGuidesByCompanyQueryVariables>(GetGuidesByCompanyDocument, options);
        }
export function useGetGuidesByCompanySuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetGuidesByCompanyQuery, GetGuidesByCompanyQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetGuidesByCompanyQuery, GetGuidesByCompanyQueryVariables>(GetGuidesByCompanyDocument, options);
        }
export type GetGuidesByCompanyQueryHookResult = ReturnType<typeof useGetGuidesByCompanyQuery>;
export type GetGuidesByCompanyLazyQueryHookResult = ReturnType<typeof useGetGuidesByCompanyLazyQuery>;
export type GetGuidesByCompanySuspenseQueryHookResult = ReturnType<typeof useGetGuidesByCompanySuspenseQuery>;
export type GetGuidesByCompanyQueryResult = Apollo.QueryResult<GetGuidesByCompanyQuery, GetGuidesByCompanyQueryVariables>;
export const GetGuideByCompanyDocument = gql`
    query GetGuideByCompany($getGuideId: Int!) {
  getGuideByCompany(id: $getGuideId) {
    ...GuideFields
  }
}
    ${GuideFieldsFragmentDoc}`;

/**
 * __useGetGuideByCompanyQuery__
 *
 * To run a query within a React component, call `useGetGuideByCompanyQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetGuideByCompanyQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetGuideByCompanyQuery({
 *   variables: {
 *      getGuideId: // value for 'getGuideId'
 *   },
 * });
 */
export function useGetGuideByCompanyQuery(baseOptions: Apollo.QueryHookOptions<GetGuideByCompanyQuery, GetGuideByCompanyQueryVariables> & ({ variables: GetGuideByCompanyQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetGuideByCompanyQuery, GetGuideByCompanyQueryVariables>(GetGuideByCompanyDocument, options);
      }
export function useGetGuideByCompanyLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetGuideByCompanyQuery, GetGuideByCompanyQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetGuideByCompanyQuery, GetGuideByCompanyQueryVariables>(GetGuideByCompanyDocument, options);
        }
export function useGetGuideByCompanySuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetGuideByCompanyQuery, GetGuideByCompanyQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetGuideByCompanyQuery, GetGuideByCompanyQueryVariables>(GetGuideByCompanyDocument, options);
        }
export type GetGuideByCompanyQueryHookResult = ReturnType<typeof useGetGuideByCompanyQuery>;
export type GetGuideByCompanyLazyQueryHookResult = ReturnType<typeof useGetGuideByCompanyLazyQuery>;
export type GetGuideByCompanySuspenseQueryHookResult = ReturnType<typeof useGetGuideByCompanySuspenseQuery>;
export type GetGuideByCompanyQueryResult = Apollo.QueryResult<GetGuideByCompanyQuery, GetGuideByCompanyQueryVariables>;
export const CreateGuideDocument = gql`
    mutation CreateGuide($input: CreateGuideInput!) {
  createGuide(input: $input) {
    ...GuideFields
  }
}
    ${GuideFieldsFragmentDoc}`;
export type CreateGuideMutationFn = Apollo.MutationFunction<CreateGuideMutation, CreateGuideMutationVariables>;

/**
 * __useCreateGuideMutation__
 *
 * To run a mutation, you first call `useCreateGuideMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateGuideMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createGuideMutation, { data, loading, error }] = useCreateGuideMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateGuideMutation(baseOptions?: Apollo.MutationHookOptions<CreateGuideMutation, CreateGuideMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateGuideMutation, CreateGuideMutationVariables>(CreateGuideDocument, options);
      }
export type CreateGuideMutationHookResult = ReturnType<typeof useCreateGuideMutation>;
export type CreateGuideMutationResult = Apollo.MutationResult<CreateGuideMutation>;
export type CreateGuideMutationOptions = Apollo.BaseMutationOptions<CreateGuideMutation, CreateGuideMutationVariables>;
export const UpdateGuideDocument = gql`
    mutation UpdateGuide($updateGuideId: Int!, $input: UpdateGuideInput!) {
  updateGuide(id: $updateGuideId, input: $input) {
    ...GuideFields
  }
}
    ${GuideFieldsFragmentDoc}`;
export type UpdateGuideMutationFn = Apollo.MutationFunction<UpdateGuideMutation, UpdateGuideMutationVariables>;

/**
 * __useUpdateGuideMutation__
 *
 * To run a mutation, you first call `useUpdateGuideMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateGuideMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateGuideMutation, { data, loading, error }] = useUpdateGuideMutation({
 *   variables: {
 *      updateGuideId: // value for 'updateGuideId'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateGuideMutation(baseOptions?: Apollo.MutationHookOptions<UpdateGuideMutation, UpdateGuideMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateGuideMutation, UpdateGuideMutationVariables>(UpdateGuideDocument, options);
      }
export type UpdateGuideMutationHookResult = ReturnType<typeof useUpdateGuideMutation>;
export type UpdateGuideMutationResult = Apollo.MutationResult<UpdateGuideMutation>;
export type UpdateGuideMutationOptions = Apollo.BaseMutationOptions<UpdateGuideMutation, UpdateGuideMutationVariables>;
export const DeleteGuideDocument = gql`
    mutation DeleteGuide($deleteGuideId: Int!) {
  deleteGuide(id: $deleteGuideId)
}
    `;
export type DeleteGuideMutationFn = Apollo.MutationFunction<DeleteGuideMutation, DeleteGuideMutationVariables>;

/**
 * __useDeleteGuideMutation__
 *
 * To run a mutation, you first call `useDeleteGuideMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteGuideMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteGuideMutation, { data, loading, error }] = useDeleteGuideMutation({
 *   variables: {
 *      deleteGuideId: // value for 'deleteGuideId'
 *   },
 * });
 */
export function useDeleteGuideMutation(baseOptions?: Apollo.MutationHookOptions<DeleteGuideMutation, DeleteGuideMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteGuideMutation, DeleteGuideMutationVariables>(DeleteGuideDocument, options);
      }
export type DeleteGuideMutationHookResult = ReturnType<typeof useDeleteGuideMutation>;
export type DeleteGuideMutationResult = Apollo.MutationResult<DeleteGuideMutation>;
export type DeleteGuideMutationOptions = Apollo.BaseMutationOptions<DeleteGuideMutation, DeleteGuideMutationVariables>;
export const CreateCompanyDocument = gql`
    mutation CreateCompany($input: CreateCompanyInput!) {
  createCompany(input: $input) {
    ...CompanyFields
  }
}
    ${CompanyFieldsFragmentDoc}`;
export type CreateCompanyMutationFn = Apollo.MutationFunction<CreateCompanyMutation, CreateCompanyMutationVariables>;

/**
 * __useCreateCompanyMutation__
 *
 * To run a mutation, you first call `useCreateCompanyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCompanyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCompanyMutation, { data, loading, error }] = useCreateCompanyMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateCompanyMutation(baseOptions?: Apollo.MutationHookOptions<CreateCompanyMutation, CreateCompanyMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCompanyMutation, CreateCompanyMutationVariables>(CreateCompanyDocument, options);
      }
export type CreateCompanyMutationHookResult = ReturnType<typeof useCreateCompanyMutation>;
export type CreateCompanyMutationResult = Apollo.MutationResult<CreateCompanyMutation>;
export type CreateCompanyMutationOptions = Apollo.BaseMutationOptions<CreateCompanyMutation, CreateCompanyMutationVariables>;
export const GetManagerStatsDocument = gql`
    query GetManagerStats {
  getManagerStats {
    totalCompanies
    totalOrders
    totalUsers
    totalRevenue
    activeTravels
    todayOrders
    pendingCompanies
  }
}
    `;

/**
 * __useGetManagerStatsQuery__
 *
 * To run a query within a React component, call `useGetManagerStatsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetManagerStatsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetManagerStatsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetManagerStatsQuery(baseOptions?: Apollo.QueryHookOptions<GetManagerStatsQuery, GetManagerStatsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetManagerStatsQuery, GetManagerStatsQueryVariables>(GetManagerStatsDocument, options);
      }
export function useGetManagerStatsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetManagerStatsQuery, GetManagerStatsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetManagerStatsQuery, GetManagerStatsQueryVariables>(GetManagerStatsDocument, options);
        }
export function useGetManagerStatsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetManagerStatsQuery, GetManagerStatsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetManagerStatsQuery, GetManagerStatsQueryVariables>(GetManagerStatsDocument, options);
        }
export type GetManagerStatsQueryHookResult = ReturnType<typeof useGetManagerStatsQuery>;
export type GetManagerStatsLazyQueryHookResult = ReturnType<typeof useGetManagerStatsLazyQuery>;
export type GetManagerStatsSuspenseQueryHookResult = ReturnType<typeof useGetManagerStatsSuspenseQuery>;
export type GetManagerStatsQueryResult = Apollo.QueryResult<GetManagerStatsQuery, GetManagerStatsQueryVariables>;
export const GetAdminStatsDocument = gql`
    query GetAdminStats {
  getAdminStats {
    totalUsers
    verifiedCompanies
    totalRevenue
    activeOrders
    todayRevenue
    todayOrders
    pendingCompanies
  }
}
    `;

/**
 * __useGetAdminStatsQuery__
 *
 * To run a query within a React component, call `useGetAdminStatsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAdminStatsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAdminStatsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAdminStatsQuery(baseOptions?: Apollo.QueryHookOptions<GetAdminStatsQuery, GetAdminStatsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAdminStatsQuery, GetAdminStatsQueryVariables>(GetAdminStatsDocument, options);
      }
export function useGetAdminStatsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAdminStatsQuery, GetAdminStatsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAdminStatsQuery, GetAdminStatsQueryVariables>(GetAdminStatsDocument, options);
        }
export function useGetAdminStatsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAdminStatsQuery, GetAdminStatsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAdminStatsQuery, GetAdminStatsQueryVariables>(GetAdminStatsDocument, options);
        }
export type GetAdminStatsQueryHookResult = ReturnType<typeof useGetAdminStatsQuery>;
export type GetAdminStatsLazyQueryHookResult = ReturnType<typeof useGetAdminStatsLazyQuery>;
export type GetAdminStatsSuspenseQueryHookResult = ReturnType<typeof useGetAdminStatsSuspenseQuery>;
export type GetAdminStatsQueryResult = Apollo.QueryResult<GetAdminStatsQuery, GetAdminStatsQueryVariables>;
export const CreateOrderDocument = gql`
    mutation CreateOrder($input: CreateOrderInput!) {
  createOrder(input: $input) {
    success
    message
    order {
      ...OrderWithRelations
    }
  }
}
    ${OrderWithRelationsFragmentDoc}`;
export type CreateOrderMutationFn = Apollo.MutationFunction<CreateOrderMutation, CreateOrderMutationVariables>;

/**
 * __useCreateOrderMutation__
 *
 * To run a mutation, you first call `useCreateOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createOrderMutation, { data, loading, error }] = useCreateOrderMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateOrderMutation(baseOptions?: Apollo.MutationHookOptions<CreateOrderMutation, CreateOrderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateOrderMutation, CreateOrderMutationVariables>(CreateOrderDocument, options);
      }
export type CreateOrderMutationHookResult = ReturnType<typeof useCreateOrderMutation>;
export type CreateOrderMutationResult = Apollo.MutationResult<CreateOrderMutation>;
export type CreateOrderMutationOptions = Apollo.BaseMutationOptions<CreateOrderMutation, CreateOrderMutationVariables>;
export const UpdateOrderPaymentDocument = gql`
    mutation UpdateOrderPayment($orderId: Int!, $paymentIntentId: String!) {
  updateOrderPayment(orderId: $orderId, paymentIntentId: $paymentIntentId) {
    success
    message
    order {
      ...OrderWithRelations
    }
  }
}
    ${OrderWithRelationsFragmentDoc}`;
export type UpdateOrderPaymentMutationFn = Apollo.MutationFunction<UpdateOrderPaymentMutation, UpdateOrderPaymentMutationVariables>;

/**
 * __useUpdateOrderPaymentMutation__
 *
 * To run a mutation, you first call `useUpdateOrderPaymentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateOrderPaymentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateOrderPaymentMutation, { data, loading, error }] = useUpdateOrderPaymentMutation({
 *   variables: {
 *      orderId: // value for 'orderId'
 *      paymentIntentId: // value for 'paymentIntentId'
 *   },
 * });
 */
export function useUpdateOrderPaymentMutation(baseOptions?: Apollo.MutationHookOptions<UpdateOrderPaymentMutation, UpdateOrderPaymentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateOrderPaymentMutation, UpdateOrderPaymentMutationVariables>(UpdateOrderPaymentDocument, options);
      }
export type UpdateOrderPaymentMutationHookResult = ReturnType<typeof useUpdateOrderPaymentMutation>;
export type UpdateOrderPaymentMutationResult = Apollo.MutationResult<UpdateOrderPaymentMutation>;
export type UpdateOrderPaymentMutationOptions = Apollo.BaseMutationOptions<UpdateOrderPaymentMutation, UpdateOrderPaymentMutationVariables>;
export const UpdatePaymentIntentDocument = gql`
    mutation UpdatePaymentIntent($orderId: Int!, $paymentIntentId: String!) {
  updatePaymentIntent(orderId: $orderId, paymentIntentId: $paymentIntentId) {
    success
    message
  }
}
    `;
export type UpdatePaymentIntentMutationFn = Apollo.MutationFunction<UpdatePaymentIntentMutation, UpdatePaymentIntentMutationVariables>;

/**
 * __useUpdatePaymentIntentMutation__
 *
 * To run a mutation, you first call `useUpdatePaymentIntentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePaymentIntentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePaymentIntentMutation, { data, loading, error }] = useUpdatePaymentIntentMutation({
 *   variables: {
 *      orderId: // value for 'orderId'
 *      paymentIntentId: // value for 'paymentIntentId'
 *   },
 * });
 */
export function useUpdatePaymentIntentMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePaymentIntentMutation, UpdatePaymentIntentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePaymentIntentMutation, UpdatePaymentIntentMutationVariables>(UpdatePaymentIntentDocument, options);
      }
export type UpdatePaymentIntentMutationHookResult = ReturnType<typeof useUpdatePaymentIntentMutation>;
export type UpdatePaymentIntentMutationResult = Apollo.MutationResult<UpdatePaymentIntentMutation>;
export type UpdatePaymentIntentMutationOptions = Apollo.BaseMutationOptions<UpdatePaymentIntentMutation, UpdatePaymentIntentMutationVariables>;
export const CancelOrderDocument = gql`
    mutation CancelOrder($orderId: Int!) {
  cancelOrder(orderId: $orderId) {
    success
    message
    order {
      ...OrderWithRelations
    }
  }
}
    ${OrderWithRelationsFragmentDoc}`;
export type CancelOrderMutationFn = Apollo.MutationFunction<CancelOrderMutation, CancelOrderMutationVariables>;

/**
 * __useCancelOrderMutation__
 *
 * To run a mutation, you first call `useCancelOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCancelOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [cancelOrderMutation, { data, loading, error }] = useCancelOrderMutation({
 *   variables: {
 *      orderId: // value for 'orderId'
 *   },
 * });
 */
export function useCancelOrderMutation(baseOptions?: Apollo.MutationHookOptions<CancelOrderMutation, CancelOrderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CancelOrderMutation, CancelOrderMutationVariables>(CancelOrderDocument, options);
      }
export type CancelOrderMutationHookResult = ReturnType<typeof useCancelOrderMutation>;
export type CancelOrderMutationResult = Apollo.MutationResult<CancelOrderMutation>;
export type CancelOrderMutationOptions = Apollo.BaseMutationOptions<CancelOrderMutation, CancelOrderMutationVariables>;
export const GetOrdersDocument = gql`
    query GetOrders {
  getOrders {
    ...OrderWithRelations
  }
}
    ${OrderWithRelationsFragmentDoc}`;

/**
 * __useGetOrdersQuery__
 *
 * To run a query within a React component, call `useGetOrdersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOrdersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOrdersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetOrdersQuery(baseOptions?: Apollo.QueryHookOptions<GetOrdersQuery, GetOrdersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetOrdersQuery, GetOrdersQueryVariables>(GetOrdersDocument, options);
      }
export function useGetOrdersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetOrdersQuery, GetOrdersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetOrdersQuery, GetOrdersQueryVariables>(GetOrdersDocument, options);
        }
export function useGetOrdersSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetOrdersQuery, GetOrdersQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetOrdersQuery, GetOrdersQueryVariables>(GetOrdersDocument, options);
        }
export type GetOrdersQueryHookResult = ReturnType<typeof useGetOrdersQuery>;
export type GetOrdersLazyQueryHookResult = ReturnType<typeof useGetOrdersLazyQuery>;
export type GetOrdersSuspenseQueryHookResult = ReturnType<typeof useGetOrdersSuspenseQuery>;
export type GetOrdersQueryResult = Apollo.QueryResult<GetOrdersQuery, GetOrdersQueryVariables>;
export const GetOrderDocument = gql`
    query GetOrder($getOrderId: Int!) {
  getOrder(id: $getOrderId) {
    ...OrderWithRelations
  }
}
    ${OrderWithRelationsFragmentDoc}`;

/**
 * __useGetOrderQuery__
 *
 * To run a query within a React component, call `useGetOrderQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOrderQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOrderQuery({
 *   variables: {
 *      getOrderId: // value for 'getOrderId'
 *   },
 * });
 */
export function useGetOrderQuery(baseOptions: Apollo.QueryHookOptions<GetOrderQuery, GetOrderQueryVariables> & ({ variables: GetOrderQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetOrderQuery, GetOrderQueryVariables>(GetOrderDocument, options);
      }
export function useGetOrderLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetOrderQuery, GetOrderQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetOrderQuery, GetOrderQueryVariables>(GetOrderDocument, options);
        }
export function useGetOrderSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetOrderQuery, GetOrderQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetOrderQuery, GetOrderQueryVariables>(GetOrderDocument, options);
        }
export type GetOrderQueryHookResult = ReturnType<typeof useGetOrderQuery>;
export type GetOrderLazyQueryHookResult = ReturnType<typeof useGetOrderLazyQuery>;
export type GetOrderSuspenseQueryHookResult = ReturnType<typeof useGetOrderSuspenseQuery>;
export type GetOrderQueryResult = Apollo.QueryResult<GetOrderQuery, GetOrderQueryVariables>;
export const GetOrdersByCompanyDocument = gql`
    query GetOrdersByCompany($companyId: Int!) {
  getOrdersByCompany(companyId: $companyId) {
    ...OrderWithRelations
  }
}
    ${OrderWithRelationsFragmentDoc}`;

/**
 * __useGetOrdersByCompanyQuery__
 *
 * To run a query within a React component, call `useGetOrdersByCompanyQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOrdersByCompanyQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOrdersByCompanyQuery({
 *   variables: {
 *      companyId: // value for 'companyId'
 *   },
 * });
 */
export function useGetOrdersByCompanyQuery(baseOptions: Apollo.QueryHookOptions<GetOrdersByCompanyQuery, GetOrdersByCompanyQueryVariables> & ({ variables: GetOrdersByCompanyQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetOrdersByCompanyQuery, GetOrdersByCompanyQueryVariables>(GetOrdersByCompanyDocument, options);
      }
export function useGetOrdersByCompanyLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetOrdersByCompanyQuery, GetOrdersByCompanyQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetOrdersByCompanyQuery, GetOrdersByCompanyQueryVariables>(GetOrdersByCompanyDocument, options);
        }
export function useGetOrdersByCompanySuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetOrdersByCompanyQuery, GetOrdersByCompanyQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetOrdersByCompanyQuery, GetOrdersByCompanyQueryVariables>(GetOrdersByCompanyDocument, options);
        }
export type GetOrdersByCompanyQueryHookResult = ReturnType<typeof useGetOrdersByCompanyQuery>;
export type GetOrdersByCompanyLazyQueryHookResult = ReturnType<typeof useGetOrdersByCompanyLazyQuery>;
export type GetOrdersByCompanySuspenseQueryHookResult = ReturnType<typeof useGetOrdersByCompanySuspenseQuery>;
export type GetOrdersByCompanyQueryResult = Apollo.QueryResult<GetOrdersByCompanyQuery, GetOrdersByCompanyQueryVariables>;
export const GetOrdersByCustomerDocument = gql`
    query GetOrdersByCustomer($customerId: Int!) {
  getOrdersByCustomer(customerId: $customerId) {
    ...OrderWithRelations
  }
}
    ${OrderWithRelationsFragmentDoc}`;

/**
 * __useGetOrdersByCustomerQuery__
 *
 * To run a query within a React component, call `useGetOrdersByCustomerQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOrdersByCustomerQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOrdersByCustomerQuery({
 *   variables: {
 *      customerId: // value for 'customerId'
 *   },
 * });
 */
export function useGetOrdersByCustomerQuery(baseOptions: Apollo.QueryHookOptions<GetOrdersByCustomerQuery, GetOrdersByCustomerQueryVariables> & ({ variables: GetOrdersByCustomerQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetOrdersByCustomerQuery, GetOrdersByCustomerQueryVariables>(GetOrdersByCustomerDocument, options);
      }
export function useGetOrdersByCustomerLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetOrdersByCustomerQuery, GetOrdersByCustomerQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetOrdersByCustomerQuery, GetOrdersByCustomerQueryVariables>(GetOrdersByCustomerDocument, options);
        }
export function useGetOrdersByCustomerSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetOrdersByCustomerQuery, GetOrdersByCustomerQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetOrdersByCustomerQuery, GetOrdersByCustomerQueryVariables>(GetOrdersByCustomerDocument, options);
        }
export type GetOrdersByCustomerQueryHookResult = ReturnType<typeof useGetOrdersByCustomerQuery>;
export type GetOrdersByCustomerLazyQueryHookResult = ReturnType<typeof useGetOrdersByCustomerLazyQuery>;
export type GetOrdersByCustomerSuspenseQueryHookResult = ReturnType<typeof useGetOrdersByCustomerSuspenseQuery>;
export type GetOrdersByCustomerQueryResult = Apollo.QueryResult<GetOrdersByCustomerQuery, GetOrdersByCustomerQueryVariables>;
export const GetOrdersByTravelSessionDocument = gql`
    query GetOrdersByTravelSession($travelSessionId: Int!) {
  getOrdersByTravelSession(travelSessionId: $travelSessionId) {
    ...OrderWithRelations
  }
}
    ${OrderWithRelationsFragmentDoc}`;

/**
 * __useGetOrdersByTravelSessionQuery__
 *
 * To run a query within a React component, call `useGetOrdersByTravelSessionQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOrdersByTravelSessionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOrdersByTravelSessionQuery({
 *   variables: {
 *      travelSessionId: // value for 'travelSessionId'
 *   },
 * });
 */
export function useGetOrdersByTravelSessionQuery(baseOptions: Apollo.QueryHookOptions<GetOrdersByTravelSessionQuery, GetOrdersByTravelSessionQueryVariables> & ({ variables: GetOrdersByTravelSessionQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetOrdersByTravelSessionQuery, GetOrdersByTravelSessionQueryVariables>(GetOrdersByTravelSessionDocument, options);
      }
export function useGetOrdersByTravelSessionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetOrdersByTravelSessionQuery, GetOrdersByTravelSessionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetOrdersByTravelSessionQuery, GetOrdersByTravelSessionQueryVariables>(GetOrdersByTravelSessionDocument, options);
        }
export function useGetOrdersByTravelSessionSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetOrdersByTravelSessionQuery, GetOrdersByTravelSessionQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetOrdersByTravelSessionQuery, GetOrdersByTravelSessionQueryVariables>(GetOrdersByTravelSessionDocument, options);
        }
export type GetOrdersByTravelSessionQueryHookResult = ReturnType<typeof useGetOrdersByTravelSessionQuery>;
export type GetOrdersByTravelSessionLazyQueryHookResult = ReturnType<typeof useGetOrdersByTravelSessionLazyQuery>;
export type GetOrdersByTravelSessionSuspenseQueryHookResult = ReturnType<typeof useGetOrdersByTravelSessionSuspenseQuery>;
export type GetOrdersByTravelSessionQueryResult = Apollo.QueryResult<GetOrdersByTravelSessionQuery, GetOrdersByTravelSessionQueryVariables>;
export const UpdateTravelDocument = gql`
    mutation UpdateTravel($updateTravelId: Int!, $input: CreateTravelInput!) {
  updateTravel(id: $updateTravelId, input: $input) {
    id
    name
    description
    coverImage
    duration
    totalSeatNumber
    destinationId
    destination {
      id
      name
    }
    categories {
      id
      name
    }
    subCategories {
      id
      name
    }
  }
}
    `;
export type UpdateTravelMutationFn = Apollo.MutationFunction<UpdateTravelMutation, UpdateTravelMutationVariables>;

/**
 * __useUpdateTravelMutation__
 *
 * To run a mutation, you first call `useUpdateTravelMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTravelMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTravelMutation, { data, loading, error }] = useUpdateTravelMutation({
 *   variables: {
 *      updateTravelId: // value for 'updateTravelId'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateTravelMutation(baseOptions?: Apollo.MutationHookOptions<UpdateTravelMutation, UpdateTravelMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateTravelMutation, UpdateTravelMutationVariables>(UpdateTravelDocument, options);
      }
export type UpdateTravelMutationHookResult = ReturnType<typeof useUpdateTravelMutation>;
export type UpdateTravelMutationResult = Apollo.MutationResult<UpdateTravelMutation>;
export type UpdateTravelMutationOptions = Apollo.BaseMutationOptions<UpdateTravelMutation, UpdateTravelMutationVariables>;
export const DeleteTravelDocument = gql`
    mutation DeleteTravel($deleteTravelId: Int!) {
  deleteTravel(id: $deleteTravelId) {
    id
    name
  }
}
    `;
export type DeleteTravelMutationFn = Apollo.MutationFunction<DeleteTravelMutation, DeleteTravelMutationVariables>;

/**
 * __useDeleteTravelMutation__
 *
 * To run a mutation, you first call `useDeleteTravelMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTravelMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTravelMutation, { data, loading, error }] = useDeleteTravelMutation({
 *   variables: {
 *      deleteTravelId: // value for 'deleteTravelId'
 *   },
 * });
 */
export function useDeleteTravelMutation(baseOptions?: Apollo.MutationHookOptions<DeleteTravelMutation, DeleteTravelMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteTravelMutation, DeleteTravelMutationVariables>(DeleteTravelDocument, options);
      }
export type DeleteTravelMutationHookResult = ReturnType<typeof useDeleteTravelMutation>;
export type DeleteTravelMutationResult = Apollo.MutationResult<DeleteTravelMutation>;
export type DeleteTravelMutationOptions = Apollo.BaseMutationOptions<DeleteTravelMutation, DeleteTravelMutationVariables>;
export const GetTravelsDocument = gql`
    query GetTravels($input: GetTravelsInput!) {
  getTravels(input: $input) {
    travels {
      ...TravelWithRelations
    }
    totalPages
    totalTravels
    currentPage
  }
}
    ${TravelWithRelationsFragmentDoc}`;

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
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetTravelsQuery(baseOptions: Apollo.QueryHookOptions<GetTravelsQuery, GetTravelsQueryVariables> & ({ variables: GetTravelsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
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
    query GetTravel($getTravelId: Int!) {
  getTravel(id: $getTravelId) {
    ...TravelWithRelations
  }
}
    ${TravelWithRelationsFragmentDoc}`;

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
 *      getTravelId: // value for 'getTravelId'
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
export const GetTravelsByCompanyDocument = gql`
    query GetTravelsByCompany($input: GetTravelsByCompanyInput!) {
  getTravelsByCompany(input: $input) {
    travels {
      ...TravelWithRelations
    }
    totalPages
    totalTravels
    currentPage
  }
}
    ${TravelWithRelationsFragmentDoc}`;

/**
 * __useGetTravelsByCompanyQuery__
 *
 * To run a query within a React component, call `useGetTravelsByCompanyQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTravelsByCompanyQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTravelsByCompanyQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetTravelsByCompanyQuery(baseOptions: Apollo.QueryHookOptions<GetTravelsByCompanyQuery, GetTravelsByCompanyQueryVariables> & ({ variables: GetTravelsByCompanyQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTravelsByCompanyQuery, GetTravelsByCompanyQueryVariables>(GetTravelsByCompanyDocument, options);
      }
export function useGetTravelsByCompanyLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTravelsByCompanyQuery, GetTravelsByCompanyQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTravelsByCompanyQuery, GetTravelsByCompanyQueryVariables>(GetTravelsByCompanyDocument, options);
        }
export function useGetTravelsByCompanySuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetTravelsByCompanyQuery, GetTravelsByCompanyQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetTravelsByCompanyQuery, GetTravelsByCompanyQueryVariables>(GetTravelsByCompanyDocument, options);
        }
export type GetTravelsByCompanyQueryHookResult = ReturnType<typeof useGetTravelsByCompanyQuery>;
export type GetTravelsByCompanyLazyQueryHookResult = ReturnType<typeof useGetTravelsByCompanyLazyQuery>;
export type GetTravelsByCompanySuspenseQueryHookResult = ReturnType<typeof useGetTravelsByCompanySuspenseQuery>;
export type GetTravelsByCompanyQueryResult = Apollo.QueryResult<GetTravelsByCompanyQuery, GetTravelsByCompanyQueryVariables>;
export const CreateTravelByCompanyDocument = gql`
    mutation CreateTravelByCompany($input: CreateTravelInput!) {
  createTravelByCompany(input: $input) {
    ...TravelWithRelations
  }
}
    ${TravelWithRelationsFragmentDoc}`;
export type CreateTravelByCompanyMutationFn = Apollo.MutationFunction<CreateTravelByCompanyMutation, CreateTravelByCompanyMutationVariables>;

/**
 * __useCreateTravelByCompanyMutation__
 *
 * To run a mutation, you first call `useCreateTravelByCompanyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTravelByCompanyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTravelByCompanyMutation, { data, loading, error }] = useCreateTravelByCompanyMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateTravelByCompanyMutation(baseOptions?: Apollo.MutationHookOptions<CreateTravelByCompanyMutation, CreateTravelByCompanyMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateTravelByCompanyMutation, CreateTravelByCompanyMutationVariables>(CreateTravelByCompanyDocument, options);
      }
export type CreateTravelByCompanyMutationHookResult = ReturnType<typeof useCreateTravelByCompanyMutation>;
export type CreateTravelByCompanyMutationResult = Apollo.MutationResult<CreateTravelByCompanyMutation>;
export type CreateTravelByCompanyMutationOptions = Apollo.BaseMutationOptions<CreateTravelByCompanyMutation, CreateTravelByCompanyMutationVariables>;