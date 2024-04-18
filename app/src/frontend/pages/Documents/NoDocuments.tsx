import { Box, Typography } from "@mui/material";
import { EmptyDoc } from "../../../assets";

import UploadFile from "./comps/UploadFile";

interface Props {
    fetchDocuments: () => Promise<void>
}

const NoDocuments = ({ fetchDocuments }: Props) => {
    return (
        <Box
            sx={{
                flex: 1,
                py: 6,
                px: {
                    sm: 6,
                    md: 8,
                    lg: 12
                },
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 3,
            }}
        >
            <Box
                component={'img'}
                src={EmptyDoc}
                width={126}
                marginBottom={2}
            />
            <Typography
                variant="h5"
                fontWeight={400}
                maxWidth={440}
                textAlign={'center'}
            >
                You have not uploaded any document,  upload a document
            </Typography>

            {/* File Uploader */}
            <UploadFile onSuccessDocumentUpload={fetchDocuments} />
        </Box>
    )
}

export default NoDocuments
