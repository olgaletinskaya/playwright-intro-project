import { test, expect, request } from '@playwright/test';
import { CarsController } from '../../controllers/cars.controller';

test.describe('Cars API (Controller)', () => {
  let apiContext: any;
  let carsController: CarsController;

  test.beforeAll(async () => {
    apiContext = await request.newContext({
      baseURL: process.env.BASE_URL,
      httpCredentials: {
        username: process.env.HTTP_USERNAME!,
        password: process.env.HTTP_PASSWORD!,
      },
    });

    carsController = new CarsController(apiContext);

    await carsController.login(
      process.env.EMAIL!,
      process.env.PASSWORD!
    );
  });

  test('Create car - positive', async () => {
    const response = await carsController.createCar({
    carBrandId: 1,
    carModelId: 1,
    mileage: Math.floor(Math.random() * 1000) + 100, 
});

   const body = await response.json();
   console.log('Error message from server:', body);
   expect(response.status()).toBe(201);
  });

  test('Create car - missing mileage', async () => {
    const response = await carsController.createCar({
      carBrandId: 1,
      carModelId: 1,
    });

    expect(response.status()).toBe(400);
  });

  test('Create car - invalid brandId', async () => {
    const response = await carsController.createCar({
      carBrandId: 9999,
      carModelId: 1,
      mileage: 100,
    });

    expect(response.status()).toBe(400);
  });
});