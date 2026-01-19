const main = document.querySelector("main");

// 현재 뒤집은 카드 저장용
let firstCard = null;
let secondCard = null;
// 클릭 잠금(연타 방지)
let lockBoard = false;
// 맞춘 카드 개수 체크
let matchedCount = 0;

function setListenerTocard() {
    const cardArr = document.querySelectorAll(".card-area");

    for (const cardArea of cardArr) {
        cardArea.addEventListener("click", function (evt) {

            if (lockBoard) return;                       // 클릭 잠금
            const selected = evt.currentTarget;

            // 이미 맞춘 카드면 무시
            if (selected.classList.contains("matched")) return;

            // 같은 카드 두 번 클릭 방지
            if (selected === firstCard) return;

            selected.classList.add("flip");

            if (!firstCard) {
                firstCard = selected;
                return;
            }

            secondCard = selected;
            lockBoard = true;

            checkMatch();
        });
    }
}

function checkMatch() {
    const firstNum = firstCard.querySelector(".card-back").textContent;
    const secondNum = secondCard.querySelector(".card-back").textContent;

    if (firstNum === secondNum) {
        // 맞춘 경우
        firstCard.classList.add("matched");
        secondCard.classList.add("matched");

        matchedCount += 2;

        resetSelection();

        // 전체 클리어 체크
        const totalCards = document.querySelectorAll(".card-area").length;
        if (matchedCount === totalCards) {
            setTimeout(() => {
                alert("🎉 클리어!");
            }, 300);
        }

    } else {
        // 틀렸으면 다시 뒤집음
        setTimeout(() => {
            firstCard.classList.remove("flip");
            secondCard.classList.remove("flip");
            resetSelection();
        }, 1000);
    }
}

function resetSelection() {
    [firstCard, secondCard] = [null, null];
    lockBoard = false;
}

function generateCardList() {
    matchedCount = 0; // 초기화

    const CardCnt = document.querySelector("#cardCnt").value;
    if (CardCnt > 50) {
        alert("50 초과 불가");
        return;
    }
    main.innerHTML = "";

    const cardContentArr = [];
    for (let i = 1; i <= CardCnt; i++) {
        cardContentArr.push(i);
    }
    const arr = cardContentArr.concat(cardContentArr);

    const shuffled = shuffleArr(arr);

    for (const temp of shuffled) {
        main.innerHTML += `
            <div class="card-area">
                <div class="card">
                    <div class="card-back">${temp}</div>
                    <div class="card-front">?</div>
                </div>
            </div>`;
    }
}

function shuffleArr(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

function handleClick() {
    generateCardList();
    setListenerTocard();
}
function resetGame() {
    // 선택 카드 초기화
    firstCard = null;
    secondCard = null;

    // 클릭 잠금 해제
    lockBoard = false;

    // 맞춘 카드 수 초기화
    matchedCount = 0;

    // 화면 카드 전체 삭제
    main.innerHTML = "";

    // 숫자 입력값도 초기화 (선택)
    // document.querySelector("#cardCnt").value = 20;

    console.log("게임 초기화 완료!");
}
