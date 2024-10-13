// Search workers by location
document.getElementById('location').addEventListener('input', function() {
    const query = this.value.toLowerCase();
    const workers = loadWorkers();
    const filteredWorkers = workers.filter(worker => worker.location.toLowerCase().includes(query));
    renderWorkers(filteredWorkers);
});

// Initial load of workers when the page loads
document.addEventListener('DOMContentLoaded', renderWorkers(loadWorkers()));