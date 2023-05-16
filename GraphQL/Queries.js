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


export const GET_CLIENT = gql`
query Query($id: ID!) {
    getClient(id: $id) {
        name
        lastname
        email
        company
        phone
    }
}`

export const GET_PRODUCTS = gql`
query Query {
    getAllProducts {
        id
        name
        price
        quantity
    }
}`

export const GET_PRODUCT_BY_ID = gql`
query Query($id: ID!) {
    getProductById(id: $id) {
        name
        price
        quantity
    }
}`


export default {
    GET_CLIENT_SELLERS,
    GET_USER,
    GET_CLIENT,
    GET_PRODUCTS
};