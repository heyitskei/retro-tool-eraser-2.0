window.onload = () => {
    function waitUntilReady() {
        const isReadyToGo = !! document.querySelector('[data-cy="public-section"]')

        if (!isReadyToGo) {
            setTimeout(waitUntilReady, 500)
            return;
        }

        main();
    }

    waitUntilReady();
}

function main() {
    const eraserButton = createBtn("🗑️ Erase Board", true);
    const shufflerButton = createBtn("🎲 Shuffle Board", false);

    eraserButton.addEventListener('click', ()=>{
        const deleteButtons = document.querySelectorAll('[data-cy="public-section"]  [data-cy="delete"]');
        deleteButtons.forEach((button) => button.click());
    });

    shufflerButton.addEventListener('click', () => {
        const columns = document.querySelectorAll('[data-cy="board"]');

        columns.forEach(column => {
            const cards = Array.from(column.querySelectorAll('[data-cy="card"]'));

            if (cards.length > 0) {
                const container = cards[0].parentElement;
                shuffleArray(cards);

                cards.forEach(card => container.appendChild(card));
            }
        });
    });

    const roomName = document.querySelector('[data-cy="room-name"]');
    roomName.appendChild(eraserButton);
    roomName.appendChild(shufflerButton);
}

const shuffleArray = (array) => {
    let currentIndex = array.length, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]
        ];
    }

    return array;
}

const createBtn = (text, isErase) => {
    const btn = document.createElement('button');
    btn.textContent = text;

    Object.assign(btn.style, {
        padding: "6px 12px",
        margin: "8px 5px 0 5px",
        borderRadius: "8px",
        border: "1px solid #13ab80",
        backgroundColor: isErase ? "#fff0f0" : "#e6f7f3",
        color: isErase ? "#d93025" : "#13ab80",
        fontWeight: "bold",
        fontSize: "12px",
        cursor: "pointer",
        transition: "all 0.2s ease",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        fontFamily: "inherit"
    });

    btn.onmouseover = () => {
        btn.style.transform = "translateY(-1px)";
        btn.style.boxShadow = "0 4px 8px rgba(0,0,0,0.15)";
        btn.style.backgroundColor = isErase ? "#fde8e8" : "#13ab80";
        btn.style.color = isErase ? "#d93025" : "white";
    };
    btn.onmouseout = () => {
        btn.style.transform = "translateY(0)";
        btn.style.boxShadow = "0 2px 4px rgba(0,0,0,0.1)";
        btn.style.backgroundColor = isErase ? "#fff0f0" : "#e6f7f3";
        btn.style.color = isErase ? "#d93025" : "#13ab80";
    };

    return btn;
};
