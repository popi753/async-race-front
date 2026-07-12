import { createCar } from "@/api";
import { RANDOM_CARS_COUNT, CAR_BRANDS, CAR_MODELS } from "@/constants/app";

function randomInt(max: number): number {
  return Math.floor(Math.random() * max);
}

function generateRandomCarName(): string {
  const brand = CAR_BRANDS[randomInt(CAR_BRANDS.length)];
  const model = CAR_MODELS[randomInt(CAR_MODELS.length)];
  return `${brand} ${model}`;
}

function generateRandomColor(): string {
  const hex = '0123456789abcdef';
  const chars = Array.from({ length: 6 }, () => hex[randomInt(hex.length)]);
  return `#${chars.join('')}`;
}

const randomNumber = RANDOM_CARS_COUNT;

export default async function generateRandomCars(): Promise<void> {
  const promises = Array.from({ length: randomNumber }, () =>
    createCar({ name: generateRandomCarName(), color: generateRandomColor() }),
  );

  await Promise.all(promises);
}