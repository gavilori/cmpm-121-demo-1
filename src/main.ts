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

const div = document.createElement("div");
let counter: number = 0;
div.innerHTML = `${counter} fortunes\n`;

app.append(div);

const buttonPurchasable = document.createElement("button");
buttonPurchasable.innerHTML = "Tarot Card Deck [10 Fortunes]";
buttonPurchasable.disabled = true;
app.append(buttonPurchasable);

button.addEventListener("click", () => {
  increment(1);
});

let start: number, previousTimeStamp: number;
let growth: number = 0;
function add(timeStamp: number) {
  // change function name
  if (start === undefined) {
    start = timeStamp;
  }

  let count: number = 0;

  if (previousTimeStamp !== timeStamp && previousTimeStamp !== undefined) {
    count = (timeStamp - previousTimeStamp) * 0.001 * growth;
  }

  if (counter >= 10) {
    // remove magic number
    buttonPurchasable.disabled = false;
  } else {
    buttonPurchasable.disabled = true;
  }

  increment(count);
  previousTimeStamp = timeStamp;
  requestAnimationFrame(add);
}

function increment(count: number) {
  counter += count;
  div.innerHTML = `${counter} fortunes`;
}

add(performance.now());

buttonPurchasable.addEventListener("click", () => {
  counter -= 10;
  increaseGrowth(1);
});

function increaseGrowth(grow: number) {
  growth += grow;
}
