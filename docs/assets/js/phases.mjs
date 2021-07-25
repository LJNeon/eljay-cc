import {scale as s} from "./animate.mjs";
import * as draw from "./draw.mjs";

const cyan = [25, 210, 230];
const orange = [255, 133, 27];
const red = [255, 65, 54];
let started = false;

export function one(progress) {
  const size = s.hblob * progress;

  draw.blob(s.phb, s.phb, size, cyan);
  draw.blob(s.phb, s.pb + s.hblob, size, cyan);
  draw.blob(s.phb, s.pbb + s.hblob, size, cyan);
  draw.blob(s.pb + s.hblob, s.pbb + s.hblob, size, cyan);
  draw.blob(s.ppbbb + s.hblob, s.phb, size, orange);
  draw.blob(s.ppbbb + s.hblob, s.pb + s.hblob, size, orange);
  draw.blob(s.ppbbb + s.hblob, s.pbb + s.hblob, size, orange);
  draw.blob(s.ppbb + s.hblob, s.pbb + s.hblob, size, orange);
}
export function two(progress) {
  draw.L(progress, cyan);
  draw.J(progress, orange);
}
export function three(force) {
  if(force || !started) {
    started = true;
    draw.background();
    draw.L(1, cyan);
    draw.J(1, orange);
  }
}
export function four(progress) {
  const color = orange.map((c, i) => c + ((red[i] - c) * progress));

  if(progress <= 0.6666) {
    const size = s.hblob * (progress / 0.6666);

    draw.blob(s.ppbb + s.hblob, s.phb, size, color);
    draw.blob(s.ppbbbb + s.hblob, s.phb, size, color);
  }

  if(progress >= 0.3333 && progress !== 1) {
    const size = s.hblob * (1 - ((progress - 0.3333) / 0.6666));

    draw.blob(s.ppbb + s.hblob, s.pbb + s.hblob, size, color);
  }

  draw.L(1, cyan);
  draw.JtoT(progress, color);
}
