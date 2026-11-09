import NetInfo from '@react-native-community/netinfo';
import {useEffect, useState} from 'react';

export const useInterNetInfo = () => {
  const [internetStatus, setInternetStatus] = useState<any>(false);

  useEffect(() => {
    const removeNetInfoSubscription = NetInfo.addEventListener(state => {
      const online: any = state?.isConnected;
      if (online) {
        setInternetStatus(false);
      } else {
        setInternetStatus(true);

      }
    });

    return () => removeNetInfoSubscription();
  }, []);

  return {
    internetStatus,
    setInternetStatus,
  };
};
