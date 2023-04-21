import { cityNames, RATING_STARS_NUMBER } from './const';
import { Review } from './types/comment';
import { CityName } from './types/store';

export function getPercentByRating(rating: number): string {
  const roundedRating = Math.round(rating) * 100 / RATING_STARS_NUMBER;
  return `${roundedRating > 100 ? 100 : roundedRating}%`;
}

export function getTitleApartmentByType(type: string): string {
  return type[0].toUpperCase() + type.slice(1);
}

export function makeWordPluralOrSingular(number: number, singularWord:string, pluralWord: string): string {
  if (number === 1) {
    return singularWord;
  }
  return pluralWord;
}

export function formatDateToMonthAndYear(date: Date): string {
  const month = date.toLocaleString('en-US', { month: 'long' });
  const year = date.getFullYear();
  return`${month} ${year}`; // "April 2023"
}

export function formatDateToYearMonthDay(date: Date): string {
  return date.toISOString().split('T')[0];
}

export function orderReviewCallback(
  currentReview: Review,
  nextReview: Review
) {
  const currentDate = Date.parse(currentReview.date);
  const nextDate = Date.parse(nextReview.date);

  return nextDate - currentDate;
}

function getRandomItem<T>(array: Array<T>): T {
  const index = Math.floor(Math.random() * array.length);
  return array[index];
}

export function getRandomCity(): CityName {
  return getRandomItem([...cityNames]);
}
