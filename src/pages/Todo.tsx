import { useState } from "react";
import { Button, Input, Popconfirm, List, Space } from "antd"

interface TodoItem {
  id: number,
  title: string
}
function Todo() {
  const [list, setList] = useState<TodoItem[]>([])
  const [value, setValue] = useState("")
  const [keyword, setKeyword] = useState("")
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editingValue, setEditingValue] = useState("")
  // 1.增
  const addTodo = () => {
    const title = value.trim()
    if (!title) return

    const newTodo: TodoItem = {
      id: Date.now(),
      title: title
    }
    setList((prev) => [...prev, newTodo])
    setValue("")
  }
  // 2.删除
  const deleteTodo = (id: number) => {
    setList((prev) => prev.filter((item) => item.id !== id))
  }
  // 3.查询
  const filteredList = list.filter((item) => item.title.toLowerCase().includes(keyword.trim().toLowerCase()))

  // 4.修改
  const startEdit = (item: TodoItem) => {
    setEditingId(item.id)
    setEditingValue(item.title)
  }
  const saveEdit = () => {
    const title = editingValue.trim()
    if (editingId === null || !title) return
    setList((prev) => prev.map((item) => item.id === editingId ? { ...item, title: title } : item))
    setEditingId(null)
    setEditingValue("")
  }
  const cancelEdit = () => {
    setEditingId(null)
    setEditingValue("")
  }

  return (
    <div>
      <h2>任务管理</h2>
      <Space.Compact style={{ width: "100%", maxWidth: 500 }}>
        <Input
          placeholder="请输入内容"
          value={value}
          onChange={(e) => { setValue(e.target.value) }}
        />
        <Button type="primary" onClick={addTodo}>新增</Button>
      </Space.Compact>

      <Input
        style={{ marginTop: 16, maxWidth: 500 }}
        placeholder="请输入搜索关键词"
        allowClear
        value={keyword}
        onChange={(e) => { setKeyword(e.target.value) }}
      />

      <List
        style={{ marginTop: 24 }}
        bordered
        dataSource={filteredList}
        locale={{ emptyText: "暂时没有任务" }}
        renderItem={(item) => (
          <List.Item
            key={item.id}
            actions={
              editingId === item.id
                ? [
                  <Button key="save" type="link" onClick={saveEdit}>
                    保存
                  </Button>,
                  <Button key="cancel" type="link" onClick={cancelEdit}>
                    取消
                  </Button>
                ]
                : [
                  <Button key="edit" type="link" onClick={() => startEdit(item)}>
                    编辑
                  </Button>,
                  <Popconfirm
                    key="delete"
                    title="确认要删除这条任务吗？"
                    onConfirm={() => deleteTodo(item.id)}
                    okText="确定"
                    cancelText="取消"
                  >
                    <Button type="link" >删除</Button>
                  </Popconfirm>
                ]
            }
          >
            {editingId === item.id ? (
              <Input
                value={editingValue}
                onChange={e => setEditingValue(e.target.value)}
                onPressEnter={saveEdit}
                style={{ maxWidth: 500 }}
              />
            ) : (
              <span>{item.title}</span>
            )}
          </List.Item>)}
      />
    </div>

  );
}
export default Todo
