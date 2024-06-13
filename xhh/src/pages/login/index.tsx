import { CssBaseline } from "@mui/material";
import Header from "../../../components/admin/Header";
import LoginComponent from "../../../components/admin/Login";
import { useTranslation } from "next-i18next"

const Login = () => {
  const { t } = useTranslation('common');

    return (
        <div className="">
            <CssBaseline/>
            <Header/>
            <LoginComponent/>
        </div>
    )
};

export default Login;