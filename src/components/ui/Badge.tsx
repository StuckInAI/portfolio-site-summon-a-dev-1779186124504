import styles from './Badge.module.css';
import { cn } from '@/lib/utils';

type BadgeProps = {
  children: React.ReactNode;
  variant?: 'default' | 'primary' | 'accent';
};

export default function Badge({ children, variant = 'default' }: BadgeProps) {
  return (
    <span className={cn(styles.badge, styles[variant])}>
      {children}
    </span>
  );
}
