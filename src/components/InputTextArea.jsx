import Notification from "./Notification";

/**
 * Textarea input component with label and error handling
 * @component
 * @param {Object} props
 * @param {string} props.label - Input label text
 * @param {string} props.name - Input name attribute
 * @param {string} [props.defaultValue] - Default textarea value
 * @param {string} [props.placeholder] - Placeholder text
 * @param {Function} props.onChange - Change event handler
 * @param {Function} props.onBlur - Blur event handler
 * @param {string} [props.error] - Error message to display
 * @param {boolean} [props.required] - Whether input is required
 * @returns {JSX.Element} Labeled textarea with optional error message
 *
 * @example
 * <InputTextArea
 *   label="Description"
 *   name="description"
 *   defaultValue={venue.description}
 *   placeholder="Enter venue description..."
 *   onChange={handleChange}
 *   onBlur={handleBlur}
 *   required
 * />
 */
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
