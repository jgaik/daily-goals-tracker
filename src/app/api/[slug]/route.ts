import { EndpointsPath, getEndpoint, Method } from '@/apis';

type ContextType<M extends Method> = {
  params: { slug: EndpointsPath<M> };
};


export async function GET(_: Request, context: ContextType<'get'>) {
  const endpoint = getEndpoint('get', context.params.slug);

  if (!endpoint) {
    return new Response('Not Found', { status: 404 });
  }

  return endpoint().then(Response.json);
}
