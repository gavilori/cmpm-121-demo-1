import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "The Fortune Teller";

document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

const buttonIcon = "🥠";
const button = document.createElement("button");
button.innerHTML = buttonIcon;
app.append(button);

const fortuneCountText = document.createElement("div");
let fortuneCount: number = 0;
fortuneCountText.innerHTML = `${fortuneCount} fortunes`;
app.append(fortuneCountText);

const fortuneGrowthText = document.createElement("div");
let growth: number = 0;
fortuneGrowthText.innerHTML = `${growth} fortunes / second`;
app.append(fortuneGrowthText);

interface Upgrade {
  name: string;
  cost: number;
  growCount: number;
  amount: number;
  htmlButton: HTMLButtonElement;
}

const upgradeA: Upgrade = {
  name: "Fortune Cookie Breaker",
  cost: 10,
  growCount: 0.1,
  amount: 0,
  htmlButton: document.createElement("button"),
};

const upgradeB: Upgrade = {
  name: "Tarot Card Deck",
  cost: 100,
  growCount: 2,
  amount: 0,
  htmlButton: document.createElement("button"),
};

const upgradeC: Upgrade = {
  name: "Bag of Rune Stones",
  cost: 1000,
  growCount: 50,
  amount: 0,
  htmlButton: document.createElement("button"),
};

const upgradeList: Upgrade[] = [upgradeA, upgradeB, upgradeC];

upgradeList.forEach((upgrade) => {
  upgrade.htmlButton.innerHTML =
    upgrade.name +
    ` (${upgrade.amount})<br>` +
    `[${upgrade.cost.toFixed(2)} Fortunes] | ${upgrade.growCount} fortunes/sec`;
  upgrade.htmlButton.disabled = true;
  app.append(upgrade.htmlButton);

  upgrade.htmlButton.addEventListener("click", () => {
    fortuneCount -= upgrade.cost;
    upgrade.amount += 1;
    increaseGrowth(upgrade.growCount);
    upgrade.cost *= 1.15;
  });
});

button.addEventListener("click", () => {
  increment(1);
});

let start: number, previousTimeStamp: number;
function add(timeStamp: number) {
  // FIXME:change function name
  if (start === undefined) {
    start = timeStamp;
  }

  let increaseAmount: number = 0;

  if (previousTimeStamp !== timeStamp && previousTimeStamp !== undefined) {
    increaseAmount = (timeStamp - previousTimeStamp) * 0.001 * growth;
  }
  increment(increaseAmount);

  upgradeList.forEach((upgrade) => {
    upgrade.htmlButton.disabled = !isPurchasable(upgrade);
    upgrade.htmlButton.innerHTML =
      upgrade.name +
      ` (${upgrade.amount})<br>` +
      `[${upgrade.cost.toFixed(2)} Fortunes] | ${
        upgrade.growCount
      } fortunes/sec`;
  });

  previousTimeStamp = timeStamp;
  requestAnimationFrame(add);
}

add(performance.now());

function isPurchasable(upgrade: Upgrade) {
  return fortuneCount >= upgrade.cost;
}

function increment(count: number) {
  fortuneCount += count;
  fortuneCountText.innerHTML = `${fortuneCount.toFixed(2)} fortunes`;
}

function increaseGrowth(grow: number) {
  growth += grow;
  fortuneGrowthText.innerHTML = `${growth.toFixed(1)} fortunes / second`;
}
