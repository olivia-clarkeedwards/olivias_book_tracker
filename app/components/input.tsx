type InputProps = {
  name: string;
};

export const Input = ({ name }: InputProps) => {
  return (
    <input
      name={name}
      className="h-8 w-full rounded-2xl bg-stone-200 text-center placeholder:text-[#6C3559]"
      placeholder={name}
    />
  );
};
