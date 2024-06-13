import { useSession, signIn, signOut } from "next-auth/react"
import Button from "@mui/material/Button";

const Login = () => {
    const { data: session } = useSession();

    if(!session) {
        return <>
            <div className="flex gap-4 flex-col justify-center items-center h-[600px]">
                <Button className="text-xl text-white bg-red-500 rounded px-12 py-4 hover:bg-red-700" onClick={() => signIn()}>Đăng nhập</Button>
            </div>
        </>
    }
    return 
}

export default Login;