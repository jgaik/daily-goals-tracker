import * as ENDPOINTS from './endpoints';

export type Method = Lowercase<keyof typeof ENDPOINTS>;

export type EndpointsPath<M extends Method> =
  keyof (typeof ENDPOINTS)[Uppercase<M>];

export function getEndpoint<M extends Method, P extends EndpointsPath<M>>(
  method: M,
  path: P
) {
  return ENDPOINTS[method.toUpperCase() as Uppercase<M>][path];
}

export async function typedFetch<M extends Method, P extends EndpointsPath<M>>(
  method: M,
  input: P,
  init?: Exclude<RequestInit, 'method'>
  // @ts-ignore
): Promise<ReturnType<(typeof ENDPOINTS)[Uppercase<M>][P]>> {
  return fetch(`http://localhost:3000/api/${input as string}`, {
    ...init,
    method,
  }).then((res) => res.json());
}
