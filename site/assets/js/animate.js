/* eslint-env browser */
(() => {
  const canvas = document.getElementById("animation");
  const ctx = canvas.getContext("2d");
  let cube;
  let padding;
  let corner;

  function resize() {
    const oldCube = cube;

    if(window.innerWidth >= 2290)
      cube = 120;
    else if(window.innerWidth >= 1821)
      cube = 108;
    else if(window.innerWidth >= 1352)
      cube = 96;
    else if(window.innerWidth >= 883)
      cube = 84;
    else if(window.innerWidth >= 614)
      cube = 72;
    else if(window.innerWidth >= 435)
      cube = 60;
    else
      cube = 48;

    padding = cube / 4;
    corner = cube / 6;

    if(cube !== oldCube) {
      canvas.width = (cube * 5) + (cube * 0.75);
      canvas.height = (cube * 3) + (cube / 2);
      // TODO: only if animation is ended, re-render final frame
      drawBG();
    }
  }

  resize();
  window.onresize = resize;

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

  function drawBG() {
    ctx.beginPath();
    ctx.moveTo(padding, padding + (cube / 2));
    quad(padding, padding, cube / 2, true);
    quad(padding + cube, padding, cube / 2, false);
    ctx.lineTo(padding + cube, padding + (cube * 2) - corner);
    quad(padding + cube, padding + (cube * 2), corner, true);
    ctx.lineTo(padding + (cube * 1.5), padding + (cube * 2));
    quad(padding + (cube * 2), padding + (cube * 2), cube / 2, false);
    quad(padding + (cube * 2), padding + (cube * 3), -cube / 2, true);
    ctx.lineTo(padding + (cube / 2), padding + (cube * 3));
    quad(padding, padding + (cube * 3), -cube / 2, false);
    ctx.lineTo(padding, padding + (cube / 2));
    ctx.moveTo((padding * 2) + (cube * 2.5), padding);
    ctx.lineTo((padding * 2) + (cube * 4.5), padding);
    quad((padding * 2) + (cube * 5), padding, cube / 2, false);
    quad((padding * 2) + (cube * 5), padding + cube, -cube / 2, true);
    ctx.lineTo((padding * 2) + (cube * 4) + corner, padding + cube);
    quad((padding * 2) + (cube * 4), padding + cube, corner, false);
    ctx.lineTo((padding * 2) + (cube * 4), padding + (cube * 2.5));
    quad((padding * 2) + (cube * 4), padding + (cube * 3), -cube / 2, true);
    ctx.lineTo((padding * 2) + (cube * 2.5), padding + (cube * 3));
    quad((padding * 2) + (cube * 2), padding + (cube * 3), -cube / 2, false);
    quad((padding * 2) + (cube * 2), padding + (cube * 2), cube / 2, true);
    ctx.lineTo((padding * 2) + (cube * 3) - corner, padding + (cube * 2));
    quad((padding * 2) + (cube * 3), padding + (cube * 2), -corner, false);
    ctx.lineTo((padding * 2) + (cube * 3), padding + cube + corner);
    quad((padding * 2) + (cube * 3), padding + cube, -corner, true);
    ctx.lineTo((padding * 2) + (cube * 2.5), padding + cube);
    quad((padding * 2) + (cube * 2), padding + cube, -cube / 2, false);
    quad((padding * 2) + (cube * 2), padding, cube / 2, true);
    ctx.closePath();
    ctx.save();
    ctx.fillStyle = "#443E3E";
    ctx.fill();
    ctx.restore();
    ctx.beginPath();
    circle(padding + (cube / 2), padding + (cube / 2), corner / 2);
    circle(padding + (cube / 2), padding + (cube * 1.5), corner / 2);
    circle(padding + (cube / 2), padding + (cube * 2.5), corner / 2);
    circle(padding + (cube * 1.5), padding + (cube * 2.5), corner / 2);
    circle((padding * 2) + (cube * 2.5), padding + (cube / 2), corner / 2);
    circle((padding * 2) + (cube * 3.5), padding + (cube / 2), corner / 2);
    circle((padding * 2) + (cube * 4.5), padding + (cube / 2), corner / 2);
    circle((padding * 2) + (cube * 3.5), padding + (cube * 1.5), corner / 2);
    circle((padding * 2) + (cube * 3.5), padding + (cube * 2.5), corner / 2);
    circle((padding * 2) + (cube * 2.5), padding + (cube * 2.5), corner / 2);
    ctx.closePath();
    ctx.save();
    ctx.fillStyle = "#221F1F";
    ctx.fill();
    ctx.restore();
  }
})();
