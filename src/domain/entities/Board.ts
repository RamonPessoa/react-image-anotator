import { Image } from "./Image";
import { Rectangle } from "./Rectangle";

export class Board {
  constructor(
    private readonly image: Image,
    private readonly polygons: Rectangle[],
    private currentDraw: Rectangle | null = null
  ) {}

  public getPolygons(): Rectangle[] {
    return this.polygons;
  }

  public startDrawing({
    startX,
    startY,
  }: {
    startX: number;
    startY: number;
  }): Board {
    const polygon = new Rectangle({
      topLeftX: startX,
      topLeftY: startY,
      width: 0,
      height: 0,
    });

    this.currentDraw = polygon;

    return new Board(this.image, this.polygons, polygon);
  }

  public stopDrawing({
    width,
    height,
  }: {
    width: number;
    height: number;
  }): Board | void {
    if (this.currentDraw === null) {
      return;
    }
    this.currentDraw.setWidth(width);
    this.currentDraw.setHeight(height);
    return new Board(this.image, [...this.polygons, this.currentDraw]);
  }

  public getImage(): Image {
    return this.image;
  }

  get isDrawInProgress(): boolean {
    return this.currentDraw !== null;
  }

  get currentDrawing(): Rectangle | null {
    return this.currentDraw;
  }
}
