import { GoogleGenerativeAI } from "https://esm.run/@google/generative-ai";

// Fetch your API_KEY
const API_KEY = "AIzaSyBBnnMxEha01UMoT40vJDVrDlpn6wuE5fc";

// Access your API key (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(API_KEY);

async function run(inPrompt) {
  // For text-only input, use the gemini-pro model
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = inPrompt;
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  return text;
}

const mainSketch = (p) => {
  p.setup = () => {
    p.noCanvas();
    escappStart(80);
    p.createElement("h3", "Solve the puzzles to escape.");
    
    let puzzle1 = createPuzzle("The key to escape is to look up and count.");
    // puzzle1.button.mousePressed(() => p.createSpan(solve(1, puzzle1.input.value())) );
    puzzle1.button.mousePressed(() => solve(1, puzzle1.input.value(), puzzle1.message)) //Check thisssssssss

    let puzzle2 = createPuzzle("The Bishop is praying. Where is he?");
    puzzle2.button.mousePressed(() => solve(2, puzzle2.input.value()));

    p.createElement("h3", "Ask Gemini if you'd like some help");
    let geminiInput = p.createInput();
    let geminiButton = p.createButton("Ask Gemini");
    let geminiResponse = p.createP();
    geminiButton.mousePressed(() =>
      run(geminiInput.value()).then((data) => geminiResponse.html(data))
    );
  };

  p.draw = () => {};

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

  function createPuzzle(prompt) {
    let puzzle = p.createP(prompt);
    // puzzle.position(x, y - 2 * input.height);

    let input = p.createInput();
    // input.position(x, y);

    let button = p.createButton("submit");
    
    let message = p.createSpan();
    // button.position(input.x + input.width, y);

    return { input: input, button: button, message: message, puzzle: puzzle };
  }

  function solve(puzzleNum, input, span) {
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
      .then((res) => {console.log(res.msg); span.html(res.msg)});
  }
};

new p5(mainSketch);
