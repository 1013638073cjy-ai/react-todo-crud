// 从 Ant Design 中引入 Button 组件
import { Layout, Menu } from "antd";
import { Outlet, useLocation, useNavigate } from "react-router";
const { Header, Content } = Layout
// 定义一个 React 组件 App
function App() {

  const navigate = useNavigate()
  const location = useLocation()

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header style={{ display: "flex", alignItems: "center" }}>
        <div style={{ color: "white", marginRight: 40, whiteSpace: "nowrap" }}>
          React CRUD Demo
        </div>
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[location.pathname]}
          onClick={({ key }) => navigate(key)}
          items={[
            { key: "/", label: "首页" },
            { key: "/todo", label: "任务管理" },
            { key: "/form", label: "表单管理" },
            { key: "/request", label: "网络请求" },
          ]}
          style={{ flex: 1, minWidth: 0 }}
        />
      </Header>
      <Content style={{ padding: 24 }}>
        <div style={{ background: "white", padding: 24, minHeight: 300 }}>
          <Outlet />
        </div>
      </Content>
    </Layout>
  );
}

// 导出 App 组件，供其他文件使用
export default App;