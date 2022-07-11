const request = require('supertest');

const app = require('../src/app');
const db = require('../src/config/database');
const User = require('../src/user/user');

beforeAll(() => {
  return db.sync();
});

beforeEach(() => {
  // Clean users table before running each test
  return User.destroy({ truncate: true });
});

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

  it('saves the user to the database', (done) => {
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
      .then(() => {
        User.findAll().then(users => {
          expect(users.length).toBe(1);
        });
        done();
      });
  });

  it('saves the username and email to the database', (done) => {
    const url = '/api/1.0/users';
    const username = 'user1';
    const email = 'user1@example.com';
    const password = 'user1@example.com';
    const payload = { username, email, password };

    request(app)
      .post(url)
      .send(payload)
      .expect(200)
      .then(() => {
        User.findAll().then(users => {
          // expect(users.length).toBe(1);
          const user = users[0];
          expect(user.username).toBe(username);
          expect(user.email).toBe(email);
        });
        done();
      });
  });
});
