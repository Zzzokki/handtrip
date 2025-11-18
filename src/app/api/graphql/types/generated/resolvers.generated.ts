/* This file was automatically generated. DO NOT UPDATE MANUALLY. */
    import type   { Resolvers } from './types.generated';
    import    { getCategories as Query_getCategories } from './../../schemas/resolvers/Query/getCategories';
import    { getCompany as Query_getCompany } from './../../schemas/resolvers/Query/getCompany';
import    { getCustomer as Query_getCustomer } from './../../schemas/resolvers/Query/getCustomer';
import    { getSubCategories as Query_getSubCategories } from './../../schemas/resolvers/Query/getSubCategories';
import    { getTravel as Query_getTravel } from './../../schemas/resolvers/Query/getTravel';
import    { getTravels as Query_getTravels } from './../../schemas/resolvers/Query/getTravels';
import    { getTravelsBySubCategory as Query_getTravelsBySubCategory } from './../../schemas/resolvers/Query/getTravelsBySubCategory';
import    { loginAsCompany as Mutation_loginAsCompany } from './../../schemas/resolvers/Mutation/loginAsCompany';
import    { loginAsCustomer as Mutation_loginAsCustomer } from './../../schemas/resolvers/Mutation/loginAsCustomer';
import    { registerAsCustomer as Mutation_registerAsCustomer } from './../../schemas/resolvers/Mutation/registerAsCustomer';
import    { Category } from './../../schemas/resolvers/Category';
import    { Company } from './../../schemas/resolvers/Company';
import    { Customer } from './../../schemas/resolvers/Customer';
import    { LoginAsCompanyResponse } from './../../schemas/resolvers/LoginAsCompanyResponse';
import    { LoginAsCustomerResponse } from './../../schemas/resolvers/LoginAsCustomerResponse';
import    { SubCategory } from './../../schemas/resolvers/SubCategory';
import    { Travel } from './../../schemas/resolvers/Travel';
import    { TimestampResolver } from 'graphql-scalars';
    export const resolvers: Resolvers = {
      Query: { getCategories: Query_getCategories,getCompany: Query_getCompany,getCustomer: Query_getCustomer,getSubCategories: Query_getSubCategories,getTravel: Query_getTravel,getTravels: Query_getTravels,getTravelsBySubCategory: Query_getTravelsBySubCategory },
      Mutation: { loginAsCompany: Mutation_loginAsCompany,loginAsCustomer: Mutation_loginAsCustomer,registerAsCustomer: Mutation_registerAsCustomer },
      
      Category: Category,
Company: Company,
Customer: Customer,
LoginAsCompanyResponse: LoginAsCompanyResponse,
LoginAsCustomerResponse: LoginAsCustomerResponse,
SubCategory: SubCategory,
Travel: Travel,
Timestamp: TimestampResolver
    }