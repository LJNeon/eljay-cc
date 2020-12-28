/* eslint-env browser */
(() => {
  const avatars = ["ee", "ff", "gg", "hh", "ii", "jj", "kka", "kkb", "ll", "mm", "nn"];
  const messages = [
    {text: "More failed New Year's resolutions!", icon: "glass-cheers"},
    [{text: "Football is boring!", icon: "futbol"}, {text: "Leaping forward through time!", icon: "clock"}],
    {text: "Arizona doesn't have Daylight Savings!", icon: "history"},
    {text: "Hope your Easter is a happy one!", icon: "egg"},
    {text: "May the 4th be with you!", icon: "jedi"},
    {text: "Summer is the worst season!", icon: "thumbs-down"},
    {text: "Give me liberty or give me death!", icon: "flag-usa"},
    {text: "An irrelevant month!", icon: "dumpster-fire"},
    {text: "Workers' rights are cool!", icon: "people-carry"},
    {text: "Happy Halloween!", icon: "spider"},
    {text: "Thanks for visiting!", icon: "drumstick-bite"},
    {text: "Merry Christmas!", icon: "gift"}
  ];

  function generateMessage() {
    const now = new Date();
    const month = now.getMonth();
    let message;

    if(month === 1) {
      const year = now.getFullYear();

      message = messages[month][(year & 3) === 0 && (year % 25 !== 0 || (year & 15) === 0) ? 1 : 0];
    }else{
      message = messages[month];
    }

    return `${message.text} <i class="fas fa-${message.icon}"></i>`;
  }

  function choose(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  document.oncontextmenu = () => false;
  document.getElementById("avatar").style.backgroundImage = `url(assets/img/${choose(avatars)}.png)`;
  document.getElementById("message").innerHTML = generateMessage();
})();
