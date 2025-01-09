import { useState } from "react";
import axios from "axios";
import { Form, Input, Button, Alert, Typography } from "antd";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

const formStyle = {
  fontFamily: "'Roboto', sans-serif",
  maxWidth: "400px",
  margin: "0 auto",
  padding: "20px",
  border: "1px solid #ccc",
  borderRadius: "8px",
  backgroundColor: "#fff",
};

const buttonStyle = {
  width: "100%",
  fontFamily: "'Roboto', sans-serif",
};

function Login() {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      const response = await axios.post("http://localhost:8000/api/login/", {
        username: values.username,
        password: values.password,
      });

      console.log("Respuesta del servidor:", response.data);

      localStorage.setItem("access_token", response.data.token);
      localStorage.setItem("is_admin", response.data.is_admin);
      localStorage.setItem("username", values.username);
      console.log("is_admin almacenado:", localStorage.getItem("is_admin"));

      if (response.data.is_admin) {
        console.log("Redireccionando a /admin");
        navigate("/admin");
      } else {
        console.log("Redireccionando a /landing");
        navigate("/landing");
      }
    } catch (error) {
      console.error("Error durante el inicio de sesión:", error);
      setError(
        "Usuario o contraseña incorrectas. Por favor, inténtalo de nuevo."
      );
    }
  };

  return (
    <div style={{ padding: "50px 0", textAlign: "center" }}>
      <Title level={2} style={{ fontFamily: "'Roboto', sans-serif" }}>
        Iniciar Sesión
      </Title>
      <Form name="login" onFinish={handleSubmit} style={formStyle}>
        {error && <Alert message={error} type="error" showIcon />}
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: "Por favor ingrese su nombre de usuario",
            },
          ]}
        >
          <Input placeholder="Nombre de usuario" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            { required: true, message: "Por favor ingrese su contraseña" },
          ]}
        >
          <Input.Password placeholder="Contraseña" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" style={buttonStyle}>
            Iniciar Sesión
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Login;
