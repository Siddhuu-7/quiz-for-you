

function fetchData() {
    const roomId = Number(document.getElementById("roomId").value.trim());
    const divId = document.getElementById("participants");
    const messageDiv = document.getElementById("message");

    if (roomId) {
        fetch(`https://backend-d485.onrender.com/api/participants/${roomId}`)
            .then(res => res.json())
            .then(data => {
                divId.innerHTML = '';
                messageDiv.textContent = '';

                if (data.length === 0) {
                    messageDiv.textContent = 'No scoreboard for this ID.';
                } else {
                    document.getElementById("roomId").style.display = 'none';
                    document.querySelector("button").style.display = 'none';
                    updateScoreboard(data);
                }
            })
            .catch(err => console.error('Error fetching participants:', err));
    } else {
        messageDiv.textContent = `Enter Room Id`;
    }
}
function updateScoreboard(data) {
    const divId = document.getElementById("participants");
    divId.innerHTML = ''; // Clear existing participants

    // Sort participants by score in descending order
    const sortedParticipants = data.sort((a, b) => b.score - a.score);

    // Apply classes for top 3 participants
    sortedParticipants.forEach((element, index) => {
        const child = document.createElement("div");
        child.classList.add('participant', 'new'); // Add animation class

        // Apply specific classes for 1st, 2nd, and 3rd places
        if (index === 0) {
            child.classList.add('gold');
        } else if (index === 1) {
            child.classList.add('silver');
        } else if (index === 2) {
            child.classList.add('bronze');
        }

        child.innerHTML = `<span>${letters(element.userName)}</span><span class="score">${element.score}</span>`;
        divId.appendChild(child); // Append each participant to the div
    });
}

function letters(name)
{
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
}