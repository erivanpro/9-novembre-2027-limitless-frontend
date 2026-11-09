import {DEFAULT_IMAGE_URL} from './constants';
import {IMAGES} from './theme';

export const NOTIFICATION_DATA = [
  {
    date: 'Today',
    data: [
      {
        title:
          'Albert Dan Just Send you a message as it is long it might come in two lines, and repeated text as well',
        time: '10:12 PM',
      },
      {
        title: 'Jane Cooper book your car',
        time: '10:12 PM',
      },
    ],
  },
  {
    date: '11 May',
    data: [
      {
        title: 'Jane Cooper book your car',
        time: '10:12 PM',
      },
      {
        title: 'Jane Cooper book your car',
        time: '6:30 PM',
      },
      {
        title: 'your pickup is just started ',
        time: '6:30 PM',
      },
    ],
  },
  {
    date: '10 May',
    data: [
      {
        title: 'You have a new message',
        time: 'Hey! How are you?',
      },
      {
        title: 'You have a new message',
        time: 'Hey! How are you?',
      },
    ],
  },
  {
    date: '9 May',
    data: [
      {
        title: 'You have a new message',
        time: 'Hey! How are you?',
      },
      {
        title: 'You have a new message',
        time: 'Hey! How are you?',
      },
    ],
  },
];

export const HOST_CHAT_LIST_DATA = [
  {
    id: '1',
    name: 'Rehman Malik',
    profilePic: DEFAULT_IMAGE_URL,
    lastMessage:
      'Any upate brother ......................................................................?',
  },
];

export const CUSTOMER_CHAT_LIST_DATA = [
  {
    id: '1',
    name: 'Floyd Miles',
    profilePic: DEFAULT_IMAGE_URL,
    lastMessage:
      'Please let me know Please let me knowPlease let me knowPlease let me know...',
  },
  {
    id: '2',
    name: 'Szűts Gabriella',
    profilePic: DEFAULT_IMAGE_URL,
    lastMessage: 'let me know...',
  },
  {
    id: '3',
    name: 'Sípos Veronika',
    profilePic: DEFAULT_IMAGE_URL,
    lastMessage: '"Природа здесь потр..',
  },
  {
    id: '4',
    name: 'Somogyi Adél',
    profilePic: DEFAULT_IMAGE_URL,
    lastMessage: 'Please let me know...',
  },
  {
    id: '5',
    name: 'Virág Mercédesz',
    profilePic: DEFAULT_IMAGE_URL,
    lastMessage: 'Hello',
  },
  {
    id: '6',
    name: 'Sípos Veronika',
    profilePic: DEFAULT_IMAGE_URL,
    lastMessage: '"Природа здесь потр..',
  },
  {
    id: '7',
    name: 'Somogyi Adél',
    profilePic: DEFAULT_IMAGE_URL,
    lastMessage: 'Please let me know...',
  },
  {
    id: '8',
    name: 'Virág Mercédesz',
    profilePic: DEFAULT_IMAGE_URL,
    lastMessage: 'Hello',
  },
];

export const carouselImages = [
  IMAGES.car1,
  IMAGES.car2,
  IMAGES.car3,
  IMAGES.car1,
  IMAGES.car2,
  IMAGES.car3,
  IMAGES.car1,
];

export const carDetailsData = {
  name: 'Maserati',
  description:
    'This car is a high-performance sports car designed and manufactured by the renowned Italian luxury carmaker Maserati. ',
  images: [IMAGES.car1],
  pricePerDay: '799',
  pricePerHour: '50',
};

export const carFeatures = [
  {
    title: 'Child seat',
    icon: 'seat',
  },
  {
    title: 'GPS',
    icon: 'gps',
  },
  {
    title: 'Air conditioning',
    icon: 'gear',
  },
  {
    title: 'Bike rack',
    icon: 'fuel',
  },
  {
    title: 'show tires',
    icon: 'air',
  },
  {
    title: 'Cruise',
    icon: 'door',
  },
  {
    title: 'Automatic',
    icon: 'transmission',
  },
  {
    title: 'Pet friendly',
    icon: 'pet',
  },
  {
    title: 'Unlimited mileage',
    icon: 'mileage',
  },
  {
    title: 'Show tires',
    icon: 'tire',
  },
];

export const carReviews = [
  {
    name: 'Sarah L.',
    date: 'Oct 1, 2024',
    rating: 5,
    review:
      'Limitless made my car rental experience seamless! The interface is user-friendly, and I found the perfect car in minutes. Highly recommend!',
  },
  {
    name: 'David R.',
    date: 'Oct 3, 2024',
    rating: 4,
    review:
      'Great app with a wide selection of vehicles. I had a minor issue with my reservation, but customer service was quick to resolve it!',
  },
  {
    name: 'Sarah L.',
    date: 'Oct 1, 2024',
    rating: 5,
    review:
      'Limitless made my car rental experience seamless! The interface is user-friendly, and I found the perfect car in minutes. Highly recommend!',
  },
  {
    name: 'Sarah L.',
    date: 'Oct 1, 2024',
    rating: 5,
    review:
      'Limitless made my car rental experience seamless! The interface is user-friendly, and I found the perfect car in minutes. Highly recommend!',
  },
  {
    name: 'Sarah L.',
    date: 'Oct 1, 2024',
    rating: 5,
    review:
      'Limitless made my car rental experience seamless! The interface is user-friendly, and I found the perfect car in minutes. Highly recommend!',
  },
];

export const carColors = {
  black: '#000000',
  red: '#ED2015',
  yellow: '#E7F733',
  green: '#71E582',
  orange: '#FF9500',
  grey: '#BDBDBD',
  white: '#F5F5F5',
};

export const MyOrdersData = [
  {
    name: 'Maserati MC20',
    image: IMAGES.car1,
    pricePerDay: '799',
    pricePerHour: '50',
    startDate: '1 Nov',
    endDate: '1 Nov',
    hoster: {
      name: 'Thomas',
      location: 'Qatar, Doha',
      rating: 4.7,
      picture: IMAGES.hosterBadgePic,
    },
  },
  {
    name: 'Maserati',
    image: IMAGES.car2,
    pricePerDay: '799',
    pricePerHour: '50',
    startDate: '1 Nov',
    endDate: '1 Nov',
    hoster: {
      name: 'David',
      location: 'USA, New York',
      rating: 3.2,
      picture: IMAGES.hosterBadgePic,
    },
  },
  {
    name: 'Porsche 911 Turbo',
    image: IMAGES.car3,
    pricePerDay: '799',
    pricePerHour: '50',
    startDate: '1 Nov',
    endDate: '1 Nov',
    hoster: {
      name: 'Thomas',
      location: 'Qatar, Doha',
      rating: 4.7,
      picture: IMAGES.hosterBadgePic,
    },
  },
  {
    name: 'Porsche 911 Turbo',
    image: IMAGES.car1,
    pricePerDay: '799',
    pricePerHour: '50',
    startDate: '1 Nov',
    endDate: '1 Nov',
    hoster: {
      name: 'Thomas',
      location: 'Qatar, Doha',
      rating: 4.7,
      picture: IMAGES.hosterBadgePic,
    },
  },
  {
    name: 'Porsche 911 Turbo',
    image: IMAGES.car2,
    pricePerDay: '799',
    pricePerHour: '50',
    startDate: '1 Nov',
    endDate: '1 Nov',
    hoster: {
      name: 'Thomas',
      location: 'Qatar, Doha',
      rating: 4.7,
      picture: IMAGES.hosterBadgePic,
    },
  },
];
