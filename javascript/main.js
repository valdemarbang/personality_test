/* Global variables */
var currStatement = 0;
let score = 0;
let selectedBubble = null;

/* Statements */
const statements = [
    "You never left the rebellious phase from your childhood.",
    "If someone tells you to calm down you do the opposite and go crazy",
    "You like to build things.",
    "You laugh louder and more often than 99.99% of your surroundings.",
    "A sandwich is supposed to consist of more butter than bread.",
    "You're not ashamed of anything, and if you are, you're not.",
    "Green is undoubtedly the best color. GREEN GREEN GREEEEEEEN!",
    "Money is best spent on new wood work tools, no matter the price.",
    "If fika is free you are taking more than is socially acceptable.",
    "Your partner is EXTREMELY handsome, smart, generous and kind. Most likely one of the best people ever to live.",
    "To party hard means falling asleep around 23:30 during a conversation or in a club toilet.",
    "You eat vegetarian food (except fish, coz fish is basically sallad) to save the environment but travel by plane all over the world all the time.",
    "You are surrounded by incredible people from all around the world who loves you.",
    "You are an overly loving, kind hearted, creative genius with more karma than you can spend."
];


/* Results */
const results = [
    "0-10% = Oh no! You are less than 10% Nanny. You should probably eat some more fish, travel to an Indian wedding and make new awesome friends at this party!",
    "10-20% =That's a low Nanny percentage… You should eat some more butter, buy an expensive screwdriver and make some new awesome friends at this party!",
    "20-30% = There is still time! Make some new wonderful friends at this party, take an extra large portion of cake and fall asleep in the toilet to increase your Nannyness.",
    "30-40% = Only one third Nanny in you! Unless you want do die young and broke you should really take some extra cake and make some new wonderful friends at this party",
    "40-50% = There is some Nannyness in you! There could be more… take that extra piece of cake and scream at someone for telling you to calm down!",
    "50-60% = Alright alright, fifty/fifty, half Nanny, half boring! Keep the Nannyness flowing and eat more cake!",
    "60-70% = Wow! Two thirds Nanny! You could go on and make president of the woodworkers united one day! Keep it going!",
    "70-80% = You're almost a Nanny by default! People must really love you! Stay unhinged and sexy!",
    "80-90% = Wow! That's a high percentage! Keep spreading that butter! You will live a long and happy life (maybe buy some more drills and allen keys just to be on the safe side)",
    "90-99% =Congratulations, you are part of the top 10% of Nanny! One could almost believe that you are the actual Nanny! You probably live a wonderful life working as a traveling carpenter eating enormous amounts of fika each day.",
    "100% = Wow! Congratulations you are 100% Nanny! You probably live life to the fullest and are surrounded by the most incredible people! Keep doing what you are doing!"
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

    // Check if statement is singel question
    if (currStatement == 9) {
        var buttonText = document.getElementById("button-text");
        buttonText.textContent = "Singel and ready to mingle?";
    }
    else if (currStatement == 10) {
        var buttonText = document.getElementById("button-text");
        buttonText.textContent = "Next question";
    }
}

function toggleCheckmark(indexBubble) {
    var bubbles = document.getElementsByClassName("bubble");
    if (selectedBubble !== null) {
        // Reset the previous selected bubble
        bubbles[selectedBubble].classList.toggle("selected");
        bubbles[selectedBubble].style.backgroundColor = "transparent";
        // If the same bubble is selected, unselect it
        if (selectedBubble === indexBubble) {
            selectedBubble = null;
            // Change text for next button
            if (currStatement == 9) {
                var buttonText = document.getElementById("button-text");
                buttonText.textContent = "Singel and ready to mingle?";
            }
            return;
        }
    }
    // Select the new bubble
    bubbles[indexBubble].classList.toggle("selected");
    var style = getComputedStyle(bubbles[indexBubble]);
    bubbles[indexBubble].style.backgroundColor = style.getPropertyValue("--border-color");
    selectedBubble = indexBubble;
    // Change text for next button
    if (currStatement == 9) {
        var buttonText = document.getElementById("button-text");
        buttonText.textContent = "Next question";
    }
}

function nextStatement() {
    // Non selected and single question we pass the question with full points
    if (currStatement == 9 && selectedBubble == null) {
        selectedBubble = 4;
        toggleCheckmark(selectedBubble); // good fix to not have to repeat code
    }
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