import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Gyle's Cool Game";

document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

const buttonIcon = "🥠";
const button = document.createElement("button");
button.innerHTML = buttonIcon;
app.append(button);
