import { useState } from "react";

export const useToggleState = (initial: boolean) => {
  const [state, setState] = useState(initial);

  const toggle = () => setState((o) => !o);

  return [state, toggle] as const;
};
