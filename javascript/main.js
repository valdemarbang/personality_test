/* Global variables */
var currStatement = 0;
let score = 0;
let selectedBubble = null;

/* Statements */
const statements = [
    "I never left the rebellious phase from my childhood.",
    "If someone tells you to calm down you do the opposite and go crazy",
    "I laugh louder and more often then 99.99% of my surroundings.",
    "I love fika more than i love life.",
    "I'm not ashamed of anything, and if I am I'm not.",
    "My money is best spend on new wood work tools, no matter the price.",
    "If something is free I am taking more than is socially acceptable.",
    "Your partner is EXTREMELY handsome, smart, generous and kind. Most likely one of the best people ever to live.",
    "You are surrounded by incredible people from all around the world who loves you.",
    "I am a overly loving, kindhearted creative genius with more karma than I can spend that.",
    "I can sleep anywhere, and anytime in any position.",
    "It is supposed to be more butter than bread on a sandwich."
];

/* Results */
const results = [
    "0-10% = Oh, no. You are less than 10% Nanny",
    "10-20% = You are a little bit Nanny",
    "20-30% = You are a little bit Nanny",
    "30-40% = You are a little bit Nanny",
    "40-50% = You are a little bit Nanny",
    "50-60% = You are a little bit Nanny",
    "60-70% = You are a little bit Nanny",
    "70-80% = You are a little bit Nanny",
    "80-90% = You are a little bit Nanny",
    "90-99% = You are a little bit Nanny",
    "100%= Wow, congratulations you are 100% Nanny. You probably life life to the fullest and are surrounded by the most incredible people in the world."
]
function setupStatement() {
    //  Set up the progress bar
    var progress = 9 + currStatement * 9;
    var progressbar = document.getElementById("progress");
    progressbar.style.width = progress + "%";
    progressbar.innerText = "score: " + score

    // Set up the current statement
    var statementText = document.getElementById("statement");
    statementText.innerText = statements[currStatement];
}

function toggleCheckmark(indexBubble) {
    var bubbles = document.getElementsByClassName("bubble");
    if(selectedBubble !== null) {
        // Reset the previous selected bubble
        bubbles[selectedBubble].classList.toggle("selected");
        bubbles[selectedBubble].style.backgroundColor = "transparent";
        // If the same bubble is selected, unselect it
        if(selectedBubble === indexBubble) {
            selectedBubble = null;
            return;
        }
    }
    // Select the new bubble
    bubbles[indexBubble].classList.toggle("selected");
    var style = getComputedStyle(bubbles[indexBubble]);
    bubbles[indexBubble].style.backgroundColor = style.getPropertyValue("--border-color");
    selectedBubble = indexBubble;
}

function nextStatement() {
    // Check if a bubble is selected
    if (selectedBubble === null) {
        alert("Please select a bubble");
        return;
    }

    // Is this the last statement?
    if (currStatement < statements.length - 1) {
        currStatement++;
        score += selectedBubble;
        // Reset the selected bubble
        toggleCheckmark(selectedBubble);
        setupStatement();
    } else {
        completeTest();
        showPage(2);
    }
}

function completeTest() {
    let resultIndex;
    resultIndex = Math.floor(score / ((statements.length - 1) * 4) * 10);
    var result = document.getElementById("result");
    result.innerText = results[resultIndex];
}

// bring the particular page into view.
// page 0: start page
// page 1: test page
// page 2: result
function showPage(num) {
    var pages = document.getElementsByClassName("container");
    pages[0].style.display = "none";
    pages[1].style.display = "none";
    pages[2].style.display = "none";
    pages[num].style.display = "block";
}