// When page loads
document.addEventListener("DOMContentLoaded", () => {

    // Send button click
    document.getElementById("sendBtn").addEventListener("click", sendMessage);

    // Enter key support
    document.getElementById("messageInput").addEventListener("keypress", function(e) {
        if (e.key === "Enter") {
            sendMessage();
        }
    });

});

async function sendMessage() {
    const input = document.getElementById("messageInput");
    const message = input.value;

    if (!message) return;

    addMessage(message, "user");
    input.value = "";

    try {
        const res = await fetch("http://localhost:3000/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ message })
        });

        const data = await res.json();

        addMessage(data.reply, "ai");

    } catch (err) {
        addMessage("Error connecting to AI", "ai");
    }
}

function addMessage(text, sender) {
    const msg = document.createElement("div");

    msg.className = `chat-bubble p-3 rounded-xl max-w-[80%] ${
        sender === "user"
            ? "ml-auto bg-blue-500 text-white"
            : "mr-auto bg-white/20 text-white"
    }`;

    msg.innerText = text;

    document.getElementById("chatMessages").appendChild(msg);

    // auto scroll
    document.getElementById("chatMessages").scrollTop =
        document.getElementById("chatMessages").scrollHeight;
}
