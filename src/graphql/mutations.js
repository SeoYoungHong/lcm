/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createTodo = /* GraphQL */ `
  mutation CreateTodo(
    $input: CreateTodoInput!
    $condition: ModelTodoConditionInput
  ) {
    createTodo(input: $input, condition: $condition) {
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
export const updateTodo = /* GraphQL */ `
  mutation UpdateTodo(
    $input: UpdateTodoInput!
    $condition: ModelTodoConditionInput
  ) {
    updateTodo(input: $input, condition: $condition) {
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
export const deleteTodo = /* GraphQL */ `
  mutation DeleteTodo(
    $input: DeleteTodoInput!
    $condition: ModelTodoConditionInput
  ) {
    deleteTodo(input: $input, condition: $condition) {
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
export const createFood = /* GraphQL */ `
  mutation CreateFood(
    $input: CreateFoodInput!
    $condition: ModelFoodConditionInput
  ) {
    createFood(input: $input, condition: $condition) {
      id
      name
      food
      volum
      scale
      cal
      createdAt
      updatedAt
      owner
    }
  }
`;
export const updateFood = /* GraphQL */ `
  mutation UpdateFood(
    $input: UpdateFoodInput!
    $condition: ModelFoodConditionInput
  ) {
    updateFood(input: $input, condition: $condition) {
      id
      name
      food
      volum
      scale
      cal
      createdAt
      updatedAt
      owner
    }
  }
`;
export const deleteFood = /* GraphQL */ `
  mutation DeleteFood(
    $input: DeleteFoodInput!
    $condition: ModelFoodConditionInput
  ) {
    deleteFood(input: $input, condition: $condition) {
      id
      name
      food
      volum
      scale
      cal
      createdAt
      updatedAt
      owner
    }
  }
`;
export const createSports = /* GraphQL */ `
  mutation CreateSports(
    $input: CreateSportsInput!
    $condition: ModelSportsConditionInput
  ) {
    createSports(input: $input, condition: $condition) {
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
export const updateSports = /* GraphQL */ `
  mutation UpdateSports(
    $input: UpdateSportsInput!
    $condition: ModelSportsConditionInput
  ) {
    updateSports(input: $input, condition: $condition) {
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
export const deleteSports = /* GraphQL */ `
  mutation DeleteSports(
    $input: DeleteSportsInput!
    $condition: ModelSportsConditionInput
  ) {
    deleteSports(input: $input, condition: $condition) {
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
export const createBloodP = /* GraphQL */ `
  mutation CreateBloodP(
    $input: CreateBloodPInput!
    $condition: ModelBloodPConditionInput
  ) {
    createBloodP(input: $input, condition: $condition) {
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
export const updateBloodP = /* GraphQL */ `
  mutation UpdateBloodP(
    $input: UpdateBloodPInput!
    $condition: ModelBloodPConditionInput
  ) {
    updateBloodP(input: $input, condition: $condition) {
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
export const deleteBloodP = /* GraphQL */ `
  mutation DeleteBloodP(
    $input: DeleteBloodPInput!
    $condition: ModelBloodPConditionInput
  ) {
    deleteBloodP(input: $input, condition: $condition) {
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
export const createBloodS = /* GraphQL */ `
  mutation CreateBloodS(
    $input: CreateBloodSInput!
    $condition: ModelBloodSConditionInput
  ) {
    createBloodS(input: $input, condition: $condition) {
      id
      name
      gc
      createdAt
      updatedAt
      owner
    }
  }
`;
export const updateBloodS = /* GraphQL */ `
  mutation UpdateBloodS(
    $input: UpdateBloodSInput!
    $condition: ModelBloodSConditionInput
  ) {
    updateBloodS(input: $input, condition: $condition) {
      id
      name
      gc
      createdAt
      updatedAt
      owner
    }
  }
`;
export const deleteBloodS = /* GraphQL */ `
  mutation DeleteBloodS(
    $input: DeleteBloodSInput!
    $condition: ModelBloodSConditionInput
  ) {
    deleteBloodS(input: $input, condition: $condition) {
      id
      name
      gc
      createdAt
      updatedAt
      owner
    }
  }
`;
export const createChallenge = /* GraphQL */ `
  mutation CreateChallenge(
    $input: CreateChallengeInput!
    $condition: ModelChallengeConditionInput
  ) {
    createChallenge(input: $input, condition: $condition) {
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
export const updateChallenge = /* GraphQL */ `
  mutation UpdateChallenge(
    $input: UpdateChallengeInput!
    $condition: ModelChallengeConditionInput
  ) {
    updateChallenge(input: $input, condition: $condition) {
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
export const deleteChallenge = /* GraphQL */ `
  mutation DeleteChallenge(
    $input: DeleteChallengeInput!
    $condition: ModelChallengeConditionInput
  ) {
    deleteChallenge(input: $input, condition: $condition) {
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
