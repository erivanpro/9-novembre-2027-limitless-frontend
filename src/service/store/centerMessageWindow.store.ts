import {create} from 'zustand';

interface ShowCenterMessageWindowParams {
  title: string;
  message: string;
  buttonText?: string;
}

interface CenterMessageWindowStoreType {
  isVisible: boolean;
  title: string;
  message: string;
  buttonText: string;
  showWindow: (params: ShowCenterMessageWindowParams) => void;
  hideWindow: () => void;
}

const useCenterMessageWindowStore = create<CenterMessageWindowStoreType>(
  set => ({
    isVisible: false,
    title: '',
    message: '',
    buttonText: 'OK',
    showWindow: ({title, message, buttonText = 'OK'}) =>
      set({
        isVisible: true,
        title,
        message,
        buttonText,
      }),
    hideWindow: () =>
      set({
        isVisible: false,
      }),
  }),
);

export default useCenterMessageWindowStore;
