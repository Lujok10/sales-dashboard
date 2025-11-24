// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../api";
// import { Container, Form, Button } from "react-bootstrap";

// export default function Login() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async () => {
//     try {
//       const response = await api.post("/auth/login", { username, password });
//       if (response.data) {
//         localStorage.setItem("role", response.data.role);
//         navigate("/dashboard");
//       } else {
//         alert("Invalid credentials");
//       }
//     } catch (error) {
//       alert("Login failed");
//       console.error(error);
//     }
//   };

//   return (
//     <Container className="mt-5" style={{ maxWidth: "400px" }}>
//       <h3>Login</h3>
//       <h3>Login</h3>
//       <Form>
//         <Form.Group className="mb-3">
//           <Form.Label>Username</Form.Label>
//           <Form.Control
//             type="text"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//           />
//         </Form.Group>
//         <Form.Group className="mb-3">
//           <Form.Label>Password</Form.Label>
//           <Form.Control
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//         </Form.Group>
//         <Button onClick={handleLogin}>Login</Button>
//       </Form>
//     </Container>
//   );
// }
