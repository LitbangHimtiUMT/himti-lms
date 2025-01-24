import { ReactNode } from "react";

interface IPoppinsProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: ReactNode;
}

export const Poppins: React.FC<IPoppinsProps> = ({ children, ...rest }) => {
  return (
    <p className={`font-poppins ${rest.className}`} {...rest}>
      {children}
    </p>
  );
};