<script lang="ts">
    import { Octokit } from 'octokit';
    import { onMount } from 'svelte';

    export let repositories: Repository[] = [];

    async function loadRepositories() {
        let oktokit = new Octokit();

        let result = await oktokit.rest.repos.listForUser({
            username: 'gerits',
            sort: 'pushed',
            direction: 'desc'
        });

        repositories = result.data
            .filter(repository => repository.fork == false)
            .filter(repository => repository.homepage != null)
            .map(repository => {
                return {
                    description: repository.description,
                    language: repository.language,
                    name: repository.name,
                    url: repository.html_url
                } as Repository;
            });
    }

    function mapLanguageToFontAwesome(language: string) {
        switch (language) {
            case 'Java':
                return 'java';
            case 'HTML':
            case 'Svelte':
                return 'html5';
            case 'Kotlin':
            case 'Android':
                return 'android';
            default:
                return 'question';
        }
    }

    onMount(() => {
        loadRepositories();
    });
</script>

<projects class="flex flex-col">
    <div class="flex-grow text-2xl font-bold text-green-dark pb-4">Projects</div>
    <div>
        {#each repositories as repository}
            <div class="text-green-dark font-bold">
                <i class="text-green-dark fa-solid fa-brands fa-{mapLanguageToFontAwesome(repository.language)}"></i>
                <a href="{repository.url}">{repository.name}</a>
            </div>
            <div class="pb-4">{repository.description}</div>
        {/each}
    </div>
</projects>