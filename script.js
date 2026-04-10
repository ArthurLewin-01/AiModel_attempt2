let chats = [];
let currentChatId = null;

// LOAD
document.addEventListener("DOMContentLoaded", () => {

    document.getElementById("quickChatBtn").onclick = startNewChat;
    document.getElementById("backBtn").onclick = goHome;
    document.getElementById("sendBtn").onclick = sendMessage;
    document.getElementById("toggleSidebar").onclick = toggleSidebar;
    document.getElementById("newChatBtn").onclick = startNewChat;

    document.getElementById("messageInput").addEventListener("keypress", (e) => {
        if (e.key === "Enter") sendMessage();
    });

    document.getElementById("searchChat").addEventListener("input", renderChats);

});

// START NEW CHAT
function startNewChat() {
    const id = Date.now();

    chats.push({
        id,
        name: "New Chat",
        messages: []
    });

    currentChatId = id;

    document.getElementById("homeScreen").classList.add("hidden");
    document.getElementById("chatScreen").classList.remove("hidden");

    document.getElementById("chatMessages").innerHTML = "";

    renderChats();
}

// GO BACK HOME
function goHome() {
    document.getElementById("chatScreen").classList.add("hidden");
    document.getElementById("homeScreen").classList.remove("hidden");

    currentChatId = null;
}

// SEND MESSAGE
function sendMessage() {
    const input = document.getElementById("messageInput");
    const text = input.value.trim();

    if (!text) return;

    addMessage(text, "user");

    const chat = chats.find(c => c.id === currentChatId);
    chat.messages.push({ text, sender: "user" });

    input.value = "";

    // FAKE AI REPLY
    setTimeout(() => {
        const reply = "AI: " + text;
        addMessage(reply, "ai");
        chat.messages.push({ text: reply, sender: "ai" });
    }, 500);
}

// ADD MESSAGE UI
function addMessage(text, sender) {
    const div = document.createElement("div");

    div.className = `p-2 rounded max-w-[70%] ${
        sender === "user"
            ? "ml-auto bg-blue-500"
            : "bg-gray-700"
    }`;

    div.innerText = text;

    document.getElementById("chatMessages").appendChild(div);
}

// SIDEBAR TOGGLE
function toggleSidebar() {
    const sidebar = document.getElementById("sidebar");

    if (sidebar.classList.contains("hidden")) {
        sidebar.classList.remove("hidden");
        sidebar.classList.add("flex");
    } else {
        sidebar.classList.add("hidden");
        sidebar.classList.remove("flex");
    }

    renderChats();
}

// RENDER CHAT LIST
function renderChats() {
    const container = document.getElementById("chatHistory");
    const search = document.getElementById("searchChat").value.toLowerCase();

    container.innerHTML = "";

    chats
        .filter(c => c.name.toLowerCase().includes(search))
        .forEach(chat => {
            const div = document.createElement("div");

            div.className = "p-2 bg-gray-700 rounded cursor-pointer flex justify-between items-center";

            div.innerHTML = `
                <span>${chat.name}</span>
                <button onclick="deleteChat(${chat.id})">❌</button>
            `;

            div.onclick = () => openChat(chat.id);

            container.appendChild(div);
        });
}

// OPEN CHAT
function openChat(id) {
    currentChatId = id;

    const chat = chats.find(c => c.id === id);

    document.getElementById("chatMessages").innerHTML = "";

    chat.messages.forEach(msg => {
        addMessage(msg.text, msg.sender);
    });

    document.getElementById("homeScreen").classList.add("hidden");
    document.getElementById("chatScreen").classList.remove("hidden");
}

// DELETE CHAT
function deleteChat(id) {
    chats = chats.filter(c => c.id !== id);
    renderChats();

    if (currentChatId === id) {
        goHome();
    }
}

