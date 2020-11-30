import sirv from "sirv";
import polka from "polka";
import compression from "compression";
import * as sapper from "@sapper/server";
import bodyParser from 'body-parser';
import session from 'express-session';
import sessionFileStore from 'session-file-store';

const FileStore = sessionFileStore(session);
const { PORT, NODE_ENV } = process.env;

const  { createServer } = require('https');
const { readFileSync } = require('fs');
const ssl_port = 443;

const options = {
  key: readFileSync('ssl/key.pem'),
  cert: readFileSync('ssl/cert.pem')
};

const { handler } = polka()
  .use(
    bodyParser.json(),
    session({
      secret: 'dev',
      resave: false,
      saveUninitialized: true,
      cookie: {
        maxAge: 31536000
      },
      store: new FileStore({
        path: `.sessions`
      })
    }),
    compression({ threshold: 0 }),
    sirv("static", { dev: NODE_ENV === "development" }),
    sapper.middleware({
      session: req => ({
          token: req.session.token
        })
    })
  )

createServer(options, handler).listen(ssl_port, _ => {
  console.log(`> Running on https://localhost:${ssl_port}`);
})
