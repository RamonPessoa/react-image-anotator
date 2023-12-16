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
  const [drawStartPosition, setDrawStartPosition] = useState<{
    x: number;
    y: number;
  }>({
    x: 0,
    y: 0,
  });

  const handleMouseMove = (e: React.MouseEvent<SVGElement>) => {
    if (board.isDrawInProgress && board.currentDrawing) {
      const { x, y } = e.currentTarget.getBoundingClientRect();
      const currentX = e.clientX - x;
      const currentY = e.clientY - y;
      const newWidth = currentX - drawStartPosition.x;
      const newHeight = currentY - drawStartPosition.y;
    
      if (newWidth < 0) {
        board.currentDrawing?.setTopLeftX(currentX);
      }

      if (newHeight < 0) {
        board.currentDrawing?.setTopLeftY(currentY);
      }
      
      board.currentDrawing?.setWidth(Math.abs(newWidth));
      board.currentDrawing?.setHeight(Math.abs(newHeight));


      const finalBoard = new Board(
        board.getImage(),
        board.getPolygons(),
        board.currentDrawing
      )
      setBoard(finalBoard);
    }
  };

  function handleClick(e: React.MouseEvent<SVGElement>) {
    const { x, y } = e.currentTarget.getBoundingClientRect();

    if (board.isDrawInProgress) {
      const newBoard = board.stopDrawing();

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
    
    setDrawStartPosition({ x: topLeftX, y: topLeftY });
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
    <svg onClick={handleClick} onMouseMove={handleMouseMove}>
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
