import { useState, useEffect } from "react";
import { Modal, Input } from "antd";
import { IUsers } from "./users.table";

interface IProps {
	addNewUser: any;
	isUpdateModalOpen: boolean;
	setIsUpdateModalOpen: (v: boolean) => void;
	dataUpdate: null | IUsers;
	setDataUpdate: any;
	updateUser: any;
}

const UpdateUserModal = (props: IProps) => {
	const {
		isUpdateModalOpen,
		setIsUpdateModalOpen,
		dataUpdate,
		setDataUpdate,
		updateUser,
	} = props;

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [age, setAge] = useState("");
	const [gender, setGender] = useState("");
	const [address, setAddress] = useState("");
	const [role, setRole] = useState("");

	useEffect(() => {
		if (isUpdateModalOpen && dataUpdate) {
			setName(dataUpdate.name);
			setEmail(dataUpdate.email);
			//  setPassword(dataUpdate.password);
			setAge(dataUpdate.age);
			setGender(dataUpdate.gender);
			setAddress(dataUpdate.address);
			setRole(dataUpdate.role);
		}
	}, [isUpdateModalOpen, dataUpdate]);

	const handleOk = () => {
		const data = {
			_id: dataUpdate?._id,
			name,
			email,
			password,
			age,
			gender,
			role,
			address,
		};
		updateUser(data);
		setIsUpdateModalOpen(false);
		handleCloseCreateModal();
	};

	const handleCloseCreateModal = () => {
		setIsUpdateModalOpen(false);
		setDataUpdate(null);
	};

	return (
		<Modal
			title="Basic Modal"
			open={isUpdateModalOpen}
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
				<Input
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					disabled
				/>
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

export default UpdateUserModal;
