import { map, compose, curry } from './Fn';
import { IO } from './IO';

import fetch from 'node-fetch';

let base = "https://swapi.dev/api"

let api =
  {
    planets: `${base}/planets/1/`,
    people: `${base}/people/1/`
  }

// String -> String -> IO Promise
const get =
  (url, query) =>
    Task.of(`${url}?search=${query}`)

//
const people = get(api.people)

// IO Promise
people('Chewbacca')
  .fork(e => e, s => s)


let a = IO.of("bip")
let b = map(x => x + "!!", a)
b.run()