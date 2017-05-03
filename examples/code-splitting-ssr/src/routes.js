import Loading from './components/Loading'

import { handleLifecycle } from '../../../src/index';

const DynamicLoader = handleLifecycle(Loading);

export default [
  {
    path: '/',
    exact: true,
    onEnter: () => import('./components/Homepage').then(({ default: Component }) => Component),
    component: DynamicLoader
  },
  {
    path: '/about-us',
    exact: true,
    onEnter: () => import('./components/AboutUs').then(({ default: Component }) => Component),
    component: DynamicLoader
  }
]
