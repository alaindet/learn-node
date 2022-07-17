const { StatusCodes } = require('http-status-codes');
const nodemailerStub = require('nodemailer-stub');

const db = require('../src/config/database');
const { User } = require('../src/users/user.model');
const fromUtils = require('./register-user.utils');
const emailService = require('../src/email/email.service');
const enTranslation = require('../locales/en.json');
const itTranslation = require('../locales/it.json');

beforeAll(() => {
  return db.sync();
});

beforeEach(() => {
  return User.destroy({ truncate: true });
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
    const lastMail = nodemailerStub.interactsWithMail.lastMail();
    expect(lastMail.to[0]).toContain(payload.email);
    const users = await User.findAll();
    const user = users[0];
    expect(lastMail.content).toContain(user.activationToken);
  });

  it('returns 502 Bad Gateway when sending email fails', async () => {
    const mockSendAccountActivation = jest
      .spyOn(emailService, 'sendAccountActivation')
      .mockRejectedValue({ message: 'Failed to deliver email' });

    const res = await fromUtils.postUser();
    expect(res.status).toBe(StatusCodes.BAD_GATEWAY);
    mockSendAccountActivation.mockRestore();
  });

  it('returns email failure message when sending email fails', async () => {
    const errorMessage = enTranslation.users.activationEmailError;
    const mockSendAccountActivation = jest
      .spyOn(emailService, 'sendAccountActivation')
      .mockRejectedValue({ message: errorMessage });

    const res = await fromUtils.postUser();
    mockSendAccountActivation.mockRestore();
    expect(res.body.message).toBe(errorMessage);
  });

  it('doesn\'t save user to db if activation email fails to send', async () => {
    const mockSendAccountActivation = jest
      .spyOn(emailService, 'sendAccountActivation')
      .mockRejectedValue({ message: 'Could not send activation email' });

    const res = await fromUtils.postUser();
    mockSendAccountActivation.mockRestore();
    const users = await User.findAll();
    expect(users.length).toBe(0);
  });
});

describe('User account activation (i18n)', () => {
  it('returns email failure message when sending email fails', async () => {
    const errorMessage = itTranslation.users.activationEmailError;
    const mockSendAccountActivation = jest
      .spyOn(emailService, 'sendAccountActivation')
      .mockRejectedValue({ message: errorMessage });

    const payload = fromUtils.getValidPayload();
    const res = await fromUtils.postUser(payload, { language: 'it' });
    mockSendAccountActivation.mockRestore();
    expect(res.body.message).toBe(errorMessage);
  });
});
