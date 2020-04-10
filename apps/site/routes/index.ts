import { NavNode } from '@kvn/data';

const authRoutes: NavNode[] = [
  {
    title: 'Login',
    href: '/login',
    navHeader: false
  },
  {
    title: 'Sign Up',
    href: '/signup',
    navHeader: false
  }
];

export const routes: NavNode[] = [
  {
    title: 'Home',
    href: '/',
    navHeader: true
  },
  {
    title: 'Examples',
    href: '/examples',
    navHeader: true
  },
  {
    title: 'About',
    href: '/about',
    navHeader: true
  },
  {
    title: 'Contact',
    href: '/contact',
    navHeader: true
  },
  ...authRoutes
];

export const navRoutes: NavNode[] = routes.filter(route => {
  return route.navHeader;
});

export const hiddenRoutes: NavNode[] = routes.filter(route => {
  return !route.navHeader;
});
