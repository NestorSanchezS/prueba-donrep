import React from "react";
import { Button } from "@material-ui/core";
import { ColorGreen } from '../utils/constans';

interface ButtonProps {
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}

const CustomButton: React.FC<ButtonProps> = ({
  onClick,
  disabled = false,
  children,
}) => {
  return (
    <Button onClick={onClick} style={{ color: ColorGreen }} disabled={disabled}>
      {children}
    </Button>
  );
};

export default CustomButton;
