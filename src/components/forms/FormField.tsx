import { cn } from "@/lib/utils";

const control =
  "h-12 w-full rounded-xl border border-line-strong bg-card px-4 text-[16px] text-fg placeholder:text-fg-soft " +
  "transition-[border-color,box-shadow] duration-200 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 " +
  "aria-[invalid=true]:border-[#b4462a] aria-[invalid=true]:focus:ring-[#b4462a]/20";

interface BaseProps {
  id: string;
  name: string;
  label: string;
  error?: string;
  hint?: string;
  required?: boolean;
  className?: string;
}

export function FieldWrapper({
  id,
  label,
  error,
  hint,
  required,
  className,
  children,
}: Omit<BaseProps, "name"> & { children: React.ReactNode }) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label htmlFor={id} className="text-sm font-semibold">
        {label}
        {required ? (
          <span aria-hidden className="text-[#b4462a]">
            {" "}
            *
          </span>
        ) : (
          <span className="ml-1 text-xs font-normal text-fg-soft">(optional)</span>
        )}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="text-xs font-medium text-[#b4462a]" role="alert">
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="text-xs text-fg-soft">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

type InputProps = BaseProps & Omit<React.InputHTMLAttributes<HTMLInputElement>, "id" | "name" | "required" | "className">;

export function TextField({ id, name, label, error, hint, required = true, className, ...rest }: InputProps) {
  return (
    <FieldWrapper id={id} label={label} error={error} hint={hint} required={required} className={className}>
      <input
        id={id}
        name={name}
        required={required}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
        className={control}
        {...rest}
      />
    </FieldWrapper>
  );
}

type SelectProps = BaseProps & {
  options: readonly string[];
  value: string;
  onChange: (value: string) => void;
};

export function SelectField({ id, name, label, error, hint, required = true, className, options, value, onChange }: SelectProps) {
  return (
    <FieldWrapper id={id} label={label} error={error} hint={hint} required={required} className={className}>
      <div className="relative">
        <select
          id={id}
          name={name}
          required={required}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          className={cn(control, "appearance-none pr-10")}
        >
          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
        <svg
          aria-hidden
          viewBox="0 0 20 20"
          className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-fg-muted"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        >
          <path d="M5 7.5l5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </FieldWrapper>
  );
}

type TextareaProps = BaseProps & Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "id" | "name" | "required" | "className">;

export function TextareaField({ id, name, label, error, hint, required = true, className, ...rest }: TextareaProps) {
  return (
    <FieldWrapper id={id} label={label} error={error} hint={hint} required={required} className={className}>
      <textarea
        id={id}
        name={name}
        required={required}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
        className={cn(control, "h-auto min-h-32 resize-y py-3")}
        {...rest}
      />
    </FieldWrapper>
  );
}
