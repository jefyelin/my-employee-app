interface ButtonProps {
  onClick: () => void;
  text: string;
}

export const Button = ({ onClick, text }: ButtonProps) => {
  return (
    <button type="button" onClick={onClick}>
      {text}
    </button>
  );
};
