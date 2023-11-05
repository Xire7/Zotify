var cardsList = document.getElementsByClassName("card");

function hideAll() {
    for (var card of cardsList) {
        card.classList.add("hidden");
    }
}


var optionsList = document.getElementsByClassName("updateTime");

for (var option of optionsList) {
    option.addEventListener("click", updateTime, false);
}

function updateTime() {
    hideAll();
    switch(this.innerHTML) {
        case "One Month":
            updateShort();
            break;
        case "Six Months":
            updateMedium();
            break;
        case "All Time":
            updateLong();
            break;
    }
}

function updateShort() {
    for (var card of document.getElementsByClassName("short"))
        card.classList.remove("hidden");
}

function updateMedium() {
    updateShort();
    for (var card of document.getElementsByClassName("medium"))
        card.classList.remove("hidden");
}

function updateLong() {
    updateShort();
    updateMedium();
    for (var card of document.getElementsByClassName("long"))
        card.classList.remove("hidden");
}

