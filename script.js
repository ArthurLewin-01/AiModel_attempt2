let chats = JSON.parse(localStorage.getItem("chats")) || [];
let currentChatId = null;

// INIT
document.addEventListener("DOMContentLoaded", () => {
    loadChats();

    document.getElementById("newChatBtn").onclick = createNewChat;
    document.getElementById("sendBtn").onclick = sendMessage;

    document.getElementById("messageInput").addEventListener("keypress", (e) => {
        if (e.key === "Enter") sendMessage();
    });

    document.getElementById("searchChat").addEventListener("input", searchChats);

    document.getElementById("backBtn").onclick = () => {
        document.getElementById("chatScreen").classList.add("hidden");
        document.getElementById("homeScreen").style.display = "flex";
    };

    document.getElementById("quickChatBtn").onclick = () => {
        document.getElementById("homeScreen").style.display = "none";
        document.getElementById("chatScreen").classList.remove("hidden");

        if (!currentChatId) createNewChat();
    };

    // IMAGE PREVIEW
    document.getElementById("personImage").addEventListener("change", function () {
        const file = this.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            document.getElementById("imagePreview").innerHTML =
                `<img src="${e.target.result}" class="w-full h-full object-cover">`;
        };
        reader.readAsDataURL(file);
    });
});


// CREATE NEW CHAT
function createNewChat() {
    const newChat = {
        id: Date.now(),
        name: "New Chat",
        messages: []
    };

    chats.unshift(newChat);
    currentChatId = newChat.id;

    saveChats();
    loadChats();
    renderMessages();
}


// LOAD CHAT LIST
function loadChats(filtered = chats) {
    const container = document.getElementById("chatHistory");
    container.innerHTML = "";

    filtered.forEach(chat => {
        const div = document.createElement("div");
        div.className = "p-2 bg-gray-700 rounded flex justify-between items-center cursor-pointer";

        div.innerHTML = `
            <span onclick="openChat(${chat.id})">${chat.name}</span>
            <button onclick="showOptions(${chat.id})">⋮</button>
        `;

        container.appendChild(div);
    });
}


// OPEN CHAT
function openChat(id) {
    currentChatId = id;

    document.getElementById("homeScreen").style.display = "none";
    document.getElementById("chatScreen").classList.remove("hidden");

    renderMessages();
}


// RENDER MESSAGES
function renderMessages() {
    const chat = chats.find(c => c.id === currentChatId);
    const container = document.getElementById("chatMessages");

    container.innerHTML = "";

    if (!chat) return;

    chat.messages.forEach(m => {
        addMessage(m.text, m.sender, false);
    });
}


// SEND MESSAGE
function sendMessage() {
    const input = document.getElementById("messageInput");
    const message = input.value.trim();

    if (!message || !currentChatId) return;

    const chat = chats.find(c => c.id === currentChatId);

    chat.messages.push({ text: message, sender: "user" });

    addMessage(message, "user");

    input.value = "";

    setTimeout(() => {
        const reply = generateReply(message);
        chat.messages.push({ text: reply, sender: "ai" });

        addMessage(reply, "ai");
        saveChats();
    }, 500);

    saveChats();
}


// SIMPLE AI (same as before)
function generateReply(msg) {
    msg = msg.toLowerCase();

    if (msg.includes("hello")) return "Hey there 👋";
    if (msg.includes("how are you")) return "I'm good 😄";
    if (msg.includes("bye")) return "Bye 👋";

    const replies = [
        "Interesting 🤔",
        "Tell me more!",
        "Nice!",
        "Hmm..."
    ];

    return replies[Math.floor(Math.random() * replies.length)];
}


// ADD MESSAGE
function addMessage(text, sender, save = true) {
    const msg = document.createElement("div");

    msg.className = sender === "user"
        ? "bg-blue-500 p-2 rounded ml-auto max-w-xs"
        : "bg-gray-700 p-2 rounded mr-auto max-w-xs";

    msg.innerText = text;

    document.getElementById("chatMessages").appendChild(msg);
}


// OPTIONS MENU (rename/delete)
function showOptions(id) {
    const choice = prompt("Type: rename / delete");

    if (choice === "rename") {
        const newName = prompt("Enter new name:");
        if (!newName) return;

        const chat = chats.find(c => c.id === id);
        chat.name = newName;

    } else if (choice === "delete") {
        chats = chats.filter(c => c.id !== id);

        if (currentChatId === id) currentChatId = null;
    }

    saveChats();
    loadChats();
}


// SEARCH
function searchChats(e) {
    const value = e.target.value.toLowerCase();

    const filtered = chats.filter(c =>
        c.name.toLowerCase().includes(value)
    );

    loadChats(filtered);
}


// SAVE
function saveChats() {
    localStorage.setItem("chats", JSON.stringify(chats));
}
