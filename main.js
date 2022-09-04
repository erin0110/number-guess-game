// 랜덤번호 지정
// 유저가 번호를 입력한다 그리고 go라는 버튼을 누름
// 만약에 유저가 랜덤번호를 맞추면 => 맞추었습니다!
// 랜덤번호 < 유저번호 => Down!
// 랜덤번호 > 유저번호 => Up!
// Reset버튼을 누르면 게임이 리셋된다
// 5번의 기회를 다 쓰면 게임이 끝난다 (더 이상 추측 불가, 버튼이 disable)
// 유저가 1~100범위 밖의 숫자를 입력하면 알려준다. 기회는 깎지 않는다.
// 유저가 이미 입력한 숫자를 또 입력하면 알려준다. 기회를 깎지 않는다.

let computerNum = 0;
let playButton = document.getElementById("play-button");
let userInput = document.getElementById("user-input");
let resultArea = document.getElementById("result-area");
let resetButton = document.getElementById("reset-button");
let chances = 5;
let gameOver = false;
let chanceArea = document.getElementById("chance-area");
let history = [];

playButton.addEventListener("click", play); // 매개변수처럼 쓰인것이므로 play()로 넘긴게 아니라 play로 넘긴것. 함수도 변수처럼 넘길 수 있다!
resetButton.addEventListener("click", reset);
userInput.addEventListener("focus",function() {
    userInput.value="";
}); // 이 용도로만 쓰이므로, 이런 기능은 익명함수로 쓰여도 됨

function pickRandomNum() {
    computerNum = Math.floor(Math.random() * 100  + 1); // Math.random() = 0~1의 소숫점임 따라서 *100 해주고, Math.floor로 소숫점 버림
    // 0 ~ 1에 근접한 소숫점에 *100 이라 0~99까지 나오는거라서 +1을 해주는것
    console.log("정답",computerNum);
};
pickRandomNum();

function play() {
    let userValue = userInput.value;
    
    // 유효성 검사
    if(userValue < 1 || userValue > 100) {
        resultArea.textContent = "1과 100사이 숫자를 입력해 주세요.";
        return;
    }
    if(history.includes(userValue)) {
        resultArea.textContent = "이미 입력한 숫자입니다. 다른 숫자를 입력해주세요.";
        return;
    }

    chances--;
    chanceArea.textContent = `남은 기회:${chances}번`;
    console.log("chance",chances);

    if(userValue < computerNum) {
        resultArea.textContent ="Up!";
    } else if(userValue > computerNum) {
        resultArea.textContent ="Down!";
    } else {
        resultArea.textContent ="맞추셨습니다!";
        gameOver = true;
    }

    history.push(userValue);
    console.log(history);

    if(chances < 1) {
        gameOver = true;
    }
    if(gameOver == true) {
        playButton.disabled = true;
    }


};

function reset() {
    // user input창이 정리가 되고
    userInput.value = "";
    // 새로운 computerNum이 생성이 되어야 함
    pickRandomNum();
    resultArea.textContent = "결과가 나온다";
};