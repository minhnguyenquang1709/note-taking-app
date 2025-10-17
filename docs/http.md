- Application-layer protocol for transmitting hypermedia () documents, such as HTML.
- Designed for communication b/w web browsers and web servers. Also used for machine-to-machine communication, programmatic access to APIs, and more.
- Stateless protocol: server does not keep any session data between 2 requests, cookies make it stateful.

# Request - Response

- Client sends HTTP request to server.
- Server processes request and sends back HTTP response.

# Request Methods

- GET: retrieve data from server.
- POST: send data to server to create resource.
- PUT: update existing resource on server, create if not exists.
- DELETE: remove resource from server.
- PATCH: partially update existing resource on server, no creation of new resource if not exists.

# Headers

- Send metadata describing the behavior of the client or server.

# Body

- Contains data being sent to server (in request) or data being returned from server (in response).