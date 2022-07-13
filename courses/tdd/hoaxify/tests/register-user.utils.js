const request = require('supertest');

const app = require('../src/app');

// Bootstrap
const apiCfg = require('../src/config/api');

const getValidPayload = () => ({
  username: 'user1',
  email: 'user1@example.com',
  password: 'P4ssword',
});

const postUser = (inputPayload, options) => {
  payload = inputPayload ?? getValidPayload();
  const agent = request(app).post(`${apiCfg.prefix}/users`);

  if (options?.language) {
    agent.set('Accept-Language', options.language);
  }

  return agent.send(payload);
};

module.exports = {
  getValidPayload,
  postUser,
};
