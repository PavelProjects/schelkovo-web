<script>
import { AdminAPI } from '@/api/AdminAPI';
import { BackendAPI } from '@/api/BackendAPI';

const STATE_INTL = {
  CLOSED: "Закрыто",
  OPENED: "Открыто"
}

export default {
  name: 'AdminPanel',
  data() {
    return  {
      STATE_INTL,
      credentials: {
        confirmed: undefined,
        username: '',
        password: ''
      },
      message: undefined,
      status: {},
      statuses: [],
      loading: false,
    }
  },
  mounted() {
    this.checkAuth()
    this.loadInfo()
  },
  methods: {
    async checkAuth() {
      try {
        await AdminAPI.getCurrentUser()
        this.credentials.confirmed = true
      } catch (error) {
        console.error(error)
        this.credentials.confirmed = false
      }
    },
    async authenticate() {
      this.loading = true
      try {
        await AdminAPI.authenticate(this.credentials.username, this.credentials.password)
        this.credentials.confirmed = true
        this.message = undefined
      } catch (error) {
        console.error(error)
        this.message = "Ошибка аутентификации"
      } finally {
        this.loading = false
      }
    },
    async loadInfo() {
      this.loading = true
      try {
        this.statuses = await BackendAPI.stausesList()  
        this.status = await BackendAPI.getStatus()
      } finally {
        this.loading = false
      }
    },
    async save() {
      this.loading = true
      try {
        await AdminAPI.setStatus(this.status)
        this.message = `Обновлено! Новый статус: ${this.status.state}, комментарий: ${this.status.comment}`
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<template>
  <div id="admin-panel">
    <h1 v-if="credentials.confirmed === undefined">
      Загрузка
    </h1>
    <form
      v-else-if="!credentials.confirmed"
      class="vertical"
      @submit.stop="() => authenticate()"
    >
      <h3>Требуется авторизация</h3>
      <p>Имя пользователя</p>
      <input
        v-model="credentials.username"
        autocomplete="username"
      />
      <p>Пароль</p>
      <input
        v-model="credentials.password"
        type="password"
        autocomplete="password"
      />
      <button @click.stop="authenticate">
        {{ loading ? 'Загрузка' : 'Войти' }}
      </button>
    </form>
    <div v-else class="vertical">
      <p>Cтатус спота</p>
      <select
        :value="status.state"
        @input="(event) => status.state = event.target.value"
      >
        <option
          v-for="value of statuses"
          :key="value"
          :value="value"
        >
          {{ STATE_INTL[value] }}
        </option>
      </select>
      <p>Комментарий</p>
      <textarea
        :value="status.comment"
        @input="(event) => status.comment = event.target.value"
        placeholder="Комментарий для райдеров"
      ></textarea>
      <button @click.stop="() => save()">
        {{ loading ? 'Загрузка' : 'Сохранить' }}
      </button>
    </div>
    <div v-if="message" class="message">
      {{ message }}
    </div>
  </div>
</template>

<style scoped>
  #admin-panel {
    text-align: center;
    width: 300px;
    padding: 10px;
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius);
  }
  .message {
    overflow-wrap: break-word;
  }
</style>