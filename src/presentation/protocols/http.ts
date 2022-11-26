export interface HttpRequest {
  body?: any
  params?: string
}

export interface HttpResponse {
  body?: any
  statusCode: number
}
