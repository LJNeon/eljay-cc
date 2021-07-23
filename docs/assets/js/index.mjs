const avatars = ["ee", "ff", "gg", "hh", "ii", "jj", "kka", "kkb", "ll", "mm", "nn", "oo", "pp", "qq"];

function choose(list) {
  return list[Math.floor(Math.random() * list.length)];
}

document.oncontextmenu = () => false;
document.getElementById("avatar").style.backgroundImage = `url(assets/img/${choose(avatars)}.webp)`;
