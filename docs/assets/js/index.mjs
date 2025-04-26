const data = await fetch("https://eljay.cc/assets/json/pics.json");
const avatars = await data.json();

function choose(list) {
  return list[Math.floor(Math.random() * list.length)];
}

document.oncontextmenu = () => false;
document
  .getElementById("avatar")
  .style
  .backgroundImage = `url(assets/img/${choose(avatars)}.webp)`;
