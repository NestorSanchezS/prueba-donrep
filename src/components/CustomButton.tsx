import React from "react";
import { Button } from "@material-ui/core";
import { ColorGreen } from '../utils/constans';

interface ButtonProps {
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}

const CustomButton= ({
  onClick,
  disabled = false,
  children,
}: ButtonProps): JSX.Element => {
  return (
    <Button onClick={onClick} style={{ color: ColorGreen }} disabled={disabled}>
      {children}
    </Button>
  );
};

export default CustomButton;
