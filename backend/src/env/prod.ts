import { RuntimeInterface } from './runtimeInterface';

const Runtime: RuntimeInterface = {
  PORT: 5010,
  pgServer: {
    host: process.env.PG_HOST,
    username: process.env.PG_USERNAME,
    password: process.env.PG_PASSWORD,
    database: 'carpark',
    port: parseInt(process.env.PG_PORT),
    dialect: 'postgres',
    logging: false,
    // timezone: '+08:00', //改为标准时区
    dialectOptions: {
      dateStrings: true,
      typeCast: true,
    },
    define: {
      timestamps: false, // don't add the timestamp attributes (updatedAt, createdAt)
    },
  },
  redisServer: {
    port: parseInt(process.env.REDIS_PORT),
    host: process.env.REDIS_HOST,
    pwd: process.env.REDIS_PASSWORD,
    redis_cms_login_session: 'carpark-user:loginsession',
    selectDb: 232,
  },
  cosServer: {
    host: '123:4213',
    Domain: 'https://123.myqcloud.com',
    previewImageSizeLimit: 1048576,
    contentImageSizeLimit: 5242880,
  },
  logstashConfig: {
    host: '127.0.0.1',
    port: '4560',
  },
  corsOrigins: ['http://123.com'],
  msDomainBase: {
    userOrg: 'http://123/userorg',
  },
  cookieOption: {
    maxAge: 259200000, //7天
    httpOnly: true,
    sameSite: 'lax',
    domain: 'localhost',
  },
};

export default Runtime;
