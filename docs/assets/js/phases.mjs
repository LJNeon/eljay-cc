import {scale as s} from "./animate.mjs";
import * as draw from "./draw.mjs";

const cyan = [25, 210, 230];
const orange = [255, 133, 27];
const red = [255, 65, 54];

export function zero(progress) {
  const size = s.blob / 2 * progress;

  draw.blob(s.pad + (s.blob / 2), s.pad + (s.blob / 2), size, cyan);
  draw.blob(s.pad + (s.blob / 2), s.pad + (s.blob * 1.5), size, cyan);
  draw.blob(s.pad + (s.blob / 2), s.pad + (s.blob * 2.5), size, cyan);
  draw.blob(s.pad + (s.blob * 1.5), s.pad + (s.blob * 2.5), size, cyan);
  draw.blob((s.pad * 2) + (s.blob * 3.5), s.pad + (s.blob / 2), size, orange);
  draw.blob((s.pad * 2) + (s.blob * 3.5), s.pad + (s.blob * 1.5), size, orange);
  draw.blob((s.pad * 2) + (s.blob * 3.5), s.pad + (s.blob * 2.5), size, orange);
  draw.blob((s.pad * 2) + (s.blob * 2.5), s.pad + (s.blob * 2.5), size, orange);
}
export function one(progress) {
  draw.L(progress, cyan);
  draw.J(progress, orange);
}
export function two() {}
export function three() {}
export function four() {}
export function five() {}
