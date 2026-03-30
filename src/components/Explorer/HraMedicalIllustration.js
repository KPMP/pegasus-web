import React, { useEffect, useRef } from "react";

const HraMedicalIllustration = ({
  highlight,
  onCellHover,
  onCellClick,
  ...props
}) => {
  const ref = useRef(null);

  // Sync React props → web component properties
  useEffect(() => {
    if (!ref.current) return;

    if (highlight !== undefined) {
      ref.current.highlight = highlight;
    }
  }, [highlight]);

  // Register events once
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const hoverHandler = (e) => onCellHover?.(e);
    const clickHandler = (e) => onCellClick?.(e);

    el.addEventListener("cell-hover", hoverHandler);
    el.addEventListener("cell-click", clickHandler);

    return () => {
      el.removeEventListener("cell-hover", hoverHandler);
      el.removeEventListener("cell-click", clickHandler);
    };
  }, [onCellHover, onCellClick]);

  return <hra-medical-illustration ref={ref} {...props} />;
};

export default HraMedicalIllustration;