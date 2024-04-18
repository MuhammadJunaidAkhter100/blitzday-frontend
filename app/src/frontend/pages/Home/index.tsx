import { Button, Divider, Empty, Layout, Typography } from 'antd';
import { useReducer, useState } from 'react';

const { Content, Header } = Layout;

let phrases: string[] = [];
let animationFrame: number = 0;

export default function Home() {
  return (
    <Layout style={{ height: '100%' }}>
      <Header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: 15,
          backgroundColor: 'inherit',
        }}
      >
      </Header>
      <Divider>Transcriptions</Divider>
      <Content style={{ height: '100%' }}>
        {phrases?.length > 0 &&
          phrases.map(phrase => (
            <Typography style={{ padding: 5 }}>{phrase}</Typography>
          ))}
        {phrases?.length < 1 && (
          <Empty
            description="No Transcription to display."
            style={{ color: '#f3f8fb' }}
          />
        )}
      </Content>
    </Layout>
  );
}
