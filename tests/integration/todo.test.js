const expect = require('chai').expect
const url = process.env.INTEGRATION_TEST_URL
const request = require('supertest')(url)

describe('Club GraphQL Tests', function () {
  test('Query Todos GraphQL', async function () {
    const response = await request
      .post('/')
      .send({ query: '{ todos { title } }' })
    expect(response.status).to.eql(200)
    expect(response.body.data).to.have.property('todos')
  })
})
