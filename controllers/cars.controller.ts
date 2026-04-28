import { APIRequestContext, expect } from '@playwright/test';

export class CarsController {
  constructor(private request: APIRequestContext) {}

  async createCar(body: any) {
    const response = await this.request.post('/api/cars', {
      data: body,
    });

    return response;
  }
}