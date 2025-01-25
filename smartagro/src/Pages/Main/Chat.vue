<template>
  <div class="chat-container container">
    <!-- Chat Header -->
    <header class="chat-header">
      <h5>Chat with {{ recipientName }}</h5>
    </header>

    <!-- Chat Messages -->
    <div class="chat-messages" ref="messagesContainer">
      <div
        v-for="message in messages"
        :key="message.id"
        :class="['chat-message', message.sender.id === userId ? 'sent' : 'received']"
      >
        <div class="message-content">
          <p>{{ message.content }}</p>
        </div>
        <small class="message-timestamp">
          {{ formatTimestamp(message.sentAt) }}
          <br />
          <em v-if="message.sender.id !== userId">From: {{ message.sender.name }}</em>
        </small>
      </div>
    </div>
    <!-- Message Input -->
    <div class="chat-input">
      <form @submit.prevent="sendMessage">
        <input
          type="text"
          v-model="newMessage"
          placeholder="Type a message..."
          class="form-control"
          required
        />
        <button type="submit" class="btn btn-primary">Send</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import endpoint from "../../helpers/endpoint";

export default {
  data() {
    return {
      messages: [], // List of chat messages
      newMessage: "", // New message content
      userId: "1", // Current user's ID (sender)
      recipientId: "2", // Recipient's ID
      recipientName: "John Doe", // Recipient's name
      // apiBaseUrl: "http://localhost:3000/api", // API base URL
      apiBaseUrl: endpoint, // API base URL
    };
  },
  methods: {
    // Fetch chat messages
    async fetchMessages() {
      try {
        const response = await axios.get(
          `${this.apiBaseUrl}/chat/${this.userId}/${this.recipientId}`
        );
        this.messages = response.data;
        this.scrollToBottom();
      } catch (error) {
        console.error("Error fetching messages:", error.message);
      }
    },

    // Send a new message
    async sendMessage() {
      if (!this.newMessage.trim()) return;

      try {
        const messageData = {
          sender: this.userId,
          recipient: this.recipientId,
          content: this.newMessage,
          sentAt: new Date().toISOString(),
        };
        const response = await axios.post(`${this.apiBaseUrl}/chat/send`, messageData);
        this.messages.push(response.data); // Add the new message to the list
        this.newMessage = ""; // Clear the input
        this.scrollToBottom();
      } catch (error) {
        console.error("Error sending message:", error.message);
      }
    },

    // Scroll to the bottom of the messages
    scrollToBottom() {
      this.$nextTick(() => {
        const container = this.$refs.messagesContainer;
        container.scrollTop = container.scrollHeight;
      });
    },

    // Format timestamp
    formatTimestamp(timestamp) {
      return new Date(timestamp).toLocaleString();
    },
  },
  mounted() {
    this.fetchMessages();

    // Optionally set up polling to refresh messages every 5 seconds
    this.interval = setInterval(this.fetchMessages, 50000);
  },
  beforeUnmount() {
    clearInterval(this.interval);
  },
};
</script>
<style scoped>
/* Chat Container */
.chat-container {
  display: flex;
  flex-direction: column;
  height: 85vh;
  margin: auto;
  border: 1px solid #dee2e6;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  background-color: #ffffff;
}

/* Chat Header */
.chat-header {
  padding: 15px;
  background: linear-gradient(90deg, #007bff, #0056b3);
  color: white;
  font-weight: bold;
  text-align: center;
  font-size: 1.2rem;
}

/* Chat Messages */
.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  background-color: #f1f5f9;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

/* Individual Message */
.chat-message {
  display: flex;
  flex-direction: column;
  max-width: 70%;
  padding: 12px 15px;
  border-radius: 15px;
  position: relative;
  animation: fadeIn 0.3s ease-in-out;
}

/* Sender's Messages (Align Right) */
.chat-message.sent {
  align-self: flex-end;
  background-color: #007bff;
  color: white;
  border-top-right-radius: 0;
  text-align: right; /* Entire message content aligns to the right */
}

/* Recipient's Messages (Align Left) */
.chat-message.received {
  align-self: flex-start;
  background-color: #e9ecef;
  color: black;
  border-top-left-radius: 0;
  text-align: left; /* Entire message content aligns to the left */
}

/* Message Content */
.message-content p {
  margin: 0;
  font-size: 1rem;
  line-height: 1.4;
}

/* Message Timestamp */
.message-timestamp {
  font-size: 0.75rem;
  margin-top: 5px;
  color: #6c757d;
}

/* Sender Timestamp Align Right */
.chat-message.sent .message-timestamp {
  text-align: right;
}

/* Recipient Timestamp Align Left */
.chat-message.received .message-timestamp {
  text-align: left;
}

/* Chat Input */
.chat-input {
  display: flex;
  padding: 15px;
  background-color: #ffffff;
  border-top: 1px solid #dee2e6;
  box-shadow: 0px -2px 5px rgba(0, 0, 0, 0.05);
}

.chat-input form {
  display: flex;
  width: 100%;
  gap: 10px;
}

.chat-input input {
  flex: 1;
  padding: 10px;
  border-radius: 20px;
  border: 1px solid #dee2e6;
  font-size: 1rem;
  outline: none;
  transition: box-shadow 0.2s;
}

.chat-input input:focus {
  box-shadow: 0px 0px 5px #007bff;
  border-color: #007bff;
}

.chat-input button {
  padding: 10px 20px;
  border-radius: 20px;
  border: none;
  background-color: #007bff;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.chat-input button:hover {
  background-color: #0056b3;
}

/* Animations */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
