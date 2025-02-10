import Notification from "./Notification";

/**
 * Input component for checkbox and radio controls with error handling
 * @component
 * @param {Object} props
 * @param {string} props.label - Input label text
 * @param {string} props.name - Input name attribute
 * @param {InputType} props.type - Input type (checkbox/radio)
 * @param {string} props.value - Input value
 * @param {boolean} props.checked - Checked state
 * @param {Function} props.onChange - Change event handler
 * @param {Function} props.onBlur - Blur event handler
 * @param {string} [props.error] - Error message to display
 * @param {boolean} [props.required] - Whether input is required
 * @returns {JSX.Element} Labeled input with optional error message
 *
 * @example
 * // Checkbox example
 * <InputCheckRadio
 *   label="WiFi Available"
 *   name="wifi"
 *   type="checkbox"
 *   value="wifi"
 *   checked={formData.wifi}
 *   onChange={handleChange}
 * />
 *
 * // Radio button example
 * <InputCheckRadio
 *   label="Premium"
 *   name="tier"
 *   type="radio"
 *   value="premium"
 *   checked={formData.tier === 'premium'}
 *   onChange={handleChange}
 *   required
 * />
 */
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
        id={name}
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
