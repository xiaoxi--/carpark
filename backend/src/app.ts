/** @format */
require('express-async-errors');
require('module-alias/register');
import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';
import setRoutes from '@/routes/registerRouter';
import { toolKit } from '@/sysInit';
import { RUNTIME } from './env';
const { corsOrigins, PORT } = RUNTIME;
const { failBody } = toolKit.utils.backend;

const app: express.Application = express();

// let PORT = 5014
// if (process.env.NODE_ENV == 'sit') PORT = parseInt(process.argv[process.argv.length - 1])
app.set('port', process.env.PORT || PORT);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(
  express.json({
    limit: '15mb',
  })
);
app.use(
  express.urlencoded({
    limit: '15mb',
    extended: true,
  })
);
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

const corsOptions = {
  origin: corsOrigins,
  credentials: true,
  maxAge: 1728000,
  //这一项是为了跨域专门设置的
};

app.use(cors(corsOptions));

// Register all the APIs in the directory

setRoutes(app);
// app.use(...server.getRouters(app))

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
// 如果在接口内有try{}catch{}将无法捕获err
app.use(function (err: any, req: any, res: any, next: any) {
  //sendLogELK({ code: err.code, message: err.message }, `${process.env.NODE_ENV}-error-znpg-cms-publish`, 'error')
  res.send(failBody(err.code, err.message));
});

const http = require('http').Server(app);

http.listen(app.get('port'), '0.0.0.0', function () {
  console.log('Express server listening on port ' + app.get('port'));
});

http.on('request', function (req, res) {
  // 全局收集hhtp log
  const log = {
    referer: req.headers.referer,
    url: req.url,
    method: req.method,
    body: req.body,
    query: req.query,
    params: req.params,
    cookie: req.headers.cookie,
    'user-agent': req.headers['user-agent'],
    'sec-ch-ua-platform': req.headers['sec-ch-ua-platform'],
  };
  //sendLogELK(log, `${process.env.NODE_ENV}-http-znpg-cms-publish`, 'info')
});

module.exports = app;
