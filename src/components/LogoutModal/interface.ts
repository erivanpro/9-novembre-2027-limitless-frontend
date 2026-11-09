export interface LogoutModalProps {
  isVisible: boolean;
  onLogout: () => void;
  onCancel: () => void;
  logoutLoading: boolean;
}
