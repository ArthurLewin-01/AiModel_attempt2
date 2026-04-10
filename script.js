// WAIT FOR PAGE LOAD
document.addEventListener("DOMContentLoaded", () => {

    // QUICK CHAT BUTTON
    document.getElementById("quickChatBtn").addEventListener("click", () => {
        document.getElementById("normalChat").style.display = "none";
        document.getElementById("videoContainer").classList.remove("hidden");
    });

    // AI COMPANION BUTTON (opens modal)
    document.getElementById("companionBtn").addEventListener("click", () => {
        document.getElementById("setupModal").classList.remove("hidden");
    });

    // CLOSE MODAL
    document.getElementById("cancelSetup").addEventListener("click", () => {
        document.getElementById("setupModal").classList.add("hidden");
    });

    // SEND BUTTON
    document.getElementById("sendBtn").addEventListener("click", sendMessage);

    // ENTER KEY SUPPORT
    document.getElementById("messageInput").addEventListener("keypress", (e) => {
        if (e.key === "Enter") sendMessage();
    });

});


// SEND MESSAGE FUNCTION
function sendMessage() {
    const input = document.getElementById("messageInput");
    const message = input.value;

    if (!message) return;

    addMessage(message, "user");
    input.value = "";
}


// ADD MESSAGE UI
function addMessage(text, sender) {
    const msg = document.createElement("div");

    msg.className = `chat-bubble p-3 rounded-xl max-w-[80%] ${
        sender === "user"
            ? "ml-auto bg-blue-500 text-white"
            : "mr-auto bg-white/20 text-white"
    }`;

    msg.innerText = text;

    const chat = document.getElementById("chatMessages");
    chat.appendChild(msg);

    // AUTO SCROLL
    chat.scrollTop = chat.scrollHeight;
}
