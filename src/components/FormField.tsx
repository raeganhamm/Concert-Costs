type FormFieldProps = {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
  hint?: string;
  required?: boolean;
};

export function FormField({ label, htmlFor, children, hint, required }: FormFieldProps) {
  return (
    <div className="grid grid-cols-1 gap-1 sm:grid-cols-[10rem_1fr] sm:items-center sm:gap-4">
      <label htmlFor={htmlFor} className="label sm:justify-end sm:py-0">
        <span className="label-text font-medium">
          {label}
          {required && <span className="text-error"> *</span>}
        </span>
      </label>
      <div>
        {children}
        {hint && <p className="text-helper mt-1">{hint}</p>}
      </div>
    </div>
  );
}
