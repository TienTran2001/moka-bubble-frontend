import {
  type RouteConfig,
  index,
  layout,
  route,
} from '@react-router/dev/routes';

export default [
  index('routes/home.tsx'),
  layout('routes/auth.tsx', [
    route('/auth/sign-in', 'routes/root/sign-in.tsx'),
    route('/auth/sign-up', 'routes/root/sign-up.tsx'),
  ]),
] satisfies RouteConfig;
