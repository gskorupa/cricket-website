<script>
    import { env } from '$env/dynamic/public';
    export let def
    let languages = [];
    if(def!=undefined && def!=null){
        languages = def.split(',');
    }
    if(languages.length<2){
        languages = [];
    }
</script>
{#if languages.length > 0}
{#each languages as lang, i}
&nbsp;<a href={'/'+lang+'/'+env.PUBLIC_HCMS_INDEX}>{lang}</a>
{/each} {/if}