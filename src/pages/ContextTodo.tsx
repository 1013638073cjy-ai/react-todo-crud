import { Typography, Input, Button, List, Space } from "antd";
import { useTodoContext } from "../context/TodoContext";
import { useState } from "react";

function ContextTaskList() {
  const { list, removeTodo } = useTodoContext()
  return (
    <List
      bordered
      dataSource={list}
      locale={{ emptyText: "暂无任务" }}
      renderItem={(item) => (
        <List.Item
          key={item.id}
          actions={[<Button key="del" type="link" danger onClick={() => { removeTodo(item.id) }}>删除</Button>]}
        >
          {item.title}
        </List.Item>
      )}
    />
  )
}

export default function ContextTodo() {
  const [value, setValue] = useState("")
  const { list, addTodo } = useTodoContext()
  const handleAdd = () => {
    if (!value.trim()) return
    addTodo(value)
    setValue("")
  }

  return (
    <Space orientation="vertical" style={{ width: "100%" }} size="middle">
      <Typography.Title level={3}>Context任务管理</Typography.Title>
      <Typography.Text>任务数量：{list.length}</Typography.Text>
      <Space.Compact style={{ width: "100%", maxWidth: 500 }}>
        <Input
          placeholder="请输入内容"
          value={value}
          onChange={(e) => { setValue(e.target.value) }}
          onPressEnter={handleAdd}
        />
        <Button type="primary" onClick={handleAdd}>新增</Button>
      </Space.Compact>
      <ContextTaskList />
    </Space>
  )
}

