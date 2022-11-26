import { MissingParamError } from '../../errors'
import { Validation } from './validation'

export class RequiredFieldsValidation implements Validation {
  private readonly requiredFields: string[]

  constructor (requiredFields: string[]) {
    this.requiredFields = requiredFields
  }

  validate (input: any): Error {
    for (const field of this.requiredFields) {
      if (!input[field]) {
        return new MissingParamError(field)
      }
    }
  }
}
