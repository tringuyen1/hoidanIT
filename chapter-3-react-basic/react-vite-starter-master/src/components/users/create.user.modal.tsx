
import { Modal, Input, Form, Select, InputNumber } from "antd";
const { Option } = Select;

interface IProps {
     addNewUser: any;
     isCreateModalOpen: boolean;
     setIsCreateModalOpen: (v: boolean) => void;
}

const CreateUserModal = (props: IProps) => {
     const [form] = Form.useForm();

     const { addNewUser, isCreateModalOpen, setIsCreateModalOpen } = props;

     const onGenderChange = (value: string) => {
          switch (value) {
               case 'MALE':
                    // formRef.current?.setFieldsValue({ note: 'Hi, man!' });
                    break;
               case 'FEMALE':
                    // formRef.current?.setFieldsValue({ note: 'Hi, lady!' });
                    break;
               case 'other':
                    // formRef.current?.setFieldsValue({ note: 'Hi there!' });
                    break;
               default:
                    break;
          }
     };

     const onRoleChange = (value: string) => {
          switch (value) {
               case 'ADMIN':
                    // formRef.current?.setFieldsValue({ note: 'Hi, man!' });
                    break;
               case 'USER':
                    // formRef.current?.setFieldsValue({ note: 'Hi, lady!' });
                    break;
               default:
                    break;
          }
     };


     const handleCloseCreateModal = () => {
          form.resetFields();
          setIsCreateModalOpen(false);
     };

     const onFinish = async (values: any) => {
          const {
               name,
               email,
               password,
               age,
               gender,
               role,
               address,
          } = values;
          const data = {
               name,
               email,
               password,
               age,
               gender,
               role,
               address,
          }
          await addNewUser(data);
          setIsCreateModalOpen(false);
          handleCloseCreateModal();
          console.log('Success:', values);
     };
     return (
          <Modal
               title="Basic Modal"
               open={isCreateModalOpen}
               onOk={() => form.submit()}
               onCancel={() => handleCloseCreateModal()}
               maskClosable={false}
          >
               <Form
                    name="basic"
                    onFinish={onFinish}
                    layout="vertical"
                    form={form}
               >
                    <Form.Item
                         style={{ marginBottom: "5px" }}
                         label="Name"
                         name="name"
                         rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                         <Input />
                    </Form.Item>

                    <Form.Item
                         style={{ marginBottom: "5px" }}
                         label="Email"
                         name="email"
                         rules={[{ required: true, message: 'Please input your email!' }]}
                    >
                         <Input />
                    </Form.Item>

                    <Form.Item
                         style={{ marginBottom: "5px" }}
                         label="Password"
                         name="password"
                         rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                         <Input.Password disabled />
                    </Form.Item>

                    <Form.Item
                         style={{ marginBottom: "5px" }}
                         label="Age"
                         name="age"
                         rules={[{ required: true, message: 'Please input your age!' }]}
                    >
                         <InputNumber className="w-100" />
                    </Form.Item>

                    <Form.Item
                         style={{ marginBottom: "5px" }}
                         label="Address"
                         name="address"
                         rules={[{ required: true, message: 'Please input your address!' }]}
                    >
                         <Input />
                    </Form.Item>

                    <Form.Item name="gender" label="Gender" rules={[{ required: true }]} style={{ marginBottom: "5px" }}>
                         <Select
                              placeholder="Select a option and change input text above"
                              onChange={onGenderChange}
                              allowClear
                         >
                              <Option value="MALE">male</Option>
                              <Option value="FEMALE">female</Option>
                              <Option value="other">other</Option>
                         </Select>
                    </Form.Item>

                    <Form.Item name="role" label="Role" rules={[{ required: true }]} style={{ marginBottom: "5px" }}>
                         <Select
                              placeholder="Select a option and change input text above"
                              onChange={onRoleChange}
                              allowClear
                         >
                              <Option value="ADMIN">ADMIN</Option>
                              <Option value="USER">USER</Option>
                         </Select>
                    </Form.Item>
               </Form>
          </Modal>
     );
};

export default CreateUserModal;
