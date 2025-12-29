type DefaultLabelProps = {
  children: React.ReactNode;
  classNameLabel?: string;
  labelFor?: string;
};
export function DefaultLabel({ children, classNameLabel, labelFor }: DefaultLabelProps) {
  return (
    <label htmlFor={labelFor} className={`font-[400] font-[inter] text-[12px] ${classNameLabel}`}>
      {children}
    </label>
  );
}
type TextFieldsProps = {
  children?: React.ReactNode;
  className?: string;
  classNameLabel?: string | undefined;
  labelFor?: string | undefined;
  name: string;
  id?: string;
  type: "text" | "email" | "password";
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export function TextField({
  children,
  name,
  type,
  className,
  classNameLabel,
  placeholder,
  id,
  value,
  onChange,
}: TextFieldsProps) {
  return (
    <div>
      <DefaultLabel classNameLabel={classNameLabel} labelFor={id || name}>
        {children}
      </DefaultLabel>
      <input
        placeholder={placeholder}
        id={id || name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        className={`w-[163px] h-[37px] border-[3px] border-black pl-[5px] block rounded-[8px] text-[16px] font-[inter] font-[700] placeholder:text-[#C1C1C1]  ${className}`}
      />
    </div>
  );
}
