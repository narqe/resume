import { gql } from '@apollo/client';

const NEW_CLIENT = gql`
mutation Mutation($input: ClientInput) {
    newClient(input: $input) {
        id
        name
        lastname
        email
        company
        phone
    }
}
`

const DELETE_CLIENT = gql`
mutation Mutation($id: ID!) {
    deleteClient(id: $id)
}
`

const UPDATE_CLIENT = gql`
mutation Mutation($id: ID!, $input: ClientInput) {
    updateClient(id: $id, input: $input) {
        name
        lastname
        email
        company
        phone
    }
}
`

module.exports = {
    NEW_CLIENT,
    DELETE_CLIENT,
    UPDATE_CLIENT
}