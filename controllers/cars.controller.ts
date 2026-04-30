import { APIRequestContext } from '@playwright/test';

export class CarsController {
  private request: APIRequestContext;
  private token: string = '';

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async login(email: string, password: string) {
    const response = await this.request.post('/api/auth/signin', {
      data: { email, password },
    });

    const body = await response.json();
    this.token = body.data.accessToken;
  }

  async createCar(data: any) {
    return this.request.post('/api/cars', {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
      data,
    });
  }
}