import { useState } from 'react';

type Props = {
  defaultValue?: boolean;
};

export function useToggle(props?: Props) {
  const [toggle, setToggle] = useState<boolean>(props?.defaultValue ?? false);

  const handleToggle = () => {
    setToggle(!toggle);
  };

  return { toggle, handleToggle };
}
