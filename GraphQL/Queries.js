import { gql } from '@apollo/client';

export const GET_CLIENT_SELLERS = gql`
query Query {
    getClientsVendedor {
        id
        name
        lastname
        email
        company
    }
}`

export const GET_USER = gql`
query Query {
    getUser {
        id
        name
        lastname
        email
        createdOn
    }
}`

export default {
    GET_CLIENT_SELLERS,
    GET_USER
};