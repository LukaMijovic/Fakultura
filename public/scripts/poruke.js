
const primiBtn = document.getElementById("primi");
const posaljiBtn = document.getElementById("posalji");
const prostorZaPoruke = document.getElementById("prostorZaPoruke");
const formaZaSlanjePoruka = document.getElementById("formaZaSlanjePoruka");
const prostorZaPoruku = document.getElementById("poruka");

function napraviChat(poruke) {
    const chatLista = document.createElement("ol");

    for (const poruka of poruke) {
        const porukaElement = document.createElement("li")
        porukaElement.innerHTML = `
            <div class="poruka">
                <h3>IME:</h3>
                <p>${poruka.tekstPoruke}</p>
            </div> 
        `;
        chatLista.appendChild(porukaElement);
    }
    return chatLista;
}

async function primiPoruku() {
    const chatRoomId = primiBtn.dataset.chatroomid;
    //console.log(chatRoomId);
    const res = await fetch(`/chat-room/${chatRoomId}/poruke`);
    const data = await res.json();
    console.log(data);

    const listaPoruka = napraviChat(data);
    prostorZaPoruke.innerHTML = "";
    prostorZaPoruke.appendChild(listaPoruka);
}

async function posaljiPoruku(event) {
    event.preventDefault();

    const chatRoomId = posaljiBtn.dataset.chatroomid;

    const unesenaPoruka = prostorZaPoruku.value;

    const poruka = {
        tekstPoruke: unesenaPoruka,
        faksId: chatRoomId,
        autor: "TestIme"
    };

    const res = await fetch(`/chat-room/${chatRoomId}/poruke`, {
        method: "POST",
        body: JSON.stringify(poruka),
        headers: {
            "Content-Type": "application/json",
        }
    });

    prostorZaPoruku.value = "";

    primiPoruku();
}

primiBtn.addEventListener("click", primiPoruku);
formaZaSlanjePoruka.addEventListener("submit", posaljiPoruku);