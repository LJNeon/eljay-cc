import * as draw from "./draw.mjs";
import * as phases from "./phases.mjs";

const canvas = document.getElementById("animation");
const durations = [1000, 2000, 1000, 3000, 3000];
const frame = 1000 / 60;
let phase = 0;
let duration = 0;
let last = 0;

export const ctx = canvas.getContext("2d");
export const scale = {};

function calculateScale() {
  // Base values
  scale.pad = scale.blob / 4;
  scale.corner = scale.blob / 6;
  canvas.width = scale.width = (scale.blob * 5) + (scale.blob * 0.75);
  canvas.height = scale.height = (scale.blob * 3) + (scale.blob / 2);
  // Utility values
  scale.hblob = scale.blob / 2;
  scale.dblob = scale.blob * 2;
  scale.tblob = scale.blob * 3;
  scale.qublob = scale.blob * 4;
  scale.qiblob = scale.blob * 5;
  scale.dpad = scale.pad * 2;
  scale.hcorner = scale.corner / 2;
  // Additive values
  scale.phb = scale.pad + scale.hblob;
  scale.pb = scale.pad + scale.blob;
  scale.pbb = scale.pad + scale.dblob;
  scale.pbbb = scale.pad + scale.tblob;
  scale.ppbb = scale.dpad + scale.dblob;
  scale.ppbbb = scale.dpad + scale.tblob;
  scale.ppbbbb = scale.dpad + scale.qublob;
}

function resize() {
  let blob;

  if(window.innerWidth >= 2290)
    blob = 120;
  else if(window.innerWidth >= 1821)
    blob = 108;
  else if(window.innerWidth >= 1352)
    blob = 96;
  else if(window.innerWidth >= 883)
    blob = 84;
  else if(window.innerWidth >= 614)
    blob = 72;
  else if(window.innerWidth >= 435)
    blob = 60;
  else
    blob = 48;

  if(blob !== scale.blob) {
    scale.blob = blob;
    calculateScale();

    if(phase >= durations.length)
      drawFrame(1);
  }
}

resize();
window.onresize = resize;

function drawFrame(progress) {
  if(phase !== 3)
    draw.background();

  switch(phase) {
    case 0:
      return;
    case 1:
      return phases.one(progress);
    case 2:
      return phases.two(progress);
    case 3:
      return phases.three();
    case 4:
      return phases.four(progress);
    default:
      return phases.four(1);
  }
}

function loop() {
  const now = Date.now();
  const since = now - last;

  if(since >= 1e3) {
    last = now;

    return setTimeout(loop, frame);
  }

  duration += since;
  last = now;

  if(duration >= durations[phase]) {
    duration -= durations[phase];

    if(++phase >= durations.length)
      return drawFrame(1);
  }

  drawFrame(duration / durations[phase]);
  setTimeout(loop, frame);
}

loop();
