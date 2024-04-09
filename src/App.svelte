<script lang="ts">
    import rubenLogo from './assets/ruben.svg';
</script>

<main class="h-screen flex items-center justify-center">
    <div class="absolute left-1/2 z-10 mt-5 flex-col w-screen max-w-max -translate-x-1/2 px-4">
        <div class="w-screen max-w-lg flex flex-col sm:flex-row rounded-3xl bg-white text-sm leading-6 p-6">
            <div class="sm:basis-1/2 text-center">
                <img class="h-48 m-6 inline" src={rubenLogo} alt="Ruben Gerits"/>
            </div>

            <div class="basis-full sm:basis-1/2 text-center">
                <h1 class="text-4xl font-bold mt-12 mb-12">Ruben Gerits</h1>
                <p>
                    Check out my projects on <a href="https://github.com/gerits" target="_blank" rel="noreferrer">Github</a>!
                </p>
            </div>
        </div>
        <div class="text-right mt-4">
            <p>
                <a class="hover:bg-white hover:rounded-3xl p-3" href="mailto:ruben@gerits.dev" target="_blank" rel="noreferrer">mail</a>&nbsp;
                <a class="hover:bg-white hover:rounded-3xl p-3" href="https://www.linkedin.com/in/rubengerits/" target="_blank" rel="noreferrer">linkedin
                </a>
            </p>
        </div>
    </div>
</main>
