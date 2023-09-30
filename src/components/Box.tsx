import type { CSSProperties, FC } from "react";
import { memo } from "react";
import { useDrag } from "react-dnd";

const style: CSSProperties = {
  border: "1px dashed gray",
  backgroundColor: "white",
  padding: "0.5rem 1rem",
  marginRight: "1.5rem",
  marginBottom: "1.5rem",
  cursor: "move",
  float: "left",
};

export interface BoxProps {
  name: string;
  id: number;
  isDropped: boolean;
}

export const Box: FC<BoxProps> = memo(function Box({ name, isDropped, id }) {
  const [, drag] = useDrag(
    () => ({
      type: "ITEM",
      item: { name, id },
    }),
    [name]
  );

  return (
    <div ref={drag} style={{ ...style }} data-testid="box">
      {isDropped ? <s>{name}</s> : name}
    </div>
  );
});
