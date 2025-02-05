import Notification from "./Notification";

/**
 * Text input component with label and error handling
 * @component
 * @param {Object} props
 * @param {string} props.label - Input label text
 * @param {string} props.name - Input name attribute
 * @param {InputType} props.type - Input type
 * @param {string} [props.defaultValue] - Default input value
 * @param {string} [props.placeholder] - Placeholder text
 * @param {Function} props.onChange - Change event handler
 * @param {Function} props.onBlur - Blur event handler
 * @param {string} [props.error] - Error message to display
 * @param {boolean} [props.required] - Whether input is required
 * @returns {JSX.Element} Labeled input field with optional error message
 *
 * @example
 * // Basic text input
 * <InputTextField
 *   label="Venue Name"
 *   name="venueName"
 *   type="text"
 *   onChange={handleChange}
 *   onBlur={handleBlur}
 * />
 *
 * // Required number input with error
 * <InputTextField
 *   label="Price"
 *   name="price"
 *   type="number"
 *   required
 *   error="Price is required"
 *   onChange={handleChange}
 *   onBlur={handleBlur}
 * />
 */
export default function InputTextField({
  label,
  name,
  type,
  defaultValue,
  placeholder,
  onChange,
  onBlur,
  error,
  required,
}) {
  return (
    <div className="flex w-full flex-col gap-2">
      <label htmlFor={name} className="font-medium">
        {label}
      </label>
      <input
        type={type}
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
