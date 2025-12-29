import React from "react";

type TextProps = {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
};
export function Title({ children, className }: TextProps) {
  return <h1 className={`text-[48px] font-[700] font-[inter] ${className}`}>{children}</h1>;
}

export function SubTitle({ children, className, onClick }: TextProps) {
  return (
    <h1 className={`text-[32px] font-[700] font-[inter] ${className}`} onClick={onClick}>
      {children}
    </h1>
  );
}

export function LargeText({ children, className, onClick }: TextProps) {
  return (
    <h1 className={`text-[20px] font-[400] font-[inter] ${className}`} onClick={onClick}>
      {children}
    </h1>
  );
}
export function LargeTextBold({ children, className }: TextProps) {
  return <h1 className={`text-[20px] font-[700] font-[inter] ${className}`}>{children}</h1>;
}

export function Body({ children, className }: TextProps) {
  return <h1 className={`text-[16px] font-[400] font-[inter] ${className}`}>{children}</h1>;
}
export function BodyBold({ children, className }: TextProps) {
  return <h1 className={`text-[16px] font-[700] font-[inter] ${className}`}>{children}</h1>;
}
export function Tiny({ children, className }: TextProps) {
  return <h1 className={`text-[12px] font-[400] font-[inter] ${className}`}>{children}</h1>;
}
