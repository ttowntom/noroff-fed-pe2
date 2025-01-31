import Notification from "./Notification";

export default function InputCheckRadio({
  label,
  name,
  type,
  value,
  checked,
  onChange,
  onBlur,
  error,
  required,
}) {
  return (
    <div className="flex flex-row gap-2">
      <input
        type={type}
        id={label}
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        onBlur={onBlur}
        required={required}
        className="rounded-md border border-light-border-secondary p-2 focus:outline-none dark:border-dark-border-primary dark:bg-dark-bg-primary dark:text-dark-text-primary"
      />
      <label htmlFor={name} className="font-medium">
        {label}
      </label>
      {error && (
        <Notification type="error">
          <p>{error}</p>
        </Notification>
      )}
    </div>
  );
}
