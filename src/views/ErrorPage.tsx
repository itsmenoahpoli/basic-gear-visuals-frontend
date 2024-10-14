import React from "react";
import { Theme, Flex, Button } from "@radix-ui/themes";
import { useNavigate } from "react-router-dom";

const ErrorPage: React.FC = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/dashboard");
  };

  return (
    <Theme appearance="dark">
      <Flex direction="column" justify="center" align="center" gap="2" className="h-screen w-screen">
        <h1 className="text-[32px] text-white font-bold">PAGE NOT FOUND</h1>
        <Button onClick={handleGoHome}>Back to home</Button>
      </Flex>
    </Theme>
  );
};

export default ErrorPage;
