import React from 'react';
import useUserStore from '../../service/store/user.store';
import HostNotSignedin from './HostNotSignedin';
import HostSignedin from '../Auth/Signup/HostSignedin';

const HostingScreen = () => {
  const { userDetails } = useUserStore();

  const isHost =
    userDetails?.user_type?.includes('host') &&
    userDetails?.host_onboarding_status === 'Verification_Pending';

  return isHost ? <HostSignedin /> : <HostNotSignedin />;
};

export default HostingScreen;