const rooms = document.getElementById("rooms");
const liveRoomsButton = document.getElementById("live-rooms");

async function fetchRooms() {
    if (rooms.style.display === "none" || rooms.style.display === "") {
        rooms.style.display = "block";
        liveRoomsButton.textContent = "Hide Rooms"; 

        try {
            const response = await fetch('https://backend-d485.onrender.com/api/roomsDetails'); 
            const data = await response.json(); 
            
            rooms.innerHTML = "";

            if (data.length === 0) {
                rooms.innerHTML = `<h4>No available rooms at this moment</h4>`;
            } else {
                const currentTime = getFormattedDateTime(); 

                data.forEach((room) => {
                    // Check if current time is before the room's ending time
                    if (currentTime < room.endingTime) {
                        const roomDiv = document.createElement("div");
                        roomDiv.classList.add("room-container");

                        const startTime = document.createElement("div");
                        startTime.classList.add("start-time");
                        startTime.textContent = `Start Time: ${formatTime(room.startTime)}`;

                        const endTime = document.createElement("div");
                        endTime.classList.add("end-time");
                        endTime.textContent = `End Time: ${formatTime(room.endingTime)}`;

                        const roomIdLabel = document.createElement("label");
                        roomIdLabel.textContent = "Room ID:";
                        const roomIdField = document.createElement("div");
                        roomIdField.classList.add("form-field");
                        roomIdField.textContent = room.roomId;

                        const roomNameLabel = document.createElement("label");
                        roomNameLabel.textContent = "Room Name:";
                        const roomNameField = document.createElement("div");
                        roomNameField.classList.add("form-field");
                        roomNameField.textContent = room.roomName;

                        roomDiv.appendChild(startTime);  
                        roomDiv.appendChild(roomIdLabel);
                        roomDiv.appendChild(roomIdField);
                        roomDiv.appendChild(roomNameLabel);
                        roomDiv.appendChild(roomNameField);
                        roomDiv.appendChild(endTime); 
                        
                        rooms.appendChild(roomDiv);
                    

                    }
                });
            }
        } catch (error) {
            console.error("Error fetching rooms:", error);
            rooms.innerHTML = `<h4>Error fetching rooms. Please try again later.</h4>`;
        }
    } else {
        rooms.style.display = "none";
        liveRoomsButton.textContent = "Live Rooms"; 
    }
}

function getFormattedDateTime() {
    const now = new Date();
    
    const year = now.getFullYear();
    let month = now.getMonth() + 1;  
    let day = now.getDate();
    
    let hours = now.getHours();  
    let minutes = now.getMinutes();
    
    month = month < 10 ? '0' + month : month;
    day = day < 10 ? '0' + day : day;
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    
    return `${year}-${month}-${day}T${hours}:${minutes}`;
}

function formatTime(isoString) {
    const date = new Date(isoString);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
}

liveRoomsButton.addEventListener("click", fetchRooms);
