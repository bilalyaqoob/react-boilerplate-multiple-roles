import { MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import { BrowserRouter } from "react-router-dom";
import Layout from "../@core/Layout/Layout";
import Routes from "./Routes";
import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {
  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <NotificationsProvider autoClose={5000}>
          <BrowserRouter>
            <Layout>
              <Routes />
            </Layout>
          </BrowserRouter>
        </NotificationsProvider>
      </MantineProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
