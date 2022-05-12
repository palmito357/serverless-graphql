const { UserInputError } = require('apollo-server-lambda')
const AWS = require('aws-sdk')
const dynamoDb = new AWS.DynamoDB.DocumentClient()

var todo = async (_, { todoId }) => {
  try {
    const result = await dynamoDb
      .get({
        TableName: process.env.TODOS_TABLE,
        Key: { todoId },
      })
      .promise()
    return result.Item
  } catch (err) {
    new UserInputError(err.message)
  }
}

var todos = async () => {
  try {
    const result = await dynamoDb
      .scan({
        TableName: process.env.TODOS_TABLE,
      })
      .promise()
    return result.Items
  } catch (err) {
    throw new UserInputError(err.message)
  }
}

var addTodo = async (_, { title, description, status }) => {
  try {
    const item = {
      todoId: String(new Date().getTime()),
      title,
      description: description || '',
      status: status || 'READY',
    }
    await dynamoDb
      .put({
        TableName: process.env.TODOS_TABLE,
        Item: item,
      })
      .promise()
    return item
  } catch (err) {
    throw new UserInputError(err.message)
  }
}

var updateTodo = async (_, { todoId, title, description, status }) => {
  try {
    const result = await dynamoDb
      .update({
        TableName: process.env.TODOS_TABLE,
        Key: { todoId },
        UpdateExpression: 'SET title = :x, description = :y, status = :z',
        ExpressionAttributeValues: {
          ':x': title,
          ':y': description,
          ':z': status,
        },
        ReturnValues: 'ALL_NEW',
      })
      .promise()
    return result.Attributes
  } catch (err) {
    throw new UserInputError(err.message)
  }
}

var deleteTodo = async (_, { todoId }) => {
  try {
    const result = await dynamoDb
      .delete({
        TableName: process.env.TODOS_TABLE,
        Key: { todoId },
        ReturnValues: 'ALL_OLD',
      })
      .promise()
    return true
  } catch (err) {
    throw new UserInputError(err.message)
  }
}

module.exports = {
  Query: {
    todo,
    todos,
  },
  Mutation: {
    addTodo,
    updateTodo,
    deleteTodo,
  },
}
