import { hcms } from '$lib/hcms.js';
import { dev } from '$app/environment';

export async function load(params) {
    try {
        //console.log('params1', params)
        return await hcms.getDocuments(dev, process.env.PUBLIC_HCMS_URL, params, process.env.PUBLIC_HCMS_ROOT, process.env.PUBLIC_HCMS_INDEX)
  } catch (err) {
        console.log('err1',err)
    }
}   