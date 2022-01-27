const primiBtn = document.getElementById("primi");

async function primiPoruku() {
    const chatRoomId = primiBtn.dataset.chatroomid;
    //console.log(chatRoomId);
    const res = await fetch(`/chat-room/${chatRoomId}/poruke`);
    const data = await res.json();
    console.log(data);
}

primiBtn.addEventListener("click", primiPoruku);