function toggleRoomDetails() {
    const details = document.querySelector(".Details");
    const enterRoom = document.querySelector(".enter-room");

    // If Details section is hidden, display it and hide Enter Room section
    if (details.style.display === "none" || details.style.display === "") {
        details.style.display = "block";
        // enterRoom.style.display = "none";
    } else {
        details.style.display = "none";
    }
}

// Function to toggle Enter Room section
// function toggleEnterRoom() {
//     const enterRoom = document.querySelector(".enter-room");
//     const details = document.querySelector(".Details");

//     // If Enter Room section is hidden, display it and hide Details section
//     if (enterRoom.style.display === "none" || enterRoom.style.display === "") {
//         enterRoom.style.display = "block";
//         details.style.display = "none";
//     } else {
//         enterRoom.style.display = "none";
//     }
// }

async function roomCheck(roomId) {
    try {
        const response = await fetch(`https://quiz-for-you-8759.onrender.com//api/roomsDetails/${roomId}`);
        if (!response.ok) {
            console.error("Error with response:", response.status);
            return false;
        }

        const data = await response.json();
        console.log("Room Check Data:", data); 

        return Array.isArray(data) && data.length > 0; 
    } catch (error) {
        console.error("Fetch error:", error);
        return false;
    }
}





 async function saveRoomDetails() {
    const roomName = document.getElementById("name").value;
    const roomId = document.getElementById("room-id").value || document.getElementById("enter-room-id").value;
    const roomPassword=document.getElementById("room-password").value;
    const roomEmail=document.getElementById("email").value;
    console.log(roomId, roomName);
    
    if( await roomCheck(roomId)){
        document.getElementById('check').innerText=`There is Room In This Id ${roomId} Kindly set Another Id`;
        document.getElementById('check').style.display='block';
        // alert(`There is Room In This Id ${roomId} Kindly set Another Id`);
        return;
    }



    
    if (roomName && roomId &&roomPassword) {
        localStorage.setItem("roomName", roomName);
        localStorage.setItem("roomId", roomId);
        localStorage.setItem("roomPassword",roomPassword);
        localStorage.setItem("email",roomEmail);
        alert(`Room ${roomName} with ID ${roomId} has been saved password and ID Will send to ${roomEmail}.`);

        
        window.location.assign('questions.html');
    } else {
        alert("Please enter All room name and ID!");
    }
}

// Function to update the time dynamically
function updateTime() {
    const timeElement = document.getElementById('Time');
    const currentTime = new Date();
    const hours = String(currentTime.getHours()).padStart(2, '0');
    const minutes = String(currentTime.getMinutes()).padStart(2, '0');
    const seconds = String(currentTime.getSeconds()).padStart(2, '0');
    timeElement.innerText = `${hours}:${minutes}:${seconds}`;
}

// Function to enter the test room
function enterTestRoom() {
    window.open("testRoom.html", "_blank");
}

// Function to format the date and time

// Update the time every second
setInterval(updateTime, 1000);
updateTime();