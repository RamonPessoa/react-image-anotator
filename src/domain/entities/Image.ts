export class Image {
  constructor(private readonly imageBlob: Blob) {
  }

  public getBlob(): Blob {
    return this.imageBlob;
  }

  public getBase64(): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(this.imageBlob);
    });
  }

  public getSizes(): Promise<{ width: number, height: number }> {
    return new Promise((resolve, reject) => {
      const image = new window.Image();
      image.onload = () => resolve({ width: image.width, height: image.height });
      image.onerror = reject;
      image.src = URL.createObjectURL(this.imageBlob);
    });
  }
}