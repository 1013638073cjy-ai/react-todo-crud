import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/reduxHooks";
import { addTodo, removeTodo } from "../store/todoSlice";
import { Typography, Input, Button, List, Space } from "antd";

export default function ReduxTodo() {
  const [value, setValue] = useState("")
  const list = useAppSelector((state) => state.todo.list)
  const dispatch = useAppDispatch()
  const handleAdd = () => {
    const title = value.trim()
    if (!title) return
    dispatch(addTodo({ id: Date.now(), title }))
    setValue("")
  }
  return (
    <Space orientation="vertical" style={{ width: "100%" }} size="middle">
      <Typography.Title level={3}>Redux任务管理</Typography.Title>
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
            actions={[<Button key="del" type="link" danger onClick={() => dispatch(removeTodo(item.id))}>删除</Button>]}
          >
            {item.title}
          </List.Item>
        )}
      />
    </Space>
  )
}