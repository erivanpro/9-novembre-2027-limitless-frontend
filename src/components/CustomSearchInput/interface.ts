export interface CustomSearchInputProps {
  value?: string;
  onSubmitEditing?: (e: string) => void;
  onChangeText: (text: string) => void;
  reference?: any;
}
