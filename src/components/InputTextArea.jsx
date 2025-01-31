import Notification from "./Notification";

export default function InputTextArea({
  label,
  name,
  defaultValue,
  placeholder,
  onChange,
  onBlur,
  error,
  required,
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="font-medium">
        {label}
      </label>
      <textarea
        id={label}
        name={name}
        defaultValue={defaultValue}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        required={required}
        className="rounded-md border border-light-border-secondary p-2 focus:outline-none focus:ring-1 focus:ring-light-border-primary dark:border-dark-border-primary dark:bg-dark-bg-primary dark:text-dark-text-primary dark:focus:ring-dark-border-primary"
      />
      {error && (
        <Notification type="error">
          <p>{error}</p>
        </Notification>
      )}
    </div>
  );
}
