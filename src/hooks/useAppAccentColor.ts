import useUserStore from '../service/store/user.store';

export const DEFAULT_ACCENT_COLOR = '#33bb78';

const useAppAccentColor = () => {
  const appAccentColor = useUserStore(state => state.appAccentColor);
  return appAccentColor || DEFAULT_ACCENT_COLOR;
};

export default useAppAccentColor;
