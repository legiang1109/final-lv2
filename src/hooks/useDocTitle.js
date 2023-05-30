import { useEffect } from "react";

const useDocTitle = (title) => {
  useEffect(() => {
    if (title) {
      document.title = `${title} - BEATVN`;
    } else {
      document.title = "BEATVN | The Perfect Audio Store";
    }
  }, [title]);

  return null;
};

export default useDocTitle;
//check
