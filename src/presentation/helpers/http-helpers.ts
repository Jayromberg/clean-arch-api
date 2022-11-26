import { HttpResponse } from '@/presentation/protocols/http'

export const created = (body: any): HttpResponse => ({
  body,
  statusCode: 201
})

export const badRequest = (error: Error): HttpResponse => ({
  body: { message: error.message },
  statusCode: 400
})
