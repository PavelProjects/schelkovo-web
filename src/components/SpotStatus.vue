<script>
import { BackendAPI } from '@/api/BackendAPI'


const STATE_TEXT = {
  OPENED: { text: 'Да, спот открыт для посещения!', emoji: '🎉' },
  CLOSED: { text: 'Нет, спот закрыт для посещения', emoji: '⛔' },
  ERROR: { text: 'Не удалось загрузить данные', emoji: '⚠️' },
}

const STATE_DESCRIPTION = {
  OPENED: 'Не забывайте пролить линии перед катанием!',
  CLOSED: 'К сожалению, сегодня не получится покататься',
  ERROR: 'Пу пу пу 😔'
}

export default {
  name: 'SpotStatus',
  data() {
    return {
      STATE_TEXT,
      STATE_DESCRIPTION,
      loading: false,
      status: { state: 'CLOSED' }
    }
  },
  mounted() {
    this.getStatus()
  },
  methods: {
    async getStatus() {
      this.loading = true
      try {
        this.status = await BackendAPI.getStatus()
      } catch (error) {
        console.error(error)
        this.status = { state: 'ERROR' }
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<template>
  <div id="spot-status">
    <h2>Можно ли кататься на дертах в Щелково?</h2>
    <div v-if="loading">
      <h3>Спрашиваю админа...</h3>
    </div>
    <div v-else class="status">
      <div class="status-text" >
        <div class="emoji">
          {{ STATE_TEXT[status.state].emoji }}
        </div>
        <h2 :class="status.state.toLocaleLowerCase()" >
          {{ STATE_TEXT[status.state].text }}
        </h2>
        <div class="emoji">
          {{ STATE_TEXT[status.state].emoji }}
        </div>
      </div>
      <h3 v-if="!!status.comment" class="comment">
        Комментарий от админа: {{ status.comment }}
      </h3>
      <h3>
        {{ STATE_DESCRIPTION[status.state] }}
      </h3>
    </div>
  </div>
</template>

<style scoped>
  #spot-status {
    text-align: center;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .status {
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius);
    overflow-wrap: break-word;
    padding: 5px;
  }
  .status-text {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
  }
  .status-text h2 {
    margin: auto;
  }
  .opened {
    color: var(--nord14);
  }
  .closed {
    color: var(--nord11);
  }
  .error {
    color: var(--color-accent);
  }
  .comment {
    color: var(--color-accent);
  }
  .emoji {
    margin: auto;
    font-size: 30px;
  }
</style>