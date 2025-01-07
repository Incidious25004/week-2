// Decision tree data
const decisionTree = {
  question: "What is the problem?",
  options: [
    {
      text: "Device won't turn on",
      next: {
        question: "Is the device plugged in?",
        options: [
          {
            text: "Yes",
            next: {
              question: "Is the power button pressed?",
              options: [
                { text: "Yes", result: "Check the power supply or battery." },
                { text: "No", result: "Press the power button to turn it on." },
              ],
            },
          },
          { text: "No", result: "Plug the device into a power source." },
        ],
      },
    },
    {
      text: "Device is slow",
      next: {
        question: "Are there many apps running?",
        options: [
          { text: "Yes", result: "Close unnecessary apps to free resources." },
          {
            text: "No",
            result: "Check for software updates or restart the device.",
          },
        ],
      },
    },
  ],
};

// Navigation state
let history = [];
let currentNode = decisionTree;

// DOM Elements
const questionElement = document.getElementById("question");
const optionsContainer = document.getElementById("options");
const backButton = document.getElementById("backButton");
const resetButton = document.getElementById("resetButton");

// Render the current node
function renderNode(node) {
  // Update the question
  questionElement.textContent = node.question || node.result;

  // Clear previous options
  optionsContainer.innerHTML = "";

  if (node.options) {
    node.options.forEach((option, index) => {
      const button = document.createElement("button");
      button.textContent = option.text;
      button.addEventListener("click", () => {
        history.push(node);
        currentNode = option.next || option;
        renderNode(currentNode);
      });
      optionsContainer.appendChild(button);
    });
  } else if (node.result) {
    const restartButton = document.createElement("button");
    restartButton.textContent = "Restart";
    restartButton.addEventListener("click", resetTree);
    optionsContainer.appendChild(restartButton);
  }

  // Update controls
  backButton.disabled = history.length === 0;
}

// Navigate back
backButton.addEventListener("click", () => {
  if (history.length > 0) {
    currentNode = history.pop();
    renderNode(currentNode);
  }
});

// Reset the tree
resetButton.addEventListener("click", resetTree);

function resetTree() {
  history = [];
  currentNode = decisionTree;
  renderNode(currentNode);
}

// Initialize
renderNode(currentNode);
