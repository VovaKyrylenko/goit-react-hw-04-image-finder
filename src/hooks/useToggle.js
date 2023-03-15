import { useState } from 'react';

export const useToggle = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(isOpen => !isOpen);

  return { isOpen, toggle };
};
