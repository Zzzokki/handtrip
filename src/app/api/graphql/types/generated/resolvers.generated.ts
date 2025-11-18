/* This file was automatically generated. DO NOT UPDATE MANUALLY. */
    import type   { Resolvers } from './types.generated';
    import    { createCompany as Mutation_createCompany } from './../../schemas/resolvers/Mutation/createCompany';
import    { createCustomer as Mutation_createCustomer } from './../../schemas/resolvers/Mutation/createCustomer';
import    { deleteCompany as Mutation_deleteCompany } from './../../schemas/resolvers/Mutation/deleteCompany';
import    { deleteCustomer as Mutation_deleteCustomer } from './../../schemas/resolvers/Mutation/deleteCustomer';
import    { updateCompany as Mutation_updateCompany } from './../../schemas/resolvers/Mutation/updateCompany';
import    { updateCustomer as Mutation_updateCustomer } from './../../schemas/resolvers/Mutation/updateCustomer';
import    { TimestampResolver } from 'graphql-scalars';
    export const resolvers: Resolvers = {
      
      Mutation: { createCompany: Mutation_createCompany,createCustomer: Mutation_createCustomer,deleteCompany: Mutation_deleteCompany,deleteCustomer: Mutation_deleteCustomer,updateCompany: Mutation_updateCompany,updateCustomer: Mutation_updateCustomer },
      
      Timestamp: TimestampResolver
    }