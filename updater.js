const fs = require('fs');

const items = [
    { q: 'Great_Barrier_Reef', file: 'index.html', str: 'coral-reef.svg' },
    { q: 'Coral_reef', file: 'index.html', str: 'coral-reef-biodiversity.svg' },
    { q: 'Ocean_current', file: 'index.html', str: 'ocean-currents.svg' },
    { q: 'Jellyfish', file: 'index.html', str: 'jellyfish-drift.svg' },
    { q: 'Shoaling_and_schooling', file: 'index.html', str: 'fish-school.svg' },
    { q: 'Great_white_shark', file: 'script.js', str: 'species-great-white.svg' },
    { q: 'Greenland_shark', file: 'script.js', str: 'species-greenland-shark.svg' },
    { q: 'Blue_whale', file: 'script.js', str: 'species-blue-whale.svg' },
    { q: 'Killer_whale', file: 'script.js', str: 'species-orca.svg' },
    { q: 'Megalodon', file: 'script.js', str: 'species-megalodon.svg' },
    { q: 'Dunkleosteus', file: 'script.js', str: 'species-dunkleosteus.svg' },
    { q: 'Coelacanth', file: 'script.js', str: 'species-coelacanth.svg' },
    { q: 'Macropinna_microstoma', file: 'script.js', str: 'species-barreleye.svg' },
    { q: 'Pacific_Ocean', file: 'script.js', str: 'ocean-pacific.svg' },
    { q: 'Atlantic_Ocean', file: 'script.js', str: 'ocean-atlantic.svg' },
    { q: 'Indian_Ocean', file: 'script.js', str: 'ocean-indian.svg' },
    { q: 'Southern_Ocean', file: 'script.js', str: 'ocean-southern.svg' },
    { q: 'Arctic_Ocean', file: 'script.js', str: 'ocean-arctic.svg' }
];

async function run() {
    for (const item of items) {
        try {
            const url = `https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&format=json&piprop=original&titles=${item.q}`;
            const res = await fetch(url, { headers: { 'User-Agent': 'OceanixScript/1.0 (local)' }});
            const data = await res.json();
            const pages = data.query.pages;
            const pageId = Object.keys(pages)[0];
            let imgUrl = pages[pageId]?.original?.source;
            
            if (imgUrl) {
                const path = 'c:/project-ocean/project-1/' + item.file;
                let content = fs.readFileSync(path, 'utf8');
                content = content.replace('assets/images/' + item.str, imgUrl);
                fs.writeFileSync(path, content);
                console.log('Patched', item.str);
            } else {
                console.log('No image for', item.q);
            }
            await new Promise(r => setTimeout(r, 600));
        } catch (e) {
            console.log('Error', item.q, e.message);
        }
    }
}
run();