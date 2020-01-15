import { IAnnotation } from "./Annotation";

export const shapeStyle = {
  padding: 5,
  margin: 10,
  fontSize: 12,
  fontColor: "#212529",
  fontBackground: "#f8f9fa",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', Helvetica, Arial, sans-serif",
  shapeBackground: "hsla(210, 16%, 93%, 0.2)",
  shapeStrokeStyle: " #00008b",
  shapeShadowStyle: "hsla(210, 9%, 31%, 0.35)"
};


export interface IShapeBase {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface IShapeAdjustBase {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
}

export interface IShapeData extends IShapeBase {
  type: string;
  strokeColor:string;
}

export interface IRectShapeData extends IShapeData {
  type: "RECT";
}

export interface IShape {
  onDragStart: () => void;
  onDrag: () => void;
  checkBoundary: (positionX: number, positionY: number) => boolean;
  paint: (
    canvas2D: CanvasRenderingContext2D,
    calculateTruePosition: (shapeData: IShapeBase) => IShapeBase,
    selected: boolean
  ) => IShapeBase;
  getAnnotationData: () => IAnnotation;
  adjustMark: (adjustBase: IShapeAdjustBase) => void;
  setComment: (comment: string) => void;
  equal: (data: IAnnotation) => boolean;
}

export class RectShape implements IShape {
  private annotationData: IAnnotation<IShapeData>;

  private onChangeCallBack: () => void;

  private dragStartOffset: { offsetX: number; offsetY: number };

  constructor(data: IAnnotation<IShapeData>, onChange: () => void) {
    this.annotationData = data;
    console.log("this annotation adata for RecatPicture", this.annotationData)
    this.onChangeCallBack = onChange;
  }

  public onDragStart = () => {
    const { x, y } = this.annotationData.mark;
    this.dragStartOffset = {
      offsetX:  x,
      offsetY:  y
    };
  };

  public onDrag = () => {
    this.annotationData.mark.x = this.dragStartOffset.offsetX;
    this.annotationData.mark.y = this.dragStartOffset.offsetY;
    this.onChangeCallBack();
  };

  public checkBoundary = (positionX: number, positionY: number) => {
    const {
      mark: { x, y, width, height }
    } = this.annotationData;

    if (
      ((positionX > x && positionX < x + width) ||
        (positionX < x && positionX > x + width)) &&
      ((positionY > y && positionY < y + height) ||
        (positionY < y && positionY > y + height))
    ) {
      return true;
    }
    return false;
  };

  public paint = (
    canvas2D: CanvasRenderingContext2D,
    calculateTruePosition: (shapeData: IShapeBase) => IShapeBase,
    selected: boolean
  ) => {
    const { x, y, width, height} = calculateTruePosition(
      this.annotationData.mark
    );
    console.log("this.annotationData.mark  ...........",this.annotationData.mark.strokeColor)
    canvas2D.save();
    canvas2D.shadowBlur = 10;
    canvas2D.shadowColor = shapeStyle.shapeShadowStyle;
    canvas2D.strokeStyle =this.annotationData.mark.strokeColor;
    canvas2D.lineWidth = 2;
    canvas2D.strokeRect(x, y, width, height);
    canvas2D.restore();
    if (selected) {
      canvas2D.fillStyle = shapeStyle.shapeBackground;
      canvas2D.fillRect(x, y, width, height);
    } else {
      const { comment } = this.annotationData;
      if (comment) {
        canvas2D.font = `${shapeStyle.fontSize}px ${shapeStyle.fontFamily}`;
        const metrics = canvas2D.measureText(comment);
        canvas2D.save();
        canvas2D.fillStyle = shapeStyle.fontBackground;
        canvas2D.fillRect(
          x,
          y,
          metrics.width + shapeStyle.padding * 2,
          shapeStyle.fontSize + shapeStyle.padding * 2
        );
        canvas2D.textBaseline = "top";
        canvas2D.fillStyle = shapeStyle.fontColor;
        canvas2D.fillText(
          comment,
          x + shapeStyle.padding,
          y + shapeStyle.padding
        );
      }
    }
    canvas2D.restore();

    return { x, y, width, height };
  };

  public adjustMark = ({
    x = this.annotationData.mark.x,
    y = this.annotationData.mark.y,
    width = this.annotationData.mark.width,
    height = this.annotationData.mark.height
  }: {
    x?: number;
    y?: number;
    width?: number;
    height?: number;
  }) => {
    this.annotationData.mark.x = x;
    this.annotationData.mark.y = y;
    this.annotationData.mark.width = width;
    this.annotationData.mark.height = height;
    this.onChangeCallBack();
  };

  public getAnnotationData = () => {
    return this.annotationData;
  };

  public setComment = (comment: string) => {
    this.annotationData.comment = comment;
  };

  public equal = (data: IAnnotation) => {
    return (
      data.id === this.annotationData.id &&
      data.comment === this.annotationData.comment &&
      data.mark.x === this.annotationData.mark.x &&
      data.mark.y === this.annotationData.mark.y &&
      data.mark.width === this.annotationData.mark.width &&
      data.mark.height === this.annotationData.mark.height
    );
  };
}
