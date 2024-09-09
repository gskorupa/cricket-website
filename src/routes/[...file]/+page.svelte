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
        <Breadcrumbs def={ getDocumentPaths(data) }> </Breadcrumbs>
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
    function getDocumentPaths(document) {
        let paths = []
        let names = []
        let multilanguage = env.PUBLIC_HCMS_LANGUAGES!=undefined && env.PUBLIC_HCMS_LANGUAGES!=null && env.PUBLIC_HCMS_LANGUAGES.length>0
        try{
            let pathNames = document.name.split('/')
            let start=0
            if(multilanguage){
                start=2
            }else{
                start=2
                paths.push('/'+env.PUBLIC_HCMS_INDEX)
            }
            for(let i=start;i<pathNames.length;i++){
                let pathName = pathNames[i] 
                let path = ''
                for(let j=start;j<=i;j++){
                    path += '/'+pathNames[j]
                }
                if(path.indexOf('.', path.lastIndexOf('/'))<0){
                    path = path + '/'+env.PUBLIC_HCMS_INDEX
                }
                paths.push(path)
                if(i==start){
                    names.push('home')
                }else{
                    names.push(pathName)
                }
            }
            if(paths.length>1 && paths[paths.length-1]==paths[paths.length-2]){
                //remove last element
                paths.pop()
                names.pop()
            }
            console.log('getDocumentPaths paths',paths)
            console.log('getDocumentPaths names',names)
        }catch(e){
            //console.log('getDocumentPaths',e)
        }
        return {paths:paths,names:names}
    }
</script>