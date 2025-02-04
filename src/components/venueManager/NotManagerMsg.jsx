import { useLogout } from "../../hooks/useLogout";
import Notification from "../../components/Notification.jsx";
import Button from "../../components/Button.jsx";

export default function NotManagerMsg() {
  return (
    <div className="mt-2 w-full max-w-[65ch] sm:mt-6">
      <Notification type="info">
        <div className="ml-4 flex flex-col gap-4">
          <h2 className="text-2xl font-bold">
            You are not signed up as a venue manager
          </h2>
          <p>
            To become a Venue Manager your account must be set up as such. When
            signing up, make sure to check the Venue Manager toggle in the form.
          </p>
          <p>Please log out and sign up again as a Venue Manager.</p>
          <Button onClick={useLogout()}>Log out</Button>
        </div>
      </Notification>
    </div>
  );
}
