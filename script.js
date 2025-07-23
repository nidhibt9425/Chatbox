// Load chat history on startup
window.onload = () => {
    const history = JSON.parse(localStorage.getItem("chat-history")) || [];
    history.forEach(({ sender, message, type }) => {
      appendMessage(sender, message, type);
    });
  };
  function sendMessage() {
    alert("messhase has sent");}
    
    function sendMessage() {
      console.log("Send button clicked");
    
      const input = document.getElementById("message-input");
      const message = input.value.trim();
      if (message === "") return;
    
      appendMessage("You", message, "user");
      saveToHistory("You", message, "user");
      input.value = "";
    
      setTimeout(() => {
        botReply(message);
      }, 800);
    }
  
    function appendMessage(sender, message, type) {
      const chatBox = document.getElementById("chat-box");
      const msgDiv = document.createElement("div");
      msgDiv.className = `message ${type}`; // Corrected this line
      msgDiv.innerText = message;
      chatBox.appendChild(msgDiv);
      chatBox.scrollTop = chatBox.scrollHeight;
    }
  
  function botReply(userMsg) {
    let reply = "Hmm, I'm still learning.";
  
    if (userMsg.toLowerCase().includes("hello")) {
      reply = "Hello there! How can I help you?";
    } else if (userMsg.toLowerCase().includes("bye")) {
      reply = "Goodbye! Take care.";
    } else if (userMsg.toLowerCase().includes("thanks")) {
      reply = "You're welcome!";
    }
  
    appendMessage("Bot", reply, "bot");
    saveToHistory("Bot", reply, "bot");
  }
  
  function saveToHistory(sender, message, type) {
    let history = JSON.parse(localStorage.getItem("chat-history")) || [];
    history.push({ sender, message, type });
    localStorage.setItem("chat-history", JSON.stringify(history));
  }
  
  function insertEmoji() {
    const input = document.getElementById("message-input");
    input.value += "😊";
    input.focus();
  }
  
  // Voice input using Web Speech API
  function startListening() {
    console.log("Mic function called");
  
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      alert("Speech Recognition not supported in this browser.");
      return;
    }
  
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = "en-US";
    recognition.start();
  
    recognition.onstart = () => {
      console.log("Voice recognition started. Speak...");
    };
  
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      console.log("Recognized speech:", transcript);
      document.getElementById("message-input").value = transcript;
    };
  
    recognition.onerror = (event) => {
      console.error("Voice recognition error:", event.error);
      alert("Voice recognition error: " + event.error);
    };
  }