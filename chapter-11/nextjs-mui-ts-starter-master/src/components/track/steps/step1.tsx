"use client";

import { useCallback, useState } from "react"
import { useDropzone, FileWithPath } from "react-dropzone";
import "../wave.scss";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
// import { sendRequestFile } from "@/app/utils/api";
import { useSession } from "next-auth/react";
import Axios from "axios";


const VisuallyHiddenInput = styled("input")({
	clip: "rect(0 0 0 0)",
	clipPath: "inset(50%)",
	height: 1,
	overflow: "hidden",
	position: "absolute",
	bottom: 0,
	left: 0,
	whiteSpace: "nowrap",
	width: 1,
});

interface IProps {
	setValue: (v: number) => void,
	setTrackUpload: (v: { filename: string, percent: number, uploadTrackFileName: string }) => void,
	trackUpload: { filename: string, percent: number, uploadTrackFileName: string }
}

const Step1 = (props: IProps) => {
	const { data: session } = useSession();
	const { setValue, setTrackUpload, trackUpload } = props

	const onDrop = useCallback(async (acceptedFiles: FileWithPath[]) => {
		// Do something with the files
		if (acceptedFiles && acceptedFiles[0]) {
			console.log(acceptedFiles)
			const formData = new FormData();
			formData.append("fileUpload", acceptedFiles[0]);
			const config = {
				headers: { Authorization: `Bearer ${session?.access_token}`, target_type: "tracks", delay: 2000 },
				onUploadProgress: (progressEvent: any) => {
					let percentCompleted = Math.floor((progressEvent.loaded * 100) / progressEvent.total)!;
					setTrackUpload({
						...trackUpload,
						filename: acceptedFiles[0].name,
						percent: percentCompleted
					})
					// console.log(">>>> check", percentCompleted)
				}
			};

			try {
				const file = await Axios.post(
					'http://localhost:8000/api/v1/files/upload', formData, config
				);
				setValue(1);
				console.log(">>>> check", file.data)

				// @ts-ignore
				setTrackUpload((prevState: any) => ({
					...prevState,
					uploadTrackFileName: file.data.data.filename
				}));

			} catch (error) {
				// @ts-ignore
				alert("upload failed")
			}
		}
	}, [session]) // lưu giá trị của 1 function. chỉ chạy 1 lần duy nhất. khi session thay đổi thì hàm trên mới chạy lại

	const { acceptedFiles, getRootProps, getInputProps } = useDropzone(
		{
			onDrop, accept: {
				'audio': [".mp3", ".m4a", ".wav"]
			}
		}
	);

	const files = acceptedFiles.map((file: FileWithPath) => (
		<li key={file.path}>
			{file.path} - {file.size} bytes
		</li>
	));

	return (
		<>
			<section className="container step-1">
				<div {...getRootProps({ className: "dropzone" })}>
					<Button
						component="label"
						variant="contained"
						startIcon={<CloudUploadIcon />}
						onClick={(e) => e.preventDefault()}
					>
						Upload file
						<VisuallyHiddenInput type="file" />
					</Button>
					<input {...getInputProps()} />
					<p>Click or drop file track</p>
				</div>
				<aside>
					<h4>Files</h4>
					<ul>{files}</ul>
				</aside>
			</section>
		</>
	);
};

export default Step1;
