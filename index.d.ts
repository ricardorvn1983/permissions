export {};

declare global {
  namespace Express {
    interface Response {
      originalSend: any;
    }
  }
}