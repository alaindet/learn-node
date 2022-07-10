const request = require('supertest');
const app = require('../app');

describe('User Registration', () => {
  it('returns 200 when signup request is valid', (done) => {
    const url = '/api/1.0/users';
    const payload = {
      username: 'user1',
      email: 'user1@example.com',
      password: 'user1@example.com',
    };

    request(app)
      .post(url)
      .send(payload)
      .expect(200)
      .then((response) => {
        expect(response.status).toBe(200);
        done();
      });
  });

  it('returns success message when signup request is valid', (done) => {
    const url = '/api/1.0/users';
    const payload = {
      username: 'user1',
      email: 'user1@example.com',
      password: 'user1@example.com',
    };

    request(app)
      .post(url)
      .send(payload)
      .expect(200)
      .then((response) => {
        expect(response.body.message).toBe('User created');
        done();
      });
  });
});
