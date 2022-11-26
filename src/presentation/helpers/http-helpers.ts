import { HttpResponse } from '../protocols/http'

export const created = (body: any): HttpResponse => ({
  body,
  statusCode: 201
})

export const badRequest = (error: any): HttpResponse => ({
  body: { message: error.message },
  statusCode: error.status || 500,
})
