// auth
export const login = 'auth/login';
export const logoutEndpoint = 'user/logout';
export const signupEndpoint = 'user';
export const requestOtp = 'auth/request-otp';
export const verifyOtp = 'auth/verify-otp';
export const resetPasswordEndpoint = 'auth/reset-password';
export const register = 'user';
export const completeProfile = 'user/personal-details';
export const drivingDetails = 'user/driving-details';
export const imageUpload = 'upload';
export const changePassword = 'user/change-password';
export const updateProfileEndpoint = 'user/personal-details';

export const uploadImageEndpoint = 'upload?folder=';
export const uploadPictureEndpoint = 'upload?folder=';

// host car
export const publishCarEndpoint = 'car';
export const unpublishCarEndpoint = 'car/unpublish';
export const getHostCarsEndpoint = 'car/host';
export const getHostCarDetailsEndpoint = 'car';

// user car
export const getUserCarsEndpoint = 'car/filter';
export const getUserCarMapEndpoint = 'car/map';
export const getUserCarDetailsEndpoint = 'car';

// orders
export const getUserOrdersEndpoint = 'user/orders';
export const getHostOrdersEndpoint = 'user/orders/mycars';

// notifications
export const getNotificationsEndpoint = 'notification';
export const saveFCMTokenEndpoint = 'user/fcm-token';
export const notificationsPerference = 'user/preference';

// Chat
export const getChatListEndpoint = 'chat';

// booking
export const BookingEndpoint = 'booking';
export const CancelBookingEndpoint = 'booking/cancel';
export const userBookingEndpoint = 'booking/user';
export const userBookingReviewEndpoint = 'booking/review';

export const setupIntentEndpoint = 'stripe/setup-intent';
export const paymentCardListEndpoint = 'stripe/payment-methods';
export const paymentIntentEndpoint = 'stripe/payment-intent';

export const paymentMethodEndpoint = 'stripe/payment-method';

export const HelpcenterEndpoint = 'terms-and-conditions';

export const saveUserLocationEndpoint = 'user/location';
export const userDetailEndPoint = 'user/me';
export const stripeReCreateLinkEndPoint = 'stripe/account-link';

// settings

export const setLanguageSwitch = 'user/language';
