import { createApp } from 'vue'
// import Vue from 'vue'
import AppForm from './App.vue'
import VCalendar from 'v-calendar'

const to_book = document.querySelector("#to_book")

createApp(AppForm, {...to_book.dataset})
    .use(VCalendar, {})
    .mount('#to_book')
