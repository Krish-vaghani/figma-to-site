import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

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
      offset={20}
      gap={10}
      duration={6500}
      visibleToasts={1}
      closeButton
      icons={{ close: <RoundCloseIcon /> }}
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-white/10 group-[.toaster]:dark:bg-black/10 group-[.toaster]:backdrop-blur-xl group-[.toaster]:text-foreground group-[.toaster]:border group-[.toaster]:border-white/20 group-[.toaster]:dark:border-white/10 group-[.toaster]:shadow-[0_8px_32px_0_rgba(0,0,0,0.12)] group-[.toaster]:dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.4)] group-[.toaster]:rounded-2xl group-[.toaster]:p-5 group-[.toaster]:min-w-[360px] group-[.toaster]:max-w-[420px] group-[.toaster]:transition-all group-[.toaster]:duration-300 group-[.toaster]:relative group-[.toaster]:overflow-hidden",
          title: "group-[.toast]:font-semibold group-[.toast]:text-base group-[.toast]:leading-tight group-[.toast]:tracking-tight group-[.toast]:relative group-[.toast]:z-10",
          description: "group-[.toast]:text-foreground/80 group-[.toast]:text-sm group-[.toast]:mt-1.5 group-[.toast]:leading-relaxed group-[.toast]:relative group-[.toast]:z-10",
          actionButton: "group-[.toast]:bg-coral/90 group-[.toast]:backdrop-blur-sm group-[.toast]:text-white group-[.toast]:rounded-lg group-[.toast]:text-sm group-[.toast]:font-medium group-[.toast]:px-4 group-[.toast]:py-2 group-[.toast]:hover:bg-coral group-[.toast]:transition-colors group-[.toast]:border group-[.toast]:border-white/20",
          cancelButton: "group-[.toast]:bg-white/10 group-[.toast]:backdrop-blur-sm group-[.toast]:text-foreground group-[.toast]:rounded-lg group-[.toast]:text-sm group-[.toast]:px-4 group-[.toast]:py-2 group-[.toast]:hover:bg-white/20 group-[.toast]:transition-colors group-[.toast]:border group-[.toast]:border-white/20",
          closeButton: "group-[.toast]:top-4 group-[.toast]:right-4 group-[.toast]:text-foreground/60 group-[.toast]:hover:text-foreground group-[.toast]:rounded-full group-[.toast]:transition-all group-[.toast]:hover:bg-white/20 group-[.toast]:backdrop-blur-sm group-[.toast]:p-1.5 group-[.toast]:border group-[.toast]:border-white/20",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
