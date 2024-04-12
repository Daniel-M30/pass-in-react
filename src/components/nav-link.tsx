import { ComponentProps, ReactNode } from "react";

interface NavLinksProps extends ComponentProps<"a"> {
  children: ReactNode;
}

export function NavLink({ children, ...rest }: NavLinksProps) {
  return (
    <a {...rest} className="font-medium text-sm text-zinc-300">
      {children}
    </a>
  );
}
