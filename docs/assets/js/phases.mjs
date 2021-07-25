import {scale as s} from "./animate.mjs";
import * as draw from "./draw.mjs";

const cyan = [25, 210, 230];
const orange = [255, 133, 27];
const red = [255, 65, 54];
let started = false;

export function one(progress) {
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
export function two(progress) {
  draw.L(progress, cyan);
  draw.J(progress, orange);
}
export function three() {
  if(!started) {
    started = true;
    draw.background();
    draw.L(1, cyan);
    draw.J(1, orange);
  }
}
export function four(progress) {
  const color = orange.map((c, i) => c + ((red[i] - c) * progress));

  if(progress <= 0.6666) {
    const size = s.blob / 2 * (progress / 0.6666);

    draw.blob((s.pad * 2) + (s.blob * 2.5), s.pad + (s.blob / 2), size, color);
    draw.blob((s.pad * 2) + (s.blob * 4.5), s.pad + (s.blob / 2), size, color);
  }

  if(progress >= 0.3333 && progress !== 1) {
    const size = s.blob / 2 * (1 - ((progress - 0.3333) / 0.6666));

    draw.blob((s.pad * 2) + (s.blob * 2.5), s.pad + (s.blob * 2.5), size, color);
  }

  draw.L(1, cyan);
  draw.JtoT(progress, color);
}
