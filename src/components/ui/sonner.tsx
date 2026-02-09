import { useTheme } from "next-themes";
import { Toaster as Sonner, toast } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

/** X icon with completely round line caps */
const RoundCloseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    width="16"
    height="16"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.25"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    <path d="M4 4l8 8M12 4l-8 8" />
  </svg>
);

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      position="top-right"
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      offset={16}
      gap={12}
      duration={4000}
      closeButton
      richColors
      icons={{ close: <RoundCloseIcon /> }}
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border group-[.toaster]:border-border group-[.toaster]:shadow-xl group-[.toaster]:rounded-xl group-[.toaster]:p-4 group-[.toaster]:min-w-[320px] group-[.toaster]:max-w-[380px]",
          title: "group-[.toast]:font-semibold group-[.toast]:text-[15px] group-[.toast]:leading-tight",
          description: "group-[.toast]:text-muted-foreground group-[.toast]:text-sm group-[.toast]:mt-1",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground group-[.toast]:rounded-lg group-[.toast]:text-sm group-[.toast]:font-medium",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground group-[.toast]:rounded-lg group-[.toast]:text-sm",
          closeButton: "group-[.toast]:top-3 group-[.toast]:right-3 group-[.toast]:text-muted-foreground group-[.toast]:hover:text-foreground group-[.toast]:rounded-md",
        },
      }}
      {...props}
    />
  );
};

export { Toaster, toast };
