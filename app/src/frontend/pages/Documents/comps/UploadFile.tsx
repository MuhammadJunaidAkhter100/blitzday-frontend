import { Button } from "@mui/material"
import { styled } from '@mui/material/styles';
import { uploadSingleVectorPdf } from "../../../utils/http";
import { useState } from "react";

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

interface Props {
    label?: string
    onSuccessDocumentUpload: () => Promise<void>
}

const UploadFile = ({ label, onSuccessDocumentUpload }: Props) => {
    const [loading, setLoading] = useState(false);

    const inputSelectHandler = async (event: any) => {
        if (event?.target?.files[0] && !loading) {
            setLoading(true);
            let formData = new FormData();
            formData.append("file", event.target.files[0]);
            const { data }: any = await uploadSingleVectorPdf(formData);
            if (data) {
                await onSuccessDocumentUpload();
            }
            setLoading(false);
        }
    }

    return (
        <Button
            component="label"
            variant="contained"
            size="large"
            sx={{
                py: 2.5,
                px: 5,
                minWidth: 300,
                borderRadius: 3,
                fontSize: 20,
            }}
        >
            {loading ? 'Uploading ...' : (label || 'Upload Document')}
            <VisuallyHiddenInput type="file" accept=".pdf, .txt, .docx, .pptx" onChange={inputSelectHandler} />
        </Button>
    )
}

export default UploadFile
