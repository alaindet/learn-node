const { StatusCodes } = require('http-status-codes');
const SMTPServer = require('smtp-server').SMTPServer;
const config = require('config');

const db = require('../src/config/database');
const { User } = require('../src/users/user.model');
const fromUtils = require('./register-user.utils');
const enTranslation = require('../locales/en.json');
const itTranslation = require('../locales/it.json');

let lastMail, emailServer;
let forceEmailFailure = false;

beforeAll(async () => {
  const { host, port } = config.get('email');

  emailServer = new SMTPServer({
    authOptional: true,
    onData(stream, session, callback) {
      let mailBody;
      stream.on('data', (data) => {
        mailBody += data.toString();
      });
      stream.on('end', () => {
        if (forceEmailFailure) {
          const err = new Error('Invalid email');
          err.responseCode = 553;
          return callback(err);
        }
        lastMail = mailBody;
        callback();
      });
    },
  });

  await emailServer.listen(port, host);
  await db.sync();
});

beforeEach(() => {
  forceEmailFailure = false;
  return User.destroy({ truncate: true });
});

afterAll(async () => {
  await emailServer.close();
});

describe('User account activation', () => {
  it('creates new user in inactive mode', async () => {
    await fromUtils.postUser();
    const users = await User.findAll();
    const user = users[0];
    expect(user.inactive).toBe(true);
  });

  it('creates new user and forces the inactive mode', async () => {
    const payload = { ...fromUtils.getValidPayload(), inactive: false };
    await fromUtils.postUser(payload);
    const users = await User.findAll();
    const user = users[0];
    expect(user.inactive).toBe(true);
  });

  it('creates an activation token for user', async () => {
    const payload = { ...fromUtils.getValidPayload(), inactive: false };
    await fromUtils.postUser(payload);
    const users = await User.findAll();
    const user = users[0];
    expect(user.activationToken).toBeTruthy();
  });

  it('sends an account activation email with activation token', async () => {
    const payload = fromUtils.getValidPayload();
    await fromUtils.postUser(payload);
    const users = await User.findAll();
    const user = users[0];
    expect(lastMail).toContain(payload.email);
    expect(lastMail).toContain(user.activationToken);
  });

  it('returns 502 Bad Gateway when sending email fails', async () => {
    forceEmailFailure = true;
    const res = await fromUtils.postUser();
    expect(res.status).toBe(StatusCodes.BAD_GATEWAY);
  });

  it('returns email failure message when sending email fails', async () => {
    const errorMessage = enTranslation.users.activationEmailError;
    forceEmailFailure = true;
    const res = await fromUtils.postUser();
    expect(res.body.message).toBe(errorMessage);
  });

  it('doesn\'t save user to db if activation email fails to send', async () => {
    forceEmailFailure = true;
    await fromUtils.postUser();
    const users = await User.findAll();
    expect(users.length).toBe(0);
  });
});

describe('User account activation (i18n)', () => {
  it('returns email failure message when sending email fails', async () => {
    const errorMessage = itTranslation.users.activationEmailError;
    forceEmailFailure = true;
    const payload = fromUtils.getValidPayload();
    const res = await fromUtils.postUser(payload, { language: 'it' });
    expect(res.body.message).toBe(errorMessage);
  });
});
