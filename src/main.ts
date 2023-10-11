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
div.innerHTML = `${counter} fortunes`;

app.append(div);

button.addEventListener("click", () => {
  increment(1);
});

// setInterval(increment, 1000);
// requestAnimationFrame(increment);

let start: number, previousTimeStamp: number;
function add(timeStamp: number) {
  if (start === undefined) {
    start = timeStamp;
  }

  let count: number = 0;

  if (previousTimeStamp !== timeStamp && previousTimeStamp !== undefined) {
    count = (timeStamp - previousTimeStamp) / 1000;
  }

  increment(count);
  previousTimeStamp = timeStamp;
  requestAnimationFrame(add);
}

add(performance.now());

function increment(count: number) {
  counter += count;
  div.innerHTML = `${counter} fortunes`;
}
