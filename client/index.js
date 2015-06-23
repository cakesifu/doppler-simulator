import Simulation from "./simulation";


function init() {
  let elements = document.getElementsByClassName("simulation"),
      img = "star-with-transparent-bg.png";

  Array.prototype.forEach.call(elements, el => {
    let type = el.dataset.type;
    let simulation = new Simulation({src: img, type});
    simulation.mount(el);
    simulation.start();
  });
}

init();
