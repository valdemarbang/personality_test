/* Global variables */
var currQn = 0;
let score = 0;
var rSlider;

const questions = [
    ["question1" ]
    ["question1" ],
    ["question1" ]
];

function setupQuestion() {
    var slider = new rSlider({
        target: '#slider',
        values: [1,2,3,4,5],
        range: false,
        set: [3],
        tooltip: false,
    });
    // find out the current percentage of completion and updates the css
    var progress = 20 + currQn * 20;
    var progressbar = document.getElementById("progress");
    progressbar.style.width = progress + "%";
    progressbar.innerText = currQn + 1 + "/5";
/*
    // get the current question
    var question = questions[currentQn];
    // update the question text
    var questionText = document.getElementById("question");*/

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