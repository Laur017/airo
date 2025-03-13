import { GoogleLogin } from "@react-oauth/google";

export default function Login({ login }: any) {
  const responseMessage = () => {
    console.log("logged in");
    login();
  };
  const errorMessage = () => {
    console.log("error to log in");
  };
  return (
    <div className="main-btn">
      <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
    </div>
  );
}
