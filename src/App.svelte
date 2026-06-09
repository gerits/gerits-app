<script lang="ts">
    import { onMount } from 'svelte';
    import { mapLanguageToFontAwesome } from './utils';
    import family from './assets/family.svg';

    // State Variables using Svelte 5 Runes for premium reactive performance
    let repositories = $state<Repository[]>([]);
    let error = $state("");
    let isLoading = $state(false);
    let isDrawerOpen = $state(false);

    // Toggle popout projects drawer
    function toggleDrawer() {
        isDrawerOpen = !isDrawerOpen;
    }

    // Close drawer when clicking the blurred background overlay
    function closeDrawer(e: MouseEvent) {
        if (e.target === e.currentTarget) {
            isDrawerOpen = false;
        }
    }

    // Capture Escape key to close the drawer for accessibility (A11y)
    function handleKeydown(e: KeyboardEvent) {
        if (e.key === 'Escape') {
            isDrawerOpen = false;
        }
    }

    // Load GitHub repositories using native browser fetch (90%+ bundle size reduction!)
    async function loadRepositories() {
        try {
            isLoading = true;
            error = "";
            let response = await fetch('https://api.github.com/users/gerits/repos?sort=pushed&direction=desc');
            if (!response.ok) {
                throw new Error('GitHub API response failed');
            }
            let data = await response.json();

            repositories = data
                .filter((repository: any) => repository.fork === false)
                .filter((repository: any) => repository.homepage != null && repository.homepage !== '')
                .map((repository: any) => {
                    return {
                        description: repository.description,
                        language: repository.language,
                        name: repository.name,
                        url: repository.homepage
                    } as Repository;
                });
        } catch (err) {
            error = 'Could not load projects';
            console.error(err);
        } finally {
            isLoading = false;
        }
    }

    onMount(() => {
        loadRepositories();
    });
</script>

<svelte:window onkeydown={handleKeydown} />

<div class="min-h-screen bg-[#FAF9F5] font-jakarta text-[#2C3A2E] flex flex-col justify-between items-center pt-12 pb-0 px-6 relative overflow-hidden select-none">
    
    <!-- Ambient artistic glow in background -->
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[35rem] h-[35rem] bg-[#E6EFE4]/30 rounded-full blur-[120px] pointer-events-none z-0"></div>

    <!-- Header bar -->
    <div class="w-full max-w-6xl flex justify-between items-center z-10">
        <span class="text-[10px] font-bold tracking-[0.3em] uppercase text-neutral-400 select-text">Gerits.dev</span>
        
        <!-- Subtle Projects trigger floating at the top-right -->
        <button 
            onclick={toggleDrawer}
            class="text-xs font-bold tracking-widest uppercase text-neutral-500 hover:text-black transition-colors duration-200 flex items-center gap-1.5 focus:outline-none"
        >
            <span>Projects</span>
            <span class="w-1.5 h-1.5 rounded-full bg-green-dark animate-pulse"></span>
        </button>
    </div>

    <!-- MAIN ART SHOWCASE: Typography on Top + Giant Illustration at the Bottom -->
    <div class="w-full max-w-5xl flex-grow flex flex-col justify-between items-center gap-6 z-10 mt-6">
        
        <!-- Typography block -->
        <div class="text-center flex flex-col items-center relative select-none">
            <h1 class="font-syncopate text-5xl sm:text-6xl md:text-7xl font-normal tracking-normal text-black uppercase leading-none select-text">
                RUBEN <span class="font-bold">GERITS</span>
            </h1>
            <div class="font-delafield text-5xl sm:text-6xl md:text-7xl text-[#829980] lowercase -mt-2 sm:-mt-3 md:-mt-4 select-text tracking-wide z-20 relative">
                & family
            </div>
        </div>

        <!-- Gigantic centerpiece illustration flush against screen edge (LCP optimized!) -->
        <div class="w-full flex items-end justify-center flex-grow max-h-[64vh] md:max-h-[70vh] transition-transform duration-700 hover:scale-[1.01] mt-auto">
            <img 
                alt="Family" 
                class="w-full h-auto max-h-[62vh] md:max-h-[68vh] object-contain filter drop-shadow-[0_15px_40px_rgba(80,99,82,0.04)] pointer-events-none translate-y-3" 
                src={family}
                loading="eager"
                fetchpriority="high"
            />
        </div>
    </div>

    <!-- SLIDE-OVER DRAWER OVERLAY BACKDROP -->
    {#if isDrawerOpen}
        <div 
            onclick={closeDrawer} 
            onkeydown={(e) => { if (e.key === 'Enter' || e.key === ' ') closeDrawer(e as any); }}
            class="fixed inset-0 bg-black/10 backdrop-blur-sm z-[99999] flex justify-end transition-opacity duration-300 fade-in-up focus:outline-none"
            role="button"
            tabindex="0"
            aria-label="Close projects drawer"
        >
            <!-- Drawer Body -->
            <div class="w-full max-w-md bg-white/95 backdrop-blur-2xl border-l border-neutral-100 shadow-[0_0_50px_rgba(0,0,0,0.08)] p-8 md:p-12 flex flex-col justify-between h-screen relative z-10">
                
                <!-- Drawer Header -->
                <div>
                    <div class="flex justify-between items-center mb-10 pb-4 border-b border-neutral-100">
                        <h2 class="text-xl font-bold text-neutral-800 flex items-center gap-2">
                            <span class="w-2 h-2 rounded-full bg-green-dark"></span> Projects
                        </h2>
                        <!-- Close button -->
                        <button 
                            onclick={toggleDrawer}
                            class="w-8 h-8 rounded-full bg-neutral-50 hover:bg-neutral-100 text-neutral-400 hover:text-black flex items-center justify-center transition-colors duration-200 focus:outline-none"
                            title="Close drawer"
                        >
                            <i class="fa-solid fa-xmark text-sm"></i>
                        </button>
                    </div>

                    <!-- Repositories scroll listing -->
                    <div class="space-y-6 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                        {#if isLoading && repositories.length === 0}
                            <div class="flex justify-center py-8">
                                <svg aria-hidden="true" class="w-8 h-8 text-neutral-200 animate-spin fill-green-dark" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                </svg>
                            </div>
                        {/if}

                        {#if error !== ""}
                            <p class="text-xs text-red-500 font-light">{error}. Refresh to try again.</p>
                        {/if}

                        {#if error === "" && repositories.length > 0}
                            {#each repositories as repository}
                                <div class="group border-b border-neutral-100 last:border-0 pb-5 last:pb-0 transition-colors duration-200">
                                    <div class="flex items-center justify-between gap-3">
                                        <a href={repository.url} target="_blank" rel="noreferrer" class="text-[15px] font-bold text-neutral-800 hover:text-green-dark flex items-center gap-1.5">
                                            <span class="text-xs bg-[#EAEFE8] text-green-dark w-6 h-6 rounded-full flex items-center justify-center">
                                                <i class="fa-solid fa-brands fa-{mapLanguageToFontAwesome(repository.language)}"></i>
                                            </span>
                                            <span class="hover:underline underline-offset-4">{repository.name}</span>
                                            <i class="fa-solid fa-arrow-up-right text-[10px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></i>
                                        </a>
                                        
                                        {#if repository.language}
                                            <span class="text-[9px] font-bold bg-[#EAEFE8] text-green-dark/80 px-2 py-0.5 rounded-full uppercase tracking-wider scale-95">
                                                {repository.language}
                                            </span>
                                        {/if}
                                    </div>
                                    {#if repository.description}
                                        <p class="mt-2 text-neutral-500 text-[13px] leading-relaxed font-light pl-7 select-text">
                                            {repository.description}
                                        </p>
                                    {/if}
                                </div>
                            {/each}
                        {/if}
                    </div>
                </div>

                <!-- Drawer Footer / Socials -->
                <div class="pt-6 border-t border-neutral-100 flex items-center justify-between text-xs font-bold text-neutral-500">
                    <a class="hover:text-black transition-colors flex items-center gap-1.5" href="mailto:ruben@gerits.dev" target="_blank" rel="noreferrer">
                        <i class="fa-solid fa-envelope text-green-dark"></i> mail
                    </a>
                    <a class="hover:text-black transition-colors flex items-center gap-1.5" href="https://www.linkedin.com/in/rubengerits/" target="_blank" rel="noreferrer">
                        <i class="fa-solid fa-brands fa-linkedin-in text-green-dark"></i> linkedin
                    </a>
                </div>

            </div>
        </div>
    {/if}

</div>

<style>
    /* Sleek slim scrollbar for drawer listing */
    .custom-scrollbar::-webkit-scrollbar {
        width: 4px;
    }
    .custom-scrollbar::-webkit-scrollbar-track {
        background: transparent;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb {
        background: #E6EFE4;
        border-radius: 10px;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb:hover {
        background: #DCE5DA;
    }
</style>
