import asyncComponent from 'components/AsyncComponent';

export const About = asyncComponent('About', () =>
  import('containers/pages/About'),
);
export const Home = asyncComponent('Home', () =>
  import('containers/pages/Home'),
);
export const Login = asyncComponent('Login', () =>
  import('containers/users/Login'),
);
export const SignUp = asyncComponent('SignUp', () =>
  import('containers/users/SignUp'),
);
