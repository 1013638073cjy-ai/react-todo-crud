import { useState, useEffect } from "react";
import { Alert, Input, message, Typography, Button, List, Space, Spin } from "antd";
import type { TodoItem } from "../types/todo";
import { getTodos, createTodo, updateTodo, deleteTodo } from "../api/todo"

const { Title, Text } = Typography

export default function RequestDemo() {
  const [todos, setTodos] = useState<TodoItem[]>([])
  const [title, setTitle] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [messageApi, contextHolder] = message.useMessage()

  const showError = (err: unknown) => {
    setError(err instanceof Error ? err.message : "请求失败而且不晓得啥错误")
  }

  // 1.查询
  const loadTodos = async () => {
    setLoading(true)
    setError("")
    try {
      const data = await getTodos()
      setTodos(data)
    } catch (err) {
      showError(err)
    } finally {
      setLoading(false)
    }
  }
  // 2.首次挂载
  useEffect(() => {
    let ignore = false
    const initialLoad = async () => {
      setLoading(true)
      try {
        const data = await getTodos()
        if (!ignore) {
          setTodos(data)
          setError("")
        }

      } catch (err) {
        if (!ignore) showError(err)
      } finally {
        if (!ignore) setLoading(false)
      }
    }
    void initialLoad()
    return () => { ignore = true }
  }, [])

  // 3.新增
  const handleAdd = async () => {
    const value = title.trim()
    if (!value) {
      messageApi.warning("任务标题不能为空值")
      return
    }
    setLoading(true)
    setError("")
    try {
      await createTodo({ title: value, completed: false })
      setTitle("")
      messageApi.success("新增成功")
      await loadTodos()
    } catch (err) {
      showError(err)
    } finally {
      setLoading(false)
    }
  }

  // 4.修改:更新completed状态
  const handleToggle = async (todo: TodoItem) => {
    setLoading(true)
    setError("")
    try {
      await updateTodo(todo.id, { completed: !todo.completed })
      messageApi.success("更新成功")
      await loadTodos()
    } catch (err) {
      showError(err)
    } finally {
      setLoading(false)
    }
  }

  // 5.删除
  const handleDelete = async (id: number) => {
    setLoading(true)
    setError("")
    try {
      await deleteTodo(id)
      messageApi.success("删除成功")
      await loadTodos()
    } catch (err) {
      showError(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      {contextHolder}
      <Title level={3}>接口任务管理</Title>
      <Text type="secondary">本页数据来自本地 json-server</Text>
      <Space style={{ display: "flex", margin: "16px 0" }} wrap>
        <Input
          placeholder="输入任务标题"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          style={{ width: 260 }}
          disabled={loading}
        />
        <Button type="primary" onClick={handleAdd} loading={loading}>新增</Button>
        <Button onClick={() => void loadTodos()} disabled={loading}>刷新列表</Button>
      </Space>
      {error && <Alert type="error" message={`接口请求失败：${error}`} showIcon style={{ marginBottom: 16 }} />}
      <Spin spinning={loading}>
        <List
          bordered
          dataSource={todos}
          rowKey="id"
          locale={{ emptyText: "点击button加载数据" }}
          renderItem={(todo) => (
            <List.Item
              actions={[
                <Button key="toggle" type="link" disabled={loading} onClick={() => void handleToggle(todo)}>
                  {todo.completed ? "标记未完成" : "标记完成"}
                </Button>,
                <Button key="delete" type="link" danger disabled={loading} onClick={() => void handleDelete(todo.id)}>
                  删除
                </Button>,
              ]}
            >
              <Text delete={todo.completed}>{todo.title}</Text>
            </List.Item>
          )}
        />
      </Spin>
    </div>
  )
}