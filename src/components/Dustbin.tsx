import type { CSSProperties, FC } from "react";
import { memo } from "react";
import { useDrop } from "react-dnd";

const style: CSSProperties = {
  height: "12rem",
  width: "12rem",
  marginRight: "1.5rem",
  marginBottom: "1.5rem",
  color: "white",
  padding: "1rem",
  textAlign: "center",
  fontSize: "1rem",
  lineHeight: "normal",
  float: "left",
};

export interface DustbinProps {
  onDrop: (item: any) => void;
  value: any;
}

export const Dustbin: FC<DustbinProps> = memo(function Dustbin({
  onDrop,
  value,
}) {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: "ITEM",
    drop: onDrop,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  // const isActive = isOver && canDrop;
  let backgroundColor = "#222";
  // if (isActive) {
  //   backgroundColor = "darkgreen";
  // } else if (canDrop) {
  //   backgroundColor = "darkkhaki";
  // }

  return (
    <div ref={drop} style={{ ...style, backgroundColor }} data-testid="dustbin">
      <p>{value.name}</p>
    </div>
  );
});
