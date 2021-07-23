import {ctx, scale as s} from "./animate.mjs";

function quad(x, y, offset, horizontal) {
  if(horizontal)
    ctx.quadraticCurveTo(x, y, x + offset, y);
  else
    ctx.quadraticCurveTo(x, y, x, y + offset);
}

function circle(x, y, r) {
  ctx.moveTo(x - r, y);
  quad(x - r, y - r, r, true);
  quad(x + r, y - r, r, false);
  quad(x + r, y + r, -r, true);
  quad(x - r, y + r, -r, false);
}

export function background() {
  ctx.beginPath();
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

export function blob(x, y, radius, [r, g, b]) {
  ctx.beginPath();
  circle(x, y, radius);
  ctx.closePath();
  ctx.save();
  ctx.strokeStyle = `rgb(${r},${g},${b})`;
  ctx.fillStyle = `rgba(${r},${g},${b},0.8)`;
  ctx.fill();
  ctx.restore();
}
