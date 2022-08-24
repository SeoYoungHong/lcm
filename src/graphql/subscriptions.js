/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateTodo = /* GraphQL */ `
  subscription OnCreateTodo($owner: String) {
    onCreateTodo(owner: $owner) {
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
export const onUpdateTodo = /* GraphQL */ `
  subscription OnUpdateTodo($owner: String) {
    onUpdateTodo(owner: $owner) {
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
export const onDeleteTodo = /* GraphQL */ `
  subscription OnDeleteTodo($owner: String) {
    onDeleteTodo(owner: $owner) {
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
export const onCreateFood = /* GraphQL */ `
  subscription OnCreateFood($owner: String) {
    onCreateFood(owner: $owner) {
      id
      name
      food
      cal
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onUpdateFood = /* GraphQL */ `
  subscription OnUpdateFood($owner: String) {
    onUpdateFood(owner: $owner) {
      id
      name
      food
      cal
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onDeleteFood = /* GraphQL */ `
  subscription OnDeleteFood($owner: String) {
    onDeleteFood(owner: $owner) {
      id
      name
      food
      cal
      createdAt
      updatedAt
      owner
    }
  }
`;
