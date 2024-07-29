{#await data}
{:then data}
{#if notBinary(data)}
<div class="container-flex">
    <nav class="navbar h2" style="background-color: #1849cf;">
        <a class="navbar-brand ms-2" href="#">
            <img src="/cricket-logo-no-text-white.svg" alt="Logo" height="36" class="d-inline-block my-auto me-2">
            <span class="h3 my-auto" style="color: rgb(247, 247, 247);">Cricket website demo</span>
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
{error.message}
{/await}
<script>
    import { browser } from '$app/environment';
    export let data

    function notBinary(data) {
        try {
            //console.log('notBinary():', data)
            return !data.documents[0].binaryFile
        } catch (e) {
            console.error(e)
            return false
        }
        return true
    }
    function getFile(data) {
        try {
            //let my_uint8_array = Uint8Array.from(atob(data.documents[0].binaryContent), c => c.charCodeAt(0));
            let my_uint8_array = new Uint8Array(atob(data.documents[0].binaryContent).split("").map(function (c) {
                return c.charCodeAt(0);
            }));
            let decoded = atob(data.documents[0].binaryContent)
            //let blob = new Blob([my_uint8_array], { type: data.documents[0].contentType });
            let blob = new Blob([decoded], { type: data.documents[0].contentType });
            //console.log(blob);
            let myUrl = window.URL.createObjectURL(blob)
            const link = document.createElement("a");
            link.href = myUrl;
            link.download = data.documents[0].fileName;
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (e) {
            console.error(e)
        }
    }
</script>