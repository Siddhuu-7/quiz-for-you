let questionCount = 0; 

// Function to display room details
function displayRoomDetails() {
    const roomName = localStorage.getItem("roomName");
    const roomId = localStorage.getItem("roomId");

    if (roomName && roomId) {
        const roomDetailsDiv = document.getElementById("room-details");
        roomDetailsDiv.innerHTML = `<h2>Room: ${roomName} (ID: ${roomId})</h2>`;
    } else {
        console.log("Room details not found in localStorage.");
    }
}

// Call the function to display room details when the page loads
window.onload = function() {
    displayRoomDetails();
};

// Function to add question and POST data
document.addEventListener("DOMContentLoaded", function() {
    const numQuestionsInput = document.getElementById("number-of-questions");
    
    numQuestionsInput.addEventListener("input", function() {
        const numQuestionsLimit = parseInt(numQuestionsInput.value, 10);

        // Check if the input is valid
        if (isNaN(numQuestionsLimit) || numQuestionsLimit < 3 || numQuestionsLimit > 50) {
            numQuestionsInput.classList.add("invalid-input"); // Add red border
        } else {
            numQuestionsInput.classList.remove("invalid-input"); // Remove red border
        }
    });
});

function questionsAdd() {
    const numQuestionsInput = document.getElementById("number-of-questions");
    const numQuestionsLimit = parseInt(numQuestionsInput.value, 10);
    
    // Additional validation if needed before adding questions
    if (isNaN(numQuestionsLimit) || numQuestionsLimit < 3 || numQuestionsLimit > 50) {
        alert("Please enter a number between 3 and 50.");
        return;
    }

    // Your logic to add the question goes here...
    if (questionCount >= numQuestionsLimit) {
        alert("Question limit exceeded! And Set Time For your Room");
        return;
    }

    const roomName = localStorage.getItem("roomName");
    const roomId = localStorage.getItem("roomId");

    // Check if the number of questions entered exceeds the limit
    if (questionCount >= numQuestionsLimit) {
        alert("Question limit exceeded! And Set Time For your Room");
        return; // Prevent further questions from being added
    } 

    // Show time button if reaching limit
    if (questionCount + 1 === numQuestionsLimit) {
        document.getElementById("time-button").style.display = "block";
    }

    const questionText = document.getElementById("question").value;
    const option1Text = document.getElementById("option1").value;
    const option2Text = document.getElementById("option2").value;
    const option3Text = document.getElementById("option3").value;
    const option4Text = document.getElementById("option4").value;
    const correctText = document.getElementById("correct").value;
    
    if (questionText.trim() !== "" && option1Text && option2Text && option3Text && option4Text && correctText) {
        // Create and display question
        const view = document.getElementById("entered-questions");

        const questionDiv = document.createElement("div");
        questionDiv.classList.add("question-item");

        const questionElement = document.createElement("p");
        questionElement.innerText = `Question: ${questionText} ?`;
        questionDiv.appendChild(questionElement);

        const optionsDiv = document.createElement("div");
        optionsDiv.classList.add("options-list");

        const option1Element = document.createElement("p");
        option1Element.innerText = `1. ${option1Text}`;
        optionsDiv.appendChild(option1Element);
        
        const option2Element = document.createElement("p");
        option2Element.innerText = `2. ${option2Text}`;
        optionsDiv.appendChild(option2Element);
        
        const option3Element = document.createElement("p");
        option3Element.innerText = `3. ${option3Text}`;
        optionsDiv.appendChild(option3Element);
        
        const option4Element = document.createElement("p");
        option4Element.innerText = `4. ${option4Text}`;
        optionsDiv.appendChild(option4Element);

        const correctElement = document.createElement("p");
        correctElement.innerText = `Correct Answer: ${correctText}`;
        correctElement.style.backgroundColor = "lightgreen"; 
        optionsDiv.appendChild(correctElement);

        questionDiv.appendChild(optionsDiv);
        view.appendChild(questionDiv);

        // Increment the question count
        questionCount++;

        // Clear input fields
        document.getElementById("question").value = "";
        document.getElementById("option1").value = "";
        document.getElementById("option2").value = "";
        document.getElementById("option3").value = "";
        document.getElementById("option4").value = "";
        document.getElementById("correct").innerHTML = "<option value=''>Select the correct answer</option>"; // Clear the dropdown

        // POST request data
        const postData = {
            roomName: localStorage.getItem("roomName"),
            roomId: Number(localStorage.getItem("roomId")),
            question: questionText,
            options: [option1Text, option2Text, option3Text, option4Text],
            Answer: correctText
        };

        fetch("https://backend-d485.onrender.com/api/post", {
            method: "POST", 
            headers: {
                "Content-Type": "application/json", 
            },
            body: JSON.stringify(postData), 
        })
        .then(response => response.json())
        .then(data => {
            console.log("Success:", data);
        })
        .catch((error) => {
            console.error("Error:", error);
        });
    } else {
        alert("Please fill in all fields before submitting!");
    }
}

// Function to open the modal
function closeModal() {
    document.getElementById("modalOverlay").style.display = "none";
}

// Function to save time from modal
function save_time() {
    const startTime = document.getElementById("datetimeStart").value;
    const endTime = document.getElementById("datetimeEnd").value;
    const roomId = localStorage.getItem("roomId");
    const roomName = localStorage.getItem("roomName");
    const roomPassword = localStorage.getItem("roomPassword");
    
    if (startTime && endTime && roomId && roomPassword) {
        const timeData = {
            roomId: roomId,
            startTime: startTime,
            endingTime: endTime
        };
        const rooms = {
            roomId: roomId,
            roomName: roomName,
            startTime: startTime,
            endingTime: endTime,
            roomPassword: roomPassword,
            userEmail: localStorage.getItem('email')
        };

        fetch('https://backend-d485.onrender.com/api/saveTime', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(timeData),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            alert('Time saved successfully!');
            closeModal(); 
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('There was an error saving the time.');
        });

        fetch('https://backend-d485.onrender.com/api/rooms', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(rooms),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    } else {
        alert('Please set both start and end time.');
    }
}

// Update the correct answer dropdown based on the options provided
const optionFields = ["option1", "option2", "option3", "option4"];
optionFields.forEach(field => {
    document.getElementById(field).addEventListener("input", updateCorrectAnswerDropdown);
});

function updateCorrectAnswerDropdown() {
    const correctDropdown = document.getElementById("correct");
    correctDropdown.innerHTML = "<option value=''>Select the correct answer</option>"; 

    optionFields.forEach(field => {
        const optionValue = document.getElementById(field).value;
        if (optionValue.trim() !== "") {
            const optionElement = document.createElement("option");
            optionElement.value = optionValue;
            optionElement.textContent = optionValue;
            correctDropdown.appendChild(optionElement);
        }
    });
}

document.getElementById("time-button").addEventListener("click", () => {
    document.getElementById("modalOverlay").style.display = "flex";
});
 
document.getElementById("x").addEventListener("click",()=>{
    document.getElementById("modalOverlay").style.display="none";
})