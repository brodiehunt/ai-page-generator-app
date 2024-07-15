import LoginForm from "@/src/components/auth/LoginForm";

const LoginPage = () => {
  console.log("login page");
  return (
    <div className="flex items-center justify-center h-screen">
      <LoginForm />
    </div>
  );
};

export default LoginPage;
