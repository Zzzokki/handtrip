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


export type MutationCreateTravelArgs = {
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


export type MutationLoginAsCompanyArgs = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};


export type MutationLoginAsCustomerArgs = {
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
  getTravels: Array<Travel>;
  getTravelsByCompany: Array<Travel>;
};


export type QueryGetCompanyArgs = {
  id: Scalars['Int']['input'];
};


export type QueryGetCustomerArgs = {
  id: Scalars['Int']['input'];
};


export type QueryGetGuidesByCompanyArgs = {
  companyId: Scalars['Int']['input'];
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


export type QueryGetTravelsByCompanyArgs = {
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
  travel: Travel;
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
  email?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  profileImage?: InputMaybe<Scalars['String']['input']>;
};

export type LoginAsCompanyMutationVariables = Exact<{
  username: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginAsCompanyMutation = { __typename?: 'Mutation', loginAsCompany: { __typename?: 'LoginAsCompanyResponse', token: string, company: { __typename?: 'Company', id: number, name: string, logo: string, coverImage: string, phoneNumber: string, email: string, description: string, createdAt: any, updatedAt: any } } };

export type LoginAsCustomerMutationVariables = Exact<{
  username: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginAsCustomerMutation = { __typename?: 'Mutation', loginAsCustomer: { __typename?: 'LoginAsCustomerResponse', token: string, customer: { __typename?: 'Customer', id: number, firstName: string, lastName: string, phoneNumber: string, email: string, username: string, createdAt: any, updatedAt: any } } };

export type RegisterAsCustomerMutationVariables = Exact<{
  input: RegisterAsCustomerInput;
}>;


export type RegisterAsCustomerMutation = { __typename?: 'Mutation', registerAsCustomer: { __typename?: 'LoginAsCustomerResponse', token: string, customer: { __typename?: 'Customer', id: number, firstName: string, lastName: string, phoneNumber: string, email: string, username: string, createdAt: any, updatedAt: any } } };

export type GetCompaniesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCompaniesQuery = { __typename?: 'Query', getCompanies: Array<{ __typename?: 'Company', id: number, name: string, logo: string, coverImage: string, phoneNumber: string, email: string, description: string, username: string, createdAt: any, updatedAt: any }> };

export type GetCompanyQueryVariables = Exact<{
  getCompanyId: Scalars['Int']['input'];
}>;


export type GetCompanyQuery = { __typename?: 'Query', getCompany: { __typename?: 'Company', id: number, name: string, logo: string, coverImage: string, phoneNumber: string, email: string, description: string, username: string, createdAt: any, updatedAt: any } };

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

export type SubCategoryFieldsFragment = { __typename?: 'SubCategory', id: string, name: string, categoryId: number, createdAt: any, updatedAt: any };

export type DestinationFieldsFragment = { __typename?: 'Destination', id: number, name: string, location: string, createdAt: any, updatedAt: any };

export type AgendaFieldsFragment = { __typename?: 'Agenda', id: number, name: string, description: string, travelId: number, createdAt: any, updatedAt: any };

export type GuideFieldsFragment = { __typename?: 'Guide', id: number, name: string, email: string, phoneNumber: string, profileImage: string, companyId: number, createdAt: any, updatedAt: any };

export type TravelSessionFieldsFragment = { __typename?: 'TravelSession', id: number, startDate: any, endDate: any, travelId: number, guideId: number, createdAt: any, updatedAt: any };

export type TravelSessionWithGuideFragment = { __typename?: 'TravelSession', id: number, startDate: any, endDate: any, travelId: number, guideId: number, createdAt: any, updatedAt: any, guide: { __typename?: 'Guide', id: number, name: string, email: string, phoneNumber: string, profileImage: string, companyId: number, createdAt: any, updatedAt: any } };

export type TravelSessionWithRelationsFragment = { __typename?: 'TravelSession', id: number, startDate: any, endDate: any, travelId: number, guideId: number, createdAt: any, updatedAt: any, guide: { __typename?: 'Guide', id: number, name: string, email: string, phoneNumber: string, profileImage: string, companyId: number, createdAt: any, updatedAt: any }, travel: { __typename?: 'Travel', id: number, name: string, description: string, coverImage?: string | null, duration: number, totalSeatNumber: number, companyId: number, destinationId: number, createdAt: any, updatedAt: any, company: { __typename?: 'Company', id: number, name: string, logo: string, coverImage: string, phoneNumber: string, email: string, description: string, username: string, createdAt: any, updatedAt: any }, agenda: { __typename?: 'Agenda', id: number, name: string, description: string, travelId: number, createdAt: any, updatedAt: any }, destination: { __typename?: 'Destination', id: number, name: string, location: string, createdAt: any, updatedAt: any }, categories: Array<{ __typename?: 'Category', id: number, name: string, createdAt: any, updatedAt: any }>, subCategories: Array<{ __typename?: 'SubCategory', id: string, name: string, categoryId: number, createdAt: any, updatedAt: any }>, travelSessions: Array<{ __typename?: 'TravelSession', id: number, startDate: any, endDate: any, travelId: number, guideId: number, createdAt: any, updatedAt: any, guide: { __typename?: 'Guide', id: number, name: string, email: string, phoneNumber: string, profileImage: string, companyId: number, createdAt: any, updatedAt: any } }> } };

export type SeatCostFieldsFragment = { __typename?: 'SeatCost', id: number, cost: number, createdAt: any, updatedAt: any };

export type SeatFieldsFragment = { __typename?: 'Seat', id: number, status: string, travelSessionId: number, seatCostId: number, createdAt: any, updatedAt: any };

export type SeatWithCostFragment = { __typename?: 'Seat', id: number, status: string, travelSessionId: number, seatCostId: number, createdAt: any, updatedAt: any, seatCost: { __typename?: 'SeatCost', id: number, cost: number, createdAt: any, updatedAt: any } };

export type PaymentFieldsFragment = { __typename?: 'Payment', id: number, total: number, isPaid: boolean, paidAt?: any | null, createdAt: any, updatedAt: any };

export type TravelerFieldsFragment = { __typename?: 'Traveler', id: number, name: string, email: string, phoneNumber: string, dateOfBirth: any, orderId: number, seatId: number, createdAt: any, updatedAt: any };

export type TravelerWithSeatFragment = { __typename?: 'Traveler', id: number, name: string, email: string, phoneNumber: string, dateOfBirth: any, orderId: number, seatId: number, createdAt: any, updatedAt: any, seat: { __typename?: 'Seat', id: number, status: string, travelSessionId: number, seatCostId: number, createdAt: any, updatedAt: any } };

export type OrderFieldsFragment = { __typename?: 'Order', id: number, totalSeats: number, totalPrice: number, orderStatus: number, customerId: number, travelSessionId: number, paymentId: number, createdAt: any, updatedAt: any };

export type OrderWithRelationsFragment = { __typename?: 'Order', id: number, totalSeats: number, totalPrice: number, orderStatus: number, customerId: number, travelSessionId: number, paymentId: number, createdAt: any, updatedAt: any, customer: { __typename?: 'Customer', id: number, firstName: string, lastName: string, phoneNumber: string, email: string, username: string, createdAt: any, updatedAt: any }, travelSession: { __typename?: 'TravelSession', id: number, startDate: any, endDate: any, travelId: number, guideId: number, createdAt: any, updatedAt: any, guide: { __typename?: 'Guide', id: number, name: string, email: string, phoneNumber: string, profileImage: string, companyId: number, createdAt: any, updatedAt: any }, travel: { __typename?: 'Travel', id: number, name: string, description: string, coverImage?: string | null, duration: number, totalSeatNumber: number, companyId: number, destinationId: number, createdAt: any, updatedAt: any, company: { __typename?: 'Company', id: number, name: string, logo: string, coverImage: string, phoneNumber: string, email: string, description: string, username: string, createdAt: any, updatedAt: any }, agenda: { __typename?: 'Agenda', id: number, name: string, description: string, travelId: number, createdAt: any, updatedAt: any }, destination: { __typename?: 'Destination', id: number, name: string, location: string, createdAt: any, updatedAt: any }, categories: Array<{ __typename?: 'Category', id: number, name: string, createdAt: any, updatedAt: any }>, subCategories: Array<{ __typename?: 'SubCategory', id: string, name: string, categoryId: number, createdAt: any, updatedAt: any }>, travelSessions: Array<{ __typename?: 'TravelSession', id: number, startDate: any, endDate: any, travelId: number, guideId: number, createdAt: any, updatedAt: any, guide: { __typename?: 'Guide', id: number, name: string, email: string, phoneNumber: string, profileImage: string, companyId: number, createdAt: any, updatedAt: any } }> } }, payment: { __typename?: 'Payment', id: number, total: number, isPaid: boolean, paidAt?: any | null, createdAt: any, updatedAt: any }, travelers: Array<{ __typename?: 'Traveler', id: number, name: string, email: string, phoneNumber: string, dateOfBirth: any, orderId: number, seatId: number, createdAt: any, updatedAt: any }> };

export type TravelFieldsFragment = { __typename?: 'Travel', id: number, name: string, description: string, coverImage?: string | null, duration: number, totalSeatNumber: number, companyId: number, destinationId: number, createdAt: any, updatedAt: any };

export type TravelWithRelationsFragment = { __typename?: 'Travel', id: number, name: string, description: string, coverImage?: string | null, duration: number, totalSeatNumber: number, companyId: number, destinationId: number, createdAt: any, updatedAt: any, company: { __typename?: 'Company', id: number, name: string, logo: string, coverImage: string, phoneNumber: string, email: string, description: string, username: string, createdAt: any, updatedAt: any }, agenda: { __typename?: 'Agenda', id: number, name: string, description: string, travelId: number, createdAt: any, updatedAt: any }, destination: { __typename?: 'Destination', id: number, name: string, location: string, createdAt: any, updatedAt: any }, categories: Array<{ __typename?: 'Category', id: number, name: string, createdAt: any, updatedAt: any }>, subCategories: Array<{ __typename?: 'SubCategory', id: string, name: string, categoryId: number, createdAt: any, updatedAt: any }>, travelSessions: Array<{ __typename?: 'TravelSession', id: number, startDate: any, endDate: any, travelId: number, guideId: number, createdAt: any, updatedAt: any, guide: { __typename?: 'Guide', id: number, name: string, email: string, phoneNumber: string, profileImage: string, companyId: number, createdAt: any, updatedAt: any } }> };

export type GetGuidesByCompanyQueryVariables = Exact<{
  companyId: Scalars['Int']['input'];
}>;


export type GetGuidesByCompanyQuery = { __typename?: 'Query', getGuidesByCompany: Array<{ __typename?: 'Guide', id: number, name: string, email: string, phoneNumber: string, profileImage: string, companyId: number, createdAt: any, updatedAt: any }> };

export type CreateGuideMutationVariables = Exact<{
  input: CreateGuideInput;
}>;


export type CreateGuideMutation = { __typename?: 'Mutation', createGuide: { __typename?: 'Guide', id: number, name: string, email: string, phoneNumber: string, profileImage: string, companyId: number, createdAt: any, updatedAt: any } };

export type UpdateGuideMutationVariables = Exact<{
  updateGuideId: Scalars['Int']['input'];
  input: UpdateGuideInput;
}>;


export type UpdateGuideMutation = { __typename?: 'Mutation', updateGuide: { __typename?: 'Guide', id: number, name: string, email: string, phoneNumber: string, profileImage: string, companyId: number, createdAt: any, updatedAt: any } };

export type DeleteGuideMutationVariables = Exact<{
  deleteGuideId: Scalars['Int']['input'];
}>;


export type DeleteGuideMutation = { __typename?: 'Mutation', deleteGuide: boolean };

export type GetOrdersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetOrdersQuery = { __typename?: 'Query', getOrders: Array<{ __typename?: 'Order', id: number, totalSeats: number, totalPrice: number, orderStatus: number, customerId: number, travelSessionId: number, paymentId: number, createdAt: any, updatedAt: any, customer: { __typename?: 'Customer', id: number, firstName: string, lastName: string, phoneNumber: string, email: string, username: string, createdAt: any, updatedAt: any }, travelSession: { __typename?: 'TravelSession', id: number, startDate: any, endDate: any, travelId: number, guideId: number, createdAt: any, updatedAt: any, guide: { __typename?: 'Guide', id: number, name: string, email: string, phoneNumber: string, profileImage: string, companyId: number, createdAt: any, updatedAt: any }, travel: { __typename?: 'Travel', id: number, name: string, description: string, coverImage?: string | null, duration: number, totalSeatNumber: number, companyId: number, destinationId: number, createdAt: any, updatedAt: any, company: { __typename?: 'Company', id: number, name: string, logo: string, coverImage: string, phoneNumber: string, email: string, description: string, username: string, createdAt: any, updatedAt: any }, agenda: { __typename?: 'Agenda', id: number, name: string, description: string, travelId: number, createdAt: any, updatedAt: any }, destination: { __typename?: 'Destination', id: number, name: string, location: string, createdAt: any, updatedAt: any }, categories: Array<{ __typename?: 'Category', id: number, name: string, createdAt: any, updatedAt: any }>, subCategories: Array<{ __typename?: 'SubCategory', id: string, name: string, categoryId: number, createdAt: any, updatedAt: any }>, travelSessions: Array<{ __typename?: 'TravelSession', id: number, startDate: any, endDate: any, travelId: number, guideId: number, createdAt: any, updatedAt: any, guide: { __typename?: 'Guide', id: number, name: string, email: string, phoneNumber: string, profileImage: string, companyId: number, createdAt: any, updatedAt: any } }> } }, payment: { __typename?: 'Payment', id: number, total: number, isPaid: boolean, paidAt?: any | null, createdAt: any, updatedAt: any }, travelers: Array<{ __typename?: 'Traveler', id: number, name: string, email: string, phoneNumber: string, dateOfBirth: any, orderId: number, seatId: number, createdAt: any, updatedAt: any }> }> };

export type GetOrderQueryVariables = Exact<{
  getOrderId: Scalars['Int']['input'];
}>;


export type GetOrderQuery = { __typename?: 'Query', getOrder: { __typename?: 'Order', id: number, totalSeats: number, totalPrice: number, orderStatus: number, customerId: number, travelSessionId: number, paymentId: number, createdAt: any, updatedAt: any, customer: { __typename?: 'Customer', id: number, firstName: string, lastName: string, phoneNumber: string, email: string, username: string, createdAt: any, updatedAt: any }, travelSession: { __typename?: 'TravelSession', id: number, startDate: any, endDate: any, travelId: number, guideId: number, createdAt: any, updatedAt: any, guide: { __typename?: 'Guide', id: number, name: string, email: string, phoneNumber: string, profileImage: string, companyId: number, createdAt: any, updatedAt: any }, travel: { __typename?: 'Travel', id: number, name: string, description: string, coverImage?: string | null, duration: number, totalSeatNumber: number, companyId: number, destinationId: number, createdAt: any, updatedAt: any, company: { __typename?: 'Company', id: number, name: string, logo: string, coverImage: string, phoneNumber: string, email: string, description: string, username: string, createdAt: any, updatedAt: any }, agenda: { __typename?: 'Agenda', id: number, name: string, description: string, travelId: number, createdAt: any, updatedAt: any }, destination: { __typename?: 'Destination', id: number, name: string, location: string, createdAt: any, updatedAt: any }, categories: Array<{ __typename?: 'Category', id: number, name: string, createdAt: any, updatedAt: any }>, subCategories: Array<{ __typename?: 'SubCategory', id: string, name: string, categoryId: number, createdAt: any, updatedAt: any }>, travelSessions: Array<{ __typename?: 'TravelSession', id: number, startDate: any, endDate: any, travelId: number, guideId: number, createdAt: any, updatedAt: any, guide: { __typename?: 'Guide', id: number, name: string, email: string, phoneNumber: string, profileImage: string, companyId: number, createdAt: any, updatedAt: any } }> } }, payment: { __typename?: 'Payment', id: number, total: number, isPaid: boolean, paidAt?: any | null, createdAt: any, updatedAt: any }, travelers: Array<{ __typename?: 'Traveler', id: number, name: string, email: string, phoneNumber: string, dateOfBirth: any, orderId: number, seatId: number, createdAt: any, updatedAt: any }> } };

export type GetOrdersByCompanyQueryVariables = Exact<{
  companyId: Scalars['Int']['input'];
}>;


export type GetOrdersByCompanyQuery = { __typename?: 'Query', getOrdersByCompany: Array<{ __typename?: 'Order', id: number, totalSeats: number, totalPrice: number, orderStatus: number, customerId: number, travelSessionId: number, paymentId: number, createdAt: any, updatedAt: any, customer: { __typename?: 'Customer', id: number, firstName: string, lastName: string, phoneNumber: string, email: string, username: string, createdAt: any, updatedAt: any }, travelSession: { __typename?: 'TravelSession', id: number, startDate: any, endDate: any, travelId: number, guideId: number, createdAt: any, updatedAt: any, guide: { __typename?: 'Guide', id: number, name: string, email: string, phoneNumber: string, profileImage: string, companyId: number, createdAt: any, updatedAt: any }, travel: { __typename?: 'Travel', id: number, name: string, description: string, coverImage?: string | null, duration: number, totalSeatNumber: number, companyId: number, destinationId: number, createdAt: any, updatedAt: any, company: { __typename?: 'Company', id: number, name: string, logo: string, coverImage: string, phoneNumber: string, email: string, description: string, username: string, createdAt: any, updatedAt: any }, agenda: { __typename?: 'Agenda', id: number, name: string, description: string, travelId: number, createdAt: any, updatedAt: any }, destination: { __typename?: 'Destination', id: number, name: string, location: string, createdAt: any, updatedAt: any }, categories: Array<{ __typename?: 'Category', id: number, name: string, createdAt: any, updatedAt: any }>, subCategories: Array<{ __typename?: 'SubCategory', id: string, name: string, categoryId: number, createdAt: any, updatedAt: any }>, travelSessions: Array<{ __typename?: 'TravelSession', id: number, startDate: any, endDate: any, travelId: number, guideId: number, createdAt: any, updatedAt: any, guide: { __typename?: 'Guide', id: number, name: string, email: string, phoneNumber: string, profileImage: string, companyId: number, createdAt: any, updatedAt: any } }> } }, payment: { __typename?: 'Payment', id: number, total: number, isPaid: boolean, paidAt?: any | null, createdAt: any, updatedAt: any }, travelers: Array<{ __typename?: 'Traveler', id: number, name: string, email: string, phoneNumber: string, dateOfBirth: any, orderId: number, seatId: number, createdAt: any, updatedAt: any }> }> };

export type GetOrdersByCustomerQueryVariables = Exact<{
  customerId: Scalars['Int']['input'];
}>;


export type GetOrdersByCustomerQuery = { __typename?: 'Query', getOrdersByCustomer: Array<{ __typename?: 'Order', id: number, totalSeats: number, totalPrice: number, orderStatus: number, customerId: number, travelSessionId: number, paymentId: number, createdAt: any, updatedAt: any, customer: { __typename?: 'Customer', id: number, firstName: string, lastName: string, phoneNumber: string, email: string, username: string, createdAt: any, updatedAt: any }, travelSession: { __typename?: 'TravelSession', id: number, startDate: any, endDate: any, travelId: number, guideId: number, createdAt: any, updatedAt: any, guide: { __typename?: 'Guide', id: number, name: string, email: string, phoneNumber: string, profileImage: string, companyId: number, createdAt: any, updatedAt: any }, travel: { __typename?: 'Travel', id: number, name: string, description: string, coverImage?: string | null, duration: number, totalSeatNumber: number, companyId: number, destinationId: number, createdAt: any, updatedAt: any, company: { __typename?: 'Company', id: number, name: string, logo: string, coverImage: string, phoneNumber: string, email: string, description: string, username: string, createdAt: any, updatedAt: any }, agenda: { __typename?: 'Agenda', id: number, name: string, description: string, travelId: number, createdAt: any, updatedAt: any }, destination: { __typename?: 'Destination', id: number, name: string, location: string, createdAt: any, updatedAt: any }, categories: Array<{ __typename?: 'Category', id: number, name: string, createdAt: any, updatedAt: any }>, subCategories: Array<{ __typename?: 'SubCategory', id: string, name: string, categoryId: number, createdAt: any, updatedAt: any }>, travelSessions: Array<{ __typename?: 'TravelSession', id: number, startDate: any, endDate: any, travelId: number, guideId: number, createdAt: any, updatedAt: any, guide: { __typename?: 'Guide', id: number, name: string, email: string, phoneNumber: string, profileImage: string, companyId: number, createdAt: any, updatedAt: any } }> } }, payment: { __typename?: 'Payment', id: number, total: number, isPaid: boolean, paidAt?: any | null, createdAt: any, updatedAt: any }, travelers: Array<{ __typename?: 'Traveler', id: number, name: string, email: string, phoneNumber: string, dateOfBirth: any, orderId: number, seatId: number, createdAt: any, updatedAt: any }> }> };

export type GetOrdersByTravelSessionQueryVariables = Exact<{
  travelSessionId: Scalars['Int']['input'];
}>;


export type GetOrdersByTravelSessionQuery = { __typename?: 'Query', getOrdersByTravelSession: Array<{ __typename?: 'Order', id: number, totalSeats: number, totalPrice: number, orderStatus: number, customerId: number, travelSessionId: number, paymentId: number, createdAt: any, updatedAt: any, customer: { __typename?: 'Customer', id: number, firstName: string, lastName: string, phoneNumber: string, email: string, username: string, createdAt: any, updatedAt: any }, travelSession: { __typename?: 'TravelSession', id: number, startDate: any, endDate: any, travelId: number, guideId: number, createdAt: any, updatedAt: any, guide: { __typename?: 'Guide', id: number, name: string, email: string, phoneNumber: string, profileImage: string, companyId: number, createdAt: any, updatedAt: any }, travel: { __typename?: 'Travel', id: number, name: string, description: string, coverImage?: string | null, duration: number, totalSeatNumber: number, companyId: number, destinationId: number, createdAt: any, updatedAt: any, company: { __typename?: 'Company', id: number, name: string, logo: string, coverImage: string, phoneNumber: string, email: string, description: string, username: string, createdAt: any, updatedAt: any }, agenda: { __typename?: 'Agenda', id: number, name: string, description: string, travelId: number, createdAt: any, updatedAt: any }, destination: { __typename?: 'Destination', id: number, name: string, location: string, createdAt: any, updatedAt: any }, categories: Array<{ __typename?: 'Category', id: number, name: string, createdAt: any, updatedAt: any }>, subCategories: Array<{ __typename?: 'SubCategory', id: string, name: string, categoryId: number, createdAt: any, updatedAt: any }>, travelSessions: Array<{ __typename?: 'TravelSession', id: number, startDate: any, endDate: any, travelId: number, guideId: number, createdAt: any, updatedAt: any, guide: { __typename?: 'Guide', id: number, name: string, email: string, phoneNumber: string, profileImage: string, companyId: number, createdAt: any, updatedAt: any } }> } }, payment: { __typename?: 'Payment', id: number, total: number, isPaid: boolean, paidAt?: any | null, createdAt: any, updatedAt: any }, travelers: Array<{ __typename?: 'Traveler', id: number, name: string, email: string, phoneNumber: string, dateOfBirth: any, orderId: number, seatId: number, createdAt: any, updatedAt: any }> }> };

export type GetTravelsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTravelsQuery = { __typename?: 'Query', getTravels: Array<{ __typename?: 'Travel', id: number, name: string, description: string, coverImage?: string | null, duration: number, totalSeatNumber: number, companyId: number, destinationId: number, createdAt: any, updatedAt: any, company: { __typename?: 'Company', id: number, name: string, logo: string, coverImage: string, phoneNumber: string, email: string, description: string, username: string, createdAt: any, updatedAt: any }, agenda: { __typename?: 'Agenda', id: number, name: string, description: string, travelId: number, createdAt: any, updatedAt: any }, destination: { __typename?: 'Destination', id: number, name: string, location: string, createdAt: any, updatedAt: any }, categories: Array<{ __typename?: 'Category', id: number, name: string, createdAt: any, updatedAt: any }>, subCategories: Array<{ __typename?: 'SubCategory', id: string, name: string, categoryId: number, createdAt: any, updatedAt: any }>, travelSessions: Array<{ __typename?: 'TravelSession', id: number, startDate: any, endDate: any, travelId: number, guideId: number, createdAt: any, updatedAt: any, guide: { __typename?: 'Guide', id: number, name: string, email: string, phoneNumber: string, profileImage: string, companyId: number, createdAt: any, updatedAt: any } }> }> };

export type GetTravelQueryVariables = Exact<{
  getTravelId: Scalars['Int']['input'];
}>;


export type GetTravelQuery = { __typename?: 'Query', getTravel: { __typename?: 'Travel', id: number, name: string, description: string, coverImage?: string | null, duration: number, totalSeatNumber: number, companyId: number, destinationId: number, createdAt: any, updatedAt: any, company: { __typename?: 'Company', id: number, name: string, logo: string, coverImage: string, phoneNumber: string, email: string, description: string, username: string, createdAt: any, updatedAt: any }, agenda: { __typename?: 'Agenda', id: number, name: string, description: string, travelId: number, createdAt: any, updatedAt: any }, destination: { __typename?: 'Destination', id: number, name: string, location: string, createdAt: any, updatedAt: any }, categories: Array<{ __typename?: 'Category', id: number, name: string, createdAt: any, updatedAt: any }>, subCategories: Array<{ __typename?: 'SubCategory', id: string, name: string, categoryId: number, createdAt: any, updatedAt: any }>, travelSessions: Array<{ __typename?: 'TravelSession', id: number, startDate: any, endDate: any, travelId: number, guideId: number, createdAt: any, updatedAt: any, guide: { __typename?: 'Guide', id: number, name: string, email: string, phoneNumber: string, profileImage: string, companyId: number, createdAt: any, updatedAt: any } }> } };

export type GetTravelsByCompanyQueryVariables = Exact<{
  companyId: Scalars['Int']['input'];
}>;


export type GetTravelsByCompanyQuery = { __typename?: 'Query', getTravelsByCompany: Array<{ __typename?: 'Travel', id: number, name: string, description: string, coverImage?: string | null, duration: number, totalSeatNumber: number, companyId: number, destinationId: number, createdAt: any, updatedAt: any, company: { __typename?: 'Company', id: number, name: string, logo: string, coverImage: string, phoneNumber: string, email: string, description: string, username: string, createdAt: any, updatedAt: any }, agenda: { __typename?: 'Agenda', id: number, name: string, description: string, travelId: number, createdAt: any, updatedAt: any }, destination: { __typename?: 'Destination', id: number, name: string, location: string, createdAt: any, updatedAt: any }, categories: Array<{ __typename?: 'Category', id: number, name: string, createdAt: any, updatedAt: any }>, subCategories: Array<{ __typename?: 'SubCategory', id: string, name: string, categoryId: number, createdAt: any, updatedAt: any }>, travelSessions: Array<{ __typename?: 'TravelSession', id: number, startDate: any, endDate: any, travelId: number, guideId: number, createdAt: any, updatedAt: any, guide: { __typename?: 'Guide', id: number, name: string, email: string, phoneNumber: string, profileImage: string, companyId: number, createdAt: any, updatedAt: any } }> }> };

export type CreateTravelMutationVariables = Exact<{
  input: CreateTravelInput;
}>;


export type CreateTravelMutation = { __typename?: 'Mutation', createTravel: { __typename?: 'Travel', id: number, name: string, description: string, coverImage?: string | null, duration: number, totalSeatNumber: number, companyId: number, destinationId: number, createdAt: any, updatedAt: any, company: { __typename?: 'Company', id: number, name: string, logo: string, coverImage: string, phoneNumber: string, email: string, description: string, username: string, createdAt: any, updatedAt: any }, agenda: { __typename?: 'Agenda', id: number, name: string, description: string, travelId: number, createdAt: any, updatedAt: any }, destination: { __typename?: 'Destination', id: number, name: string, location: string, createdAt: any, updatedAt: any }, categories: Array<{ __typename?: 'Category', id: number, name: string, createdAt: any, updatedAt: any }>, subCategories: Array<{ __typename?: 'SubCategory', id: string, name: string, categoryId: number, createdAt: any, updatedAt: any }>, travelSessions: Array<{ __typename?: 'TravelSession', id: number, startDate: any, endDate: any, travelId: number, guideId: number, createdAt: any, updatedAt: any, guide: { __typename?: 'Guide', id: number, name: string, email: string, phoneNumber: string, profileImage: string, companyId: number, createdAt: any, updatedAt: any } }> } };

export type UpdateTravelMutationVariables = Exact<{
  id: Scalars['Int']['input'];
  input: CreateTravelInput;
}>;


export type UpdateTravelMutation = { __typename?: 'Mutation', updateTravel: { __typename?: 'Travel', id: number, name: string, description: string, coverImage?: string | null, duration: number, totalSeatNumber: number, companyId: number, destinationId: number, createdAt: any, updatedAt: any, company: { __typename?: 'Company', id: number, name: string, logo: string, coverImage: string, phoneNumber: string, email: string, description: string, username: string, createdAt: any, updatedAt: any }, agenda: { __typename?: 'Agenda', id: number, name: string, description: string, travelId: number, createdAt: any, updatedAt: any }, destination: { __typename?: 'Destination', id: number, name: string, location: string, createdAt: any, updatedAt: any }, categories: Array<{ __typename?: 'Category', id: number, name: string, createdAt: any, updatedAt: any }>, subCategories: Array<{ __typename?: 'SubCategory', id: string, name: string, categoryId: number, createdAt: any, updatedAt: any }>, travelSessions: Array<{ __typename?: 'TravelSession', id: number, startDate: any, endDate: any, travelId: number, guideId: number, createdAt: any, updatedAt: any, guide: { __typename?: 'Guide', id: number, name: string, email: string, phoneNumber: string, profileImage: string, companyId: number, createdAt: any, updatedAt: any } }> } };

export type DeleteTravelMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type DeleteTravelMutation = { __typename?: 'Mutation', deleteTravel: { __typename?: 'Travel', id: number, name: string } };

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
    ...SeatFields
  }
}
    ${TravelerFieldsFragmentDoc}
${SeatFieldsFragmentDoc}`;
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
  email
  phoneNumber
  profileImage
  companyId
  createdAt
  updatedAt
}
    `;
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
}
    ${TravelSessionFieldsFragmentDoc}
${GuideFieldsFragmentDoc}`;
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
export const TravelSessionWithRelationsFragmentDoc = gql`
    fragment TravelSessionWithRelations on TravelSession {
  ...TravelSessionFields
  guide {
    ...GuideFields
  }
  travel {
    ...TravelWithRelations
  }
}
    ${TravelSessionFieldsFragmentDoc}
${GuideFieldsFragmentDoc}
${TravelWithRelationsFragmentDoc}`;
export const PaymentFieldsFragmentDoc = gql`
    fragment PaymentFields on Payment {
  id
  total
  isPaid
  paidAt
  createdAt
  updatedAt
}
    `;
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
    ...TravelerFields
  }
}
    ${OrderFieldsFragmentDoc}
${CustomerFieldsFragmentDoc}
${TravelSessionWithRelationsFragmentDoc}
${PaymentFieldsFragmentDoc}
${TravelerFieldsFragmentDoc}`;
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
    query GetGuidesByCompany($companyId: Int!) {
  getGuidesByCompany(companyId: $companyId) {
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
 *      companyId: // value for 'companyId'
 *   },
 * });
 */
export function useGetGuidesByCompanyQuery(baseOptions: Apollo.QueryHookOptions<GetGuidesByCompanyQuery, GetGuidesByCompanyQueryVariables> & ({ variables: GetGuidesByCompanyQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
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
export const GetTravelsDocument = gql`
    query GetTravels {
  getTravels {
    ...TravelWithRelations
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
    query GetTravelsByCompany($companyId: Int!) {
  getTravelsByCompany(companyId: $companyId) {
    ...TravelWithRelations
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
 *      companyId: // value for 'companyId'
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
export const CreateTravelDocument = gql`
    mutation CreateTravel($input: CreateTravelInput!) {
  createTravel(input: $input) {
    ...TravelWithRelations
  }
}
    ${TravelWithRelationsFragmentDoc}`;
export type CreateTravelMutationFn = Apollo.MutationFunction<CreateTravelMutation, CreateTravelMutationVariables>;

/**
 * __useCreateTravelMutation__
 *
 * To run a mutation, you first call `useCreateTravelMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTravelMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTravelMutation, { data, loading, error }] = useCreateTravelMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateTravelMutation(baseOptions?: Apollo.MutationHookOptions<CreateTravelMutation, CreateTravelMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateTravelMutation, CreateTravelMutationVariables>(CreateTravelDocument, options);
      }
export type CreateTravelMutationHookResult = ReturnType<typeof useCreateTravelMutation>;
export type CreateTravelMutationResult = Apollo.MutationResult<CreateTravelMutation>;
export type CreateTravelMutationOptions = Apollo.BaseMutationOptions<CreateTravelMutation, CreateTravelMutationVariables>;
export const UpdateTravelDocument = gql`
    mutation UpdateTravel($id: Int!, $input: CreateTravelInput!) {
  updateTravel(id: $id, input: $input) {
    ...TravelWithRelations
  }
}
    ${TravelWithRelationsFragmentDoc}`;
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
 *      id: // value for 'id'
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
    mutation DeleteTravel($id: Int!) {
  deleteTravel(id: $id) {
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
 *      id: // value for 'id'
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