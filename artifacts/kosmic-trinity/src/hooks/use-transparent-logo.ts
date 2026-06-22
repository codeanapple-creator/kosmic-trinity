import { useState, useEffect } from "react";

function removeBackground(img: HTMLImageElement, tolerance = 40): string {
  const canvas = document.createElement("canvas");
  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;
  const ctx = canvas.getContext("2d");
  if (!ctx) return img.src;

  ctx.drawImage(img, 0, 0);
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;

  // Sample the background colour from all four corners and pick the most common
  const samplePoints = [
    [0, 0],
    [canvas.width - 1, 0],
    [0, canvas.height - 1],
    [canvas.width - 1, canvas.height - 1],
  ];
  const samples = samplePoints.map(([x, y]) => {
    const i = (y * canvas.width + x) * 4;
    return { r: data[i], g: data[i + 1], b: data[i + 2] };
  });
  // Average the corner colours
  const bg = {
    r: Math.round(samples.reduce((s, c) => s + c.r, 0) / samples.length),
    g: Math.round(samples.reduce((s, c) => s + c.g, 0) / samples.length),
    b: Math.round(samples.reduce((s, c) => s + c.b, 0) / samples.length),
  };

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const dist = Math.sqrt(
      (r - bg.r) ** 2 + (g - bg.g) ** 2 + (b - bg.b) ** 2
    );
    if (dist < tolerance) {
      data[i + 3] = 0; // make transparent
    }
  }

  ctx.putImageData(imageData, 0, 0);
  return canvas.toDataURL("image/png");
}

export function useTransparentLogo(src: string): string {
  const [processedSrc, setProcessedSrc] = useState<string>(src);

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      try {
        const transparent = removeBackground(img);
        setProcessedSrc(transparent);
      } catch {
        setProcessedSrc(src);
      }
    };
    img.onerror = () => setProcessedSrc(src);
    img.src = src;
  }, [src]);

  return processedSrc;
}
