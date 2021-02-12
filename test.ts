const init: CfRequestInit = {
  cf: {
    cacheEverything: true,
    // properties from IncomingRequestCfProperties
    // should not be assignable here
    // @ts-expect-error
    colo: 'hi',
  },
}

if (init.cf) {
  // properties on init.cf are known to be RequestInitCfProperties
  init.cf.cacheEverything = false
}

// CfRequestInit works with fetch
fetch('hi', init)

// CfRequestInit works with Request
new Request('hi', init)

// FetchEvent is manually specified and assignable
addEventListener('fetch', (event: FetchEvent) => {
  // RequestInitCfProperties should not be present
  // @ts-expect-error
  event.request.cf.cacheEverything
  // request from FetchEvent is assignable within request
  // constructor as RequestInit
  new Request('hi', event.request)
  // request from FetchEvent works with handle function
  event.respondWith(handle(event.request))
})

function handle(request: Request) {
  if (!request.cf) return new Response('hi')
  return new Response(request.cf.colo)
}

class MyDurableObject implements DurableObject {
  async fetch(input: RequestInfo, init?: RequestInit | undefined) {
    return new Response("Hello, world!")
  }
}

type MyDurableObjectNamespace = DurableObjectNamespace

const MyDurableObjectNamespace: DurableObjectNamespace = undefined as any
const myDurableObjectStub = MyDurableObjectNamespace.get(MyDurableObjectNamespace.newUniqueId())
myDurableObjectStub.fetch('/', { method: 'POST' })