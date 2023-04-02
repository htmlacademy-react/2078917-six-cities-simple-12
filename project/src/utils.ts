import { RATING_STARS_NUMBER } from './const';

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
