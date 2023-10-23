import { useState } from "react";
import { Modal, Input, Form, Button, Checkbox, Select, InputNumber } from "antd";
const { Option } = Select;

interface IProps {
     addNewUser: any;
     isCreateModalOpen: boolean;
     setIsCreateModalOpen: (v: boolean) => void;
}

const CreateUserModal = (props: IProps) => {
     const { addNewUser, isCreateModalOpen, setIsCreateModalOpen } = props;

     const [name, setName] = useState("");
     const [email, setEmail] = useState("");
     const [password, setPassword] = useState("");
     const [age, setAge] = useState("");
     const [gender, setGender] = useState("");
     const [address, setAddress] = useState("");
     const [role, setRole] = useState("");

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

     const handleOk = () => {
          const data = {
               name,
               email,
               password,
               age,
               gender,
               role,
               address,
          };
          addNewUser(data);
          setIsCreateModalOpen(false);
          handleCloseCreateModal();
     };

     const handleCloseCreateModal = () => {
          setIsCreateModalOpen(false);
          setName("");
          setEmail("");
          setPassword("");
          setAge("");
          setGender("");
          setAddress("");
          setRole("");
     };

     const onFinish = (values: any) => {
          console.log('Success:', values);
     };
     return (
          <Modal
               title="Basic Modal"
               open={isCreateModalOpen}
               onOk={handleOk}
               onCancel={() => handleCloseCreateModal()}
               maskClosable={false}
          >
               <Form
                    name="basic"
                    onFinish={onFinish}
                    layout="vertical"
               >
                    <Form.Item
                         label="Name"
                         name="name"
                         rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                         <Input />
                    </Form.Item>

                    <Form.Item
                         label="Email"
                         name="email"
                         rules={[{ required: true, message: 'Please input your email!' }]}
                    >
                         <Input />
                    </Form.Item>

                    <Form.Item
                         label="Password"
                         name="password"
                         rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                         <Input.Password />
                    </Form.Item>

                    <Form.Item
                         label="Age"
                         name="age"
                         rules={[{ required: true, message: 'Please input your age!' }]}
                    >
                         <InputNumber className="w-100" />
                    </Form.Item>

                    <Form.Item
                         label="Address"
                         name="address"
                         rules={[{ required: true, message: 'Please input your address!' }]}
                    >
                         <Input />
                    </Form.Item>

                    <Form.Item name="gender" label="Gender" rules={[{ required: true }]}>
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

                    <Form.Item name="role" label="Role" rules={[{ required: true }]}>
                         <Select
                              placeholder="Select a option and change input text above"
                              onChange={onRoleChange}
                              allowClear
                         >
                              <Option value="ADMIN">ADMIN</Option>
                              <Option value="USER">USER</Option>
                         </Select>
                    </Form.Item>

                    <Form.Item
                         name="remember"
                         valuePropName="checked"
                         wrapperCol={{ offset: 8, span: 16 }}
                    >
                         <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                         <Button type="primary" htmlType="submit">
                              Submit
                         </Button>
                    </Form.Item>
               </Form>
               {/* <div>
                    <label>Name</label>
                    <Input value={name} onChange={(e) => setName(e.target.value)} />
               </div>
               <div>
                    <label>Email</label>
                    <Input value={email} onChange={(e) => setEmail(e.target.value)} />
               </div>
               <div>
                    <label>Password</label>
                    <Input value={password} onChange={(e) => setPassword(e.target.value)} />
               </div>
               <div>
                    <label>Age</label>
                    <Input value={age} onChange={(e) => setAge(e.target.value)} />
               </div>
               <div>
                    <label>Gender</label>
                    <Input value={gender} onChange={(e) => setGender(e.target.value)} />
               </div>
               <div>
                    <label>Address</label>
                    <Input value={address} onChange={(e) => setAddress(e.target.value)} />
               </div>
               <div>
                    <label>Role</label>
                    <Input value={role} onChange={(e) => setRole(e.target.value)} />
               </div> */}
          </Modal>
     );
};

export default CreateUserModal;
