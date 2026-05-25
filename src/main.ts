import './app.css';
import '@fortawesome/fontawesome-free/css/fontawesome.min.css';
import '@fortawesome/fontawesome-free/css/solid.min.css';
import '@fortawesome/fontawesome-free/css/brands.min.css';
import { mount } from 'svelte';
import App from './App.svelte';

const app = mount(App, {
    target: document.body
});

export default app;
