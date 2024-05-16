interface ButtonProp {
  title: string;
  onClick?: () => void;
  isAvailable?: boolean;
  isSelected?: boolean;
}

export const Button: React.FC<ButtonProp> = ({
  title,
  onClick,
  isAvailable,
  isSelected,
}) => {
  return (
    <button
      onClick={onClick}
      className={`hide-scrollbar overflow-scroll max-w-[180px] whitespace-pre-line min-h-[30px] flex  items-center box-content 
      ${isAvailable && "available"} 
      ${!isAvailable && "notAvailable"}
      ${isAvailable && isSelected && "availableSelected"}
      ${!isAvailable && isSelected && "notAvailableSelected"}
       
      `}
      style={{
        justifyContent: title.length < 20 ? "center" : "start",
        paddingRight:
          title.length > 17 ? "10px" : title.length > 15 ? "7px" : "",
        paddingLeft:
          title.length > 17 ? "10px" : title.length > 15 ? "7px" : "",
        width: `${
          title.length >= 15
            ? title.length * 4 + +130
            : title.length >= 10
            ? title.length * 4 + 90
            : title.length * 4 + 60
        }px`,
      }}
      disabled={!isAvailable && isSelected ? true : false}
    >
      {title}
    </button>
  );
};
