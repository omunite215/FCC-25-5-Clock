import { useEffect, useRef } from "react";

// updates the tab title, puts the original back when unmounted
export function useDocumentTitle(title: string): void {
  const originalTitle = useRef(document.title);

  useEffect(() => {
    document.title = title;
  }, [title]);

  useEffect(() => {
    const original = originalTitle.current;
    return () => {
      document.title = original;
    };
  }, []);
}
