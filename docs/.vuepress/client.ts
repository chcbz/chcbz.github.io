import { defineClientConfig } from '@vuepress/client';
import HomeJournal from './components/HomeJournal.vue';

export default defineClientConfig({
  enhance({ app }) {
    app.component('HomeJournal', HomeJournal);
  },
});
