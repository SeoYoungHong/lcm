/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getTodo = /* GraphQL */ `
  query GetTodo($id: ID!) {
    getTodo(id: $id) {
      id
      name
      user
      description
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listTodos = /* GraphQL */ `
  query ListTodos(
    $filter: ModelTodoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTodos(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        user
        description
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const getFood = /* GraphQL */ `
  query GetFood($id: ID!) {
    getFood(id: $id) {
      id
      name
      food
      volum
      scale
      cal
      date
      time
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listFoods = /* GraphQL */ `
  query ListFoods(
    $filter: ModelFoodFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFoods(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        food
        volum
        scale
        cal
        date
        time
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const getSports = /* GraphQL */ `
  query GetSports($id: ID!) {
    getSports(id: $id) {
      id
      name
      food
      cal
      date
      time
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listSports = /* GraphQL */ `
  query ListSports(
    $filter: ModelSportsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSports(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        food
        cal
        date
        time
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const getBloodP = /* GraphQL */ `
  query GetBloodP($id: ID!) {
    getBloodP(id: $id) {
      id
      name
      bp1
      bp2
      bp3
      date
      time
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listBloodPS = /* GraphQL */ `
  query ListBloodPS(
    $filter: ModelBloodPFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listBloodPS(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        bp1
        bp2
        bp3
        date
        time
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const getBloodS = /* GraphQL */ `
  query GetBloodS($id: ID!) {
    getBloodS(id: $id) {
      id
      name
      gc
      date
      time
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listBloodS = /* GraphQL */ `
  query ListBloodS(
    $filter: ModelBloodSFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listBloodS(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        gc
        date
        time
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const getChallenge = /* GraphQL */ `
  query GetChallenge($id: ID!) {
    getChallenge(id: $id) {
      id
      title
      category
      usercount
      date
      content
      reward_info
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listChallenges = /* GraphQL */ `
  query ListChallenges(
    $filter: ModelChallengeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listChallenges(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        category
        usercount
        date
        content
        reward_info
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
