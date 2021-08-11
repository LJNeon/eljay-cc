/* global Game */
const Shimmer = {
  /** OPTIONS (you can modify these values) */
  // auto-harvests mature sugar lumps
  harvest_lumps: true,
  // auto-collect fortunes
  collect_fortunes: true,
  // syncs reindeer with wrath cookies if season is christmas for eldeer farming
  shimmer_sync: true,
  // whether to instantly click golden cookies or to wait until the last possible instant
  // this has no effect if this.shimmer_sync is set to true and it's conditions are met
  wait: false,
  // "cookies" - pop wrinklers if season is halloween and not all cookies are unlocked
  // "shiny" - pop all non-shiny wrinklers
  // "ignore" - don't pop wrinklers
  wrinklers: "cookies",
  // "digit" - ascend once your total levels end with 7
  // "number" - ascend once your total levels end with 777
  // "payout" - ascend once your total levels end with 777,777
  // "off" - don't ascend
  ascendAt: "off",
  // list of the best spells, and the color to set them to
  spell_color: "#39CCCC",
  best_spells: ["Click Frenzy", "Elder Frenzy", "Building Special", "Free Sugar Lump"],
  // the amount of spells to forecast
  forecast: 6,
  // the clicks/sec for the big cookie, script will break if this is set above 10.
  cps: 5,

  /** DO NOT MODIFY anything below this unless you know what you're doing! */
  three: Game.fps * 3,
  ops: Math.floor(1e3 / Game.fps),
  delta: 0,
  M: Game.Objects["Wizard tower"].minigame,
  choose(list, rand) {
    return list[Math.floor(rand() * list.length)];
  },
  fail_chance(spell, max) {
    return Math.max(max, this.M.getFailChance(spell));
  },
  run_spell(spell, total, id, max = 0) {
    let rand = new Math.seedrandom(`${Game.seed}/${total}`);

    switch(spell.name) {
      case "Conjure Baked Goods":
      case "Stretch Time":
      case "Haggler's Charm":
      case "Summon Crafty Pixies":
      case "Resurrect Abomination":
      case "Diminish Ineptitude":
        return rand() < (1 - this.fail_chance(spell, max)) ? "Success" : "Backfire";
      case "Force the Hand of Fate": {
        const roll = rand();
        let count = id + 2;

        while(count-- > 0)
          rand();

        if(roll < (1 - this.fail_chance(spell, max))) {
          let choices = ["Frenzy", "Lucky"];

          if(Game.hasBuff("Dragonflight") === 0)
            choices.push("Click Frenzy");

          if(rand() < 0.1)
            choices.push("Cookie Storm", "Cookie Storm", "Blab");

          if(Game.BuildingsOwned >= 10 && rand() < 0.25)
            choices.push("Building Special");

          if(rand() < 0.15)
            choices = ["Cookie Storm Drop"];

          if(rand() < 0.0001)
            choices.push("Free Sugar Lump");

          return {
            success: true,
            result: this.choose(choices, rand)
          };
        }

        let choices = ["Clot", "Ruin"];

        if(rand() < 0.1)
          choices.push("Cursed Finger", "Elder Frenzy");

        if(rand() < 0.003)
          choices.push("Free Sugar Lump");

        if(rand() < 0.1)
          choices = ["Blab"];

        return {
          success: false,
          result: this.choose(choices, rand)
        };
      }
      case "Spontaneous Edifice": {
        if(rand() < (1 - this.fail_chance(spell, max))) {
          let m;
          const buildings = [];
          let n = 0;
          const double = Game.cookies * 2;

          for(const i in Game.Objects) {
            if(!Game.Objects[i].hasOwnProperty(i))
              continue;
            else if(Game.Objects[i].amount > Game.Objects[m].amount)
              m = i;

            if(Game.Objects[i].amount > 0)
              ++n;
          }

          for(const i in Game.Objects) {
            if(!Game.Objects.hasOwnProperty(i))
              continue;
            else if((i !== m || n === 1) && Game.Objects[i].getPrice() <= double
              && Game.Objects[i].amount < 400)
              buildings.push(Game.Objects[i].name);
          }

          if(buildings.length === 0)
            return;

          return {
            success: true,
            result: this.choose(buildings, rand)
          };
        }

        if(Game.BuildingsOwned === 0)
          return;

        const buildings = [];

        for(const i in Game.Objects) {
          if(!Game.Objects.hasOwnProperty(i))
            continue;
          else if(Game.Objects[i].amount > 0)
            buildings.push(Game.Objects[i].name);
        }

        return {
          success: false,
          result: this.choose(buildings, rand)
        };
      }
      case "Gambler's Fever Dream": {
        const spells = [];
        const spare = this.M.magic - this.M.getSpellCost(this.M.spells["gambler's fever dream"]);

        for(const i in this.M.spells) {
          if(!this.M.spells.hasOwnProperty(i))
            continue;
          else if(i !== "gambler's fever dream" && spare >= this.M.getSpellCost(this.M.spells[i]) * 0.5)
            spells.push(this.M.spells[i]);
        }

        if(spells.length === 0)
          return;

        const which = this.choose(spells, rand);

        rand = new Math.seedrandom(`${Game.seed}/${total + 1}`);

        const success = rand() < (1 - this.fail_chance(which, 0.5));
        let result = which.name;

        if(which.name === "Force the Hand of Fate") {
          result += ` (${this.run_spell(which, total + 1, id, 0.5).result})`;
        }else if(which.name === "Spontaneous Edifice") {
          const cast = this.run_spell(which, total + 1, id, 0.5);

          result += cast == null ? "" : ` (${cast.result})`;
        }

        return {success, result};
      }
    }
  },
  color_spell(cast) {
    if(this.best_spells.includes(cast.result))
      return `style='color: ${this.spell_color}'`;
    else if(cast.success)
      return "class='green'";

    return "class='red'";
  },
  tooltip(id) {
    const spell = this.M.spellsById[id];
    const total = this.M.spellsCastTotal;
    let result = `${this.game_tooltip(id)().slice(0, -6)}<div style='height: 8px;'></div><b>Forecast :</b><br/>`;
    const active = (Game.season === "valentines" || Game.season === "easter" ? 1 : 0)
      + (Game.chimeType === 1 && Game.ascensionMode !== 1 ? 1 : 0);

    if(spell.name === "Force the Hand of Fate") {
      result += "<table width='100%'><tr>";

      for(let i = 0; i < 3; i++)
        result += `<td width='33.33%'>${i === active ? "Active" : ""}</td>`;

      result += "</tr>";

      for(let i = 0; i < this.forecast; i++) {
        result += "<tr>";

        for(let j = 0; j < 3; j++) {
          const cast = this.run_spell(spell, total + i, j);

          result += `<td><span ${this.color_spell(cast)}>${cast.result}</span></td>`;
        }

        result += "</tr>";
      }

      result += "</table>";
    }else{
      for(let i = 0; i < this.forecast; i++) {
        const cast = this.run_spell(spell, total + i, active);

        if(cast === "Success")
          result += "<span class='green'>Success</span>";
        else if(cast === "Backfire")
          result += "<span class='red'>Backfire</span>";
        else if(cast == null)
          result += "<span class='gray'>N/A</span>";
        else
          result += `<span class='${cast.success ? "green" : "red"}'>${cast.result}</span>`;

        result += "<br/>";
      }
    }

    result += "</div>";

    return result;
  },
  ending_frenzy() {
    const elder = Game.hasBuff("Elder frenzy");
    const normal = Game.hasBuff("Frenzy");

    return (elder !== 0 && elder.time < this.three) || (normal !== 0 && normal.time < this.three);
  },
  click_buff() {
    return Game.hasBuff("Dragonflight") !== 0 || Game.hasBuff("Click frenzy") !== 0
      || Game.hasBuff("Cursed finger") !== 0 || Game.hasBuff("Elder frenzy") !== 0;
  },
  pop_wrinklers(shiny = true) {
    for(const wrinkler of Game.wrinklers) {
      if(wrinkler.phase === 2 && (shiny || wrinkler.type !== 1))
        wrinkler.hp = 0;
    }
  },
  get_prestige() {
    return Math.floor(Game.HowMuchPrestige(Game.cookiesReset + Game.cookiesEarned));
  },
  next() {
    setTimeout(() => this.loop(), this.ops);
  },
  start() {
    Game.Win("Third-party");
    Game.LoadMod("//cdnjs.cloudflare.com/ajax/libs/seedrandom/3.0.5/seedrandom.min.js");
    this.game_tooltip = Game.Objects["Wizard tower"].minigame.spellTooltip;
    Game.Objects["Wizard tower"].minigame.spellTooltip = id => () => this.tooltip(id);
    this.loop();
  },
  loop() {
    if(Game.OnAscend === 1 || Game.AscendTimer !== 0)
      return this.next();

    if(this.cps > 0) {
      ++this.delta;

      let speed = Math.floor(Game.fps / this.cps);

      if(this.click_buff())
        speed = Math.floor(speed / 3);

      while(this.delta > speed) {
        Game.ClickCookie();
        this.delta -= speed;
      }
    }

    if(this.harvest_lumps) {
      const diff = Date.now() - Game.lumpT;

      if(diff < Game.lumpOverripeAge && diff > Game.lumpRipeAge)
        Game.clickLump();
    }

    if(this.collect_fortunes && Game.TickerEffect != null && Game.TickerEffect.type === "fortune")
      Game.tickerL.click();

    for(const shimmer of Game.shimmers) {
      // Pop FtHoF cookies immediately whenever possible
      if(shimmer.type === "golden" && Game.elderWrath === 3 && shimmer.wrath === 0) {
        shimmer.pop();
        // Eldeer syncing
      }else if(this.shimmer_sync && Game.elderWrath !== 0 && Game.season === "christmas") {
        if(shimmer.life < Game.fps)
          shimmer.pop();
        else if(shimmer.type === "reindeer" && this.ending_frenzy())
          shimmer.pop();
        else if(shimmer.type === "golden" && Game.shimmerTypes.reindeer.spawned)
          shimmer.pop();
        // Normal golden cookies
      }else if(!this.wait || shimmer.life < Game.fps) {
        shimmer.pop();
      }
    }

    if(this.wrinklers === "cookies" && Game.season === "halloween" && !(Game.Has("Skull cookies")
      && Game.Has("Ghost cookies") && Game.Has("Bat cookies") && Game.Has("Slime cookies")
      && Game.Has("Pumpkin cookies") && Game.Has("Eyeball cookies") && Game.Has("Spider cookies")))
      this.pop_wrinklers();
    else if(this.wrinklers === "shiny")
      this.pop_wrinklers(false);

    if((this.ascendAt === "digit" && this.get_prestige() % 10 === 7)
      || (this.ascendAt === "number" && this.get_prestige() % 1e3 === 777)
      || (this.ascendAt === "payout" && this.get_prestige() % 1e6 === 777777)) {
      Game.Ascend(1);
      this.ascendAt = "off";
    }

    this.next();
  }
};

Shimmer.start();
