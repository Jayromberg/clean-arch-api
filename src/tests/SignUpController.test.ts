import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

import AddUserInMemory from '../infra/AddUserInMemory';
import BCrypt from '../data/helpers/encrypter/BCrypt';
import DbAddAccount from '../data/DbAddAccount';
import { RequiredFieldsValidation } from "../presentation/helpers/validators/required-fields-validation";
import { ValidationComposite } from "../presentation/helpers/validators/validation-composite";
import SignUpController from "../presentation/controllers/SignUp";

const { expect } = chai;
chai.use(sinonChai);

describe('SignUp Controller', () => {
  it('Cadastro de usuário com sucesso', async () => {
    const mReq: any = {
      body: {
        name: 'Jayro',
        email: 'test@gmail.com',
        password: 'test',
      }
    };

    sinon.stub(BCrypt.prototype, 'encrypt').resolves('$2b$12$mXvF/DEAIyyGV/ExgRRfQeivu8NU8digum/93YuV/CNSEMNg0t2vy')

    const db = new AddUserInMemory();
    const encrypter = new BCrypt();
    const data = new DbAddAccount(db, encrypter);
    const fieldValidator = new RequiredFieldsValidation(["name", "email", "password"]);
    const validator = new ValidationComposite([fieldValidator]);
    const controller = new SignUpController(data, validator);
    const response = await controller.handle(mReq)

    expect(response.statusCode).to.be.equal(201);
    expect(response.body).to.be.deep.equal({
      id: 1,
      name: 'Jayro',
      email: 'test@gmail.com',
      password: '$2b$12$mXvF/DEAIyyGV/ExgRRfQeivu8NU8digum/93YuV/CNSEMNg0t2vy',
    })

    sinon.restore();
  })

  it('Deveria lançar um badRequest por falta do campo email', async () => {
    const mockAddAccount = {
      add: async () => {
        return null
      }
    }

    const mReq: any = {
      body: {
        name: 'Jayro',
        password: 'test',
      }
    };

    const fieldValidator = new RequiredFieldsValidation(["name", "email", "password"]);
    const validator = new ValidationComposite([fieldValidator]);
    const controller = new SignUpController(mockAddAccount, validator);
    const response = await controller.handle(mReq)

    expect(response.statusCode).to.be.equal(400);
    expect(response.body).to.be.deep.equal({ message: "Missing param: email" })
  })

  it('Deveria lançar um badRequest por email já cadastrado', async () => {
    const mReq: any = {
      body: {
        name: 'Jayro',
        email: 'test@gmail.com',
        password: 'test',
      }
    };

    sinon.stub(AddUserInMemory.prototype, 'findByEmail').resolves({
      id: 1,
      name: 'Jayro',
      email: 'test@gmail.com',
      password: 'test',
    })

    const db = new AddUserInMemory();
    const encrypter = new BCrypt();
    const data = new DbAddAccount(db, encrypter);
    const fieldValidator = new RequiredFieldsValidation(["name", "email", "password"]);
    const validator = new ValidationComposite([fieldValidator]);
    const controller = new SignUpController(data, validator);
    const response = await controller.handle(mReq)

    expect(response.statusCode).to.be.equal(409);
    expect(response.body).to.be.deep.equal({ message: "O email test@gmail.com já está cadastrado" })
  })
})