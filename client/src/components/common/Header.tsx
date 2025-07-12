import { useAuth } from "../../store/useStore";
import HeaderLoggedIn from "./HeaderLoggedIn";
import HeaderPublic from "./HeaderPublic";

const Header = ({ onSidebarToggle }: { onSidebarToggle?: () => void }) => {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) {
    return <HeaderLoggedIn onSidebarToggle={onSidebarToggle} />;
  }
  return <HeaderPublic />;
};

export default Header;
