import { v4 as uuid } from "uuid";

type RectangleProps = {
  id?: string;
  topLeftX?: number;
  topLeftY?: number;
  width?: number;
  height?: number;
};

export class Rectangle {
  readonly id: string;
  private topLeftX: number;
  private topLeftY: number;
  private width: number;
  private height: number;
  constructor(props: RectangleProps) {
    this.id = props.id || uuid();
    this.topLeftX = props.topLeftX!;
    this.topLeftY = props.topLeftY!;
    this.width = props.width!;
    this.height = props.height!;
  }

  getTopLeftX(): number {
    return this.topLeftX;
  }

  getTopLeftY(): number {
    return this.topLeftY;
  }

  setTopLeftX(x: number) {
    this.topLeftX = x;
  }

  setTopLeftY(y: number): void {
    this.topLeftY = y;
  }

  getWidth(): number {
    return this.width;
  }

  getHeight(): number {
    return this.height;
  }

  setWidth(width: number): void {
    this.width = width;
  }

  setHeight(height: number): void {
    this.height = height;
  }
}
