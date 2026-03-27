const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbycIMpfSHcJ3gjpZJ-UMDCgFloRFLvZULBMWm5AHSkND0ZJtfa_eZBAMJNraImE_t1d/exec'

async function checkBlog() {
    try {
        const res = await fetch(APPS_SCRIPT_URL);
        const data = await res.json();
        console.log('Blog Data:', JSON.stringify(data, null, 2));
    } catch (e) {
        console.error('Fetch failed:', e);
    }
}

checkBlog();
