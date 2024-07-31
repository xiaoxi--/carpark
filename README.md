# 项目名称

停车场信息管理系统 (Carpark Information Management System)

## 简介

停车场信息管理系统是一个为城市停车场提供数据管理和访问接口的后端应用程序。该系统支持高效的数据存储、查询和更新操作，允许用户根据不同的条件筛选停车场，并能够将特定的停车场标记为收藏。

## 特点

- **数据驱动**：系统设计考虑了数据的完整性和一致性，确保提供准确的停车场信息。
- **灵活的查询功能**：用户可以根据是否提供免费停车、夜间停车或特定车辆高度要求来筛选停车场。
- **个性化收藏**：允许用户将常去或喜欢的停车场添加到个人收藏列表中。
- **批处理能力**：系统能够处理每日更新的 CSV 文件，并在遇到错误时进行回滚，保证数据的准确性。
- **RESTful API**：提供易于使用的 RESTful API，支持前端开发者快速集成和开发。
- **APIPOST 文档**：提供详尽的 API 文档，帮助开发者理解如何使用 API。
- **代码质量**：注重代码的可读性、可维护性和扩展性，确保项目的长期发展。
- **安全性和性能**：考虑了 API 的安全性和大数据量下的性能优化。

## 技术栈

- Express
- PostgreSQL

## 安装

- postgre
- redis

### 先决条件

- node version v18.20.2

### 安装步骤

1. cd backend
2. npm install
3. yarn start:dev

## 使用方法

- API 接口请求

### 基本命令

- yarn start:dev

## 文档

- [API 接口文档](https://doc.apipost.net/docs/2f642f0f9866000)。
- [ER 图](https://doc.apipost.net/docs/2f642f0f9866000)。
- [postgreSQL](https://doc.apipost.net/docs/2f642f0f9866000)。
