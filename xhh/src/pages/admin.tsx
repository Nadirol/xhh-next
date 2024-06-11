import { useSession } from "next-auth/react";
import React from "react";
import Login from "./login";
import { CssBaseline } from "@mui/material";
import DashboardPage from "./dashboard";

const Admin: React.FC = () => {
  const { data: session } = useSession();

  return (
    <>
        <CssBaseline/>
        <main>
            {session && <DashboardPage/>}
            {!session && <Login/>}
        </main>
    </>
  );
};

export default Admin;