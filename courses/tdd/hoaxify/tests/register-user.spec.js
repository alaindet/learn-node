const { StatusCodes } = require('http-status-codes');
const bcrypt = require('bcrypt');

const db = require('../src/config/database');
const { User } = require('../src/users/user.model');
const fromUtils = require('./register-user.utils');

beforeAll(() => {
  return db.sync();
});

beforeEach(() => {
  return User.destroy({ truncate: true });
});

describe('User Registration', () => {

  it(`returns ${StatusCodes.CREATED} when signup request is valid`, async () => {
    const res = await fromUtils.postUser();
    expect(res.status).toBe(StatusCodes.CREATED);
  });

  it('returns success message when signup request is valid', async () => {
    const res = await fromUtils.postUser();
    expect(res.body.message).toBe('User created'); // TODO: Translate
  });

  it('saves the user to the database', async () => {
    await fromUtils.postUser();
    const users = await User.findAll();
    expect(users.length).toEqual(1);
  });

  it('saves the username and email to the database', async () => {
    await fromUtils.postUser();
    const users = await User.findAll();
    const { username, email } = fromUtils.getValidPayload();
    const user = users[0];
    expect(user.username).toBe(username);
    expect(user.email).toBe(email);
  });

  it('hashes the password in database', async () => {
    await fromUtils.postUser();
    const { username, email, password } = fromUtils.getValidPayload();
    const users = await User.findAll();
    const user = users[0];
    expect(user.username).toBe(username);
    expect(user.email).toBe(email);
    expect(bcrypt.compareSync(password, user.password)).toBe(true);
  });

  it('returns errors when username and email are invalid', async () => {
    const { username, email, ...invalidPayload } = fromUtils.getValidPayload();
    invalidPayload.email = null;
    const res = await fromUtils.postUser(invalidPayload);
    const errors = Object.keys(res.body.validationErrors ?? {});
    errors.sort();
    const expected = ['username', 'email'];
    expected.sort();
    expect(errors).toEqual(expected);
  });

  it('returns validation errors in body when request is invalid', async () => {
    const { username, ...invalidPayload } = fromUtils.getValidPayload();
    const res = await fromUtils.postUser(invalidPayload);
    expect(res.body.validationErrors).not.toBeUndefined();
  });

  const usernameEmpty = 'Username cannot be empty';
  const usernameSize = 'Username must have min 4 and max 32 characters';
  const emailEmpty = 'Email cannot be empty';
  const emailValid = 'Email must be valid';
  const emailInUse = 'Email already in use';
  const passwordEmpty = 'Password cannot be empty';
  const passwordSize = 'Password must have min 6 characters';
  const passwordPattern = 'Password must have 1+ uppercase, 1+ lowercase and 1+ numbers';

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
    ${'username'} | ${null}            | ${usernameEmpty}
    ${'username'} | ${'aa'}            | ${usernameSize}
    ${'username'} | ${'a'.repeat(35)}  | ${usernameSize}
    ${'email'}    | ${null}            | ${emailEmpty}
    ${'email'}    | ${'mail.com'}      | ${emailValid}
    ${'email'}    | ${'user.mail.com'} | ${emailValid}
    ${'email'}    | ${'me@there'}      | ${emailValid}
    ${'password'} | ${null}            | ${passwordEmpty}
    ${'password'} | ${'P4ssa'}         | ${passwordSize}
    ${'password'} | ${'lowercase'}     | ${passwordPattern}
    ${'password'} | ${'UPPERCASE'}     | ${passwordPattern}
    ${'password'} | ${'123abc456'}     | ${passwordPattern}
    ${'password'} | ${'123ABC456'}     | ${passwordPattern}
  `('returns "$expected" when $field is "$value"', async ({ field, value, expected }) => {
    const payload = fromUtils.getValidPayload();
    payload[field] = value;
    const res = await fromUtils.postUser(payload);
    expect(res.body.validationErrors[field]).toBe(expected);
  });

  it(`returns "${emailInUse}" when same email exists`, async () => {
    const payload = fromUtils.getValidPayload();
    await User.create(payload);
    const res = await fromUtils.postUser(); // Try creating the same user again
    expect(res.status).toBe(StatusCodes.BAD_REQUEST);
    expect(res.body.validationErrors.email).toBe(emailInUse);
  });

  it('returns errors for both empty username and same email exists', async () => {
    const payload = fromUtils.getValidPayload();
    await User.create(payload);
    const invalidPayload = { ...payload, username: null };
    const res = await fromUtils.postUser(invalidPayload);
    const errs = Object.keys(res.body.validationErrors ?? {});
    const expected = ['username', 'email'];
    expect([...errs].sort()).toEqual([...expected].sort());
    expect(res.body.validationErrors.email).toBe(emailInUse);
    expect(res.body.validationErrors.username).toBe(usernameEmpty);
  });
});

describe('Internationalization (IT)', () => {

  const usernameEmpty = 'Username obbligatorio';
  const usernameSize = 'Lo username deve contenere da 4 a 32 caratteri';
  const emailEmpty = 'Email obbligatoria';
  const emailValid = 'La email deve essere valida';
  const emailInUse = 'Email già in uso';
  const passwordEmpty = 'Password obbligatoria';
  const passwordSize = 'La password deve contenere almeno 6 caratteri';
  const passwordPattern = 'La password deve contenere 1+ maiuscole, 1+ minuscole e 1+ numeri';

  it.each`
    field         | value              | expected
    ${'username'} | ${null}            | ${usernameEmpty}
    ${'username'} | ${'aa'}            | ${usernameSize}
    ${'username'} | ${'a'.repeat(35)}  | ${usernameSize}
    ${'email'}    | ${null}            | ${emailEmpty}
    ${'email'}    | ${'mail.com'}      | ${emailValid}
    ${'email'}    | ${'user.mail.com'} | ${emailValid}
    ${'email'}    | ${'me@there'}      | ${emailValid}
    ${'password'} | ${null}            | ${passwordEmpty}
    ${'password'} | ${'P4ssa'}         | ${passwordSize}
    ${'password'} | ${'lowercase'}     | ${passwordPattern}
    ${'password'} | ${'UPPERCASE'}     | ${passwordPattern}
    ${'password'} | ${'123abc456'}     | ${passwordPattern}
    ${'password'} | ${'123ABC456'}     | ${passwordPattern}
  `(
    'returns "$expected" when $field is "$value" when language is set to italian',
    async ({ field, value, expected }) => {
      const payload = fromUtils.getValidPayload();
      payload[field] = value;
      const res = await fromUtils.postUser(payload, { language: 'it' });
      expect(res.body.validationErrors[field]).toBe(expected);
    }
  );

  it(`returns "${emailInUse}" when same email exists and language is set to italian`, async () => {
    const payload = fromUtils.getValidPayload();
    await User.create(payload);
    const res = await fromUtils.postUser(payload, { language: 'it' });
    expect(res.status).toBe(StatusCodes.BAD_REQUEST);
    expect(res.body.validationErrors.email).toBe(emailInUse);
  });
});
