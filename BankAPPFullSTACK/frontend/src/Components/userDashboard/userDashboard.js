import { useParams } from "react-router-dom";
import NavBar from "./navigationBar/navigationBar";
function UserDashboard() {
  const username = useParams();
  return (
    <>
      <NavBar username={username.username} />
    </>
  );
}
export default UserDashboard;
