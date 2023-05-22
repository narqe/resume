import { gql } from '@apollo/client';

const GET_PRODUCTS = gql`
query Query {
    getAllProducts {
        id
        name
        price
        quantity
    }
}`

const GET_PRODUCT_BY_ID = gql`
query Query($id: ID!) {
    getProductById(id: $id) {
        name
        price
        quantity
    }
}`

module.exports = {
    GET_PRODUCTS,
    GET_PRODUCT_BY_ID
}