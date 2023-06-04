let applicants = [];
let roomAssignments = {};

document.getElementById('room-assignment-form').addEventListener('submit', function(e) {
    e.preventDefault();
    let applicantData = e.target.elements.applicants.value.split('\n');
    applicantData.forEach((data) => {
        let [name, priority, rooms] = data.split(',');
        let roomPreferences = rooms.split(' ').map(Number);
        applicants.push({ name, priority: Number(priority), roomPreferences });

        // Display the applicant data
        let applicantDiv = document.createElement('div');
        applicantDiv.textContent = `Name: ${name}, Priority: ${priority}, Room Preferences: ${rooms}`;
        document.getElementById('applicant-display').appendChild(applicantDiv);
    });

    // Clear the textarea and show a notification
    e.target.elements.applicants.value = '';
    alert('Data has been entered successfully!');
});

document.getElementById('generate-assignments').addEventListener('click', function() {
    // Modify the sort function to treat higher values as higher priority
    applicants.sort((a, b) => b.priority - a.priority);
    roomAssignments = {};
    for (let applicant of applicants) {
        for (let room of applicant.roomPreferences) {
            if (!roomAssignments[room]) {
                roomAssignments[room] = applicant.name;
                break;
            }
        }
    }
    displayRoomAssignments();
});
function displayRoomAssignments() {
    let displayDiv = document.getElementById('room-assignments');
    displayDiv.innerHTML = '';
    for (let room in roomAssignments) {
        let owner = roomAssignments[room];
        let p = document.createElement('p');
        p.textContent = `Room ${room}: ${owner}`;
        displayDiv.appendChild(p);
    }
}
