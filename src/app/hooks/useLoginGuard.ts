import { useContext } from "react";
import { LoginGuardContext } from "../context/LoginGuardContext";

export const useLoginGuard = () => {
  const { toggleShow } = useContext(LoginGuardContext);

  return { toggleShow };
};
