import chai from 'chai';
// import sinon from 'sinon';
import sinonChai from 'sinon-chai';

import SignUpController from "../presentation/controllers/SignUp";
import { ValidationComposite } from "../presentation/helpers/validators/validation-composite";
import { RequiredFieldsValidation } from "../presentation/helpers/validators/required-fields-validation";

const { expect } = chai;
chai.use(sinonChai);

describe('SignUp Controller', () => {
  it('Cadastro de usuário com sucesso', async () => {
    const mockAddAccount = {
      add: async () => {
        return {
          id: '10',
          name: 'Jayro',
          email: 'test@gmail.com',
          password: 'test',
        }
      }
    }

    const mReq: any = {
      body: {
        name: 'Jayro',
        email: 'test@gmail.com',
        password: 'test',
      }
    };

    const fieldValidator = new RequiredFieldsValidation(["name", "email", "password"]);
    const validator = new ValidationComposite([fieldValidator]);
    const controller = new SignUpController(mockAddAccount, validator);
    const response = await controller.handle(mReq)

    expect(response.statusCode).to.be.equal(201);
    expect(response.body).to.be.deep.equal({
      id: '10',
      name: 'Jayro',
      email: 'test@gmail.com',
      password: 'test',
    })
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
})