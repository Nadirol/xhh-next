import { CssBaseline } from "@mui/material";
import Header from "../../../components/admin/Header";
import LoginComponent from "../../../components/admin/Login";
import SideMenu from "../../../components/admin/SideMenu";

const Login = () => {
    return (
        <div className="">
            <CssBaseline/>
            <Header/>
            <SideMenu/>
            <LoginComponent/>
        </div>
    )
};

export default Login;