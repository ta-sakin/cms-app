import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";

const UnauthError = ({ error }) => {
  const { logout, setLoadingAuth } = useAuth();
  if (error === 401 || error === 403) {
    setLoadingAuth(false);
    toast.error("Please try login again.", { theme: "colored" });
    logout();
    return;
  }
  return <></>;
};

export default UnauthError;
