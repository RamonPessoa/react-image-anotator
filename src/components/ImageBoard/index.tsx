import { Board } from "@domain/entities/Board";
import { Image } from "@domain/entities/Image";
import { useEffect, useState } from "react";

interface ImageBoardProps {
  image: Image;
}

export function ImageBoard({ image: incomingImage }: ImageBoardProps) {
  const [board, setBoard] = useState<Board>(new Board(incomingImage, []));
  const [image, setImage] = useState<string>();
  const [sizes, setSizes] = useState({ width: 0, height: 0 });

  function handleClick(e: React.MouseEvent<SVGElement>) {
    const { x, y } = e.currentTarget.getBoundingClientRect();
    const currentX = e.clientX - x;
    const currentY = e.clientY - y;

    if (board.isDrawInProgress) {
      const topLeftX = board.currentDrawing?.getTopLeftX();
      const topLeftY = board.currentDrawing?.getTopLeftY();
      let width = currentX - topLeftX!;
      let height = currentY - topLeftY!;
      if (width < 0) {
        board.currentDrawing?.setTopLeftX(currentX);
        width = Math.abs(width);
      }
      if (height < 0) {
        board.currentDrawing?.setTopLeftY(currentY);
        height = Math.abs(height);
      }

      const newBoard = board.stopDrawing({
        width,
        height,
      });

      if (newBoard) setBoard(newBoard);
      return;
    }
    const { clientX, clientY } = e;
    const topLeftX = clientX - x;
    const topLeftY = clientY - y;
    const newBoard = board.startDrawing({
      startX: topLeftX,
      startY: topLeftY,
    });

    setBoard(newBoard);
  }

  useEffect(() => {
    (async () => {
      const img = await board.getImage().getBase64();
      const sizes = await board.getImage().getSizes();
      setImage(img);
      setSizes(sizes);
    })();
  }, [board]);

  return (
    <svg onClick={handleClick}>
      {image ? (
        <image href={image} width={sizes.width} height={sizes.height} />
      ) : null}
      {board.getPolygons().map((polygon) => (
        <rect
          key={polygon.id}
          x={polygon.getTopLeftX()}
          y={polygon.getTopLeftY()}
          width={polygon.getWidth()}
          height={polygon.getHeight()}
          fill="red"
        />
      ))}
    </svg>
  );
}
