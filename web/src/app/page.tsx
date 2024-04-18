import { Box } from "@mui/material";

import { Hero, CutBusyWork, ScheduleADemo } from "@/Views/Home";

export default function Home() {
  return (
    <>
      <Box
        sx={{
          overflow: 'hidden',
          position: 'relative',
          isolation: 'isolate',
          minHeight: '100vh',
          '&:before': {
            display: 'block',
            content: '""',
            position: 'absolute',
            top: 24,
            right: '-5%',
            width: 460,
            aspectRatio: '1/1',
            zIndex: -1,
            background: 'linear-gradient(180deg, rgba(93, 34, 254, 0.2) 0%, rgba(93, 34, 254, 0) 100%)',
            borderRadius: '50%',
            overflow: 'hidden',
            filter: 'blur(100px)',
          },
          '&:after': {
            display: 'block',
            content: '""',
            position: 'absolute',
            bottom: '20%',
            left: '-15%',
            width: 760,
            aspectRatio: '1/1',
            zIndex: -1,
            background: 'linear-gradient(180deg, rgba(93, 34, 254, 0.2) 0%, rgba(93, 34, 254, 0) 100%)',
            borderRadius: '50%',
            overflow: 'hidden',
            filter: 'blur(100px)',
          }
        }}
      >
        <Hero />
      </Box>
      <CutBusyWork />
      <ScheduleADemo />
    </>
  );
}
