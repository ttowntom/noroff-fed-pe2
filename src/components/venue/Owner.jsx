export default function Owner({ venue }) {
  return (
    <>
      <hr className="my-6" />
      <div className="flex flex-wrap gap-4 py-2 text-light-text-primary dark:text-dark-text-primary">
        <img
          src={venue.owner.avatar.url}
          alt={venue.owner.name}
          className="h-12 w-12 rounded-full"
        />
        <div>
          <h2>Owner</h2>
          <p className="font-semibold">{venue.owner.name}</p>
          <p>{venue.owner.bio}</p>
        </div>
      </div>
      <hr className="my-4" />
    </>
  );
}
