export interface MenuType {
  name: string;
  onPress: () => void;
  icon?: React.ReactNode;
  optionsContainerStyle?: any;
}
