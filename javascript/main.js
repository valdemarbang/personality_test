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
    "If something (fika) is free I am taking more than is socially acceptable.",
    "Your partner is EXTREMELY handsome, smart, generous and kind. Most likely one of the best people ever to live.",
    "You are surrounded by incredible people from all around the world who loves you.",
    "I am a overly loving, kindhearted creative genius with more karma than I can spend that.",
    "I can sleep anywhere, and anytime in any position.",
    "It is supposed to be more butter than bread on a sandwich.",
    "I like to build things",
    "Green IS the best color"
];

/* Results */
const results = [
    "0-10% = You are nothing like Nanny.",
    "10-20% = You share a few traits with Nanny, but not much.",
    "20-30% = You have some similarities with Nanny, but there's room for improvement.",
    "30-40% = You're a bit like Nanny, but there's still work to be done.",
    "40-50% = You're somewhat similar to Nanny.",
    "50-60% = You share a fair amount of traits with Nanny.",
    "60-70% = You have a lot in common with Nanny.",
    "70-80% = You're very much like Nanny.",
    "80-90% = You're almost like Nanny, just a few things to work on.",
    "90-99% = You're very close to being like Nanny.",
    "100% = Wow, congratulations you are 100% Nanny. You probably life life to the fullest and are surrounded by the most incredible people."
];

/* Functions */
function setupStatement() {
    //  Set up the progress bar
    const fill = document.querySelector('.fill');
    const percent = document.querySelector('.percent');
    
    const percentage = Math.floor((currStatement / statements.length) * 100);
    
    fill.style.width = percentage + '%';
    percent.textContent = percentage + '%';
    fill.style.backgroundColor = 'green';

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
        //alert("Please select a bubble");
        Swal.fire({
            title: 'Oops...',
            text: 'Please answer the statement/question by pressing a bubble.',
            confirmButtonColor: "#84fffe"
          })
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
    let resultScore = (score / ((statements.length - 1) * 4));
    var result = document.getElementById("result");
    var result_percentage = document.getElementById("result_percentage");
    result_percentage.innerText += Math.floor(resultScore * 100) + "%";
    result.innerText = results[Math.floor(resultScore * 10)];
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