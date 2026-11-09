import {
  CommonActions,
  createNavigationContainerRef,
} from '@react-navigation/native';
import {RootStackNavigationType} from './types/navigationType';

export const navigationRef =
  createNavigationContainerRef<RootStackNavigationType>();
export const navigate = <T extends keyof RootStackNavigationType>(
  name: T,
  ...params: RootStackNavigationType[T] extends undefined
    ? []
    : [RootStackNavigationType[T]]
) => {
  if (navigationRef?.isReady()) {
    navigationRef.navigate(
      name as keyof RootStackNavigationType,
      ...(params as [RootStackNavigationType[T]]),
    );
  }
};
export const navigateReplace = <T extends keyof RootStackNavigationType>(
  name: T,
  ...params: RootStackNavigationType[T] extends undefined
    ? []
    : [RootStackNavigationType[T]]
) => {
  if (navigationRef?.isReady()) {
    navigationRef?.dispatch(
      CommonActions.navigate({
        name: name as keyof RootStackNavigationType,
        params: {
          ...(params as [RootStackNavigationType[T]]),
          replace: true,
        },
      }),
    );
  }
};

export const navigateGoBack = () => {
  if (navigationRef?.isReady()) {
    navigationRef.goBack();
  }
};
export const navigateReset = <T extends keyof RootStackNavigationType>(
  name: T,
  ...params: RootStackNavigationType[T] extends undefined
    ? []
    : [RootStackNavigationType[T]]
) => {
  if (navigationRef.isReady()) {
    navigationRef?.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          {
            name,
            params: {...(params as [RootStackNavigationType[T]])},
          },
        ],
      }),
    );
  }
};
