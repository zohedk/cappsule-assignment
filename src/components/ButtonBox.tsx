export const ButtonBox: React.FC<{
  children: React.ReactNode;
  title: string;
}> = ({ children, title }) => {
  return (
    <div className=" w-[100%] flex gap-[5px]">
      <h3 className="w-[25%] tracking-wide  font-[400]">{title}</h3>
      <div className="w-[75%] flex flex-wrap gap-[20px]">{children}</div>
    </div>
  );
};
