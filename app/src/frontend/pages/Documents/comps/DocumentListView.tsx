import { useState } from "react";
import { Stack, Box, Typography, IconButton } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { PdfDoc, TxtDoc } from "../../../../assets";
import ConfirmationPopup from "./ConfirmationPopup";

interface Data {
    _id: string;
    file?: string,
    type?: string,
    name?: string,
    date?: string,
    createdAt: string
}

interface Props {
    data: Data,
    onDocumentDelete: () => Promise<void>
}

const DocumentListView: React.FC<Props> = ({ data, onDocumentDelete }) => {
    const [deleteConfirm, setDeleteConfirm] = useState<boolean | string>(false);

    const svgPath = PdfDoc;

    return (
        <>
            <Stack
                direction={'row'}
                alignItems={'center'}
                gap={2}
                width={'100%'}
                sx={{
                    cursor: 'pointer',
                    p: 1,
                    border: 1,
                    borderColor: '#1C1C36',
                    borderRadius: 2,
                    backgroundColor: 'background.default',
                    transition: 'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
                    "&:hover": {
                        backgroundColor: 'background.paper',
                    }
                }}
            >
                <Box
                    component={'img'}
                    src={svgPath}
                    height={70}
                />
                <Box sx={{
                    mr: 'auto',
                    flex: 1,
                    width: 0,
                }}>
                    <Typography
                        variant="h5"
                        sx={{
                            width: '100%',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            fontSize: 20
                        }}
                    >
                        {data?.name}
                    </Typography>
                    <Typography
                        variant="body1"
                        color={'text.secondary'}
                        sx={{
                            width: '100%',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                        }}
                    >
                        Uploaded on: {data?.createdAt && new Date(data?.createdAt).toLocaleDateString("en-US")}
                    </Typography>
                </Box>
                <IconButton
                    sx={{
                        width: 56,
                        height: 56
                    }}
                    onClick={() => setDeleteConfirm(true)}
                >
                    <Delete />
                </IconButton>
            </Stack>
            <ConfirmationPopup
                data={data}
                open={deleteConfirm}
                handleSuccessClose={() => {
                    setDeleteConfirm(false)
                    onDocumentDelete();
                }}
                handleFailureClose={() => setDeleteConfirm(false)}
            />
        </>
    )
}

export default DocumentListView