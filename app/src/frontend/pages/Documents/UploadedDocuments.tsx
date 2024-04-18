import { Box, Stack, Grid } from "@mui/material";
import { Scrollbar } from "react-scrollbars-custom";
import UploadFile from "./comps/UploadFile";
import DocumentListView from "./comps/DocumentListView";
import Document from "./comps/Document";

interface Document {
    _id: string;
    name: string;
    type: string;
    createdAt: string;
}

interface Props {
    documents: Document[]
    fetchDocuments: () => Promise<void>
}

const UploadedDocuments = ({ documents , fetchDocuments }: Props) => {

    return (
        <Box
            sx={{
                flex: 1,
                pt: 6,
                px: {
                    sm: 6,
                    md: 8,
                    lg: 12
                }
            }}
        >
            <Stack
                direction={'row'}
                sx={{
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    mb: 3,
                }}
            >
                <UploadFile onSuccessDocumentUpload={fetchDocuments} />
            </Stack>
            <Box
                sx={{
                    height: 'calc(100vh - 220px)'
                }}
            >
                <Box
                    component={Scrollbar}
                    sx={{
                        ".ScrollbarsCustom-Thumb": {
                            backgroundColor: '#1E2330 !important',
                        },
                        ".ScrollbarsCustom-Content": {
                            display: 'flex'
                        }
                    }}
                >
                    <Grid
                        container
                        spacing={[4, 3]}
                        sx={{
                            pb: 4
                        }}
                    >
                        {documents?.map((data, i) => (
                            <Grid key={i} item xs={12} md={6} lg={4}>
                                <DocumentListView data={data} onDocumentDelete={fetchDocuments}/>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Box>
        </Box>
    )
}

export default UploadedDocuments
