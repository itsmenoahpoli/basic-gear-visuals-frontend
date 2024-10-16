import React from "react";
import { useForm, Controller, type SubmitHandler } from "react-hook-form";
import { Card, Flex, TextField, Button } from "@radix-ui/themes";
import { useAuthService } from "@/services";
import type { Credentials } from "@/types/auth";

const SignupPage: React.FC = () => {
  const { handleSubmit, control } = useForm<Credentials>();
  const { authenticateCredentials } = useAuthService();
  const [loading, setLoading] = React.useState<boolean>(false);

  const onFormSubmit: SubmitHandler<Credentials> = async (formData): Promise<void> => {
    setLoading(true);
    return await authenticateCredentials(formData, setLoading);
  };

  return (
    <Card className="w-[400px] !p-5">
      <h1 className="text-center mb-5">LOGIN TO YOUR ACCOUNT</h1>

      <form onSubmit={handleSubmit(onFormSubmit)}>
        <Flex direction="column" gap="4">
          <Controller
            name="email"
            control={control}
            defaultValue=""
            render={({ field }) => <TextField.Root type="email" size="3" placeholder="Enter e-mail" {...field} required autoFocus />}
          />
          <Controller
            name="password"
            control={control}
            defaultValue=""
            render={({ field }) => <TextField.Root type="password" size="3" placeholder="Enter password" {...field} required />}
          />
          <Button type="submit" size="3" loading={loading}>
            Log In
          </Button>
          <div className="!w-full px-3">
            <Button size="3" variant="ghost" className="!w-full">
              Forgot your password?
            </Button>
          </div>
        </Flex>
      </form>
    </Card>
  );
};

export default SignupPage;
