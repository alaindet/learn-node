const request = require('supertest');
const { StatusCodes } = require('http-status-codes');
const bcrypt = require('bcrypt');

const app = require('../src/app');
const db = require('../src/config/database');
const { User } = require('../src/users/user.model');

const getTestPayload = () => ({
  username: 'user1',
  email: 'user1@example.com',
  password: 'user1@example.com',
});

beforeAll(() => {
  return db.sync();
});

beforeEach(() => {
  return User.destroy({ truncate: true });
});

describe('User Registration', () => {

  it('returns 201 when signup request is valid', async () => {
    const payload = getTestPayload();
    const res = await request(app).post('/api/1.0/users').send(payload);
    expect(res.status).toBe(StatusCodes.CREATED);
  });

  it('returns success message when signup request is valid', async () => {
    const payload = getTestPayload();
    const res = await request(app).post('/api/1.0/users').send(payload);
    expect(res.body.message).toBe('User created');
  });

  it('saves the user to the database', async () => {
    const payload = getTestPayload();
    await request(app).post('/api/1.0/users').send(payload);
    const users = await User.findAll();
    expect(users.length).toEqual(1);
  });

  it('saves the username and email to the database', async () => {
    const payload = getTestPayload();
    await request(app).post('/api/1.0/users').send(payload);
    const users = await User.findAll();
    const user = users[0];
    expect(user.username).toBe(payload.username);
    expect(user.email).toBe(payload.email);
  });

  it('hashes the password in database', async () => {
    const payload = getTestPayload();
    await request(app).post('/api/1.0/users').send(payload)
    const users = await User.findAll();
    const user = users[0];
    expect(user.username).toBe(payload.username);
    expect(user.email).toBe(payload.email);
    expect(bcrypt.compareSync(payload.password, user.password)).toBe(true);
  });
});
