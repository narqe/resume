import { gql } from '@apollo/client';

const NEW_PRODUCT = gql`
    mutation Mutation($input: ProductInput) {
        newProduct(input: $input) {
            name
            quantity
            price
        }
    }
`;

const DELETE_PRODUCT = gql`
    mutation Mutation($id: ID!) {
        deleteProduct(id: $id)
    }
`;

const UPDATE_PRODUCT = gql`
mutation Mutation($id: ID!, $input: ProductInput) {
    updateProduct(id: $id, input: $input) {
        name
        price
        quantity
    }
}
`;

module.exports = {
    NEW_PRODUCT,
    DELETE_PRODUCT,
    UPDATE_PRODUCT
}