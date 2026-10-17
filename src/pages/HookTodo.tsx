import { useState } from "react";
import { Button, Input, Typography, List, Space } from "antd"
import { useTodoList } from "../hooks/useTodoList";

export default function HookTodo() {
  const [value, setValue] = useState("")
  const { list, addTodo, removeTodo } = useTodoList()
  // 1.增
  const handleAdd = () => {
    const title = value.trim()
    if (!title) return
    addTodo(title)
    setValue("")
  }
  return (
    <Space orientation="vertical" style={{ width: "100%" }} size="middle">
      <Typography.Title level={3}>Hook任务管理</Typography.Title>
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
      <List
        bordered
        dataSource={list}
        locale={{ emptyText: "暂时没有任务" }}
        renderItem={(item) => (
          <List.Item
            key={item.id}
            actions={[<Button key="del" danger type="link" onClick={() => { removeTodo(item.id) }}>删除</Button>]}
          >
            {item.title}
          </List.Item>
        )}
      />
    </Space>
  )
}