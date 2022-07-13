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
    password: 'P4ssword',
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

  /*
  Equivalent

  it.each([
    ['username', null, 'Username cannot be empty'],
    ...
  ])('when %s is %s it returns "%s"', async (field, value, expected) => {
    ...
  });
  */
  it.each`
    field         | value              | expected
    ${'username'} | ${null}            | ${'Username cannot be empty'}
    ${'username'} | ${'aa'}            | ${'Username must have min 4 and max 32 characters'}
    ${'username'} | ${'a'.repeat(35)}  | ${'Username must have min 4 and max 32 characters'}
    ${'email'}    | ${null}            | ${'Email cannot be empty'}
    ${'email'}    | ${'mail.com'}      | ${'Email must be valid'}
    ${'email'}    | ${'user.mail.com'} | ${'Email must be valid'}
    ${'email'}    | ${'me@there'}      | ${'Email must be valid'}
    ${'password'} | ${null}            | ${'Password cannot be empty'}
    ${'password'} | ${'P4ssa'}         | ${'Password must have min 6 characters'}
    ${'password'} | ${'lowercase'}     | ${'Password must have 1+ uppercase, 1+ lowercase and 1+ numbers'}
    ${'password'} | ${'UPPERCASE'}     | ${'Password must have 1+ uppercase, 1+ lowercase and 1+ numbers'}
    ${'password'} | ${'123abc456'}     | ${'Password must have 1+ uppercase, 1+ lowercase and 1+ numbers'}
    ${'password'} | ${'123ABC456'}     | ${'Password must have 1+ uppercase, 1+ lowercase and 1+ numbers'}
  `('returns "$expected" when $field is "$value"', async ({ field, value, expected }) => {
    const payload = getValidPayload();
    payload[field] = value;
    const res = await postUser(payload);
    expect(res.body.validationErrors[field]).toBe(expected);
  });

  it('returns "Email already in use" when same email exists', async () => {
    const payload = getValidPayload();
    await User.create(payload);
    const res = await postUser(); // Try creating the same user again
    expect(res.status).toBe(StatusCodes.BAD_REQUEST);
    expect(res.body.validationErrors.email).toBe('Email already in use');
  });

  it('returns errors for both empty username and same email exists', async () => {
    const payload = getValidPayload();
    await User.create(payload);
    const invalidPayload = { ...payload, username: null };
    const res = await postUser(invalidPayload);
    const errs = Object.keys(res.body.validationErrors ?? {});
    const expected = ['username', 'email'];
    expect([...errs].sort()).toEqual([...expected].sort());
    expect(res.body.validationErrors.email).toBe('Email already in use');
    expect(res.body.validationErrors.username).toBe('Username cannot be empty');
  });
});
