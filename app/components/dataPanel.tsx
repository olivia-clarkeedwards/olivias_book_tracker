export const DataPanel = () => {
  return (
    <div className=" flex h-40 w-full items-center gap-6 rounded-full bg-gray-600 p-6">
      <div className="flex h-32 w-32 items-center justify-center rounded-full bg-stone-200 bg-opacity-70 text-center text-3xl">
        12
      </div>
      <div className="h-32 w-32 rounded-l bg-stone-200 bg-opacity-70"></div>
      <div className="h-32 flex-1 rounded-r-full bg-stone-200 bg-opacity-70"></div>
    </div>
  );
};
