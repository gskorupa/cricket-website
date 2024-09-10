<svelte:head>
    {#await data then result}
    <title>{getDocumentTitle(result)}</title>
    <meta name="description" content="{getDocumentDescription(result)}" />
    {/await}
</svelte:head>
<div class="row container-fluid">
    <div class="col mb-2">
        {#if env.PUBLIC_HCMS_LANGUAGES!=undefined && env.PUBLIC_HCMS_LANGUAGES!=null && env.PUBLIC_HCMS_LANGUAGES!=''}<Languages def={env.PUBLIC_HCMS_LANGUAGES}></Languages>&nbsp;|&nbsp;{/if}
        {#await data}
        ...
        {:then data}
        <!-- breadcrumbs -->
        <Breadcrumbs def={ hcms.getDocumentPaths(data,env.PUBLIC_HCMS_LANGUAGES,env.PUBLIC_HCMS_INDEX) }> </Breadcrumbs>
        {/await}
    </div>
</div>
<div class="row container-fluid">
    <div class="col">
        <div class="row w-100">
            <div class="col">
                {#await data}
                ...
                {:then result}
                {#if result!=undefined && result!=null}
                {@html result.content}
                {:else}
                <h1>404</h1>
                <p>Page not found.</p>
                {/if}
                {:catch error}
                {error.message}
                {/await}
            </div>
        </div>
    </div>
</div>
<script>
    import { env } from '$env/dynamic/public';
    import Breadcrumbs from "$lib/Breadcrumbs.svelte";
    import Languages from "$lib/Languages.svelte";
    import { hcms } from '$lib/hcms.js';

    export let data
    function getTargetPath(path) {
        let result = path
        if (path == null || path == undefined || path == '' || path == '/') {
            result = '/';
        } else if (!(path.endsWith('.md') || path.endsWith('.html'))) {
            result = path + '/' + env.PUBLIC_HCMS_INDEX
        }
        return result;
    }

    function getDocumentTitle(document) {
        let result = "Cricket HCMS demo"
        //console.log('getDocumentTitle', document)
        try{
            result = document.metadata.title
            if(result==null || result==undefined || result=='' || result=='undefined'){
                result = "Cricket HCMS demo"
            }
        }catch(e){
            //console.log('getDocumentTitle',e)
        }
        return result
    }

    function getDocumentDescription(document) {
        let result = ""
        try{
            result = document.metadata.description
        }catch(e){
            //console.log('getDocumentDescription',e)
        }
        return result
    }
    
</script>