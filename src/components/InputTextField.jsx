export default function InputTextField({
  label,
  type,
  value,
  placeholder,
  onChange,
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={label} className="font-medium">
        {label}
      </label>
      <input
        type={type}
        id={label}
        name={label}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className="rounded-md border border-light-border-secondary p-2 focus:outline-none focus:ring-1 focus:ring-light-border-primary dark:border-dark-border-primary dark:bg-dark-bg-primary dark:text-dark-text-primary dark:focus:ring-dark-border-primary"
      />
    </div>
  );
}
