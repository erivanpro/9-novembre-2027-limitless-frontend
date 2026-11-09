import {COLORS} from '../../utils/theme';

export interface RoundedBadgeProps {
  title: string;
  activeBadge?: string;
  setActiveBadge?: (title: string) => void;
  disabled?: boolean;
  backgroundColor?: keyof typeof COLORS;
}
