// 날짜 디폴트 세팅
window.onload = function() {
    const dateInput = document.getElementById('date');
    dateInput.value = '2000-01-01';
};

const chatBox = document.querySelector('.chat-box');
let userMessages = [];
let assistantMessages = [];
let myDateTime = ''

// 로딩 스피너 추가
function spinner() {
    document.getElementById('loader').style.display = "block";
}

// 메시지 입력 후 스크롤을 가장 아래로 이동하는 함수
// function scrollDown() {
//     var chatContainer = $('.chat-box');
//     chatContainer.scrollTop(chatContainer.prop("scrollHeight"));
//   }

function start() {
    const date = document.getElementById('date').value;
    const hour = document.getElementById('hour').value;
    if (date === '') {
        alert('生年月日を入力してください。');
        return;
    }
    myDateTime = date + hour;

    document.getElementById("intro").style.display = "none";
    document.getElementById("chat").style.display = "block";
}

const sendMessage = async () => {
    const chatInput = document.querySelector('.chat-input input');

    const chatMessage = document.createElement('div');
    chatMessage.classList.add('chat-message');
    chatMessage.innerHTML = `
<p>${chatInput.value}</p>
`;
    chatBox.appendChild(chatMessage);

    //userMessage 메세지 추가
    userMessages.push(chatInput.value);

    chatInput.value = '';
    // backend response 
    const response = await fetch('http://127.0.0.1:5500/todayFortune', {
        method: 'POST',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            myDateTime: myDateTime,
            userMessages: userMessages,
            assistantMessages: assistantMessages,
        })
    });

    const data = await response.json();
    document.getElementById('loader').style.display = "none";

    //assistantMessage 메세지 추가
    assistantMessages.push(data.assistant);

    const astrologerMessage = document.createElement('div');
    astrologerMessage.classList.add('chat-message');
    astrologerMessage.innerHTML = `
<p class='assistant'>${data.assistant}</p>
`;
    chatBox.appendChild(astrologerMessage);

    chatBox.scrollTop = chatBox.scrollHeight;

    // 메시지 값이 빈 값일 경우 전송버튼 비활성화 
    if (chatInput.value == null || chatInput.value == '') {
        document.querySelector('#btn').disabled = true;
    }
};

// 엔터 키가 send동작과 같은 수행
const chatInput = document.querySelector('.chat-input input');
chatInput.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        event.preventDefault(); // 엔터 키 기본 동작 방지
        document.querySelector('.chat-input button').click(); // 버튼 클릭과 같은 동작 수행
    }
});

document.querySelector('.chat-input button').addEventListener('click', sendMessage);

// 채팅에 값이 없을 경우 전송버튼 비활성화
// const input = document.querySelector('.chat-input input');
// const button1 = document.getElementById('btn');

// input.addEventListener('input', () => {
//   button1.disabled = input.value.trim().length == 0;
// });

// magic 시간 세팅
// 지정한 날짜와 시간 (YYYY-MM-DD HH:MM:SS) - 2023년 4월 1일 오후 3시 30분 0초
// var targetDate = new Date("2023-04-01T15:30:00");
var targetDate = new Date("2023-03-28T11:45:00");

// 1초마다 현재 시간을 체크하고, 지정한 시간이 되면 h1 요소의 내용을 변경하는 함수
var interval = setInterval(function() {
var currentDate = new Date(); // 현재 시간

// targetDate가 현재 시간보다 미래이면
if (targetDate.getTime() > currentDate.getTime()) {
    // 지정한 시간까지 남은 시간 계산 (초 단위)
    // var remainingTime = Math.floor((targetDate.getTime() - currentDate.getTime()) / 1000);

    // h1 요소의 내용 변경 (형식: D일 H시간 M분 S초)
    // var days = Math.floor(remainingTime / 86400);
    // var hours = Math.floor((remainingTime % 86400) / 3600);
    // var minutes = Math.floor((remainingTime % 3600) / 60);
    // var seconds = remainingTime % 60;
    // document.getElementById("my-heading").textContent = days + "일 " + hours + "시간 " + minutes + "분 " + seconds + "초 남았습니다.";
} else {
    // 지정한 시간이 지난 경우, h1 요소의 내용을 변경하고 interval 함수를 중지함 (magic 내용 추가)
    document.getElementById("my-heading").textContent = "♠A ♥A ♣A ◆A";
    clearInterval(interval);
}
}, 1000); // 1초마다 실행

// 날짜 로그 확인
document.getElementById("date").addEventListener("change", function() {
    var selectedDate = this.value; // input 요소에서 선택한 날짜 값 가져오기
    localStorage.setItem("log", selectedDate); // 로컬 스토리지에 로그 기록 저장
});

// 로그 저장 버튼을 클릭했을 때 실행되는 함수
document.getElementById("log-btn").addEventListener("click", function() {
    var log = localStorage.getItem("log"); // 로컬 스토리지에서 로그 기록 가져오기
    console.log("로그 기록: " + log); // 콘솔에 로그 출력
});


const button = document.getElementById('btn');
button.addEventListener('click', () => {
  spinner();
  button.disabled = true;
});