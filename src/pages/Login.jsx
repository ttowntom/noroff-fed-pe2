import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { byPrefixAndName } from "@awesome.me/kit-8d12afa6e5/icons";
import { z } from "zod";

import { useFormValidation } from "../hooks/useFormValidation";
import { useLoginMutation } from "../hooks/useLoginMutation";
import loginSchema from "../schemas/login";
import InputTextField from "../components/InputTextField";
import Button from "../components/Button";
import Notification from "../components/Notification";
import Loading from "../components/Loading";

export default function Login() {
  const { formData, formErrors, handleBlur, handleChange, setFormErrors } =
    useFormValidation(
      {
        email: "",
        password: "",
      },
      loginSchema
    );

  const { mutate, isPending, isError, error } = useLoginMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      loginSchema.parse(formData);
      setFormErrors({});
      await mutate({
        email: formData.email,
        password: formData.password,
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorObj = error.errors.reduce((acc, curr) => {
          acc[curr.path[0]] = curr.message;
          return acc;
        }, {});
        setFormErrors(errorObj);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center text-light-text-primary dark:text-dark-text-primary">
      <div className="space-y-4 text-center">
        <p className="font-semibold">Welcome back!</p>
        <h1 className="font-notoSerif text-4xl font-semibold sm:text-5xl">
          Log In
        </h1>
        <p>
          Get access to your bookings, venue management and book new adventures!
        </p>
      </div>
      <div className="mt-12 flex w-full max-w-[50ch] flex-col gap-8">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <InputTextField
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={formErrors.email}
          />
          <InputTextField
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            onBlur={handleBlur}
            error={formErrors.password}
          />

          {!isPending ? (
            <Button type="submit" onClick={handleSubmit} disabled={isPending}>
              Log In
            </Button>
          ) : (
            <Loading />
          )}
        </form>
        {isError && (
          <div className="mt-2">
            <Notification type="error">
              <p>{error.message}</p>
            </Notification>
          </div>
        )}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <p>Don&apos;t have a user? </p>
          <Link
            to="/signup"
            className="font-medium text-dark-link-primary hover:underline"
          >
            Sign up
            <FontAwesomeIcon
              icon={byPrefixAndName.fas["chevron-right"]}
              className="ml-2 text-light-text-primary dark:text-dark-text-primary"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
