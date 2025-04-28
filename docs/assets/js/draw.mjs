/* eslint-disable id-length, new-cap -- TODO */
import {ctx, scale as s} from "./animate.mjs";

function lower(color, amount) {
  const result = color - amount;

  return result < 0 ? 0 : result;
}

function paint([r, g, b]) {
  ctx.save();
  ctx.lineWidth = 5;
  ctx.lineJoin = "round";
  ctx.lineCap = "round";
  ctx.strokeStyle = `rgb(${lower(r, 20)},${lower(g, 20)},${lower(b, 20)})`;
  ctx.fillStyle = `rgba(${r},${g},${b},0.7)`;
  ctx.fill();
  ctx.stroke();
  ctx.restore();
}

function quadH(x, y, offset) {
  ctx.quadraticCurveTo(x, y, x + offset, y);
}

function quadV(x, y, offset) {
  ctx.quadraticCurveTo(x, y, x, y + offset);
}

function movingQuadH(x, y, offset, progress) {
  ctx.quadraticCurveTo(x, y, x + (offset * progress), y);
}

function movingQuadV(x, y, offset, progress) {
  ctx.quadraticCurveTo(x, y, x, y + (offset * progress));
}

function circle(x, y, r) {
  ctx.moveTo(x - r, y);
  quadH(x - r, y - r, r);
  quadV(x + r, y - r, r);
  quadH(x + r, y + r, -r);
  quadV(x - r, y + r, -r);
}

function LBase() {
  ctx.moveTo(s.pad, s.phb);
  quadH(s.pad, s.pad, s.hblob);
  quadV(s.pb, s.pad, s.hblob);
  ctx.lineTo(s.pb, s.pbb - s.corner);
  quadH(s.pb, s.pbb, s.corner);
  ctx.lineTo(s.pb + s.hblob, s.pbb);
  quadV(s.pbb, s.pbb, s.hblob);
  quadH(s.pbb, s.pbbb, -s.hblob);
  ctx.lineTo(s.phb, s.pbbb);
  quadV(s.pad, s.pbbb, -s.hblob);
  ctx.lineTo(s.pad, s.phb);
}

export function background() {
  const img = new Image();

  img.src = "assets/img/background-secondary.webp";
  ctx.clearRect(0, 0, s.width, s.height);
  /*ctx.beginPath();
  LBase();
  ctx.moveTo(s.ppbb + s.hblob, s.pad);
  ctx.lineTo(s.ppbbbb + s.hblob, s.pad);
  quadV(s.dpad + s.qiblob, s.pad, s.hblob);
  quadH(s.dpad + s.qiblob, s.pb, -s.hblob);
  ctx.lineTo(s.ppbbbb + s.corner, s.pb);
  quadV(s.ppbbbb, s.pb, s.corner);
  ctx.lineTo(s.ppbbbb, s.pbb + s.hblob);
  quadH(s.ppbbbb, s.pbbb, -s.hblob);
  ctx.lineTo(s.ppbb + s.hblob, s.pbbb);
  quadV(s.ppbb, s.pbbb, -s.hblob);
  quadH(s.ppbb, s.pbb, s.hblob);
  ctx.lineTo(s.ppbbb - s.corner, s.pbb);
  quadV(s.ppbbb, s.pbb, -s.corner);
  ctx.lineTo(s.ppbbb, s.pb + s.corner);
  quadH(s.ppbbb, s.pb, -s.corner);
  ctx.lineTo(s.ppbb + s.hblob, s.pb);
  quadV(s.ppbb, s.pb, -s.hblob);
  quadH(s.ppbb, s.pad, s.hblob);
  ctx.closePath();
  ctx.save();
  ctx.fillStyle = ctx.createPattern(img, "repeat");
  ctx.fill();
  ctx.restore();*/
  ctx.beginPath();
  circle(s.phb, s.phb, s.hcorner);
  circle(s.phb, s.pb + s.hblob, s.hcorner);
  circle(s.phb, s.pbb + s.hblob, s.hcorner);
  circle(s.pb + s.hblob, s.pbb + s.hblob, s.hcorner);
  circle(s.ppbb + s.hblob, s.phb, s.hcorner);
  circle(s.ppbbb + s.hblob, s.phb, s.hcorner);
  circle(s.ppbbbb + s.hblob, s.phb, s.hcorner);
  circle(s.ppbbb + s.hblob, s.pb + s.hblob, s.hcorner);
  circle(s.ppbbb + s.hblob, s.pbb + s.hblob, s.hcorner);
  circle(s.ppbb + s.hblob, s.pbb + s.hblob, s.hcorner);
  ctx.closePath();
  ctx.save();
  //ctx.globalCompositeOperation = "destination-out";
  ctx.fillStyle = ctx.createPattern(img, "repeat");
  ctx.fill();
  ctx.restore();
}
export function blob(x, y, radius, color) {
  ctx.beginPath();
  circle(x, y, radius);
  ctx.closePath();
  paint(color);
}
export function L(progress, color) {
  ctx.beginPath();

  if(progress === 1) {
    LBase();
    ctx.closePath();

    return paint(color);
  }

  ctx.moveTo(s.pad, s.phb);
  quadH(s.pad, s.pad, s.hblob);
  quadV(s.pb, s.pad, s.hblob);
  movingQuadH(s.pb, s.pb, -s.hblob, 1 - progress);
  quadV(s.pb, s.pb, s.hblob);

  if(progress <= 0.9) {
    const p = 1 - (progress / 0.9);

    movingQuadH(s.pb, s.pbb, -s.hblob, p);
    movingQuadV(s.pb, s.pbb, s.hblob, p);
  }else{
    const p = (progress - 0.9) / 0.1;

    ctx.lineTo(s.pb, s.pbb - s.corner);
    movingQuadH(s.pb, s.pbb, s.corner, p);
  }

  quadH(s.pb, s.pbb, s.hblob);
  quadV(s.pbb, s.pbb, s.hblob);
  quadH(s.pbb, s.pbbb, -s.hblob);
  movingQuadV(s.pb, s.pbbb, -s.hblob, 1 - progress);
  quadH(s.pb, s.pbbb, -s.hblob);
  quadV(s.pad, s.pbbb, -s.hblob);
  movingQuadH(s.pad, s.pbb, s.hblob, 1 - progress);
  quadV(s.pad, s.pbb, -s.hblob);
  movingQuadH(s.pad, s.pb, s.hblob, 1 - progress);
  quadV(s.pad, s.pb, -s.hblob);
  ctx.closePath();
  paint(color);
}
export function J(progress, color) {
  ctx.beginPath();
  ctx.moveTo(s.ppbbb + s.hblob, s.pad);
  quadV(s.ppbbbb, s.pad, s.hblob);
  movingQuadH(s.ppbbbb, s.pb, -s.hblob, 1 - progress);
  quadV(s.ppbbbb, s.pb, s.hblob);
  movingQuadH(s.ppbbbb, s.pbb, -s.hblob, 1 - progress);
  quadV(s.ppbbbb, s.pbb, s.hblob);
  quadH(s.ppbbbb, s.pbbb, -s.hblob);
  movingQuadV(s.ppbbb, s.pbbb, -s.hblob, 1 - progress);
  quadH(s.ppbbb, s.pbbb, -s.hblob);
  quadV(s.ppbb, s.pbbb, -s.hblob);
  quadH(s.ppbb, s.pbb, s.hblob);

  if(progress <= 0.9) {
    const p = 1 - (progress / 0.9);

    movingQuadV(s.ppbbb, s.pbb, s.hblob, p);
    movingQuadH(s.ppbbb, s.pbb, s.hblob, p);
    quadV(s.ppbbb, s.pbb, -s.hblob);
  }else{
    const p = (progress - 0.9) / 0.1;

    ctx.lineTo(s.ppbbb - s.corner, s.pbb);
    movingQuadV(s.ppbbb, s.pbb, -s.corner, p);
    ctx.lineTo(s.ppbbb, s.pb + s.hblob);
  }

  movingQuadH(s.ppbbb, s.pb, s.hblob, 1 - progress);
  quadV(s.ppbbb, s.pb, -s.hblob);
  quadH(s.ppbbb, s.pad, s.hblob);
  ctx.closePath();
  paint(color);
}
// eslint-disable-next-line max-lines-per-function -- Size is necessary
export function JtoT(progress, color) {
  ctx.beginPath();

  if(progress <= 0.3333) {
    const p = progress / 0.3333;

    ctx.moveTo(s.ppbbb + s.hblob, s.pad);
    quadV(s.ppbbbb, s.pad, s.hblob);
    ctx.lineTo(s.ppbbbb, s.pbb + s.hblob);
    quadH(s.ppbbbb, s.pbbb, -s.hblob);
    movingQuadV(s.ppbbb, s.pbbb, -s.hblob, p);
    quadH(s.ppbbb, s.pbbb, -s.hblob);
    quadV(s.ppbb, s.pbbb, -s.hblob);
    quadH(s.ppbb, s.pbb, s.hblob);

    if(p <= 0.1) {
      const q = 1 - (p / 0.1);

      ctx.lineTo(s.ppbbb - s.corner, s.pbb);
      movingQuadV(s.ppbbb, s.pbb, -s.corner, q);
    }else{
      const q = (p - 0.1) / 0.9;

      movingQuadV(s.ppbbb, s.pbb, s.hblob, q);
    }

    ctx.lineTo(s.ppbbb, s.phb);
    quadH(s.ppbbb, s.pad, s.hblob);
  }else if(progress <= 0.6666) {
    ctx.moveTo(s.ppbbb + s.hblob, s.pad);
    quadV(s.ppbbbb, s.pad, s.hblob);
    ctx.lineTo(s.ppbbbb, s.pbb + s.hblob);
    quadH(s.ppbbbb, s.pbbb, -s.hblob);
    quadV(s.ppbbb, s.pbbb, -s.hblob);
    ctx.lineTo(s.ppbbb, s.phb);
    quadH(s.ppbbb, s.pad, s.hblob);
  }else{
    const p = 1 - ((progress - 0.6666) / 0.3334);
    const q = p < 0.1 ? 1 - (p / 0.1) : (p - 0.1) / 0.9;

    ctx.moveTo(s.ppbb + s.hblob, s.pad);
    movingQuadV(s.ppbbb, s.pad, s.hblob, p);
    quadH(s.ppbbb, s.pad, s.hblob);
    movingQuadV(s.ppbbbb, s.pad, s.hblob, p);
    quadH(s.ppbbbb, s.pad, s.hblob);
    quadV(s.dpad + s.qiblob, s.pad, s.hblob);
    quadH(s.dpad + s.qiblob, s.pb, -s.hblob);

    if(p >= 0.1) {
      movingQuadV(s.ppbbbb, s.pb, -s.hblob, q);
    }else{
      ctx.lineTo(s.ppbbbb + s.corner, s.pb);
      movingQuadV(s.ppbbbb, s.pb, s.corner, q);
    }

    ctx.lineTo(s.ppbbbb, s.pbb + s.hblob);
    quadH(s.ppbbbb, s.pbbb, -s.hblob);
    quadV(s.ppbbb, s.pbbb, -s.hblob);
    ctx.lineTo(s.ppbbb, s.pb + s.corner);

    if(p >= 0.1) {
      ctx.lineTo(s.ppbbb, s.phb + (s.hblob * (1 - q)));
      quadH(s.ppbbb, s.pb, -s.hblob);
    }else{
      movingQuadH(s.ppbbb, s.pb, -s.corner, q);
      ctx.lineTo(s.ppbb + s.hblob, s.pb);
    }

    quadV(s.ppbb, s.pb, -s.hblob);
    quadH(s.ppbb, s.pad, s.hblob);
  }

  ctx.closePath();
  paint(color);
}
