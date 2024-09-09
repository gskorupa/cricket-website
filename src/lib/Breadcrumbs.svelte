<script>
    export let def
</script>
{#if def.paths.length > 0}
{#each def.paths as path, i}
<a href="{path}">{def.names[i]}</a>
{#if i < def.paths.length - 1}/{/if} 
{/each} {/if}