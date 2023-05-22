import { gql } from '@apollo/client';

const GET_CLIENT_SELLERS = gql`
query Query {
    getClientsVendedor {
        id
        name
        lastname
        email
        company
    }
}`

const GET_CLIENT = gql`
query Query($id: ID!) {
    getClient(id: $id) {
        name
        lastname
        email
        company
        phone
    }
}`

module.exports = {
    GET_CLIENT_SELLERS,
    GET_CLIENT
}