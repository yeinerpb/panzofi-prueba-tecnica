import { useState, useEffect } from "react";
import { Layout, Row, Col, Button, Typography } from "antd";
import axios from "axios";

const { Content } = Layout;
const { Title, Paragraph } = Typography;

const LandingPage = () => {
  const [button1Clicks, setButton1Clicks] = useState(0);
  const [button2Clicks, setButton2Clicks] = useState(0);
  const [landingData, setLandingData] = useState({
    title: "",
    description: "",
    logo: "",
  });

  useEffect(() => {
    const fetchLandingData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/landing/");
        setLandingData(response.data);
      } catch (error) {
        console.error("Error fetching landing data:", error);
      }
    };

    fetchLandingData();
  }, []);

  const handleButton1Click = async () => {
    setButton1Clicks(button1Clicks + 1);
    await registerInteraction("button1");
  };

  const handleButton2Click = async () => {
    setButton2Clicks(button2Clicks + 1);
    await registerInteraction("button2");
  };

  const registerInteraction = async (buttonName) => {
    try {
      const username = localStorage.getItem("username");
      if (!username) {
        console.error("No username or token found in localStorage");
        return;
      }

      await axios.post("http://localhost:8000/api/register_interaction/", {
        username: username,
        button_name: buttonName,
      });
    } catch (error) {
      console.error("Error registering interaction:", error);
    }
  };

  const handleLogout = async () => {
    try {
      const username = localStorage.getItem("username");
      if (!username) {
        console.error("No username found in localStorage");
        return;
      }

      await axios.post("http://localhost:8000/api/logout/", {
        username: username,
      });

      localStorage.removeItem("token");
      localStorage.removeItem("username");

      window.location.href = "/login";
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <Layout
      style={{
        minHeight: "100vh",
        padding: "40px",
        fontFamily: "'Roboto', sans-serif",
        backgroundColor: "#f0f2f5",
      }}
    >
      <Content
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Row
          gutter={[16, 16]}
          justify="center"
          align="middle"
          style={{ marginBottom: "40px", width: "100%" }}
        >
          <Col
            xs={24}
            sm={8}
            style={{ textAlign: "center", paddingRight: "0" }}
          >
            <img
              src={`data:image/jpeg;base64,${landingData.logo}`}
              alt="Logo"
              style={{ maxWidth: "80%", marginBottom: "0" }}
            />
          </Col>
          <Col
            xs={24}
            sm={16}
            style={{
              textAlign: "left",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              paddingLeft: "0",
            }}
          >
            <Title
              level={2}
              style={{
                fontFamily: "'Roboto', sans-serif",
                color: "#1890ff",
                marginBottom: "0",
              }}
            >
              {landingData.title}
            </Title>
            <Paragraph
              style={{
                fontFamily: "'Roboto', sans-serif",
                fontSize: "16px",
                color: "#595959",
                marginTop: "0",
              }}
            >
              {landingData.description}
            </Paragraph>
          </Col>
        </Row>
        <Row justify="center" gutter={[16, 16]} style={{ width: "100%" }}>
          <Col>
            <Button
              type="primary"
              size="large"
              style={{
                fontFamily: "'Roboto', sans-serif",
                padding: "10px 20px",
              }}
              onClick={handleButton1Click}
            >
              Botón 1 ( {button1Clicks} )
            </Button>
          </Col>
          <Col>
            <Button
              type="default"
              size="large"
              style={{
                fontFamily: "'Roboto', sans-serif",
                padding: "10px 20px",
              }}
              onClick={handleButton2Click}
            >
              Botón 2 ( {button2Clicks} )
            </Button>
          </Col>
        </Row>
        <Row justify="center" style={{ marginTop: "40px", width: "100%" }}>
          <Col>
            <Button
              type="default"
              size="large"
              style={{
                fontFamily: "'Roboto', sans-serif",
                padding: "10px 20px",
              }}
              onClick={handleLogout}
            >
              Cerrar sesión
            </Button>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default LandingPage;
