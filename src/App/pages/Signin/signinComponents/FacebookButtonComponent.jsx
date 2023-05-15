// import { showNotification } from "@mantine/notifications";
// import axios from "axios";
// import React from "react";
// import FacebookLogin from "react-facebook-login";
// import { useNavigate } from "react-router-dom";
// import { authenticate } from "../../../Auth/authHelpers";

// const FacebookButtonComponent = () => {
//   const navigate = useNavigate();
//   const responseFacebook = (response) => {
//     console.log(response);
//     const accessToken = response.accessToken;
//     const userID = response.userID;

//     axios
//       .post(`${process.env.REACT_APP_API}/facebook-auth/`, {
//         userID,
//         accessToken,
//       })
//       .then((res) => {
//         console.log(res);
//         authenticate(res, () => {
//           console.log(res);
//           navigate("/");
//           showNotification({
//             message: `Hey ${res.data.user.name}, Welcome Back`,
//             color: "blue",
//           });
//         });
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };

//   return (
//     <div>
//       <FacebookLogin
//         buttonStyle={{
//           borderRadius: 5,
//           padding: 10,
//           fontSize: 14,
//           textTransform: "unset",
//           width: "100%",
//           fontWeight: "500",
//         }}
//         textButton="Login with facebook"
//         // cssClass="rounded-md bg-blue-500 p-4 w-full text-white font-bold"
//         appId={process.env.REACT_APP_FACEBOOK_APP_ID}
//         autoLoad={false}
//         fields="name,email,picture"
//         onClick={() => console.log("CLicked")}
//         callback={responseFacebook}
//       />
//     </div>
//   );
// };

// export default FacebookButtonComponent;
