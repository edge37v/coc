import sirv from "sirv";
import polka from "polka";
import compression from "compression";
import * as sapper from "@sapper/server";
import bodyParser from 'body-parser';
import session from 'express-session';
import sessionFileStore from 'session-file-store';

const FileStore = sessionFileStore(session);
const { PORT, NODE_ENV } = process.env;

export default polka()
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
          user: req.session && req.session.user
        })
    })
  )
  .listen(PORT, (err) => {
    if (err) console.log("error", err);
  });
