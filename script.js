// PAGE LOAD
document.addEventListener("DOMContentLoaded", () => {

    const home = document.getElementById("homeScreen");
    const chat = document.getElementById("chatScreen");
    const modal = document.getElementById("setupModal");

    // QUICK CHAT
    document.getElementById("quickChatBtn").onclick = () => {
        home.style.display = "none";
        chat.classList.remove("hidden");
    };

    // AI COMPANION
    document.getElementById("companionBtn").onclick = () => {
        modal.classList.remove("hidden");
    };

    // CLOSE MODAL
    document.getElementById("closeModal").onclick = () => {
        modal.classList.add("hidden");
    };

    // BACK BUTTON
    document.getElementById("backBtn").onclick = () => {
        chat.classList.add("hidden");
        home.style.display = "flex";
    };

    // SEND MESSAGE
    document.getElementById("sendBtn").onclick = sendMessage;

    document.getElementById("messageInput").addEventListener("keypress", (e) => {
        if (e.key === "Enter") sendMessage();
    });

    // IMAGE PREVIEW
    document.getElementById("personImage").addEventListener("change", function () {
        const file = this.files[0];
        if (!file) return;

        const reader = new FileReader();

        reader.onload = function (e) {
            document.getElementById("imagePreview").innerHTML =
                `<img src="${e.target.result}" class="w-full h-full object-cover">`;
        };

        reader.readAsDataURL(file);
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

    msg.className = sender === "user"
        ? "bg-blue-500 p-2 rounded ml-auto max-w-xs"
        : "bg-gray-700 p-2 rounded mr-auto max-w-xs";

    msg.innerText = text;

    const chat = document.getElementById("chatMessages");
    chat.appendChild(msg);

    chat.scrollTop = chat.scrollHeight;
}
