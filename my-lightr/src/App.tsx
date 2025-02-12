import React, { useEffect, useState, Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { Footer } from "./components/utils/Footer.tsx";
import { Main } from "./pages/Main.tsx";
import { Calls } from "./pages/Calls.tsx";
import { Settings } from "./pages/Settings.tsx";
import { Login } from "./pages/Login.tsx";
import Loading from "./components/utils/Loading.tsx";
import Web3 from "web3";
// import CONTRACT from "../contracts/WhatsApp.json";
import { Communities } from "./pages/Communities.tsx";
import { Friends } from "./pages/Friends.tsx";
import { Chat } from "./pages/Chat.tsx";
import detectEthereumProvider from "@metamask/detect-provider";

// Define Web3 API interface
interface Web3Api {
  provider: any | null;
  web3: Web3 | null;
  contract: any | null;
  currentAccount: string | null;
}

interface AppRoutesProps {
  web3Api: Web3Api;
  handleLogin: () => void;
}

declare global {
  interface Window {
    ethereum?: any;
  }
}

const AppRoutes = ({ web3Api, handleLogin }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const protectedRoutes = ["/chats"];

  useEffect(() => {
    if (!web3Api.provider && protectedRoutes.includes(location.pathname)) {
      navigate("/login");
    }
  }, [location.pathname, web3Api.provider, navigate]);

  return (
    <Routes>
      <Route
        path="/"
        element={
          web3Api.provider ? (
            <Navigate to="/chats" replace />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route path="/login" element={<Login handleLogin={handleLogin} />} />
      {web3Api.provider && (
        <>
          <Route path="/chats" element={<Main />} />
          <Route path="/chats/chat1" element={<Chat />} />
          <Route path="/calls" element={<Calls />} />
          <Route path="/friends" element={<Friends />} />
          <Route path="/community" element={<Communities />} />
          {/* <Route path="/settings" element={<Settings />} /> */}
        </>
      )}
    </Routes>
  );
};

const App = () => {
  const [isLoading, setLoading] = useState(true);
  const [web3Api, setWeb3Api] = useState({
    provider: null,
    web3: null,
    contract: null,
    currentAccount: null,
  });

  useEffect(() => {
    const initWeb3 = async () => {
      const provider = await detectEthereumProvider();

      if (!provider) {
        console.warn("Please install MetaMask.");
        setLoading(false);
        return;
      }

      try {
        const web3 = new Web3(provider as any);
        const accounts = await web3.eth.getAccounts();
        const netId = await web3.eth.net.getId();
        // const networkData = CONTRACT.networks[netId];

        // if (!networkData) {
        //   console.error("Unsupported network. Please switch networks.");
        //   setLoading(false);
        //   return;
        // }

        // const contract = new web3.eth.Contract(
        //   CONTRACT.abi,
        //   networkData.address
        // );

        setWeb3Api({
          provider,
          web3,
          // contract,
          currentAccount: accounts[0] || null,
        });
      } catch (error) {
        console.error("Web3 initialization error:", error);
      } finally {
        setLoading(false);
      }
    };

    initWeb3();
  }, []);

  const handleLogin = async () => {
    const provider = await detectEthereumProvider();

    if (!provider) {
      alert("Please install MetaMask.");
      return;
    }

    setLoading(true);
    try {
      const accounts = await (provider as any).request({
        method: "eth_requestAccounts",
      });
      const web3 = new Web3(provider as any);
      const netId = await web3.eth.net.getId();
      // const networkData = CONTRACT.networks[netId];

      // if (!networkData) {
      //   console.error("Unsupported network. Please switch networks.");
      //   setLoading(false);
      //   return;
      // }

      // const contract = new web3.eth.Contract(CONTRACT.abi, networkData.address);

      setWeb3Api({
        provider,
        web3,
        // contract,
        currentAccount: accounts[0] || null,
      });
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Router>
      <AppContent
        isLoading={isLoading}
        web3Api={web3Api}
        handleLogin={handleLogin}
      />
    </Router>
  );
};

interface AppContentProps {
  isLoading: boolean;
  web3Api: Web3Api;
  handleLogin: () => void;
}

const AppContent = ({ isLoading, web3Api, handleLogin }) => {
  const location = useLocation();
  const hideFooterRoutes = ["/chats/chat1", "/chats/chat2"];
  const hideFooter = hideFooterRoutes.includes(location.pathname);

  return (
    <div className="App w-full h-full">
      {isLoading ? (
        <Loading />
      ) : (
        <AppRoutes web3Api={web3Api} handleLogin={handleLogin} />
      )}

      {web3Api.provider && !hideFooter && <Footer />}
    </div>
  );
};

export default App;
