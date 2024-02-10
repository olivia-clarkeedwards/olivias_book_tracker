type BookDisplayCardProps = {
  title: string;
  author: string;
};

export const BookDisplayCard = ({ title, author }: BookDisplayCardProps) => {
  return (
    <div className="relative ml-12 flex h-36 w-64 flex-shrink-0 items-center gap-4 bg-stone-400 pl-16 text-stone-100">
      <div className="absolute -left-10 top-3.5 h-28 w-20 bg-slate-600" />
      <div>
        <h2>{title}</h2>
        <h3>{author}</h3>
      </div>
    </div>
  );
};
