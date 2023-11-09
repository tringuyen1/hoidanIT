import UploadTabs from "@/components/track/upload.tab"
import type { Metadata } from 'next'


export const metadata: Metadata = {
    title: 'Upload',
    description: 'describe me',
}
const UploadPage = () => {
    return (
        <>
            <div>
                <UploadTabs />
            </div>
        </>
    )
}

export default UploadPage