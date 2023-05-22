
import { gql } from '@apollo/client';

const GET_ORDERS_BY_SELLER = gql`
query Query {
    getOrderVendedor {
        id
        order {
            id
            quantity
            name
            price
        }
        total
        client {
            id
            name
            lastname
            email
            phone
        }
        salesman
        createdOn
        state
    }
}`

module.exports = {
    GET_ORDERS_BY_SELLER
}