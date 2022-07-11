const request = require('supertest');
const { StatusCodes } = require('http-status-codes');

const app = require('../src/app');
const db = require('../src/config/database');
const User = require('../src/user/user');

const getTestPayload = () => ({
  username: 'user1',
  email: 'user1@example.com',
  password: 'user1@example.com',
});

beforeAll(() => {
  return db.sync();
});

beforeEach(() => {
  // Clean users table before running each test
  return User.destroy({ truncate: true });
});

describe('User Registration', () => {

  it('returns 200 when signup request is valid', (done) => {
    request(app)
      .post('/api/1.0/users')
      .send(getTestPayload())
      .then(response => {
        expect(response.status).toBe(StatusCodes.CREATED);
        done();
      });
  });

  it('returns success message when signup request is valid', (done) => {
    request(app)
      .post('/api/1.0/users')
      .send(getTestPayload())
      .expect(StatusCodes.CREATED)
      .then(response => {
        expect(response.body.message).toBe('User created');
        done();
      });
  });

  it('saves the user to the database', (done) => {
    request(app)
      .post('/api/1.0/users')
      .send(getTestPayload())
      .expect(StatusCodes.CREATED)
      .then(() => {
        User.findAll().then(users => {
          expect(users.length).toEqual(1);
        });
        done();
      });
  });

  it('saves the username and email to the database', (done) => {
    const payload = getTestPayload();
    request(app)
      .post('/api/1.0/users')
      .send(getTestPayload())
      .expect(StatusCodes.CREATED)
      .then(() => {
        User.findAll().then((users) => {
          const user = users[0];
          expect(user.username).toBe(payload.username);
          expect(user.email).toBe(payload.email);
        });
        done();
      });
  });

  it('hashes the password in database', (done) => {
    const payload = getTestPayload();
    request(app)
      .post('/api/1.0/users')
      .send(getTestPayload())
      .expect(StatusCodes.CREATED)
      .then(() => {
        User.findAll().then((users) => {
          const user = users[0];
          expect(user.username).toBe(payload.username);
          expect(user.email).toBe(payload.email);
          expect(user.password).not.toBe(payload.password);
          // TODO: Check for proper encrypted password
        });
        done();
      });
  });
});
