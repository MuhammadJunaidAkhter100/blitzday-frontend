import * as ReactDOM from 'react-dom';
import {
  MemoryRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { createTheme } from './theme';
import Layout from './frontend/components/MainLayout';
import Authentication from './frontend/pages/Authentication';
import Home from './frontend/pages/Home';
import LiveCall from './frontend/pages/LiveCall';
import LiveTranscript from './frontend/pages/LiveTranscript';
import Documents from './frontend/pages/Documents';
import Dashboard from './frontend/pages/Dashboard';
import Settings from './frontend/pages/Settings';
import InviteMembers from './frontend/pages/InviteMembers';
import PrivacyPolicy from './frontend/pages/PrivacyPolicy';
import TermsConditions from './frontend/pages/TermsConditions';

const App = () => {
  const theme = createTheme();

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Layout>
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/" element={<Authentication />} />
            <Route path="/home" element={<Home />} />
            <Route path="/call" element={<LiveCall />} />
            <Route path="/call/details" element={<LiveTranscript />} />
            <Route path="/documents" element={<Documents />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/invite-members" element={<InviteMembers />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-conditions" element={<TermsConditions />} />
          </Routes>
        </Layout>
      </ThemeProvider>
    </Router>
  );
};

function render() {
  ReactDOM.render(
    <App />,
    document.body,
  );
}

render();
