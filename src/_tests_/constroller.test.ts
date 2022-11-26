import SignUpController from "@/presentation/controller/SignUp"
import { ValidationComposite } from "@/presentation/helpers/validators/validation-composite"
import { RequiredFieldsValidation } from "@/presentation/helpers/validators/required-fields-validation"

describe('SignUp Controller', () => {
  test('Cadastro de usuário com sucesso', async () => {
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

    const fieldValidator = new RequiredFieldsValidation(["name", "email", "password"]);
    const validator = new ValidationComposite([fieldValidator]);
    const controller = new SignUpController(mockAddAccount, validator);
    const response = await controller.handle()
  })
})