import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { byPrefixAndName } from "@awesome.me/kit-8d12afa6e5/icons";
import { z } from "zod";

import { useFormValidation } from "../hooks/useFormValidation";
import { useLoginMutation } from "../hooks/useLoginMutation";
import { postFn } from "../utils/http";
import signupSchema from "../schemas/signup";
import InputTextField from "../components/InputTextField";
import Button from "../components/Button";
import Notification from "../components/Notification";
import Loading from "../components/Loading";

/**
 * Signup page component with registration form
 * @component
 * @returns {JSX.Element} Registration form with validation
 *
 * @example
 * function App() {
 *   return (
 *     <Routes>
 *       <Route path="/signup" element={<Signup />} />
 *     </Routes>
 *   );
 * }
 */
export default function Signup() {
  const [venueManager, setVenueManager] = useState(false);
  const checkboxRef = useRef(null);
  const { formData, formErrors, handleBlur, handleChange, setFormErrors } =
    useFormValidation(
      {
        name: "",
        email: "",
        password: "",
        passwordConfirm: "",
      },
      signupSchema
    );

  const handleToggleManager = () => {
    setVenueManager((prev) => !prev);
    checkboxRef.current.checked = !venueManager;
  };

  const { mutate: loginMutate } = useLoginMutation();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: (body) => postFn({ url: "/auth/register", body }),
    onSuccess: () => {
      loginMutate({
        email: formData.email,
        password: formData.password,
      });
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      signupSchema.parse(formData);
      setFormErrors({});
      await mutate({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        venueManager,
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
        <p className="font-semibold">Join</p>
        <h1 className="font-notoSerif text-4xl font-semibold sm:text-5xl">
          Get started
        </h1>
        <p>Create your account to start booking accommodations today.</p>
      </div>
      <div className="mt-12 flex w-full max-w-[50ch] flex-col gap-8">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <InputTextField
            label="Name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            onBlur={handleBlur}
            error={formErrors.name}
          />
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
          <InputTextField
            label="Confirm Password"
            type="password"
            name="passwordConfirm"
            value={formData.passwordConfirm}
            onChange={handleChange}
            onBlur={handleBlur}
            error={formErrors.passwordConfirm}
          />
          <div className="flex items-center justify-between gap-4">
            <p>Sign up as a Venue Manager</p>
            <label htmlFor="venueManager" className="sr-only">
              Toggle Venue Manager
            </label>
            <input
              type="checkbox"
              name="venueManager"
              id="venueManager"
              className="hidden"
              ref={checkboxRef}
              checked={venueManager}
              onChange={(e) => setVenueManager(e.target.checked)}
            />
            <button
              type="button"
              aria-label="Toggle venue manager"
              onClick={handleToggleManager}
            >
              {venueManager ? (
                <FontAwesomeIcon
                  aria-hidden="true"
                  icon={byPrefixAndName.fas["toggle-on"]}
                  className="text-2xl"
                />
              ) : (
                <FontAwesomeIcon
                  aria-hidden="true"
                  icon={byPrefixAndName.fat["toggle-off"]}
                  className="text-2xl"
                />
              )}
            </button>
          </div>
          {!isPending ? (
            <Button type="submit" onClick={handleSubmit} disabled={isPending}>
              Sign up
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
          <p>Already have a user? </p>
          <Link
            to="/login"
            className="font-medium text-dark-link-primary hover:underline"
          >
            Log in
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
