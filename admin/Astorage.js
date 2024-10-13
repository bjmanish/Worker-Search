// Load workers from localStorage
function loadWorkers() {
    const workers = JSON.parse(localStorage.getItem('workers')) || [];
    return workers;
}

// Save workers to localStorage
function saveWorkers(workers) {
    localStorage.setItem('workers', JSON.stringify(workers));
}

// Render workers list in card format
function renderWorkers(workers) {
    const workersList = document.getElementById('workersList');
    workersList.innerHTML = '';

    workers.forEach(worker => {
        const col = document.createElement('div');
        col.className = 'col-md-4';

        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <div class="card-header">
                <h5 class="card-title">${worker.name}</h5>
                <div>
                    <button class="btn btn-info btn-sm" onclick="editWorker(${worker.id})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-danger btn-sm" onclick="deleteWorker(${worker.id})">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </div>
            </div>
            <div class="card-body">
                <h6 class="card-subtitle mb-2 text-muted">${worker.profession}</h6>
                <p class="card-text">Location: ${worker.location}</p>
                <p class="card-text">Contact: ${worker.contact}</p>
                <p class="card-text">Schedule: ${worker.schedule}</p>
            </div>
        `;
        col.appendChild(card);
        workersList.appendChild(col);
    });
}

// Add or edit worker
document.getElementById('workerForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form from reloading the page

    const workerId = document.getElementById('workerId') ? document.getElementById('workerId').value : null;
    const workerName = document.getElementById('workerName').value;
    const workerProfession = document.getElementById('workerProfession').value;
    const workerLocation = document.getElementById('workerLocation').value;
    const workerContact = document.getElementById('workerContact').value;
    const workerSchedule = document.getElementById('workerSchedule').value;

    if (validateWorker(workerName, workerProfession, workerLocation, workerContact, workerSchedule)) {
        const newWorker = {
            id: workerId ? workerId : Date.now(), // Unique ID for the worker
            name: workerName,
            profession: workerProfession,
            location: workerLocation,
            contact: workerContact,
            schedule: workerSchedule
        };

        const workers = loadWorkers();
        if (workerId) {
            // Update existing worker
            const index = workers.findIndex(worker => worker.id == workerId);
            if (index !== -1) {
                workers[index] = newWorker;
            }
        } else {
            // Add new worker
            workers.push(newWorker);
        }
        saveWorkers(workers); // Save updated workers list to localStorage
        renderWorkers(workers); // Re-render the workers list
        document.getElementById('workerForm').reset(); // Reset the form
    } else {
        alert('Please fill out all fields correctly.');
    }
});

// Validate worker input
function validateWorker(name, profession, location, contact, schedule) {
    return name && profession && location && contact && schedule;
}

// Edit worker
function editWorker(workerId) {
    const workers = loadWorkers();
    const worker = workers.find(worker => worker.id == workerId);
    if (worker) {
        document.getElementById('workerName').value = worker.name;
        document.getElementById('workerProfession').value = worker.profession;
        document.getElementById('workerLocation').value = worker.location;
        document.getElementById('workerContact').value = worker.contact;
        document.getElementById('workerSchedule').value = worker.schedule;

        // Set hidden input for worker ID
        let hiddenInput = document.getElementById('workerId');
        if (!hiddenInput) {
            hiddenInput = document.createElement('input');
            hiddenInput.type = 'hidden';
            hiddenInput.id = 'workerId';
            document.getElementById('workerForm').appendChild(hiddenInput);
        }
        hiddenInput.value = workerId; // Set worker ID for editing
    }
}

// Delete worker
function deleteWorker(workerId) {
    let workers = loadWorkers();
    workers = workers.filter(worker => worker.id != workerId); // Remove the worker
    saveWorkers(workers); // Save updated list
    renderWorkers(workers); // Re-render the workers list
}

// Clear the form
document.getElementById('clearForm').addEventListener('click', function() {
    document.getElementById('workerForm').reset();
    const hiddenInput = document.getElementById('workerId');
    if (hiddenInput) {
        hiddenInput.remove(); // Remove hidden ID input if exists
    }
});

// Search workers by location
document.getElementById('location').addEventListener('input', function() {
    const query = this.value.toLowerCase();
    const workers = loadWorkers();
    const filteredWorkers = workers.filter(worker => worker.location.toLowerCase().includes(query));
    renderWorkers(filteredWorkers);
});

// Initial load of workers when the page loads
document.addEventListener('DOMContentLoaded', renderWorkers(loadWorkers()));