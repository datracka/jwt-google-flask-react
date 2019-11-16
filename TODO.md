# TODO

# Documentation:

- Create app with flask login https://realpython.com/flask-google-login/ & https://github.com/realpython/materials/tree/master/flask-google-login
- Google id token validation https://stackoverflow.com/questions/39061310/validate-google-id-token https://stackoverflow.com/questions/41461581/google-openid-connect-how-to-verify-id-token
- Google IODC https://developers.google.com/identity/protocols/OpenIDConnect
- [DONE] Understand JWT http://polyglot.ninja/understanding-jwt-json-web-tokens/

# Tasks

- [DONE] ADD SSL
- [DONE] Create a JWT token using google OIDC as auth provider in google_jwt.py using .
- [DONE] Client flow logic
- [DOING] Check in server route /login is user is already validated
  > > We keep stateful support...
  > > we add DB support and we check against database?
  > > We ask to some URL??

## Flow

- Create an endpoint to trigger login
  - client routing (trigger a graphql request to the server)
  - server routing
- Define routing flow
  - /login graphQL query
    - no params
    - It creates jwt token by calling google auth
    - payload google JWT TOKEN
    - client side store token in local storage
    - redirect to protected route /network-graph (clientside protected route verify token is created in local storage)
  - All subsequents graphQL request will have JWT as header
  - graphql Server will check token validity
  - clientside protected routes verify token is created in local storage
