import { useState } from "react";
import { Alert, Typography, Button, List, Space, Spin } from "antd";
import axios from "axios";

interface TodoItem {
  id: number,
  title: string,
  completed: boolean
}


const { Title } = Typography
export default function RequestDemo() {
  const [todos, setTodos] = useState<TodoItem[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  // 1.浏览器内置fetch方法
  const loadByFetch = async () => {
    setLoading(true)
    setError("")
    try {
      const response = await fetch("/todos-demo.json")
      if (!response.ok) {
        throw new Error(`HTTP${response.status}`)
      }
      const data: TodoItem[] = await response.json()
      setTodos(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "未知错误")
    } finally {
      setLoading(false)
    }
  }
  // 2.Axios库
  const loadByAxios = async () => {
    setLoading(true)
    setError("")
    try {
      const response = await axios.get<TodoItem[]>("/todos-demo.json")
      setTodos(response.data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "未知错误")
    } finally {
      setLoading(false)
    }
  }
  return (
    <div>
      <Title level={3}>网络请求练习</Title>
      <Space style={{ marginBottom: 16 }}>
        <Button onClick={loadByFetch} disabled={loading}>fetch</Button>
        <Button onClick={loadByAxios} disabled={loading}>Axios</Button>
      </Space>
      {error && <Alert type="error" message={error} showIcon />}
      <Spin spinning={loading}>
        <List
          bordered
          dataSource={todos}
          rowKey="id"
          locale={{ emptyText: "点击button加载数据" }}
          renderItem={(todo) => (
            <List.Item>{todo.title}({todo.completed ? "已完成" : "未完成"})</List.Item>
          )}
        />
      </Spin>
    </div>
  )
}