document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById('confetti-container');
    
    function createConfetti() {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        
        const xPosition = Math.random() * window.innerWidth;  // Random X position
        const animationDuration = Math.random() * 2 + 2;  // Random duration between 2 and 4 seconds
        const confettiSize = Math.random() * 10 + 5;  // Random size between 5px and 15px
        const rotation = Math.random() * 360;  // Random rotation

        confetti.style.left = `${xPosition}px`;
        confetti.style.width = `${confettiSize}px`;
        confetti.style.height = `${confettiSize}px`;
        confetti.style.backgroundColor = getRandomColor();  // Random color
        confetti.style.animationDuration = `${animationDuration}s`;

        container.appendChild(confetti);

        setTimeout(() => {
            confetti.remove();
        }, animationDuration * 1000);
    }

    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    setInterval(createConfetti, 50);
});

let currentQuestionIndex = 0;
let score = 0; 
let data = null;
let selectedAnswer = null;

const roomId = Number(document.getElementById("roomId").value);
console.log(roomId);

async function fetchQuestions(roomId) {
    try {

        const res = await fetch(`https://backend-d485.onrender.com/api/get/${roomId}`);
        data = await res.json();
        // console.log("Fetched questions:", data); // Check if questions are fetched
        displayQuestion(); // Call displayQuestion after fetching data
    } catch (err) {
        console.error("Error fetching questions:", err);
    }
}











function displayQuestion() {
    if (data === null) return; 
    
    const questionData = data[currentQuestionIndex];
    const divId = document.getElementById('test-rooms');
    divId.innerHTML = ''; 

    const h4 = document.createElement('h4');
    h4.textContent =questionData.question+" ?";
    divId.appendChild(h4);

    const optionsContainer = document.createElement('div');
    optionsContainer.id = 'options-container';
    divId.appendChild(optionsContainer);

    questionData.options.forEach((optionText) => {
        const optionDiv = document.createElement('div');
        optionDiv.className = 'option';

        const label = document.createElement('label');
        label.textContent = optionText;

        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = 'options';
        radio.value = optionText;

        optionDiv.appendChild(radio);
        optionDiv.appendChild(label);
        optionsContainer.appendChild(optionDiv);

        radio.addEventListener('change', () => {
            selectedAnswer = radio.value;
            document.getElementById('next-btn').disabled = false; 
        });
    });

    selectedAnswer = null;
    document.getElementById('next-btn').style.display = 'inline'; 
    document.getElementById('next-btn').disabled = true; 
}
function handleNextButton() {
    if (!data || data.length === 0) {
        console.error("Data is empty or undefined");
        return;
    }

    if (currentQuestionIndex >= data.length) {
        console.error(`No question available at index ${currentQuestionIndex}`);
        return;
    }

    const currentQuestion = data[currentQuestionIndex];

    // console.log("Current Question Index:", currentQuestionIndex);
    // console.log("Current Question Data:", currentQuestion);

    if (!currentQuestion) {
        console.error("Current question is undefined at index:", currentQuestionIndex);
        return;
    }

    if (!currentQuestion.Answer) {
        console.error("Answer is undefined for the current question:", currentQuestion);
        return;
    }

    let Answer = currentQuestion.Answer;
    console.log("Correct Answer:", Answer);

    if (selectedAnswer === Answer) {
        score++; 
    }

    currentQuestionIndex++;

    if (currentQuestionIndex < data.length) {
        displayQuestion(); 
    
        if (currentQuestionIndex === data.length - 1) {
            document.getElementById('next-btn').style.display = 'none'; 
            document.getElementById('submit-btn').style.display = 'inline';
          
        }
}
}




function displayScore() {
    const divId = document.getElementById('test-rooms');

    document.getElementById("leaderboard").style.display = "block";
    document.body.style.backgroundImage = "url('css/score.jpg')";

    if (divId) {
        divId.innerHTML = `<h3>Your final score is: ${score}/${data.length}</h3>`;
        document.getElementById("confetti-container").style.display = "block";
    } else {
        console.error('Element with id "test-rooms" not found.');
    }
   
    const submitBtn = document.getElementById('submit-btn');
    if (submitBtn) {
        submitBtn.style.display = 'none';
    } else {
        console.error('Element with id "submit-btn" not found.');
    }
}

function handleSubmitButton() {
    if (selectedAnswer === data[currentQuestionIndex].Answer) {
        ++score;        
    }
    const postData = {    
        userName: document.getElementById("userName").value.trim(), 
        score: score,
        roomId: Number(document.getElementById("roomId").value)
    };
    post=postData;
    fetch("https://backend-d485.onrender.com/api/score", {
        method: "POST", 
        headers: {
            "Content-Type": "application/json", 
        },
        body: JSON.stringify(postData), 
    })
    .then(response => response.json())
    .then(data => {
        // console.log("Success:", data);
    })
    .catch((error) => {
        console.error("Error:", error);
    });
    displayScore();
}














document.getElementById('next-btn').addEventListener('click', handleNextButton);
document.getElementById('submit-btn').addEventListener('click', handleSubmitButton);

(function () {
    if (!sessionStorage.getItem("visited")) {
       
        sessionStorage.setItem("visited", "true");

        
        history.pushState(null, "", location.href);

        
        window.addEventListener("popstate", function () {
           
            window.location.href = "index.html";
        });
    }
})();

async function submit() {
    const userName = document.getElementById("userName").value.trim();
    const password = document.getElementById("user-password").value.trim();
    const roomId = Number(document.getElementById("roomId").value.trim());
    localStorage.setItem("roomId", roomId);

    const userExists = await Users(userName, roomId);
    console.log(`User exists status: ${userExists}`);  // Log the result of Users function

    if (userExists) {
        alert(`There is already a user with this name in Room ${roomId}. Please choose another name.`);
        return;
    }

    if (!roomId || !password) {
        alert("Room ID and Password are required!");
        return;
    }

    try {
        const response = await fetch(`https://backend-d485.onrender.com/api/roomsDetails/${roomId}`);
        const roomDetailsArray = await response.json();
        console.log("Room details received:", roomDetailsArray);
         
        if (!Array.isArray(roomDetailsArray) || roomDetailsArray.length === 0) {
            alert("No room details found.");
            return;
        }

        const roomDetails = roomDetailsArray.find(room => room.roomId === roomId);
        // console.log(`Searched for Room ID: ${roomId}, Found Room Details:`, roomDetails);

        if (roomDetails) {
            const currentTime = getFormattedDateTime();

            if (roomDetails.roomPassword !== password) {
                alert("Incorrect password!");
                return;
            }

            if (currentTime >= roomDetails.startTime) {
                const postData = {
                    userName: userName,
                    roomId: localStorage.getItem('roomId')
                };
                
                await fetch("https://backend-d485.onrender.com/api/users", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(postData),
                });

                document.getElementById('enter-room').style.display = 'none';  
                document.getElementById("T").style.display = 'block';  
                
                document.body.style.backgroundImage = "url('css/oldpaper.jpg')";
                fetchQuestions(roomId); // Fetch questions here
                
            } else {
                alert(`You cannot enter Room ${roomId} before the start time.`);
            }
        } else {
            alert(`Room with ID ${roomId} not found.`);
        }
    } catch (error) {
        console.error("Error fetching room details:", error);
        alert("Failed to fetch room details.");
    }
}

function getFormattedDateTime() {
    const now = new Date();

    const year = now.getFullYear();
    let month = now.getMonth() + 1;  // Months are zero-indexed, so add 1
    let day = now.getDate();

    let hours = now.getHours();  // 24-hour format
    let minutes = now.getMinutes();

    month = month < 10 ? '0' + month : month;
    day = day < 10 ? '0' + day : day;
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;

    const formattedDateTime = `${year}-${month}-${day}T${hours}:${minutes}`;

    return formattedDateTime;
}



async function Users(userName, roomId) {
    try {
        const response = await fetch(`https://backend-d485.onrender.com/api/participants/${roomId}`);
        const data = await response.json();  // await response.json()

        // console.log("Participants data:", data);  // Log the data to check its structure

        // Check if the user exists in the data
        const userFound = data.find(user => user.userName === userName);
        // console.log(`User Found:`, userFound);  // Log whether the user is found

        return userFound !== undefined;
    } catch (error) {
        console.error("Error fetching participants:", error);
        return false;
    }
}
