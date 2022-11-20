function component() {
  const element = document.createElement("div");

  element.innerHTML = "teste";

  return element;
}

document.body.appendChild(component());
