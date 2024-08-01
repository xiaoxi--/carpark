// import { sequelize } from './pgInit'
import { XxSDK } from 'xx-nodejs-sdk';
console.log(XxSDK); // 打印 XxSDK 查看其内容

import { RUNTIME } from '@/env';
const { cosServer } = RUNTIME;
const xxSDKInstance = new XxSDK('express');
const { tecentCOS, server, toolKit, standardize } = xxSDKInstance;

// (async () => {
//   try {
//     await tecentCOS.connect(cosServer.host);
//   } catch (err) {
//     console.log('\x1b[31m%s %s\x1b[0m', err.code, err.message);
//   }
// })();

export { tecentCOS, server, toolKit, standardize };
