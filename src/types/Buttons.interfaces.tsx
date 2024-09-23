export interface SmallScreenProps {
  isSmallScreen: boolean;
}

export interface ThemeToggleButtonProps {
  toggleTheme: () => void;
}

export interface LoginButtonProps extends SmallScreenProps {}
export interface SignOutButtonProps extends SmallScreenProps {}
export interface SignUpButtonProps extends SmallScreenProps {}
export interface ManageButtonProps extends SmallScreenProps {}
export interface HomeButtonProps extends SmallScreenProps {}
