import { curry } from './Fn';

const map =
  curry((fn, container) => container.map(fn))