import { City, Offer } from '../types/offer';
import {
  image,
  internet,
  datatype,
  name,
  unique,
  address,
  random,
} from 'faker';
import { Review, UserComment } from '../types/comment';
import { AuthorizationInfo, Credentials } from '../types/user';
import { getRandomCity } from '../utils';

export const getFakeOffers = (): Offer[] =>
  Array.from({ length: 5 }).map(() => {
    const offer: Offer = {
      city: {
        name: 'Cologne',
        location: {
          latitude: datatype.float(),
          longitude: datatype.float(),
          zoom: datatype.number(),
        },
      },
      previewImage: internet.url(),
      images: [internet.url(), internet.url()],
      title: random.words(),
      isPremium: datatype.boolean(),
      rating: datatype.float(),
      type: 'room',
      bedrooms: datatype.number(),
      maxAdults: datatype.number(),
      price: datatype.number(),
      goods: ['Laptop friendly workspace'],
      host: {
        id: datatype.number(),
        name: name.firstName(),
        isPro: datatype.boolean(),
        avatarUrl: image.imageUrl(),
      },
      description: random.words(),
      location: {
        latitude: datatype.float(),
        longitude: datatype.float(),
        zoom: datatype.number(),
      },
      id: unique(() => datatype.number()),
    };
    return offer;
  });

export const getFakeOffer = (): Offer => ({
  city: {
    name: address.cityName(),
    location: {
      latitude: datatype.float(),
      longitude: datatype.float(),
      zoom: datatype.number(),
    },
  },
  previewImage: internet.url(),
  images: [internet.url(), internet.url()],
  title: random.words(),
  isPremium: datatype.boolean(),
  rating: datatype.float(),
  type: 'room',
  bedrooms: datatype.number(),
  maxAdults: datatype.number(),
  price: datatype.number(),
  goods: ['Laptop friendly workspace'],
  host: {
    id: datatype.number(),
    name: name.firstName(),
    isPro: datatype.boolean(),
    avatarUrl: image.imageUrl(),
  },
  description: random.words(),
  location: {
    latitude: datatype.float(),
    longitude: datatype.float(),
    zoom: datatype.number(),
  },
  id: unique(() => datatype.number()),
});

export const getFakeComments = (): Review[] =>
  Array.from({ length: 5 }).map(() => {
    const review: Review = {
      id: datatype.number(),
      user: {
        id: datatype.number(),
        isPro: datatype.boolean(),
        name: name.firstName(),
        avatarUrl: image.imageUrl(),
      },
      rating: datatype.number(),
      comment: random.words(),
      date: datatype.datetime().toISOString(),
    };
    return review;
  });

export const getFakeComment = (): Review => ({
  id: datatype.number(),
  user: {
    id: datatype.number(),
    isPro: datatype.boolean(),
    name: name.firstName(),
    avatarUrl: image.imageUrl(),
  },
  rating: datatype.number(),
  comment: random.words(),
  date: datatype.datetime().toISOString(),
});

export const getFakeAuthorizationInfo = (): AuthorizationInfo => ({
  avatarUrl: image.imageUrl(),
  email: internet.email(),
  id: unique(() => datatype.number()),
  isPro: datatype.boolean(),
  name: name.firstName(),
  token: unique(() => random.word()),
});

export const getFakeUserCredentials = (): Credentials => ({
  email: internet.email(),
  password: internet.password(),
});

export const getFakeUserComment = (): UserComment => ({
  comment: random.words(),
  rating: datatype.float(),
});

export const getFakeCity = (): City => ({
  location: {
    latitude: datatype.number(),
    longitude: datatype.number(),
    zoom: datatype.number(),
  },
  name: getRandomCity()
});
