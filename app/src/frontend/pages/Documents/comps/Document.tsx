import { useState } from "react";
import { Stack, Box, Typography, Button, alpha } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { PdfDoc, TxtDoc } from "../../../../assets";
import ConfirmationPopup from "./ConfirmationPopup";

interface Props {
    data: {
        file?: string,
        type?: string,
        name?: string,
    }
}

const doc_type: Record<string, SVGAElement> = {
    "application/pdf": PdfDoc,
    "txt": TxtDoc
}

const Document: React.FC<Props> = ({ data }) => {
    const [deleteConfirm, setDeleteConfirm] = useState<boolean | string>(false);

    const svgPath = doc_type[data?.type] || TxtDoc;

    return (
        <>
            <Stack
                justifyContent={'center'}
                alignItems={'center'}
                minWidth={180}
                maxWidth={180}
                sx={{
                    position: 'relative',
                    zIndex: 99,
                    pb: 2,
                    ".actions": {
                        opacity: 0,
                    },
                    "&:hover": {
                        ".actions": {
                            //opacity: 1,
                        },
                    }
                }}
            >
                <Box
                    component={'img'}
                    src={svgPath}
                    width={'100%'}
                />
                <Typography
                    variant="h5"
                    textAlign={'center'}
                    sx={{
                        width: '100%',
                        px: 2,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                    }}
                >
                    {data?.name}
                </Typography>
                <Stack
                    className="actions"
                    direction={'row'}
                    alignItems={'center'}
                    justifyContent={'center'}
                    gap={2}
                    sx={{
                        borderRadius: 3,
                        p: 2,
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        bgcolor: () => alpha('#0E1016', 0.8),
                        transition: 'opacity 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
                    }}
                >
                    <Button
                        variant="contained"
                        sx={{
                            width: 64,
                            height: 64
                        }}
                        onClick={() => setDeleteConfirm(data?.name)}
                    >
                        <Delete />
                    </Button>
                    <Button
                        variant="contained"
                        sx={{
                            width: 64,
                            height: 64
                        }}
                    >
                        <Edit />
                    </Button>
                </Stack>
            </Stack>
            {/* <ConfirmationPopup
                open={deleteConfirm}
                handleClose={() => setDeleteConfirm(false)}
            /> */}
        </>
    )
}

export default Document