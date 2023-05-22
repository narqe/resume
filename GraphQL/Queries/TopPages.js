import { gql } from '@apollo/client';

const TOP_SALESMAN = gql`
    query Query {
        getTopSalesman {
            total
            salesman {
                id
                name
                lastname
                email
            }
        }
    }
`
const TOP_CLIENTS = gql`
    query Query {
        getTopClients {
            total
            client {
                id
                name
                lastname
                email
                company
                phone
            }
        }
    }
`

module.exports = {
    TOP_SALESMAN,
    TOP_CLIENTS
}