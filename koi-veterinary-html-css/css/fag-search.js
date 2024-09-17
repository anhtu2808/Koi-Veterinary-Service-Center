document.getElementById('searchInput').addEventListener('input', function() {
    let filter = this.value.toLowerCase();
    let items = document.getElementsByClassName('accordion-item');
    for (let i = 0; i < items.length; i++) {
        let question = items[i].getElementsByClassName('accordion-button')[0].textContent;
        if (question.toLowerCase().indexOf(filter) > -1) {
            items[i].style.display = "";
        } else {
            items[i].style.display = "none";
        }
    }
});
