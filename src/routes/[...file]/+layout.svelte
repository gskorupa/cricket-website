{#await data}
{:then data}
{#if notBinary(data)}
<div class="container-flex">
    <!--<nav class="navbar h2" style="background-color: #1849cf;">-->
    <nav class="navbar h2" style="background-color: rgb(123, 63, 0);">
        <a class="navbar-brand ms-2" href="#">
            <img src="/cricket-logo-no-text-white.svg" alt="Logo" height="36" class="d-inline-block my-auto me-2">
            <span class="h3 my-auto" style="color: rgb(247, 247, 247);">Cricket website demo</span>
            <!--<span class="h3 my-auto" style="color: rgb(123, 63, 0);">Cricket website demo</span>-->
        </a>
    </nav>
</div>
<slot></slot>
<div class="container-fluid">
    <footer class="py-2 my-3 border-top">
        <div class="row ">
            <div class="col-3">
                <span class="text-body-secondary">&copy; 2024 Grzegorz Skorupa</span>
            </div>
            <div class="col-9 text-end">
                <a class="text-body-secondary" href="https://github.com/gskorupa/cricket-website" target="_blank"><i
                        class="bi bi-github h4 text-black-50"></i></a>
            </div>
        </div>
    </footer>
</div>
{:else}
{getFile(data)}
{/if}
{:catch error}
Error: {error.message}
{/await}
<script>
    import { browser } from '$app/environment';
    import { env } from '$env/dynamic/public';

    export let data

    function notBinary(data) {
        try {
            return !data.binaryFile
        } catch (e) {
            //console.error(e)
            return true
        }
        return true
    }
    function getFile(data) {
        try {
            let my_uint8_array = new Uint8Array(atob(data.binaryContent).split("").map(function (c) {
                return c.charCodeAt(0);
            }));
            let decoded = atob(data.binaryContent)
            let blob = new Blob([decoded], { type: data.contentType });
            //console.log(blob);
            let myUrl = window.URL.createObjectURL(blob)
            const link = document.createElement("a");
            link.href = myUrl;
            link.download = data.fileName;
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (e) {
            console.error(e)
        }
    }
</script>