const request = require('supertest');
const { StatusCodes } = require('http-status-codes');
const bcrypt = require('bcrypt');

const app = require('../src/app');
const db = require('../src/config/database');
const { User } = require('../src/users/user.model');

beforeAll(() => {
  return db.sync();
});

beforeEach(() => {
  return User.destroy({ truncate: true });
});

describe('User Registration', () => {

  const getValidPayload = () => ({
    username: 'user1',
    email: 'user1@example.com',
    password: 'user1@example.com',
  });

  const postUser = (inputPayload) => {
    payload = inputPayload ?? getValidPayload();
    return request(app).post('/api/1.0/users').send(payload);
  };

  it(`returns ${StatusCodes.CREATED} when signup request is valid`, async () => {
    const res = await postUser();
    expect(res.status).toBe(StatusCodes.CREATED);
  });

  it('returns success message when signup request is valid', async () => {
    const res = await postUser();
    expect(res.body.message).toBe('User created');
  });

  it('saves the user to the database', async () => {
    await postUser();
    const users = await User.findAll();
    expect(users.length).toEqual(1);
  });

  it('saves the username and email to the database', async () => {
    await postUser();
    const users = await User.findAll();
    const { username, email } = getValidPayload();
    const user = users[0];
    expect(user.username).toBe(username);
    expect(user.email).toBe(email);
  });

  it('hashes the password in database', async () => {
    await postUser();
    const { username, email, password } = getValidPayload();
    const users = await User.findAll();
    const user = users[0];
    expect(user.username).toBe(username);
    expect(user.email).toBe(email);
    expect(bcrypt.compareSync(password, user.password)).toBe(true);
  });

  /*
  This is a table test, equivalent to

  it.each([
    ['username', 'Username cannot be empty'],
    ['email', 'Email cannot be empty'],
    ['password', 'Password cannot be empty'],
  ])('when %s is empty returns "%s"', async (field, expected) => {
    const { [field]: _, ...invalidPayload } = getValidPayload();
    const res = await postUser(invalidPayload);
    expect(res.status).toBe(StatusCodes.BAD_REQUEST);
    expect(res.body.validationErrors[field]).toBe(expected);
  });
  */
  it.each`
    field         | expected
    ${'username'} | ${'Username cannot be empty'}
    ${'email'}    | ${'Email cannot be empty'}
    ${'password'} | ${'Password cannot be empty'}
  `('returns "$expected" when $field is empty', async ({ field, expected }) => {
    const { [field]: _, ...invalidPayload } = getValidPayload();
    const res = await postUser(invalidPayload);
    expect(res.status).toBe(StatusCodes.BAD_REQUEST);
    expect(res.body.validationErrors[field]).toBe(expected);
  });

  it('returns errors when username and email are invalid', async () => {
    const { username, email, ...invalidPayload } = getValidPayload();
    invalidPayload.email = null;
    const res = await postUser(invalidPayload);
    const errors = Object.keys(res.body.validationErrors ?? {});
    errors.sort();
    const expected = ['username', 'email'];
    expected.sort();
    expect(errors).toEqual(expected);
  });

  it('returns validation errors in body when request is invalid', async () => {
    const { username, ...invalidPayload } = getValidPayload();
    const res = await postUser(invalidPayload);
    expect(res.body.validationErrors).not.toBeUndefined();
  });
});
