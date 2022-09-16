// import axios from "axios";
// import { useEffect } from "react";
// import { Navigate, useNavigate } from "react-router-dom";
// function isUserLoggedIn(username) {
//   const navigation = new useNavigate();
//   const [loginStatus, updateLoginStatus] = useState("");

//   useEffect(() => {
//     axios
//       .post(
//         `http://localhost:8800/api/v1/isUserLoggedIn/${currentUser.username}`,
//         {}
//       )
//       .then((resp) => {
//         updateLoginStatus(true);
//       })
//       .catch((error) => {
//         console.log(error.response.data);
//         updateLoginStatus(false);
//       });
//   }, []);

//   if (!loginStatus) {
//     return (
//       <div
//         style={{
//           width: "100vw",
//           height: "100vh",
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           flexWrap: "wrap",
//           flexDirection: "column",
//         }}
//       >
//         <p style={{ color: "red", fontSize: "20px" }}>
//           User not logged in please login by clicking below
//         </p>

//         <button
//           onClick={() => navigation("/")}
//           class="btn btn-secondary button"
//         >
//           login
//         </button>
//       </div>
//     );
//   }
// }
// export default isUserLoggedIn;
