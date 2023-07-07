import React, { useEffect, useRef, useState } from "react";
import { Typography, AppBar, Toolbar, Button  } from "@mui/material";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import io from "socket.io-client";
import TableComponent from "./components/Table/TableComponent"
import User from "./components/User/User";

const ENDPOINT = `http://${window.location.hostname}:3003`;

const App = () => {
  const socketIo = useRef(null);
  const [client, setClient] = useState(null);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    socketIo.current = io(ENDPOINT);

    socketIo.current.on("client-connected", (client) => {
      if (client) {
        setClient(client);
      }
    });

    socketIo.current.on("market-data", (data) => {
      console.log('data',data)
      setTableData((prevData) => [...prevData, data]);
    });

    return () => socketIo.current.disconnect();
  }, []);

  if (!client) {
    return <Typography>There's no client connected at the moment</Typography>;
  }

  return (
    <Router>
      
        <AppBar  position="fixed" style={{ top: 0, width: "100%", backgroundColor: "black" }}>
          <Toolbar>
            <Button component={Link} to="/table" color="inherit">Table</Button>
            <Button component={Link} to="/user" color="inherit">User</Button>
          </Toolbar>
        </AppBar>

        <Routes>
          <Route path="/table" element={<TableComponent tableData={tableData} />} />
          <Route path="/user" element={<User client={client} />} />
        </Routes>
      
    </Router>
  );
};

export default App;
