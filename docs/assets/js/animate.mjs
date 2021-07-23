import * as draw from "./draw.mjs";

const canvas = document.getElementById("animation");

export const ctx = canvas.getContext("2d");
export const scale = {};

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
    scale.pad = scale.blob / 4;
    scale.corner = scale.blob / 6;
    canvas.width = (scale.blob * 5) + (scale.blob * 0.75);
    canvas.height = (scale.blob * 3) + (scale.blob / 2);
    // TODO: only if animation is ended, re-render final frame
    draw.background();
  }
}

resize();
window.onresize = resize;
