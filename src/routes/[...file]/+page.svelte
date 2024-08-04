<svelte:head>
    {#await data then result}
    <title>{getDocumentTitle(result.documents[0])}</title>
    <meta name="description" content="{getDocumentDescription(result.documents[0])}" />
    {/await}
</svelte:head>
<div class="row container-fluid">
    <div class="col mb-2">
        {#await data}
        ...
        {:then data}
        <!-- breadcrumbs -->
        {#if data.paths!=undefined && data.paths!=null && data.paths.length>0}
        {#each data.paths as pathelem, index}
        <a href={getTargetPath(pathelem.path)}>{pathelem.name==''?'home':pathelem.name}</a> {data.paths.length-1>index?' / ':''}
        {/each}
        {/if}
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
                {#if result!=undefined && result!=null && result.documents!=null && result.documents!=undefined &&
                result.documents.length>0}
                {@html result.documents[0].content}
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