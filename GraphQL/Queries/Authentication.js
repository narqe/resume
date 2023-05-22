import { gql } from '@apollo/client';

const GET_USER = gql`
query Query {
    getUser {
        id
        name
        lastname
        email
        createdOn
    }
}`


module.exports = {
    GET_USER,
};