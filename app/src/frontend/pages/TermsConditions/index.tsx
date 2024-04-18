import { Box, Typography } from "@mui/material";
import Header from "../../components/MainLayout/Header"
import ScrollBar from "../../components/ScrollBar";

const PrivacyPolicy = () => {
    return (
        <>
            <Header
                pageTitle={'Terms & Conditions'}
                hideRecorder
            />
            <ScrollBar>
                <Box
                    sx={{
                        flex: 1,
                        py: 6,
                        px: {
                            xs: 4,
                            sm: 6,
                            md: 8,
                            lg: 12
                        },
                    }}
                >
                    <Typography variant="h1" mb={4}>
                        Terms & Conditions
                    </Typography>

                    <Typography variant="h3" mb={3}>
                        What is Lorem Ipsum?
                    </Typography>

                    <Typography variant="body1" mb={2}>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                    </Typography>

                    <Typography variant="h3" mb={3}>
                        Why do we use it?
                    </Typography>

                    <Typography variant="body1" mb={2}>
                        It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
                    </Typography>
                    <Typography variant="h3" mb={3}>
                        What is Lorem Ipsum?
                    </Typography>

                    <Typography variant="body1" mb={2}>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                    </Typography>

                    <Typography variant="h3" mb={3}>
                        Why do we use it?
                    </Typography>

                    <Typography variant="body1" mb={2}>
                        It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
                    </Typography>
                    <Typography variant="h3" mb={3}>
                        What is Lorem Ipsum?
                    </Typography>

                    <Typography variant="body1" mb={2}>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                    </Typography>

                    <Typography variant="h3" mb={3}>
                        Why do we use it?
                    </Typography>

                    <Typography variant="body1" mb={2}>
                        It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
                    </Typography>

                </Box>
            </ScrollBar>
        </>
    )
}

export default PrivacyPolicy
