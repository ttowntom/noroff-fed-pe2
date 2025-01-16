import Notification from "./Notification";

export default function InputTextField({
  label,
  name,
  type,
  value,
  placeholder,
  onChange,
  onBlur,
  error,
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="font-medium">
        {label}
      </label>
      <input
        type={type}
        id={label}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        className="rounded-md border border-light-border-secondary p-2 focus:outline-none focus:ring-1 focus:ring-light-border-primary dark:border-dark-border-primary dark:bg-dark-bg-primary dark:text-dark-text-primary dark:focus:ring-dark-border-primary"
      />
      {error && <Notification type="error">{error}</Notification>}
    </div>
  );
}
