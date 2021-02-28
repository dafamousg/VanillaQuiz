const questionBlock = document.querySelector(".question-block");
let counter = document.querySelector(".counter");
let number = document.querySelector(".number");
let maxNumber = document.querySelector(".maxNum");
const startButton1 = document.querySelector(".startBtn1");
const startButton2 = document.querySelector(".startBtn2");
const selector = document.querySelector(".selector");
const section = document.querySelector("section");

let currentPage = 0;
let totalRight = 0;
let moveOn = false;
let allowNext = false;
let data;
let dataInfo;
let maxPage = 0;


startButton1.addEventListener("click", function () {
    selector.style.display = "none";
    /* getInfo()
    .then(data => {
        maxPage = data.length;
        render(shuffle(data));
    }); */

})
startButton2.addEventListener("click", function () {
    selector.style.display = "none";
    /* getInfo()
    .then(data => {
        maxPage = data.length;
        render(shuffle(data));
    }); */

})

async function getData(value) { 
    //getting all the data from API
    /* const resp = await fetch('/api');
    const data = await resp.json(); */
    const data = {value}
    const options = {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(data),
    }

    const res = await fetch('/api', options);
    const apiData = await res.json();

    console.log('ApiData: ',apiData);

    maxPage = apiData.length;
    render(shuffle(apiData));
}

// render the data from API
function render(info) {
    
    maxNumber.textContent = "/" + maxPage;
    section.style.display = "show";

    if (currentPage <= maxPage - 1) {

        setTimeout(function () {
            counter.style.display = "block";
            number.textContent = currentPage + 1;
        }, 40)

        questionBlock.innerHTML = "";
        let eachData = info[currentPage];

        const pQuestion = document.createElement("p");
        const ul = document.createElement("ul");
        const nextBtn = document.createElement("button");
        nextBtn.className = "nextBtn";
        const cancelBtn = document.createElement("button");
        cancelBtn.classList = "reset";
        nextBtn.textContent = "Next Question";
        cancelBtn.textContent = "Reset Game";
        pQuestion.innerHTML = eachData.question;

        questionBlock.appendChild(pQuestion);
        questionBlock.appendChild(ul);
        questionBlock.appendChild(cancelBtn);
        questionBlock.appendChild(nextBtn);

        //pushing new options to the array from the API
        let answers=[];
        for (let j = 0; j < eachData.possibleAnswers.length; j++) {
            answers.push(eachData.possibleAnswers[j]);
        }

        // shuffle the answers array
        answers = shuffle(answers);

        //looping through the answers array to print out the list of answers to the DOM
        // all the wrong anwers
        for (let k = 0; k < answers.length; k++) {
            const li = document.createElement("li");
            const spanLi = document.createElement("button")
            ul.appendChild(li);
            li.appendChild(spanLi);
            spanLi.innerHTML = answers[k];
        }

        if (moveOn === false) {
            selectAnswers()
        }

        nextBtn.addEventListener("click", function () {

            if (allowNext === true) {
                currentPage++;
                checkAnswer(eachData)
                render(info);
                moveOn = false;
                allowNext = false;
            }
        })

        cancelBtn.addEventListener("click", resetGame);

    }

    if (currentPage === maxPage - 1) {
        selectAnswers();
        checkAnswer(info);
        let cancelBtn = document.querySelector(".question-block button.reset");
        cancelBtn.style.display = "none";
        finalPage();
    }

}


function shuffle(array) {

    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * i)
        const temp = array[i]
        array[i] = array[j]
        array[j] = temp
    }

    return array;
}


function selectAnswers() {

    let answersLi = document.querySelectorAll("li button");
    
    for (let j = 0; j < answersLi.length; j++) {
        let eachAnswerBtn = answersLi[j];

        eachAnswerBtn.addEventListener("click", function () {

            for (let k = 0; k < answersLi.length; k++) {
                let eachAnswerBtn = answersLi[k];
                eachAnswerBtn.className = "unselected";
            }

            eachAnswerBtn.className = "active";
            allowNext = true;
        })
    }
}

function checkAnswer(info) {

    let answersLi = document.querySelectorAll("li button");

    for (let j = 0; j < answersLi.length; j++) {
        let eachAnswer = answersLi[j]
        if (eachAnswer.className === "active") {
            if (eachAnswer.textContent === info.correctAnswer) {
                totalRight++;
                alert(totalRight);
            }
        }
    }

}

function finalPage() {
    let p = document.querySelector(".question-block p");
    let finalBtn = document.querySelector(".question-block button.nextBtn")
    let ul = document.querySelector("ul");
    
    let li = document.querySelector("li");
    finalBtn.textContent = "Check your answers!";

    finalBtn.addEventListener("click", function () {
        let section = document.querySelector("section");
        section.style.flexFlow = "column wrap";
        let questionBlock = document.querySelector(".question-block");
        questionBlock.style.padding = "30px 40px 20px 40px";
        //if (allowNext === true){
        let p1 = document.createElement("p");
        p1.className = "score-num";
        let p2 = document.createElement("p");
        p2.className = "score-text";
        questionBlock.appendChild(p1);
        questionBlock.appendChild(p2);
        
        p.style.display = "none"
        questionBlock.removeChild(ul)
        ul.removeChild(li);
        let sectionH3 = document.querySelector("section h3");
        sectionH3.textContent = "Result"
        p1.textContent = totalRight;
        p2.textContent = "correct answers";
        finalBtn.style.display = "none";
        counter.style.display = "none";

        let resetBtn = document.createElement("button");
        resetBtn.textContent = "Play Again!";
        resetBtn.className = "endButton"
        questionBlock.appendChild(resetBtn);

        resetBtn.addEventListener("click", resetGame);
        allowNext = false;
        moveOn = true;
        //}

    })
}

function resetGame() {
    location.reload();
}