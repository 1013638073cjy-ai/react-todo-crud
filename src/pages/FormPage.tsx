import { Form, Input, Button, message } from "antd"
type FormValues = {
  username: string
  password: string
}
function FormPage() {
  // 获取表单实例：可用于重置、回填等操作
  const [form] = Form.useForm<FormValues>()
  const onFinish = (values: { username: string; password: string }) => {
    message.success(`表单校验通过：${values.username}`)
  }
  const fillExample = () => {
    form.setFieldsValue({
      username: "cjy",
      password: "123456",
    })
  }
  return (
    <div>
      <h2>用户信息表单</h2>
      <Form form={form} layout="vertical" onFinish={onFinish} onFinishFailed={() => {
        console.log("表单校验未通过");
      }}>
        {/* 1.用户名 */}
        <Form.Item
          label="用户名"
          name="username"
          rules={[
            { required: true, message: "请输入用户名" },
            { min: 3, message: "用户名至少三个字符" }
          ]}
        >
          <Input placeholder="请输入用户名" />
        </Form.Item>
        {/* 2.密码 */}
        <Form.Item
          label="密码"
          name="password"
          rules={[
            { required: true, message: "请输入密码" },
            { pattern: /^\d+$/, message: "密码必须为数字" }
          ]}
        >
          <Input.Password placeholder="请输入密码" />
        </Form.Item>
        {/* 3.提交表单 */}
        <Button type="primary" htmlType="submit">
          提交
        </Button>
        <Button htmlType="button" onClick={() => form.resetFields()}>
          重置
        </Button>
        <Button htmlType="button" onClick={fillExample}>
          填入示例
        </Button>

      </Form>
    </div>
  )
}
export default FormPage