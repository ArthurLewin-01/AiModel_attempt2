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

    // ENTER KEY SUPPORT
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


// SEND MESSAGE FUNCTION (UPDATED WITH AI REPLY)
function sendMessage() {
    const input = document.getElementById("messageInput");
    const message = input.value.trim();

    if (!message) return;

    addMessage(message, "user");
    input.value = "";

    // FAKE AI THINKING DELAY
    setTimeout(() => {
        const reply = generateReply(message);
        addMessage(reply, "ai");
    }, 600);
}


// SIMPLE AI REPLY SYSTEM
function generateReply(msg) {
    msg = msg.toLowerCase();

    if (msg.includes("hello") || msg.includes("hi")) {
        return "Hey! 👋 How can I help you today?";
    }

    if (msg.includes("how are you")) {
        return "I'm doing great 😄 What about you?";
    }

    if (msg.includes("your name")) {
        return "I'm your AI companion 🤖";
    }

    if (msg.includes("bye")) {
        return "Goodbye! 👋 Come back soon.";
    }

    if (msg.includes("help")) {
        return "Sure! Ask me anything 😎";
    }

    // RANDOM REPLIES
    const randomReplies = [
        "That's interesting 🤔",
        "Tell me more about that!",
        "I see 👀",
        "Hmm... explain that a bit more?",
        "Sounds cool 😎",
        "I'm listening..."
    ];

    return randomReplies[Math.floor(Math.random() * randomReplies.length)];
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
