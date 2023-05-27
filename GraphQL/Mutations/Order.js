import { gql } from '@apollo/client';

const NEW_ORDER = gql`
mutation Mutation($input: OrderInput) {
        newOrder(input: $input) {
            id
        }
    }
`

const UPDATE_ORDER = gql`
mutation Mutation($id: ID!, $input: OrderInput) {
        updateOrder(id: $id, input: $input) {
            state
        }
    }
`;

const DELETE_ORDER = gql`
mutation Mutation($id: ID!) {
        deleteOrder(id: $id)
    }
`;

module.exports = {
    NEW_ORDER,
    UPDATE_ORDER,
    DELETE_ORDER
};