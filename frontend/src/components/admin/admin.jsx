import { useState, useEffect } from "react";
import axios from "axios";
import { Table } from "antd";
import { Bar, Pie } from "@ant-design/plots";

const AdminDashboard = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const response = await axios.get("http://localhost:8000/api/users/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const filteredData = response.data.filter(
          (user) => user.is_admin === false
        );
        setData(filteredData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);

  const barConfig1 = {
    data: [
      {
        range: "0-10",
        value: data.filter((d) => d.button1Clicks <= 10).length,
      },
      {
        range: "11-20",
        value: data.filter((d) => d.button1Clicks <= 20 && d.button1Clicks > 10)
          .length,
      },
      {
        range: "21-30",
        value: data.filter((d) => d.button1Clicks <= 30 && d.button1Clicks > 20)
          .length,
      },
      { range: ">30", value: data.filter((d) => d.button1Clicks > 30).length },
    ],
    xField: "range",
    yField: "value",
    seriesField: "range",
    legend: false,
    barStyle: { strokeWidth: 5 },
    height: 200,
    label: {
      position: "middle",
      style: {
        fill: "#FFFFFF",
        opacity: 0.6,
      },
    },
  };

  const pieConfig = {
    data: [
      {
        type: "Clics en botón 1",
        value: data.reduce((acc, d) => acc + (d.button1Clicks || 0), 0),
      },
      {
        type: "Clics en botón 2",
        value: data.reduce((acc, d) => acc + (d.button2Clicks || 0), 0),
      },
    ],
    angleField: "value",
    colorField: "type",
    radius: 0.8,
    height: 200,
    width: 400,
    tooltip: false,
    label: {
      type: "outer",
      content: "{name} {percentage}",
    },
  };

  const barConfig2 = {
    data: [
      {
        range: "0-10",
        value: data.filter((d) => d.button2Clicks <= 10).length,
      },
      {
        range: "11-20",
        value: data.filter((d) => d.button2Clicks <= 20 && d.button2Clicks > 10)
          .length,
      },
      {
        range: "21-30",
        value: data.filter((d) => d.button2Clicks <= 30 && d.button2Clicks > 20)
          .length,
      },
      { range: ">30", value: data.filter((d) => d.button2Clicks > 30).length },
    ],
    xField: "range",
    yField: "value",
    seriesField: "range",
    legend: false,
    barStyle: { strokeWidth: 5 },
    height: 200,
    label: {
      position: "middle",
      style: {
        fill: "#FFFFFF",
        opacity: 0.6,
      },
    },
  };
  const columns = [
    { title: "Nombre", dataIndex: "username", key: "username" },
    {
      title: "Inicio de sesión",
      dataIndex: "loginDate",
      key: "loginDate",
      render: (loginDate) => {
        if (!loginDate) return "Aún no inicia sesión";
        const date = new Date(loginDate);
        return date.toLocaleString();
      },
    },
    {
      title: "Tiempo",
      dataIndex: "sessionTime",
      key: "sessionTime",
      render: (sessionTime) => {
        if (sessionTime === null) {
          return "00:00";
        }

        const hours = Math.floor(sessionTime / 60);
        const minutes = Math.floor(sessionTime % 60);
        const formattedTime = `${String(hours).padStart(2, "0")}:${String(
          minutes
        ).padStart(2, "0")}`;
        return formattedTime;
      },
    },
    { title: "Botón 1", dataIndex: "button1Clicks", key: "button1Clicks" },
    { title: "Botón 2", dataIndex: "button2Clicks", key: "button2Clicks" },
  ];

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>Gestión de Usuarios</h1>
      <Table
        dataSource={data}
        columns={columns}
        pagination={{ position: ["bottomCenter"], pageSize: 5 }}
        rowKey={(record) => record.id}
        bordered
      />
      <div style={{ marginTop: "40px" }}>
        <h2>Estadísticas</h2>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "20px",
            flexWrap: "wrap",
          }}
        >
          <div style={{ flex: "1 1 200px", textAlign: "center" }}>
            <p>Distribución de clics en el botón 1</p>
            <Bar key="bar1" {...barConfig1} />
          </div>
          <div style={{ flex: "1 1 200px", textAlign: "center" }}>
            <p>Proporción de clics en el botón 1 vs botón 2</p>
            <Pie key="pie" {...pieConfig} />
          </div>
          <div style={{ flex: "1 1 200px", textAlign: "center" }}>
            <p>Distribución de clics en el botón 2</p>
            <Bar key="bar2" {...barConfig2} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
