import React , {useEffect , useState}from "react";
import ClientRoutes from "Routes";
import "Style/global.scss";
import NoInternetPage from "Pages/NoInternetPage";

const App = () => {

  const [isOnline, setIsOnline] = useState(window.navigator.onLine);

  useEffect(() => {
      const handleNetworkChange = () => {
          setIsOnline(window.navigator.onLine);
      };

      window.addEventListener('offline', handleNetworkChange);
      window.addEventListener('online', handleNetworkChange);

      return () => {
          window.removeEventListener('offline', handleNetworkChange);
          window.removeEventListener('online', handleNetworkChange);
      };
  }, []);

  if (!isOnline) {
      return <NoInternetPage />;
  }

  return <ClientRoutes />;
};

export default App;
