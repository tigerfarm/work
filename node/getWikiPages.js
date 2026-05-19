// Download an Atlassian Confluence page using node
// npm install axios
const axios = require('axios');
const fs = require('fs');

// --- Configuration ---
const DOMAIN = process.env.WIKI_DOMAIN;
const EMAIL = process.env.WIKI_EMAIL;
const API_TOKEN = process.env.WIKI_API_TOKEN;
const PAGE_IDS = [
      '357851599', '357850453', '357850393', '357853750'
    , '357873141', '357831945', '357834987', '365303847'
    , '357872861', '489985061', '357843129', '1534328856'
    , '357826592', '374906046', '345835545', '357840227'
    , '357840368'
    ];
const OUTPUT_FILE = 'confluence_pages_export.txt';

console.log(`+ DOMAIN: ${DOMAIN}...`);
console.log(`+ EMAIL: ${EMAIL}...`);
console.log(`+ API_TOKEN: ${API_TOKEN}...`);
console.log(`++ Download Atlassian Confluence wiki pages into the file: ${OUTPUT_FILE}...`);


// Confluence uses Basic Auth: base64(email:api_token)
const auth = Buffer.from(`${EMAIL}:${API_TOKEN}`).toString('base64');

async function downloadWikiPage() {
    fs.writeFileSync(OUTPUT_FILE, '');

    for (const id of PAGE_IDS) {
        try {
            console.log(`Fetching Page ID: ${id}...`);
            const url = `https://${DOMAIN}/wiki/api/v2/pages/${id}?body-format=view`;

            const response = await axios.get(url, {
                headers: {
                    'Authorization': `Basic ${auth}`,
                    'Accept': 'application/json'
                }
            });

            const title = response.data.title;
            const body = response.data.body.view.value;

            // Remove newlines from the content to ensure the "one page per line" requirement
            const sanitizedBody = body.replace(/\r?\n|\r/g, " ");

            // Append to file: TITLE | CONTENT
            fs.appendFileSync(OUTPUT_FILE, `${title}: ${sanitizedBody}\n`);

            console.log(`Successfully appended: ${title}`);
        } catch (error) {
            console.error(`Failed to download Page ID ${id}:`, error.message);
        }
    }

    console.log(`\nDone! All pages saved to ${OUTPUT_FILE}`);
}

downloadWikiPage();

// eof