export interface Encrypt {
  encrypt (password: string): Promise<string>
}
