<template>
    <div class="chat-container">
      <!-- Chat Header -->
      <header class="chat-header d-flex align-items-center justify-content-between px-3 py-2">
        <h5 class="m-0">{{ activeChatHeader }}</h5>
        <button class="btn btn-outline-primary btn-sm d-lg-none" @click="toggleUsers">
          Users
        </button>
      </header>
  
      <div class="chat-body d-flex">
        <!-- User List (Visible on larger screens or toggled on mobile) -->
        <aside
          class="user-list bg-light border-end"
          :class="{ 'd-none': !showUsers && !isLargeScreen, 'show-users': showUsers }"
        >
          <div class="p-3 border-bottom">
            <strong>Users</strong>
          </div>
          <ul class="list-group list-group-flush">
            <li
              class="list-group-item d-flex align-items-center"
              :class="{ 'bg-primary text-white': activeChat === 'general' }"
              @click="setActiveChat('general')"
            >
              <img
                src="https://ui-avatars.com/api/?name=General+Chat&background=random"
                alt="General Chat Avatar"
                class="rounded-circle me-2"
                width="40"
                height="40"
              />
              <span>General Chat</span>
            </li>
            <li
              v-for="user in users"
              :key="user.id"
              class="list-group-item d-flex align-items-center"
              :class="{ 'bg-primary text-white': activeChat === user.id }"
              @click="setActiveChat(user.id)"
            >
              <img
                :src="'https://ui-avatars.com/api/?name='+user.name+'&background=random'"
                alt="User Avatar"
                class="rounded-circle me-2"
                width="40"
                height="40"
              />
              <span>{{ user.name }}</span>
            </li>
          </ul>
        </aside>
  
        <!-- Chat Messages -->
        <div class="chat-messages flex-grow-1 d-flex flex-column">
          <div class="messages flex-grow-1 p-3">
            <div
              v-for="message in filteredMessages"
              :key="message.id"
              class="d-flex align-items-end mb-3"
              :class="['message-wrapper', message.sender === 'me' ? 'justify-content-end' : 'justify-content-start']"
            >
              <!-- Avatar for received messages in General Chat -->
              <img
                v-if="activeChat === 'general' && message.sender !== 'me'"
                :src="'https://ui-avatars.com/api/?name='+message.sender+'&background=random'"
                alt="Sender Avatar"
                class="rounded-circle me-2"
                width="40"
                height="40"
              />
  
              <div
                :class="[
                  'message',
                  message.sender === 'me' ? 'sent' : 'received'
                ]"
              >
                <p class="message-text">{{ message.text }}</p>
                <small class="message-time">{{ message.time }}</small>
              </div>
            </div>
          </div>
  
          <!-- Message Input -->
          <div class="message-input border-top p-3">
            <form @submit.prevent="sendMessage">
              <div class="input-group">
                <input
                  type="text"
                  v-model="newMessage"
                  class="form-control"
                  placeholder="Type a message"
                  required
                />
                <button class="btn btn-primary" type="submit">Send</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
</template>

<script setup>
  import { ref, computed, onMounted } from "vue";
  import { users, messages } from "../../assets/data";
  
  // States
  const activeChat = ref("general"); // Default to General Chat
  const newMessage = ref("");
  const showUsers = ref(false);
  const isLargeScreen = ref(window.innerWidth >= 992);
  
  // Methods
  const setActiveChat = (chatId) => {
    activeChat.value = chatId;
    if (!isLargeScreen.value) showUsers.value = false; // Hide user list on mobile after selection
  };
  
  const toggleUsers = () => {
    showUsers.value = !showUsers.value;
  };
  
  const sendMessage = () => {
    if (newMessage.value.trim()) {
      messages.value.push({
        id: messages.value.length + 1,
        text: newMessage.value,
        sender: "me",
        time: new Date().toLocaleTimeString(),
        chatType: activeChat.value === "general" ? "general" : "direct",
        receiver: activeChat.value !== "general" ? activeChat.value : null,
      });
      newMessage.value = "";
    }
  };
  
  // Computed Properties
  const activeChatHeader = computed(() =>
    activeChat.value === "general"
      ? "General Chat"
      : users.value.find((user) => user.id === activeChat.value)?.name || "Chat"
  );
  
  const getActiveUser = () => users.value.find((user) => user.id === activeChat.value);
  
  const filteredMessages = computed(() =>
    activeChat.value === "general"
      ? messages.value.filter((msg) => msg.chatType === "general")
      : messages.value.filter(
          (msg) =>
            msg.chatType === "direct" &&
            (msg.sender === getActiveUser()?.name || msg.receiver === activeChat.value)
        )
  );
  
  // Watch for window resize to adjust layout dynamically
  onMounted(() => {
    window.addEventListener("resize", () => {
      isLargeScreen.value = window.innerWidth >= 992;
      if (isLargeScreen.value) showUsers.value = true;
    });
  });
</script>

<style scoped>
  .chat-container {
    display: flex;
    flex-direction: column;
    height: calc(100vh 134px) !important;
  }
  
  .chat-header {
    background-color: #f8f9fa;
    border-bottom: 1px solid #dee2e6;
  }
  
  .chat-body {
    flex: 1;
    display: flex;
    overflow: hidden;
  }
  
  .user-list {
    width: 250px;
    overflow-y: auto;
    transition: transform 0.3s ease-in-out;
  }
  
  .user-list.show-users {
    transform: translateX(0);
  }
  
  .chat-messages {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
  }
  
  .messages {
    overflow-y: auto;
    flex-grow: 1;
  }
  
  .message-wrapper {
    display: flex;
  }
  
  .message {
    max-width: 70%;
    padding: 0.75rem;
    border-radius: 10px;
  }
  
  .sent {
    background-color: #87ceeb; /* Sky Blue */
    align-self: flex-end;
    color: #000;
  }
  
  .received {
    background-color: #d3d3d3; /* Grey */
    align-self: flex-start;
    color: #000;
  }
  
  .message-text {
    margin: 0;
  }
  
  .message-time {
    font-size: 0.75rem;
    color: #6c757d;
  }
  
  @media (max-width: 991px) {
    .user-list {
      position: absolute;
      z-index: 1000;
      background: #fff;
      transform: translateX(-100%);
      height: 100%;
    }
  
    .user-list.show-users {
      transform: translateX(0);
    }
  
    .chat-messages {
      margin-left: 0;
    }
  }
</style>
  