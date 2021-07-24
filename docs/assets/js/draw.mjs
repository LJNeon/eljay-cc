import {ctx, scale as s} from "./animate.mjs";

function lower(color, amount) {
  const result = color - amount;

  return result < 0 ? 0 : result;
}

function paint([r, g, b]) {
  ctx.save();
  ctx.lineWidth = 5;
  ctx.lineJoin = "round";
  ctx.strokeStyle = `rgb(${lower(r, 20)},${lower(g, 20)},${lower(b, 20)})`;
  ctx.fillStyle = `rgba(${r},${g},${b},0.7)`;
  ctx.fill();
  ctx.stroke();
  ctx.restore();
}

function quad(x, y, offset, horizontal) {
  if(horizontal)
    ctx.quadraticCurveTo(x, y, x + offset, y);
  else
    ctx.quadraticCurveTo(x, y, x, y + offset);
}

function movingQuad(x, y, offset, progress, horizontal) {
  if(horizontal)
    ctx.quadraticCurveTo(x, y, x + (offset * progress), y);
  else
    ctx.quadraticCurveTo(x, y, x, y + (offset * progress));
}

function circle(x, y, r) {
  ctx.moveTo(x - r, y);
  quad(x - r, y - r, r, true);
  quad(x + r, y - r, r, false);
  quad(x + r, y + r, -r, true);
  quad(x - r, y + r, -r, false);
}

function LBase() {
  ctx.moveTo(s.pad, s.pad + (s.blob / 2));
  quad(s.pad, s.pad, s.blob / 2, true);
  quad(s.pad + s.blob, s.pad, s.blob / 2, false);
  ctx.lineTo(s.pad + s.blob, s.pad + (s.blob * 2) - s.corner);
  quad(s.pad + s.blob, s.pad + (s.blob * 2), s.corner, true);
  ctx.lineTo(s.pad + (s.blob * 1.5), s.pad + (s.blob * 2));
  quad(s.pad + (s.blob * 2), s.pad + (s.blob * 2), s.blob / 2, false);
  quad(s.pad + (s.blob * 2), s.pad + (s.blob * 3), -s.blob / 2, true);
  ctx.lineTo(s.pad + (s.blob / 2), s.pad + (s.blob * 3));
  quad(s.pad, s.pad + (s.blob * 3), -s.blob / 2, false);
  ctx.lineTo(s.pad, s.pad + (s.blob / 2));
}

export function background() {
  ctx.clearRect(0, 0, s.width, s.height);
  ctx.beginPath();
  LBase();
  ctx.moveTo((s.pad * 2) + (s.blob * 2.5), s.pad);
  ctx.lineTo((s.pad * 2) + (s.blob * 4.5), s.pad);
  quad((s.pad * 2) + (s.blob * 5), s.pad, s.blob / 2, false);
  quad((s.pad * 2) + (s.blob * 5), s.pad + s.blob, -s.blob / 2, true);
  ctx.lineTo((s.pad * 2) + (s.blob * 4) + s.corner, s.pad + s.blob);
  quad((s.pad * 2) + (s.blob * 4), s.pad + s.blob, s.corner, false);
  ctx.lineTo((s.pad * 2) + (s.blob * 4), s.pad + (s.blob * 2.5));
  quad((s.pad * 2) + (s.blob * 4), s.pad + (s.blob * 3), -s.blob / 2, true);
  ctx.lineTo((s.pad * 2) + (s.blob * 2.5), s.pad + (s.blob * 3));
  quad((s.pad * 2) + (s.blob * 2), s.pad + (s.blob * 3), -s.blob / 2, false);
  quad((s.pad * 2) + (s.blob * 2), s.pad + (s.blob * 2), s.blob / 2, true);
  ctx.lineTo((s.pad * 2) + (s.blob * 3) - s.corner, s.pad + (s.blob * 2));
  quad((s.pad * 2) + (s.blob * 3), s.pad + (s.blob * 2), -s.corner, false);
  ctx.lineTo((s.pad * 2) + (s.blob * 3), s.pad + s.blob + s.corner);
  quad((s.pad * 2) + (s.blob * 3), s.pad + s.blob, -s.corner, true);
  ctx.lineTo((s.pad * 2) + (s.blob * 2.5), s.pad + s.blob);
  quad((s.pad * 2) + (s.blob * 2), s.pad + s.blob, -s.blob / 2, false);
  quad((s.pad * 2) + (s.blob * 2), s.pad, s.blob / 2, true);
  ctx.closePath();
  ctx.save();
  ctx.fillStyle = "#443E3E";
  ctx.fill();
  ctx.restore();
  ctx.beginPath();
  circle(s.pad + (s.blob / 2), s.pad + (s.blob / 2), s.corner / 2);
  circle(s.pad + (s.blob / 2), s.pad + (s.blob * 1.5), s.corner / 2);
  circle(s.pad + (s.blob / 2), s.pad + (s.blob * 2.5), s.corner / 2);
  circle(s.pad + (s.blob * 1.5), s.pad + (s.blob * 2.5), s.corner / 2);
  circle((s.pad * 2) + (s.blob * 2.5), s.pad + (s.blob / 2), s.corner / 2);
  circle((s.pad * 2) + (s.blob * 3.5), s.pad + (s.blob / 2), s.corner / 2);
  circle((s.pad * 2) + (s.blob * 4.5), s.pad + (s.blob / 2), s.corner / 2);
  circle((s.pad * 2) + (s.blob * 3.5), s.pad + (s.blob * 1.5), s.corner / 2);
  circle((s.pad * 2) + (s.blob * 3.5), s.pad + (s.blob * 2.5), s.corner / 2);
  circle((s.pad * 2) + (s.blob * 2.5), s.pad + (s.blob * 2.5), s.corner / 2);
  ctx.closePath();
  ctx.save();
  ctx.fillStyle = "#221F1F";
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

  ctx.moveTo(s.pad, s.pad + (s.blob / 2));
  quad(s.pad, s.pad, s.blob / 2, true);
  quad(s.pad + s.blob, s.pad, s.blob / 2, false);
  movingQuad(s.pad + s.blob, s.pad + s.blob, -s.blob / 2, 1 - progress, true);
  quad(s.pad + s.blob, s.pad + s.blob, s.blob / 2, false);

  if(progress <= 0.9) {
    const p = 1 - (progress / 0.9);

    movingQuad(s.pad + s.blob, s.pad + (s.blob * 2), -s.blob / 2, p, true);
    movingQuad(s.pad + s.blob, s.pad + (s.blob * 2), s.blob / 2, p, false);
  }else{
    const p = (progress - 0.9) / 0.1;

    ctx.lineTo(s.pad + s.blob, s.pad + (s.blob * 2) - s.corner);
    movingQuad(s.pad + s.blob, s.pad + (s.blob * 2), s.corner, p, true);
  }

  quad(s.pad + s.blob, s.pad + (s.blob * 2), s.blob / 2, true);
  quad(s.pad + (s.blob * 2), s.pad + (s.blob * 2), s.blob / 2, false);
  quad(s.pad + (s.blob * 2), s.pad + (s.blob * 3), -s.blob / 2, true);
  movingQuad(s.pad + s.blob, s.pad + (s.blob * 3), -s.blob / 2, 1 - progress, false);
  quad(s.pad + s.blob, s.pad + (s.blob * 3), -s.blob / 2, true);
  quad(s.pad, s.pad + (s.blob * 3), -s.blob / 2, false);
  movingQuad(s.pad, s.pad + (s.blob * 2), s.blob / 2, 1 - progress, true);
  quad(s.pad, s.pad + (s.blob * 2), -s.blob / 2, false);
  movingQuad(s.pad, s.pad + s.blob, s.blob / 2, 1 - progress, true);
  quad(s.pad, s.pad + s.blob, -s.blob / 2, false);
  ctx.closePath();
  paint(color);
}
export function J(progress, color) {
  ctx.beginPath();
  ctx.moveTo((s.pad * 2) + (s.blob * 3.5), s.pad);
  quad((s.pad * 2) + (s.blob * 4), s.pad, s.blob / 2, false);
  movingQuad((s.pad * 2) + (s.blob * 4), s.pad + s.blob, -s.blob / 2, 1 - progress, true);
  quad((s.pad * 2) + (s.blob * 4), s.pad + s.blob, s.blob / 2, false);
  movingQuad((s.pad * 2) + (s.blob * 4), s.pad + (s.blob * 2), -s.blob / 2, 1 - progress, true);
  quad((s.pad * 2) + (s.blob * 4), s.pad + (s.blob * 2), s.blob / 2, false);
  quad((s.pad * 2) + (s.blob * 4), s.pad + (s.blob * 3), -s.blob / 2, true);
  movingQuad((s.pad * 2) + (s.blob * 3), s.pad + (s.blob * 3), -s.blob / 2, 1 - progress, false);
  quad((s.pad * 2) + (s.blob * 3), s.pad + (s.blob * 3), -s.blob / 2, true);
  quad((s.pad * 2) + (s.blob * 2), s.pad + (s.blob * 3), -s.blob / 2, false);
  quad((s.pad * 2) + (s.blob * 2), s.pad + (s.blob * 2), s.blob / 2, true);

  if(progress <= 0.9) {
    const p = 1 - (progress / 0.9);

    movingQuad((s.pad * 2) + (s.blob * 3), s.pad + (s.blob * 2), s.blob / 2, p, false);
    movingQuad((s.pad * 2) + (s.blob * 3), s.pad + (s.blob * 2), s.blob / 2, p, true);
    quad((s.pad * 2) + (s.blob * 3), s.pad + (s.blob * 2), -s.blob / 2, false);
  }else{
    const p = (progress - 0.9) / 0.1;

    ctx.lineTo((s.pad * 2) + (s.blob * 3) - s.corner, s.pad + (s.blob * 2));
    movingQuad((s.pad * 2) + (s.blob * 3), s.pad + (s.blob * 2), -s.corner, p, false);
    ctx.lineTo((s.pad * 2) + (s.blob * 3), s.pad + (s.blob * 1.5));
  }

  movingQuad((s.pad * 2) + (s.blob * 3), s.pad + s.blob, s.blob / 2, 1 - progress, true);
  quad((s.pad * 2) + (s.blob * 3), s.pad + s.blob, -s.blob / 2, false);
  quad((s.pad * 2) + (s.blob * 3), s.pad, s.blob / 2, true);
  ctx.closePath();
  paint(color);
}
