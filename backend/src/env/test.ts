import { RuntimeInterface } from './runtimeInterface';

const Runtime: RuntimeInterface = {
  PORT: 5030,
  pgServer: {
    host: '121.4.112.118',
    username: 'admin',
    password: 'LPRaIEz0cnfSS',
    database: 'carpark',
    port: 5432,
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
    selectDb: 222,
  },
  logstashConfig: {
    host: '127.0.0.1',
    port: '4560',
  },
  cosServer: {
    host: '123:4213',
    Domain: 'https://123.myqcloud.com',
    previewImageSizeLimit: 1048576,
    contentImageSizeLimit: 5242880,
  },
  corsOrigins: ['http://123.com'],
  msDomainBase: {
    userOrg: 'http://123.com/userorg',
  },
};

export default Runtime;
