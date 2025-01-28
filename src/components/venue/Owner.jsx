import { Link } from "react-router-dom";
import { NO_USER_IMG_URL } from "../../constants.js";

export default function Owner({ venue }) {
  let avatar = venue.owner.avatar.url;
  if (
    avatar ===
    "https://images.unsplash.com/photo-1579547945413-497e1b99dac0?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&h=400&w=400"
  ) {
    avatar = NO_USER_IMG_URL;
  }

  return (
    <section>
      <hr className="my-6" />
      <Link
        to={`/profile/${venue.owner.name}`}
        className="flex flex-col items-center gap-4 py-2 text-light-text-primary dark:text-dark-text-primary xs:flex-row"
      >
        <img
          src={avatar}
          alt={venue.owner.name}
          className="h-16 w-16 rounded-full"
        />
        <div>
          <h2>Owner</h2>
          <p className="font-semibold">{venue.owner.name}</p>
          <p>{venue.owner.bio}</p>
        </div>
      </Link>
      <hr className="my-4" />
    </section>
  );
}
