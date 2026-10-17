# React + TypeScript CRUD 项目

基于 React、TypeScript 和 Ant Design 开发的待办事项管理系统，通过 Axios 与 JSON Server 模拟后端进行数据交互，实现基础的 CRUD 功能。

## 一、技术栈

- **React**：组件化开发与状态管理
- **TypeScript**：类型定义与类型检查
- **Vite**：项目构建工具
- **React Router**：页面路由管理
- **Ant Design**：UI 组件库
- **Axios**：HTTP 请求封装
- **JSON Server**：模拟 RESTful API

## 二、项目功能

- 待办事项列表展示
- 新增待办事项
- 编辑待办事项
- 删除待办事项
- 表单校验与操作反馈
- Axios 请求封装及接口调用
- React Router 页面导航

## 三、项目结构

```text
src/
├── api/          # 接口请求封装
├── pages/        # 页面组件
├── components/   # 公共组件
├── types/        # TypeScript 类型定义
└── App.tsx       # 根组件
```

## 四、本地运行

安装项目依赖：

```bash
npm install
```

启动 JSON Server 模拟后端（假设数据文件为 db.json）：

```bash
npx json-server db.json --port 3001
```

另开一个终端，启动前端项目：

```bash
npm run dev
```

## 五、学习与实践内容

通过本项目，主要实践了：

1. React 函数组件及 Hooks 的使用
2. TypeScript 接口与类型定义
3. React Router 路由配置
4. Ant Design 表格、表单及弹窗组件
5. Axios 请求封装与异步数据交互
6. RESTful API 的增删改查操作
7. 前后端分离开发的基本流程
