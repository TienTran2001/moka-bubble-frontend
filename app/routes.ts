import { type RouteConfig, layout, route } from '@react-router/dev/routes';

export default [
  // protected routes
  layout('features/auth/components/AuthProtected.tsx', [
    route('/', 'routes/home.tsx'),
  ]),
  // auth routes
  route('/auth/sign-in', 'routes/auth/sign-in.tsx'),
  route('/auth/sign-up', 'routes/auth/sign-up.tsx'),
] satisfies RouteConfig;
