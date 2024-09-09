import { hcms } from '$lib/hcms.js';
import { dev } from '$app/environment';

export async function load(params) {
    let documentName
    try {
        console.log('params1', params)
        let docPrefix
        let languages = []
        if(process.env.PUBLIC_HCMS_LANGUAGES !=undefined && process.env.PUBLIC_HCMS_LANGUAGES.length!=null){
            languages = process.env.PUBLIC_HCMS_LANGUAGES.split(',')
        }
        if(languages.length==0){
            if(params.url.pathname==('/')||params.url.pathname==('')){
                documentName = '/'+process.env.PUBLIC_HCMS_INDEX
            }else{
                documentName = params.url.pathname
            }
        }else{
            let docPrefixOK = false
            for(let i=0;i<languages.length;i++){
                docPrefix = '/' + languages[i] + '/'
                if(params.url.pathname.startsWith(docPrefix)){
                    docPrefixOK = true
                    break
                }
            }
            if(!docPrefixOK){
                documentName = '/'+languages[0]+'/'+process.env.PUBLIC_HCMS_INDEX
            }else{
                documentName = params.url.pathname
            }
        }
        documentName = '/'+process.env.PUBLIC_HCMS_ROOT+documentName
        console.log('docPrefix', docPrefix)
        console.log('documentName', documentName)
        return await hcms.getDocument(dev, process.env.PUBLIC_HCMS_URL, documentName, process.env.PUBLIC_HCMS_ROOT, process.env.PUBLIC_HCMS_INDEX)
  } catch (err) {
        console.log('err1',err)
    }
}   