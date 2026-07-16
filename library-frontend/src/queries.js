import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
      id
    }
  }
`;

export const ALL_BOOKS = gql`
  query allBooks($genre: String) {
    allBooks(genre: $genre) {
      title
      author {
        name
        born
      }
      genres
      published
      id
    }
  }
`;

export const ME = gql`
  query {
    me {
      favoriteGenre
    }
  }
`

export const CREATE_BOOK = gql`
  mutation createBook(
    $title: String!
    $published: Int!
    $author: String!
    $genres: [String!]!
  ) {
    addBook(
      title: $title
      published: $published
      author: $author
      genres: $genres
    ) {
      title
      published
      author {
        name
      }
      id
      genres
    }
  }
`;

export const UPDATE_BORN = gql`
  mutation updateBorn(
      $name: String!
      $setBornTo: Int!
    ) {
        editAuthor(
          name: $name
          setBornTo: $setBornTo
        ) {
            name
            born
            bookCount
            id
        }
    }
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`