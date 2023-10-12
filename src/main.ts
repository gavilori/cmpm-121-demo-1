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
  cost: number;
  rate: number;
  amount: number;
  htmlButton: HTMLButtonElement;
}

const availableUpgrades: Upgrade[] = [
  {
    name: "Fortune Cookie Breaker",
    cost: 10,
    rate: 0.1,
    amount: 0,
    htmlButton: document.createElement("button"),
  },
  {
    name: "Tarot Card Deck",
    cost: 100,
    rate: 2,
    amount: 0,
    htmlButton: document.createElement("button"),
  },
  {
    name: "Bag of Rune Stones",
    cost: 1000,
    rate: 50,
    amount: 0,
    htmlButton: document.createElement("button"),
  },
];

availableUpgrades.forEach((upgrade) => {
  updateUpgradeText(upgrade);
  upgrade.htmlButton.disabled = true;
  app.append(upgrade.htmlButton);

  upgrade.htmlButton.addEventListener("click", () => {
    fortuneCount -= upgrade.cost;
    upgrade.amount += 1;
    increaseRate(upgrade.rate);
    upgrade.cost *= 1.15;
  });
});

let start: number, previousTimeStamp: number;
function tick(timeStamp: number) {
  if (start === undefined) {
    start = timeStamp;
  }

  let increaseAmount: number = 0;

  if (previousTimeStamp !== timeStamp && previousTimeStamp !== undefined) {
    increaseAmount = (timeStamp - previousTimeStamp) * 0.001 * fortuneRate;
  }
  increment(increaseAmount);

  availableUpgrades.forEach((upgrade) => {
    upgrade.htmlButton.disabled = !isPurchasable(upgrade);
    updateUpgradeText(upgrade);
  });

  previousTimeStamp = timeStamp;
  requestAnimationFrame(tick);
}

tick(performance.now());

function isPurchasable(upgrade: Upgrade) {
  return fortuneCount >= upgrade.cost;
}

function increment(count: number) {
  fortuneCount += count;
  fortuneCountText.innerHTML = `${fortuneCount.toFixed(2)} fortunes`;
}

function increaseRate(grow: number) {
  fortuneRate += grow;
  fortuneGrowthText.innerHTML = `${fortuneRate.toFixed(1)} fortunes / second`;
}

function updateUpgradeText(upgrade: Upgrade) {
  upgrade.htmlButton.innerHTML =
    upgrade.name +
    ` (${upgrade.amount})<br>` +
    `[${upgrade.cost.toFixed(2)} Fortunes] | ${upgrade.rate} fortunes/sec`;
}
