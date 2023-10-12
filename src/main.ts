import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "The Fortune Teller";

document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

const fortuneButtonIcon = "🔮";
const fortuneButton = document.createElement("button");
fortuneButton.style.fontSize = "70px";
fortuneButton.innerHTML = fortuneButtonIcon;
app.append(fortuneButton);

fortuneButton.addEventListener("click", () => {
  increment(1);
});

const fortuneCountText = document.createElement("div");
let fortuneCount: number = 0;
fortuneCountText.style.fontSize = "24px";
fortuneCountText.innerHTML = `${fortuneCount} fortunes`;
app.append(fortuneCountText);

const fortuneGrowthText = document.createElement("div");
let fortuneRate: number = 0;
fortuneGrowthText.innerHTML = `${fortuneRate} fortunes / second`;
app.append(fortuneGrowthText);

interface Upgrade {
  name: string;
  description: string;
  cost: number;
  rate: number;
  amount: number;
  htmlButton: HTMLButtonElement;
}

const availableUpgrades: Upgrade[] = [
  {
    name: "Magic 8-Ball",
    description: 'A complicated way to determine "yes" or "no".',
    cost: 10,
    rate: 0.1,
    amount: 0,
    htmlButton: document.createElement("button"),
  },
  {
    name: "Fortune Cookie",
    description: "A delicious treat with a few words inside.",
    cost: 100,
    rate: 2,
    amount: 0,
    htmlButton: document.createElement("button"),
  },
  {
    name: "Tarot Card Deck",
    description: "Contains the major and minor arcana.",
    cost: 1000,
    rate: 50,
    amount: 0,
    htmlButton: document.createElement("button"),
  },
  {
    name: "Bag of Runes",
    description: "Beautifully crafted gemstones inscribed with ancient runes.",
    cost: 10000,
    rate: 100,
    amount: 0,
    htmlButton: document.createElement("button"),
  },
  {
    name: "Shiny Crystal Ball",
    description: "The cleanest, most efficient source of divination.",
    cost: 155555,
    rate: 555,
    amount: 0,
    htmlButton: document.createElement("button"),
  },
];

// append and set up each upgrade
availableUpgrades.forEach((upgrade) => {
  updateUpgradeText(upgrade);
  upgrade.htmlButton.disabled = true;
  app.append(upgrade.htmlButton);

  upgrade.htmlButton.addEventListener("click", () => {
    purchase(upgrade);
  });
});

let start: number, previousTimeStamp: number;
function tick(timeStamp: number) {
  if (start === undefined) {
    start = timeStamp;
  }

  // calculate growth rate
  let newRate: number = 0;
  availableUpgrades.forEach((upgrade) => {
    newRate += upgrade.rate * upgrade.amount;

    upgrade.htmlButton.disabled = !isPurchasable(upgrade);
    updateUpgradeText(upgrade);
  });
  fortuneRate = newRate;
  fortuneGrowthText.innerHTML = `${fortuneRate.toFixed(1)} fortunes / second`;

  let increaseAmount: number = 0;
  if (previousTimeStamp !== timeStamp && previousTimeStamp !== undefined) {
    increaseAmount = (timeStamp - previousTimeStamp) * 0.001 * fortuneRate;
  }
  increment(increaseAmount);

  previousTimeStamp = timeStamp;
  requestAnimationFrame(tick);
}

tick(performance.now());

function isPurchasable(upgrade: Upgrade) {
  return fortuneCount >= upgrade.cost;
}

function increment(count: number) {
  fortuneCount += count;
  fortuneCountText.innerHTML = `✧ ${fortuneCount.toFixed(2)} fortunes ✧`;
}

function purchase(upgrade: Upgrade) {
  fortuneCount -= upgrade.cost;
  upgrade.amount += 1;
  upgrade.cost *= 1.15;
}

function updateUpgradeText(upgrade: Upgrade) {
  upgrade.htmlButton.innerHTML =
    `<b>` +
    upgrade.name +
    `</b>` +
    ` (${upgrade.amount})<br>` +
    `[${upgrade.cost.toFixed(2)} Fortunes] ✧ ${upgrade.rate} fortunes/sec` +
    `<br>─ •❃• ─<br><small>` +
    upgrade.description +
    `</small>`;
}
