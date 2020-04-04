const authRoutes = [
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

export const routes = [
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

export const navRoutes = routes.filter((route, index) => {
  return route.navHeader;
});

export const hiddenRoutes = routes.filter((route, index) => {
  return !route.navHeader;
});
