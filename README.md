# JWT Google Auth with Flask and React SPA

## Dependencies

Before starting to see something you need to have installed all this stuff

- [Postgress DB](https://www.postgresql.org/) - currently v11.2
- [Pipenv](https://pipenv-fork.readthedocs.io/en/latest/) package dependency manager - currently v2018.11.26
- [Node](https://nodejs.org/en/) (and npm) runner and dependency manager - currently v12.4.0 (I recommend to use [nvm](https://github.com/nvm-sh/nvm) for installing it)
- [Python3](https://www.python.org/) - currently v3.7.4
- [Flask Framework](http://flask.pocoo.org/docs/1.0/) - currently v1.1.1

## Set up

- Project runs over https. So first create certificates and copy them in project root: `"openssl req -x509 -newkey rsa:4096 -nodes -out cert.pem -keyout key.pem -days 365"` will output `"cert.pem"` and `"key.pem"`
- Create a project in https://console.developers.google.com/ and oauth2 credentials
- Get client_id and secret_id and copy them into .env
- Create a DB and update `"SQLALCHEMY_DATABASE_URI"` value with postgress URL (basically you should change `flask_jwt_react` with the name of your DB)
- run migrations `"flask db init"` `"flask db migrate"` and `"flask db upgrade"` a new `user` table will be created in the selected DB. The resultant `migrations` folder should be added to the repo.
- Run `"yarn build:dev"` to get a fresh JS build. (optional: `"yarn watch"` to modify the client codebase and see realtime changes)
- Run `"yarn serve"` to run server localhost

Finally! go to `"https://localhost:5000"` and enjoy it.
