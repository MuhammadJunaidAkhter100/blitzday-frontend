import { useEffect, useState } from "react";

import Header from "../../components/MainLayout/Header";
import UploadedDocuments from "./UploadedDocuments";
import NoDocuments from "./NoDocuments";
import { getAllUploadedDocuments } from "../../utils/http";
import { Typography } from "@mui/material";

interface Document {
    _id: string;
    name: string;
    type: string;
    createdAt: string
}

interface Documents {
    documents: Document[]
}

const Documents = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [documents, setDocuments] = useState([]);

    useEffect(() => {
        (async () => {
            await fetchDocuments();
        })()
    }, [])

    const fetchDocuments = async () => {
        setIsLoading(true);
        const { data }: { data: Documents } = await getAllUploadedDocuments() as unknown as { data: Documents };
        if (data?.documents) {
            setDocuments(data?.documents);
        }
        setIsLoading(false);
    }

    if (isLoading) {
        return <>
            <Header
                pageTitle={'My Documents'}
                hideRecorder
            />
            <Typography
                variant="body1"
                fontSize={20}
                fontWeight={600}
                marginTop={2}
                textAlign={"center"}
                sx={{
                    color: "#FFFFFF"
                }}
            >
                Fetching ...
            </Typography>
        </>
    }

    return (
        <>
            <Header
                pageTitle={'My Documents'}
                hideRecorder
            />
            {documents?.length ? (
                <UploadedDocuments documents={documents} fetchDocuments={fetchDocuments} />
            ) : (
                <NoDocuments fetchDocuments={fetchDocuments} />
            )}
        </>
    )
}

export default Documents
