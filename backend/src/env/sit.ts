import { RuntimeInterface } from './runtimeInterface';

const Runtime: RuntimeInterface = {
  PORT: 5020,
  pgServer: {
    host: '47.92.94.8',
    username: 'admin',
    password: 'RAmmG4PFXBPk',
    database: 'carpark-sit',
    port: 5433,
    dialect: 'postgres',
    logging: false,
    // force: true,
    // timezone: '+08:00', //改为标准时区
    // baseDir: 'modelsql', // change default dir model to modelsql
    dialectOptions: {
      dateStrings: true,
      typeCast: true,
      // supportBigNumbers: true,
      // bigNumberStrings: false
    },
    define: {
      timestamps: false, // don't add the timestamp attributes (updatedAt, createdAt)
    },
  },
  redisServer: {
    port: 6379,
    host: '47.92.94.8',
    pwd: 'qwd123456',
    redis_cms_login_session: 'carpark-user:loginsession',
    selectDb: 242,
  },
  logstashConfig: {
    host: '127.0.0.1',
    port: '4560',
  },
  cosServer: {
    host: '127.0.0.1:4003',
    Domain: 'https://123.myqcloud.com',
    previewImageSizeLimit: 1048576,
    contentImageSizeLimit: 5242880,
  },
  corsOrigins: ['http://localhost:6014', 'http://127.0.0.1:6014'],
  msDomainBase: {
    userOrg: 'localhost:5011',
  },
  cookieOption: {
    maxAge: 259200000, //7天
    httpOnly: true,
    sameSite: 'lax',
    domain: 'localhost',
  },
};

export default Runtime;
