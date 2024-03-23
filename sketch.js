//#region main

function setup() {
  createCanvas(300, 100);
  escappStart(80);

  let puzzle1 = createPuzzle(100, 550, "The key to escape is to look up and count.");
  puzzle1.button.mousePressed(() => solve(1, puzzle1.input.value()));

  let puzzle2 = createPuzzle(100, 650, "The Bishop is praying. Where is he?");
  puzzle2.button.mousePressed(() => solve(2, puzzle2.input.value()));

  textAlign(CENTER);
  textSize(50);
 
}



//#endregion

//#region functions
function escappStart(roomNumber) {
  const URI = "https://escapp.es/api/escapeRooms/" + roomNumber + "/start";
  fetch(URI, {
    method: "POST",
    body: JSON.stringify({
      email: "eslamessam3013@gmail.com",
      password: "ziCY8AgsX7u3NSh",
    }),
    headers: {
      "Content-type": "application/json",
      "Accept-Language": "es-ES",
    },
  })
    .then((res) => res.json())
    .then((res) => console.log(res));
}

function createPuzzle(x, y, prompt) {
  let input = createInput();
  input.position(x, y);

  let button = createButton("submit");
  button.position(input.x + input.width, y);

  let puzzle = createElement("h3", prompt);
  puzzle.position(x, y - 2 * input.height);

  return { input: input, button: button, puzzle: puzzle };
}

function solve(puzzleNum, input) {
  const solution = input;
  const URI =
    "https://escapp.es/api/escapeRooms/80/puzzles/" + puzzleNum + "/submit";
  fetch(URI, {
    method: "POST",
    body: JSON.stringify({
      email: "eslamessam3013@gmail.com",
      password: "ziCY8AgsX7u3NSh",
      solution: solution,
    }),
    headers: {
      "Content-type": "application/json",
      "Accept-Language": "es-ES",
    },
  })
    .then((res) => res.json())
    .then((res) => console.log(res));
}
//#endregion
