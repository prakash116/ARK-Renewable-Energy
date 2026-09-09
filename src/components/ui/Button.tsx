import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "lime" | "outline" | "ghost" | "white";
export type ButtonSize = "sm" | "md" | "lg";
export type ButtonIcon = "arrow" | "arrow-up-right" | "none";

const base =
  "group/btn inline-flex items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap select-none " +
  "transition-[background-color,color,border-color,transform,box-shadow] duration-300 ease-out-expo " +
  "disabled:pointer-events-none disabled:opacity-50 active:scale-[0.985]";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-primary text-white hover:bg-primary-strong shadow-[0_1px_0_rgba(255,255,255,0.08)_inset]",
  lime: "bg-lime text-ink hover:bg-[#d7f86a]",
  outline: "border border-line-strong text-fg hover:border-fg hover:bg-card",
  ghost: "text-fg hover:bg-card-2",
  white: "bg-white text-ink hover:bg-cream",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-10 px-4 text-sm",
  md: "h-12 px-5 text-[15px]",
  lg: "h-13 px-6 text-base sm:h-14 sm:px-7",
};

const iconSizes: Record<ButtonSize, string> = {
  sm: "size-4",
  md: "size-4",
  lg: "size-[18px]",
};

interface CommonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: ButtonIcon;
  className?: string;
  children: React.ReactNode;
  /** Stretch to full width (useful on mobile). */
  block?: boolean;
}

type AnchorProps = CommonProps & {
  href: string;
  external?: boolean;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  ariaLabel?: string;
};

type NativeButtonProps = CommonProps & {
  href?: undefined;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  ariaLabel?: string;
};

export type ButtonProps = AnchorProps | NativeButtonProps;

function ButtonIconEl({ icon, size }: { icon: ButtonIcon; size: ButtonSize }) {
  if (icon === "none") return null;
  const cls = cn(iconSizes[size], "shrink-0 transition-transform duration-300 ease-out-expo");
  if (icon === "arrow-up-right") {
    return (
      <ArrowUpRight
        aria-hidden
        className={cn(cls, "group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5")}
      />
    );
  }
  return <ArrowRight aria-hidden className={cn(cls, "group-hover/btn:translate-x-0.5")} />;
}

export function Button(props: ButtonProps) {
  const {
    variant = "primary",
    size = "md",
    icon = "none",
    className,
    children,
    block,
  } = props;
  const classes = cn(base, variants[variant], sizes[size], block && "w-full", className);

  if (props.href !== undefined) {
    const { href, external, onClick, ariaLabel } = props;
    const isExternal =
      external || /^(https?:|mailto:|tel:|#)/.test(href) || href.startsWith("//");
    if (isExternal) {
      const target = /^https?:/.test(href) ? "_blank" : undefined;
      return (
        <a
          href={href}
          className={classes}
          onClick={onClick}
          aria-label={ariaLabel}
          target={target}
          rel={target ? "noopener noreferrer" : undefined}
        >
          {children}
          <ButtonIconEl icon={icon} size={size} />
        </a>
      );
    }
    return (
      <Link href={href} className={classes} onClick={onClick} aria-label={ariaLabel}>
        {children}
        <ButtonIconEl icon={icon} size={size} />
      </Link>
    );
  }

  const { type = "button", disabled, onClick, ariaLabel } = props;
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={classes}
      aria-label={ariaLabel}
    >
      {children}
      <ButtonIconEl icon={icon} size={size} />
    </button>
  );
}
