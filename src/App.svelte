<script lang="ts">
    import Introduction from './components/Introduction.svelte';
    import Projects from './components/Projects.svelte';
</script>

<main class="flex justify-center pt-12">
    <div class="absolute left-1/2 flex-col w-screen max-w-max -translate-x-1/2">
        <div class="w-screen max-w-lg rounded-3xl bg-white text-sm leading-6 p-6">
            <Introduction/>
        </div>
        <div class="w-screen max-w-lg rounded-3xl bg-white text-sm leading-6 p-6 mt-4">
            <Projects/>
        </div>
        <div class="text-right mt-4">
            <p>
                <a class="hover:bg-white hover:rounded-3xl p-3 text-green-dark" href="mailto:ruben@gerits.dev" target="_blank" rel="noreferrer">mail</a>&nbsp;
                <a class="hover:bg-white hover:rounded-3xl p-3 text-green-dark" href="https://www.linkedin.com/in/rubengerits/" target="_blank"
                   rel="noreferrer">linkedin
                </a>
            </p>
        </div>
    </div>
</main>
