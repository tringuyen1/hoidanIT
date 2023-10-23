import { useState } from "react";
import { Modal, Input } from "antd";

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
     return (
          <Modal
               title="Basic Modal"
               open={isCreateModalOpen}
               onOk={handleOk}
               onCancel={() => handleCloseCreateModal()}
               maskClosable={false}
          >
               <div>
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
               </div>
          </Modal>
     );
};

export default CreateUserModal;
