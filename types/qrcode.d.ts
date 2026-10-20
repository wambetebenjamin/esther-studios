declare module "qrcode" {
  export interface QRCodeToDataURLOptions {
    width?: number;
    margin?: number;
    errorCorrectionLevel?: "low" | "medium" | "quartile" | "high" | "L" | "M" | "Q" | "H";
    type?: "image/png" | "image/jpeg" | "image/webp";
    color?: { dark?: string; light?: string };
  }

  export function toDataURL(
    text: string,
    options?: QRCodeToDataURLOptions,
  ): Promise<string>;

  export function toDataURL(
    canvas: HTMLCanvasElement,
    text: string,
    options?: QRCodeToDataURLOptions,
  ): Promise<string>;

  export function toString(
    text: string,
    options?: { type?: "terminal" | "utf8" | "svg" },
  ): Promise<string>;
}
