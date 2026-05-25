// --- MOBILE NAVIGATION MENU ---
(function initMobileMenu() {
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('site-nav-links');
    
    if (!menuToggle || !navLinks) return;
    
    // Toggle menu on button click
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('is-open');
    });
    
    // Close menu when a link is clicked
    navLinks.querySelectorAll('.site-nav__link').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('is-open');
        });
    });
    
    // Close menu when clicking on CTA button
    const ctaBtn = document.querySelector('.site-nav__cta');
    if (ctaBtn) {
        ctaBtn.addEventListener('click', () => {
            navLinks.classList.remove('is-open');
        });
    }
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        const isClickInside = navLinks.contains(e.target) || menuToggle.contains(e.target);
        if (!isClickInside) {
            navLinks.classList.remove('is-open');
        }
    });
})();

// --- GSAP SETUP ---
gsap.registerPlugin(ScrollTrigger);

// The hero animations are now handled in the initPreloader function!

// Scroll Animations
gsap.to(".hero-content", {
    y: -100,
    opacity: 0,
    scrollTrigger: {
        trigger: ".hero-content",
        start: "top 30%",
        end: "bottom top",
        scrub: 1
    }
});

// --- SCROLL BACKGROUND REMOVED: Relying on HTML5 #bg-video ---

// --- CINEMATIC VIDEO PARALLAX & SUBMARINE FLASHLIGHT ---
(function initCinematicEffects() {
    // Skip on touch devices for performance
    const isTouch = ('ontouchstart' in window) || navigator.maxTouchPoints > 0 || window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;

    const bgVideo = document.getElementById('bg-video');
    const videoOverlay = document.getElementById('video-overlay');
    if (!bgVideo || !videoOverlay) return;

    // GSAP quickTo for butter-smooth, hardware-accelerated parallax
    const moveX = gsap.quickTo(bgVideo, 'x', { duration: 1.2, ease: 'power3.out' });
    const moveY = gsap.quickTo(bgVideo, 'y', { duration: 1.2, ease: 'power3.out' });

    // Max parallax shift in px (contained within the 5vw/5vh bleed)
    const maxShift = 20;

    window.addEventListener('mousemove', (e) => {
        // Normalize cursor to -1 … +1
        const nx = (e.clientX / window.innerWidth - 0.5) * 2;
        const ny = (e.clientY / window.innerHeight - 0.5) * 2;

        // Invert direction for depth illusion
        moveX(-nx * maxShift);
        moveY(-ny * maxShift);

        // Flashlight: update CSS variables for the radial gradient center
        const px = ((e.clientX / window.innerWidth) * 100).toFixed(1);
        const py = ((e.clientY / window.innerHeight) * 100).toFixed(1);
        videoOverlay.style.setProperty('--mouse-x', px + '%');
        videoOverlay.style.setProperty('--mouse-y', py + '%');
    }, { passive: true });
})();

// --- THREE.JS REMOVED IN FAVOR OF HTML5 VIDEO BACKGROUND ---

// --- STEP 2: LOCAL SPECIES PROFILES (PILLAR 1 & 2) ---
const speciesProfiles = [
    {
        slug: 'Great_White',
        title: 'Great White',
        focus: 'Apex & Sensorial Hunter',
        habitat: 'Temperate coastal shelves',
        diet: 'Seals, fish, rays',
        size: 'Up to ~6 m',
        status: 'Vulnerable',
        note: 'Four hundred million years of evolutionary refinement distilled into a single silhouette.',
        brief: 'The Great White represents millions of years of evolutionary perfection. With specialized heat-retaining biology and extraordinary sensory systemsâ€”from electromagnetic detection to precise olfactionâ€”they hunt with calculated precision. As apex predators, they regulate entire coastal ecosystems, culling the weak and maintaining ecosystem balance.',
        summary: '<p>The Great White Shark (Carcharodon carcharias) stands as a testament to evolutionary perfection. Over hundreds of millions of years, these macropredators have honed a highly streamlined, torpedo-shaped physiology built specifically for explosive acceleration. Their biology features regional endothermyâ€”a specialized blood vessel structure called the "rete mirabile" which allows them to maintain a core body temperature significantly higher than the surrounding seawater. This thermal advantage powers their immense musculature and sharpens their cognitive functions in frigid waters, enabling them to outmaneuver highly agile marine mammals like seals and sea lions.</p><p>Survival mechanisms for the Great White go far beyond brute force, relying on an almost supernatural sensory array. In addition to a remarkable sense of olfaction capable of detecting trace amounts of blood from miles away, their snouts are peppered with gel-filled pores known as the ampullae of Lorenzini. This electromagnetic network detects the faint electrical fields generated by the muscular contractions of hidden prey or beating hearts in murky depths. Combined with lateral line systems that feel microscopic water pressure changes, they possess spatial awareness unmatched in the pelagic realm.</p><p>Historically, ancestors of the modern Great White survived numerous mass extinction events, diverging from huge prehistoric mackerel sharks to fill niche apex roles. Today, their ecological significance cannot be understated. As apex predators, they act as the immune system of the oceans, culling the sick and weak, regulating mesopredator populations, and preventing the overgrazing of critical marine flora. Their presence drives a cascade effect that is vital for the health and equilibrium of coastal and deep-water ecosystems worldwide.</p>',
        conservation: 'Reducing bycatch and protecting nursery areas preserves their ecological role.',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/White_shark.jpg/960px-White_shark.jpg'
    },
    {
        slug: 'Greenland_Shark',
        title: 'Greenland Shark',
        focus: 'Arctic Longevity',
        habitat: 'Deep, cold North Atlantic',
        diet: 'Slow-moving fish, carrion',
        size: 'Up to 6â€“7 m',
        status: 'Vulnerable/Long-lived',
        note: 'Hidden in freezing depths, individuals can live for centuriesâ€”some estimates exceed 400 years.',
        brief: 'The longest-lived vertebrate on Earth, the Greenland Shark survives in extreme cold through antifreeze-like biochemistry and ultra-slow metabolism. Growing just one centimeter per year, some individuals are over 400 years old. Despite being mostly blind, they dominate as deep-sea scavengers.',
        summary: '<p>The Greenland Shark (Somniosus microcephalus) represents an astonishing extreme of vertebrate life. Inhabiting the freezing, perpetual darkness of the Arctic and North Atlantic, these elusive giants boast a biology optimized for ultra-slow metabolic efficiency. Their tissues contain remarkably high concentrations of trimethylamine N-oxide (TMAO) and urea, acting as natural antifreeze and high-pressure stabilizers. This unique biochemical adaptation allows them to survive temperatures near freezing, but renders their flesh highly toxic unless specially fermented into traditional dishes like HÃ¡karl.</p><p>Their survival strategy is tethered to an incredibly slow pace of life; they grow at an agonizingly sluggish rate of around one centimeter per year. Despite being functionally blindâ€”often due to a parasitic copepod (Ommatokoita elongata) that latches onto their corneasâ€”these sharks scavenge and hunt with high success. They rely heavily on enhanced olfactory senses to find carrion, such as fallen whales, or ambush sleeping seals under the ice. Their stealthy, lethargic swimming makes almost zero acoustic disturbance in the water.</p><p>In terms of history and longevity, the Greenland Shark is unparalleled, holding the record as the longest-lived vertebrate known to science. Radiocarbon dating of their eye lenses reveals that some individuals currently navigating the deep ocean may be over 400 years old, meaning they were swimming centuries before the industrial revolution. Ecologically, they perform a crucial role as deep-sea benthic scavengers, recycling organic material that sinks to the abyssal plains, thereby acting as vital energy bridges in the nutrient-poor deep-ocean food webs.</p>',
        conservation: 'Climate change and bycatch pressures threaten their fragile, slow-growth populations.',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Somniosus_microcephalus_okeanos.jpg/960px-Somniosus_microcephalus_okeanos.jpg'
    },
    {
        slug: 'Blue_Whale',
        title: 'Blue Whale',
        focus: 'Planetary Giant',
        habitat: 'Open ocean migrations',
        diet: 'Krill swarms',
        size: 'Up to ~30 m',
        status: 'Endangered',
        note: 'Pushes physical limitsâ€”100 feet long, a heart the size of a car, a body that moves the ocean.',
        brief: 'The largest animal ever to exist, the Blue Whale sustains its 200-ton body exclusively on tiny krill. Their specialized baleen feeding system filters millions of krill daily. Through massive migrations and nutrient recycling, they fertilize entire ocean ecosystems, actively sequestering atmospheric carbon.',
        summary: '<p>The Blue Whale (Balaenoptera musculus) pushes the absolute physical limits of life on planet Earth. As the largest animal historically known to exist, a single adult can weigh upwards of 200 tons and reach lengths of 100 feet. At this staggering scale, every aspect of their biology is superlative, from an aorta wide enough for a human to swim through, to a heart the size of a small car. To sustain this mass, their respiratory and circulatory systems are incredibly efficient, extracting oxygen at high rates before executing dives hundreds of meters deep.</p><p>The survival of such gargantuan creatures hinges exclusively on their highly specialized feeding mechanism. Unlike toothed whales, Blue Whales possess massive plates of keratin called baleen. During the summer feeding season in polar waters, the whale lunges at swarms of tiny crustaceans known as krill, engulfing up to 90 tons of water in an expanding throat pouch. Using its massive tongue, it forces the water out through the baleen plates, filtering out millions of krill daily. Their booming vocalizations, producing intense, low-frequency rumbles that travel thousands of miles through the SOFAR channel, allow them to communicate over entire ocean basins.</p><p>Tracing their history reveals a rapid evolutionary expansion; they evolved to these immense proportions relatively recently in geological timeâ€”over the past three million yearsâ€”due to shifting ocean currents that created concentrated patches of plankton. Ecologically, they are critical ecosystem engineers. Through "whale pumps," their colossal migrations and large-scale excretory events transport essential nutrients, particularly iron and nitrogen, from deep, nutrient-rich feeding grounds to the photic zones, fertilizing phytoplankton blooms that form the foundation of marine ecosystems and actively sequester atmospheric carbon.</p>',
        conservation: 'Protecting feeding grounds and reducing ship strikes helps recovery.',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Anim1754_-_Flickr_-_NOAA_Photo_Library.jpg/960px-Anim1754_-_Flickr_-_NOAA_Photo_Library.jpg'
    },
    {
        slug: 'Orca',
        title: 'Orcas',
        focus: 'Cultural Predators',
        habitat: 'Coastal and offshore',
        diet: 'Fish, mammals, cephalopods',
        size: 'Up to ~8 m',
        status: 'Varies by population',
        note: 'Rule through intelligence and social strategy, organized into family dialects.',
        brief: 'Orcas are the ocean\'s most culturally sophisticated predators, with matrilineal pods passing down hunting techniques across generations. Different pods develop unique dialects and specialized hunting strategiesâ€”from wave-washing seals to coordinated whale hunting. Their intelligence rivals the greatest minds in the ocean.',
        summary: '<p>Orcas (Orcinus orca), or killer whales, possess the most culturally complex and socially sophisticated biology of any marine predator. As the largest member of the dolphin family, their brains are massive and highly convoluted, housing expanded paralimbic and limbic clefts which indicate advanced emotional intelligence and relational memory. This neurological hardware supports a matrilineal social structure where pods are led by elder females, passing down multi-generational knowledge.</p><p>Their survival mechanisms rely entirely on extraordinary cooperation, communication, and learned behaviors rather than singular instinct. Orca populations are divided into distinct eco-typesâ€”such as "Residents" which exclusively hunt fish, and "Transients" which target marine mammals like seals and other whales. Each pod features a unique acoustic dialect of clicks, whistles, and pulsed calls used to coordinate elaborate hunting strategies. From synchronously creating waves to wash seals off Antarctic ice floes, to strategically exhausting much larger whales, their tactical adaptability is unmatched.</p><p>Historically widespread across all global oceans, the Orca is the most widely distributed mammal on Earth after humans. Their ecological role is uniquely profound and varied; as apex predators in virtually every marine habitat, they exert top-down control that shapes local prey behavior and populations. By passing hunting techniques, migratory routes, and social norms down to calves in a true exhibition of non-human culture, Orca pods demonstrate complex ecosystem orchestration, reminding us that intelligence and social tradition are powerful evolutionary drivers in the ocean environment.</p>',
        conservation: 'Local protections and noise reduction preserve pod cultures and hunting success.',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Killerwhales_jumping.jpg/960px-Killerwhales_jumping.jpg'
    },
    {
        slug: 'Megalodon',
        title: 'Megalodon',
        focus: 'Prehistoric Apex',
        habitat: 'Ancient warm seas (extinct)',
        diet: 'Prehistoric whales',
        size: 'Up to ~15 m',
        status: 'Extinct',
        note: 'Fifty feet of bite force and dominanceâ€”gone as oceans cooled.',
        brief: 'The largest shark ever to swim the oceans, Megalodon dominated for 20 million years with a bite force exceeding 40,000 PSI. Warm-blooded and heat-generating, it hunted baleen whales with brutal efficiency. Climate cooling and changing prey distribution made its extinction inevitable.',
        summary: '<p>Otodus megalodon reigns in paleontology as the undisputed apex predator of the Cenozoic era. Dominating warm global oceans between 23 and 3.6 million years ago, this gargantuan lamniform shark attained lengths of up to 50 to 60 feet. Its biology was characterized by a massive cartilaginous skeleton, thick jaw bones, and serrated, palm-sized teeth built to endure immense structural stress. Megalodon did not just rely on size; fossil evidence suggests it shared the endothermic traits of modern great whites, generating internal heat to maintain high swimming speeds over vast territories.</p><p>Its survival mechanisms were forged around hunting the nutrient-dense mysticetes (baleen whales) and ancient sirenians. Megalodon hunting strategies were brutal and specialized; fossilized whale bones exhibit catastrophic compression fractures and deep gouges from Megalodon teeth. Scientists infer the shark used high-speed ambush attacks targeting the rib cages and vital organs of large marine mammals, delivering a bite force estimated at over 40,000 pounds per square inchâ€”arguably the strongest bite in the history of the animal kingdom.</p><p>Ultimately, history outpaced the beast. Approximately 3.6 million years ago, planetary cooling triggered immense glacial formation, locking up ocean water, dropping sea levels, and devastating the shallow, warm coastal nurseries Megalodon relied on. Concurrently, their core preyâ€”baleen whalesâ€”began migrating towards newly formed, frigid polar waters, evolving faster swimming speeds and larger sizes. Ecologically, Megalodon\'s extinction was a major turnover event; its absence opened predatory niches that allowed modern great whites and killer whales to flourish, fundamentally restructuring the modern marine food web.</p>',
        conservation: 'â€”',
        image: 'https://upload.wikimedia.org/wikipedia/commons/1/1f/Carcharodon_megalodon.jpg'
    },
    {
        slug: 'Dunkleosteus',
        title: 'Dunkleosteus',
        focus: 'Armored Predator',
        habitat: 'Devonian seas (fossil)',
        diet: 'Fish and armored prey',
        size: 'Up to ~10 m',
        status: 'Extinct',
        note: 'Armored dreadnought with guillotine-like jaw blades.',
        brief: 'A heavily armored placoderm from the Devonian era, Dunkleosteus featured self-sharpening bony jaw blades and a revolutionary four-bar linkage mechanism. This hydraulic snapping mechanism could crush the hardest prey. Its extinction paved the way for modern sharks and bony fishes.',
        summary: '<p>Dunkleosteus serves as a terrifying and fascinating poster child of the Devonian period, an era often dubbed the "Age of Fishes." Flourishing over 358 million years ago, this colossal placoderm (armored fish) reached up to 30 feet in length, sporting an intimidating, heavily ossified head and thorax shield. Rather than actual teeth, its biology featured self-sharpening, bony plates protruding from its upper and lower jaws that acted like enormous geological shears. The remainder of its body was unarmored and cartilaginous, making preservation of its posterior rare in the fossil record.</p><p>The survival mechanics of Dunkleosteus relied incredibly on an innovative four-bar linkage mechanism in its skull. This jaw structure allowed the fish to snap its massive mouth open in a fraction of a second, creating an intense localized vacuum that instantly sucked water and prey inside. Once the jaw snapped shut, the guillotine-like blades delivered unbelievable slicing force capable of crushing ammonites, primitive sharks, and even other heavily armored placoderms. It was the ultimate biological hydraulic press.</p><p>In the narrative of evolutionary history, Dunkleosteus showcases an early, spectacularly successful but ultimately doomed experiment in vertebrate body plans. They dominated the global marine ecosystem, exerting immense top-down pressure on prehistoric seas. However, their highly specialized, massive forms became a vulnerability during the Late Devonian extinction events, where oceanic anoxia and rapidly changing environments drove the complex, slow-reproducing placoderms to total extinction, clearing the path for the rise of chondrichthyans (sharks and rays) and osteichthyans (bony fishes).</p>',
        conservation: 'â€”',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Dunkleosteus_terrelli_%28fossil%29.jpg/960px-Dunkleosteus_terrelli_%28fossil%29.jpg'
    },
    {
        slug: 'Coelacanth',
        title: 'Coelacanth',
        focus: 'Living Fossil',
        habitat: 'Deep volcanic slopes and caves',
        diet: 'Small fish, cephalopods',
        size: 'Around 2 m',
        status: 'Critically Endangered',
        note: 'Rediscovered in 1938, a relic of deep-water refugia.',
        brief: 'Thought extinct for 65 million years, the Coelacanth was rediscovered in 1938, shocking the scientific world. This lobe-finned fish possesses transitional features bridging fish and tetrapods. Now it hides in deep volcanic caves, a living window into early vertebrate evolution.',
        summary: '<p>The Coelacanth (Latimeria chalumnae) represents a staggering biological anomalyâ€”a lineage that effectively ghosted the fossil record for 65 million years. This lobe-finned fish sports physical traits that are transitional bridges toward tetrapods (four-legged land animals). Uniquely, they possess fleshy, muscular pectoral and pelvic fins backed by a bony skeletal axis, which they move in an alternating, almost "walking" pattern through the deep currents. They also house a fat-filled swim bladder, a vestigial lung from ancestors who lived in shallow, hypoxic waters, and a distinct intracranial joint allowing them to open their mouths extremely wide.</p><p>In terms of survival mechanisms, the modern coelacanth has sought refuge in the deep, steep-sloped volcanic submarine caves of the Indian Ocean, retreating to depths of 100 to 500 meters. During the day, they exhibit highly passive behavior, congregating in dark rocky voids to avoid higher-tier predators and conserve energy. At night, they become deliberate, slow-drifting hunters using a gel-filled rostral organ in their snout to detect the weak electrical pulses of cephalopods and bottom-dwelling fishes, relying on stealth rather than speed.</p><p>Historically believed to have perished alongside the non-avian dinosaurs during the K-Pg extinction, the rediscovery of the Coelacanth in 1938 deeply shook the scientific community. Ecologically, they offer priceless insights; they exist as slow-reproducing apex predators within specialized, highly stable deep reef niches. Their incredibly slow metabolism and extended life spans mean their populations are immensely fragile, making every isolated colony a crucial, irreplaceable artifact of deep evolutionary time.</p>',
        conservation: 'Protecting deep habitat and limiting bycatch is critical.',
        image: 'https://upload.wikimedia.org/wikipedia/commons/4/4b/Coelacanth.png'
    },
    {
        slug: 'Barreleye',
        title: 'Barreleye Fish',
        focus: 'Transparent Vision',
        habitat: 'Mesopelagic depths',
        diet: 'Small jellyfish and prey above',
        size: 'Small',
        status: 'Least Concern/Deep',
        note: 'A transparent head housing tubular eyesâ€”an optical marvel.',
        brief: 'The Barreleye Fish possesses a completely transparent head dome protecting massive tubular eyes with green light-filtering lenses. Dwelling in the twilight zone, it spots prey silhouettes from below while rotating its eyes to snatch copepods from jellyfish tentaclesâ€”a master of deep-sea stealth.',
        summary: '<p>The Barreleye Fish (Macropinna microstoma) exemplifies the wild and surreal boundaries of biology bent under the extremes of the deep ocean. Dwelling roughly 600 to 800 meters down in the "twilight zone," its most astonishing feature is a completely transparent, fluid-filled dome encasing its forehead. Inside this clear canopy sit massive, remarkably intricate tubular eyes tipped with bright green, light-filtering lenses. What appear to be eyes on the front of its face are actually nares (olfactory organs); the true eyes are the striking green orbs safely protected from nematocyst stings beneath the transparent shield.</p><p>Survival in the mesopelagic zone relies on mastering light. The barreleyeâ€™s magnificent tubular eyes are primarily oriented straight up, acting like specialized binoculars designed to spot the faint silhouettes of downwelling prey or small crustaceans trapped in the tentacles of siphonophores against the dim residual sunlight. The green pigmentation in their eye lenses acts as a filter to cut through the bioluminescence emitted by many deep-sea creatures, allowing the barreleye to distinguish between ambient light and the glowing camouflage of its prey. When it spots a target, it can actively rotate its eyes forward within its fluid dome to strike with precision.</p><p>Historically, capturing a Barreleye intact was nearly impossible; the delicate transparent dome would almost always burst due to pressure changes and mechanical trauma during trawling, leading scientists to originally envision them without this iconic feature. Ecologically, the barreleye plays an intriguing specialized role as a predator and kleptoparasite, carefully picking copepods and other minute animals out of the stinging tentacles of large jellyfish. They navigate the razor-thin margins of survival in the deep sea with high sensory specialization, demonstrating nature\'s brilliant ingenuity in extreme isolation.</p>',
        conservation: 'Deep-sea habitat protections help preserve delicate mesopelagic life.',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Barreleye-fish_GoK.jpg/960px-Barreleye-fish_GoK.jpg'
    }
];

const speciesGrid = document.getElementById('species-grid');

function loadSpeciesCards() {
    if (!speciesGrid) return;

    speciesGrid.innerHTML = '';

    for (const profile of speciesProfiles) {
        const speciesTitle = profile.title;
        const imageUrl = profile.image;
        const wikiLink = `https://en.wikipedia.org/wiki/${profile.slug}`;

        const cardHTML = `
            <article class="species-card">
                <div class="species-card__media">
                    <img src="${imageUrl}" alt="${speciesTitle}" class="species-card__image" loading="lazy" decoding="async">
                    <div class="species-card__overlay"></div>
                    <div class="species-card__caption">
                        <p class="eyebrow species-card__focus">${profile.focus}</p>
                        <h3 class="species-card__title">${speciesTitle}</h3>
                    </div>
                </div>
                <div class="species-card__body">
                    <p class="species-card__note">${profile.note}</p>
                    <p class="species-card__brief">${profile.brief}</p>
                    <div class="species-card__facts">
                        <div class="species-card__fact">
                            <span class="species-card__fact-label">Habitat</span>
                            <p class="species-card__fact-value">${profile.habitat}</p>
                        </div>
                        <div class="species-card__fact">
                            <span class="species-card__fact-label">Diet</span>
                            <p class="species-card__fact-value">${profile.diet}</p>
                        </div>
                        <div class="species-card__fact">
                            <span class="species-card__fact-label">Size</span>
                            <p class="species-card__fact-value">${profile.size}</p>
                        </div>
                        <div class="species-card__fact">
                            <span class="species-card__fact-label">Status</span>
                            <p class="species-card__fact-value">${profile.status}</p>
                        </div>
                    </div>
                    <a href="${wikiLink}" target="_blank" rel="noopener noreferrer" class="species-card__wiki-btn">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" class="species-card__wiki-icon">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                        </svg>
                        Wikipedia Reference
                    </a>
                </div>
            </article>
        `;
        speciesGrid.insertAdjacentHTML('beforeend', cardHTML);
    }

    // Lightweight fade-in animation without ScrollTrigger
    gsap.to(".species-card", {
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
        delay: 0.2
    });
}

// --- STEP 3: OCEANS DATA FETCHING ---
const oceanProfiles = [
    {
        slug: 'Pacific_Ocean',
        title: 'Pacific Ocean',
        depth: 'Largest basin',
        summary: 'The Pacific spans more than half of the worldâ€™s ocean surface and drives climate patterns across continents.',
        details: '<p>The Pacific spans over 63 million square miles and drives climate patterns across continents. It contains deep trenches like the Mariana Trench and vast coral reef ecosystems. The basin is defined by the Ring of Fire, where seismic activity continuously creates new geology. The Pacific controls global climate through El NiÃ±o-Southern Oscillation (ENSO), affecting weather patterns and marine food webs worldwide.</p>',
        note: 'Large swells, deep trenches, and broad coral systems make the Pacific a climate engine and a migration highway at the same time.',
        image: 'https://upload.wikimedia.org/wikipedia/commons/f/f6/Pacific_Ocean_-_en.png',
        facts: [
            { label: 'Area', value: 'Largest and deepest' },
            { label: 'Climate', value: 'El NiÃ±o / La NiÃ±a' },
            { label: 'Feature', value: 'Mariana Trench' },
            { label: 'Life', value: 'Reefs, pelagic giants, and deep trenches' }
        ]
    },
    {
        slug: 'Atlantic_Ocean',
        title: 'Atlantic Ocean',
        depth: 'Climate conveyor',
        summary: 'The Atlantic connects warm and cold currents through a long north-south axis that carries heat across the world.',
        details: '<p>The Atlantic functions as the global climate conveyor belt, connecting warm and cold currents through its north-south axis. The mid-Atlantic ridge creates diverse ecosystems from nutrient-rich banks to floating macroalgae communities. The Gulf Stream acts as a thermal highway for marine life, accelerating migrations and transporting vital nutrients. The Atlantic controls heat distribution for the Northern Hemisphere through the Atlantic Meridional Overturning Circulation (AMOC).</p>',
        note: 'The Gulf Stream and North Atlantic Drift make this basin central to weather, shipping, and coastal food webs.',
        image: 'https://upload.wikimedia.org/wikipedia/commons/4/47/Atlantic_Ocean_-_en.png',
        imageClass: 'ocean-image--center',
        facts: [
            { label: 'Current', value: 'Gulf Stream' },
            { label: 'Role', value: 'Heat transport' },
            { label: 'Borders', value: 'Four continents' },
            { label: 'Value', value: 'Moves heat toward Europe' }
        ]
    },
    {
        slug: 'Indian_Ocean',
        title: 'Indian Ocean',
        depth: 'Warmest basin',
        summary: 'The Indian Ocean stores warm water that powers monsoon systems and influences food security across surrounding regions.',
        details: '<p>The Indian Ocean is the warmest basin on Earth, trapped between Asia, Africa, and Australia. It contains ancient coral reef systems in the Maldives and Red Sea, yet seasonal upwellings create intense biological productivity. Marine life synchronizes breeding and migration with monsoon winds that reverse seasonally. The ocean stores immense latent heat that drives monsoon rains, affecting agriculture and water supply for over two billion people.</p>',
        note: 'This basin stores heat that later returns as monsoon rains, connecting sea temperature to harvests and daily life.',
        image: 'https://upload.wikimedia.org/wikipedia/commons/f/f0/Indian_Ocean.png',
        facts: [
            { label: 'Climate', value: 'Monsoons' },
            { label: 'Feature', value: 'Warmest ocean' },
            { label: 'Region', value: 'Africa to Australia' },
            { label: 'Value', value: 'Food security and shipping' }
        ]
    },
    {
        slug: 'Southern_Ocean',
        title: 'Southern Ocean',
        depth: 'Circumpolar ring',
        summary: 'Encircling Antarctica, the Southern Ocean isolates cold water, powerful winds, and the strongest currents on the planet.',
        details: '<p>The Southern Ocean encircles Antarctica and is the wildest marine environment on Earth. Antarctic krill thrives under pack ice and fuels the entire trophic pyramid for leopard seals, killer whales, penguins, and migrating humpbacks. Animals possess specialized survival mechanisms including antifreeze proteins and dense blubber. The Antarctic Circumpolar Current is the most powerful ocean current, isolating Antarctica and acting as the planet\'s primary carbon sink and climate regulator.</p>',
        note: 'The circumpolar current links the major basins together, turning Antarctica into a regulator for the whole planet.',
        image: 'https://upload.wikimedia.org/wikipedia/commons/d/d8/Southern_Ocean_-_en.png',
        facts: [
            { label: 'Current', value: 'Antarctic Circumpolar' },
            { label: 'Climate', value: 'Powerful heat sink' },
            { label: 'Habitat', value: 'Krill-rich waters' },
            { label: 'Role', value: 'Connects all major oceans' }
        ]
    },
    {
        slug: 'Arctic_Ocean',
        title: 'Arctic Ocean',
        depth: 'Smallest basin',
        summary: 'The Arctic Ocean is shallow, ice-covered for much of the year, and extremely sensitive to warming.',
        details: '<p>The Arctic Ocean is the smallest and shallowest basin, uniquely ice-covered and extremely sensitive to warming. Multi-year sea ice acts as an inverted ecosystem where ice algae form the Arctic food web foundation. Polar bears hunt seals on ice, narwhals use sensory tusks to navigate ice floes, and the brilliant white ice reflects solar radiation back to space. Rapid ice loss creates a dangerous feedback loop: less reflective ice means more heat absorption, threatening entire Arctic ecosystems.</p>',
        note: 'Because the Arctic reacts quickly to heat, small changes in ice create large changes in migration, weather, and coastal stability.',
        image: 'https://upload.wikimedia.org/wikipedia/commons/5/59/Arctic_Ocean_-_en.png',
        facts: [
            { label: 'Traits', value: 'Sea ice' },
            { label: 'Risk', value: 'Fast warming' },
            { label: 'Life', value: 'Polar food webs' },
              { label: 'Sensitivity', value: 'Strong climate feedbacks' }
        ]
    }
];

const oceansGrid = document.getElementById('oceans-grid');
const oceanDisplay = document.getElementById('ocean-info-display');
let currentActiveOceanSlug = 'Pacific_Ocean'; // Cache current active ocean

function renderOceanDisplay(ocean) {
    if (!oceanDisplay) return;
    const oceanImageClass = ocean.imageClass || '';

    const detailFacts = ocean.facts.map((fact) => `
        <div class="od-fact">
            <span class="od-fact__label">${fact.label}</span>
            <p class="od-fact__value">${fact.value}</p>
        </div>
    `).join('');

    // Fade out current content
    gsap.to(oceanDisplay, {
        opacity: 0,
        duration: 0.3,
        onComplete: () => {
            oceanDisplay.innerHTML = `
                <div class="od-layout">
                    <div class="od-media">
                        <img src="${ocean.image}" alt="${ocean.title}" class="od-media__img ${oceanImageClass}" loading="lazy" decoding="async">
                        <div class="od-media__overlay"></div>
                        <div class="od-media__badge">
                            <span class="eyebrow">${ocean.depth}</span>
                        </div>
                    </div>
                    <div class="od-content">
                        <div class="od-content__header">
                            <p class="eyebrow">Selected ocean</p>
                            <h3 class="od-content__title">${ocean.title}</h3>
                            <p class="od-content__summary">${ocean.summary}</p>
                        </div>
                        <div class="od-facts-grid">
                            ${detailFacts}
                        </div>
                        <div class="od-details">${ocean.details}</div>
                        <div class="od-callout">
                            <div class="od-callout__icon">
                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="20" height="20"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            </div>
                            <div>
                                <p class="od-callout__label">Why it matters</p>
                                <p class="od-callout__text">${ocean.note}</p>
                            </div>
                        </div>
                        <a href="https://en.wikipedia.org/wiki/${ocean.slug}" target="_blank" rel="noreferrer" class="btn btn--primary btn--small ocean-display__link">
                            Read on Wikipedia <span class="ocean-display__link-arrow">&rarr;</span>
                        </a>
                    </div>
                </div>
            `;
            
            // Fade in new content with staggered elements
            gsap.to(oceanDisplay, {
                opacity: 1,
                duration: 0.5,
                ease: 'power2.out'
            });
            
            // Stagger animate the child elements
            gsap.from('.od-media, .od-content > *', {
                y: 16,
                opacity: 0,
                duration: 0.5,
                stagger: 0.05,
                ease: 'power2.out'
            });
        }
    });
}

function setActiveOceanCard(slug) {
    if (currentActiveOceanSlug === slug) return; // Avoid unnecessary DOM updates
    
    // Remove active state from previous card
    const previousCard = oceansGrid.querySelector(`[data-ocean-slug="${currentActiveOceanSlug}"]`);
    if (previousCard) {
        previousCard.classList.remove('is-active');
        previousCard.setAttribute('aria-pressed', 'false');
    }
    
    // Add active state to new card
    const newCard = oceansGrid.querySelector(`[data-ocean-slug="${slug}"]`);
    if (newCard) {
        newCard.classList.add('is-active');
        newCard.setAttribute('aria-pressed', 'true');
    }
    
    currentActiveOceanSlug = slug;
}

async function loadOceans() {
    if (!oceansGrid || !oceanDisplay) return;

    oceansGrid.innerHTML = '';

    // Create a map of ocean slugs for quick lookup
    const oceanMap = {};
    oceanProfiles.forEach((ocean) => {
        oceanMap[ocean.slug] = ocean;
    });

    oceanProfiles.forEach((ocean, index) => {
        const oceanImageClass = ocean.imageClass || '';
        const card = document.createElement('div');
        card.className = 'os-card' + (index === 0 ? ' is-active' : '');
        card.dataset.oceanSlug = ocean.slug;
        card.setAttribute('aria-pressed', index === 0 ? 'true' : 'false');
        card.innerHTML = `
            <div class="os-card__media">
                <img src="${ocean.image}" alt="${ocean.title}" class="os-card__img ${oceanImageClass}" loading="lazy" decoding="async">
                <div class="os-card__gradient"></div>
                <div class="os-card__label">
                    <span class="os-card__number">0${index + 1}</span>
                    <h3 class="os-card__title">${ocean.title}</h3>
                    <p class="os-card__depth">${ocean.depth}</p>
                </div>
            </div>
        `;
        oceansGrid.appendChild(card);
    });

    // Use event delegation on parent container instead of attaching listeners to each card
    oceansGrid.addEventListener('click', (event) => {
        const card = event.target.closest('.os-card');
        if (!card) return;
        
        const slug = card.dataset.oceanSlug;
        const ocean = oceanMap[slug];
        if (!ocean) return;
        
        // Smooth animation for card state change
        gsap.to(card, {
            scale: 0.98,
            duration: 0.15,
            yoyo: true,
            repeat: 1,
            ease: 'power2.out'
        });
        
        renderOceanDisplay(ocean);
        setActiveOceanCard(slug);
        if (window.innerWidth < 1024) {
            oceanDisplay.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });

    // Initial render with fade-in
    gsap.to(oceanDisplay, {
        opacity: 0,
        duration: 0,
        onComplete: () => {
            renderOceanDisplay(oceanProfiles[0]);
            gsap.to(oceanDisplay, {
                opacity: 1,
                duration: 0.6,
                ease: 'power2.out'
            });
        }
    });
    
    setActiveOceanCard(oceanProfiles[0].slug);
}


// Initialize fetching when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initPreloader();
    loadSpeciesCards();
    loadOceans();
    initAudioToggle();
    initLiveData();
    setTimeout(initScrollAnimations, 1500); // Give time for content injection AND preloader
    // Initialize depth meter and smooth nav after a short delay so DOM is ready
    setTimeout(() => {
        initDepthMeter();
        initSmoothNav();
    }, 1600);
});

// --- STEP 4: PRELOADER, CUSTOM CURSOR & AUDIO ---

function initPreloader() {
    const preloader = document.getElementById('preloader');
    const loaderBar = document.getElementById('loader-bar');

    // Simulate loading block
    gsap.to(loaderBar, {
        width: "100%",
        duration: 1.8,
        ease: "power2.inOut",
        onComplete: () => {
            gsap.to(preloader, {
                opacity: 0,
                duration: 0.8,
                ease: "power2.inOut",
                onComplete: () => {
                    preloader.style.display = 'none';
                    // Trigger hero animations after preloader vanishes
                    gsap.from(".hero-content > *", {
                        y: 40,
                        opacity: 0,
                        stagger: 0.2,
                        duration: 1.5,
                        ease: "power4.out"
                    });
                    gsap.from(".hero-card", {
                        x: 40,
                        opacity: 0,
                        rotation: 2,
                        duration: 1.5,
                        ease: "power4.out"
                    }, "-=1.2");
                }
            });
        }
    });
}

function initCustomCursor() {
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    // Disable custom cursor on touch devices
    const isTouch = ('ontouchstart' in window) || navigator.maxTouchPoints > 0 || window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) {
        if (cursorDot) cursorDot.style.display = 'none';
        if (cursorOutline) cursorOutline.style.display = 'none';
        return; // do not bind mouse listeners
    }

    // Performance-optimized cursor: RAF loop + lerp for outline.
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let outlineX = mouseX;
    let outlineY = mouseY;

    const dotSize = cursorDot ? (cursorDot.offsetWidth / 2 || 4) : 4;
    const outlineSize = cursorOutline ? (cursorOutline.offsetWidth / 2 || 20) : 20;

    function onMouseMove(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
    }

    // RAF loop updates transforms on the compositor thread
    let rafId = null;
    function cursorLoop() {
        if (cursorDot) cursorDot.style.transform = `translate3d(${mouseX - dotSize}px, ${mouseY - dotSize}px, 0)`;

        // smooth outline lerp
        outlineX += (mouseX - outlineX) * 0.12;
        outlineY += (mouseY - outlineY) * 0.12;
        if (cursorOutline) cursorOutline.style.transform = `translate3d(${outlineX - outlineSize}px, ${outlineY - outlineSize}px, 0)`;

        rafId = requestAnimationFrame(cursorLoop);
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    // Start loop
    if (!rafId) rafId = requestAnimationFrame(cursorLoop);

    // Pointer enter/leave for interactive elements (scale outline, hide dot)
    const interactiveEls = document.querySelectorAll('a, button, input, textarea, select');
    function handleEnter() {
        if (cursorOutline) gsap.to(cursorOutline, { scale: 1.5, duration: 0.16, ease: 'power2.out' });
        if (cursorDot) cursorDot.style.opacity = '0';
    }
    function handleLeave() {
        if (cursorOutline) gsap.to(cursorOutline, { scale: 1, duration: 0.22, ease: 'power2.out' });
        if (cursorDot) cursorDot.style.opacity = '1';
    }
    interactiveEls.forEach(el => {
        el.addEventListener('pointerenter', handleEnter, { passive: true });
        el.addEventListener('pointerleave', handleLeave, { passive: true });
    });

    // Note: magnetic element translations caused layout thrash on some devices; removed to improve performance.
}

// Smooth navigation scrolling (native easing) for all nav links
function initSmoothNav() {
    function smoothScrollTo(targetY, duration = 1500) {
        const startY = window.scrollY || window.pageYOffset;
        const diff = targetY - startY;
        const startTime = performance.now();

        function ease(t) { // easeInOutQuad
            return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        }

        function step(now) {
            const elapsed = now - startTime;
            const t = Math.min(1, elapsed / duration);
            window.scrollTo(0, Math.round(startY + diff * ease(t)));
            if (t < 1) requestAnimationFrame(step);
        }

        requestAnimationFrame(step);
    }

    document.querySelectorAll('nav a[href^="#"]').forEach(a => {
        a.addEventListener('click', (e) => {
            const href = a.getAttribute('href');
            if (!href || href.charAt(0) !== '#') return;
            const target = document.querySelector(href);
            if (!target) return;
            e.preventDefault();
            const top = target.getBoundingClientRect().top + window.scrollY - 24;
            smoothScrollTo(top, 1500);
        });
    });
}

function initAudioToggle() {
    const audio = document.getElementById('ambient-audio');
    const toggleBtn = document.getElementById('audio-toggle');
    const iconPlay = document.getElementById('icon-play');
    const iconMute = document.getElementById('icon-mute');
    let isPlaying = false;

    // Set initial audio volume low for ambience
    audio.volume = 0.4;

    toggleBtn.addEventListener('click', () => {
        if (isPlaying) {
            audio.pause();
            iconPlay.classList.add('is-hidden');
            iconMute.classList.remove('is-hidden');
        } else {
            audio.play().catch(e => console.log('Audio autoplay prevented:', e));
            iconMute.classList.add('is-hidden');
            iconPlay.classList.remove('is-hidden');
        }
        isPlaying = !isPlaying;
    });
}

// --- GSAP SCROLL ANIMATIONS ---
function initScrollAnimations() {
    // 1. Animate all Section Titles as they enter viewport
    gsap.utils.toArray('.section-title').forEach(title => {
        gsap.from(title, {
            scrollTrigger: {
                trigger: title,
                start: "top 85%",
            },
            y: 40,
            opacity: 0,
            duration: 1.2,
            ease: "power4.out"
        });
    });

    // 2. Stagger animate all Glass Panels dynamically
    gsap.utils.toArray('section').forEach(section => {
        const panels = section.querySelectorAll('.glass-panel');
        // Skip sections we already manually animated
        if (panels.length > 0 && section.id !== 'species' && section.id !== 'discover' && section.id !== 'oceans') {
            gsap.from(panels, {
                scrollTrigger: {
                    trigger: section,
                    start: "top 80%",
                },
                y: 50,
                opacity: 0,
                scale: 0.98,
                stagger: 0.15,
                duration: 1.2,
                ease: "power3.out"
            });
        }
    });

    // 3. Gallery Images Pop-in & Parallax
    gsap.from('#gallery img', {
        scrollTrigger: {
            trigger: '#gallery',
            start: "top 80%",
        },
        y: 60,
        opacity: 0,
        scale: 0.9,
        stagger: 0.1,
        duration: 1.2,
        ease: "back.out(1.7)" // Bouncy, premium reveal
    });

    // 4. Animate the Threat Loading Numbers (Organic Data Vis)
    gsap.utils.toArray('.threat-stat').forEach(stat => {
        const targetValue = parseInt(stat.getAttribute('data-target'), 10);
        const suffix = stat.getAttribute('data-suffix') || '';
        const useCompact = stat.getAttribute('data-compact') === 'true';
        const counter = { value: 0 };

        const formatValue = (value) => {
            if (useCompact) {
                return `${new Intl.NumberFormat('en', { notation: 'compact', maximumFractionDigits: 1 }).format(Math.round(value))}${suffix}`;
            }

            return `${new Intl.NumberFormat('en-US').format(Math.round(value))}${suffix}`;
        };

        stat.innerText = formatValue(0);

        gsap.to(counter, {
            scrollTrigger: {
                trigger: stat,
                start: "top 85%",
            },
            value: targetValue,
            duration: 2.5,
            ease: "power3.out",
            onUpdate: () => {
                stat.innerText = formatValue(counter.value);
            }
        });
    });


}

// Depth meter: updates from 0m â†’ 11,000m based on scroll progress
function initDepthMeter() {
    const meter = document.getElementById('depth-meter');
    if (!meter || !window.ScrollTrigger) return;
    const valueEl = meter.querySelector('.value');
    const maxDepth = 11000;

    ScrollTrigger.create({
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: (self) => {
            const d = Math.round(self.progress * maxDepth);
            valueEl.textContent = d.toLocaleString() + 'm';

        }
    });
}

function initLiveData() {
    const sstEl = document.getElementById('sst-number');
    const pressureEl = document.getElementById('pressure-number');
    const feedList = document.getElementById('telemetry-feed');
    
    if (!sstEl || !pressureEl || !feedList) return;

    // Simulate fluctuating SST (1.18 to 1.25)
    setInterval(() => {
        const fluctuate = (Math.random() * 0.04 - 0.02).toFixed(2);
        const currentSst = parseFloat(sstEl.innerText);
        let newSst = currentSst + parseFloat(fluctuate);
        if (newSst < 1.15) newSst = 1.15;
        if (newSst > 1.30) newSst = 1.30;
        sstEl.innerText = '+' + newSst.toFixed(2);
    }, 3000);

    // Simulate fluctuating Pressure (15745 to 15755)
    setInterval(() => {
        const fluctuate = Math.floor(Math.random() * 5) - 2;
        const currentPressure = parseInt(pressureEl.innerText.replace(/,/g, ''), 10);
        const newPressure = currentPressure + fluctuate;
        pressureEl.innerText = new Intl.NumberFormat('en-US').format(newPressure);
    }, 2000);

    // Simulate new feed items
    const possibleEvents = [
        "Blue Whale 'Echo' - Vocalization recorded in South Pacific",
        "Buoy 4014 - Sharp salinity drop detected",
        "Orca Pod J - Sped up to 15 knots off San Juan Islands",
        "Manta Ray 'Glide' - Surfaced for 10 mins near Hawaii",
        "Deep Rover - Passing 4000m mark in Mariana Trench",
        "Tagged Tuna 998 - Reached 50km off coast of Japan",
        "Leatherback Turtle - Detected entering Gulf of Mexico"
    ];

    setInterval(() => {
        if (Math.random() > 0.4) { // 60% chance to ping
            const eventIndex = Math.floor(Math.random() * possibleEvents.length);
            const now = new Date();
            const timeStr = now.getUTCHours().toString().padStart(2, '0') + ':' + now.getUTCMinutes().toString().padStart(2, '0') + 'Z';
            
            const li = document.createElement('li');
            li.className = 'feed-item';
            li.innerHTML = "<span class='feed-time'>" + timeStr + "</span><span class='feed-data'>" + possibleEvents[eventIndex] + "</span>";
            
            // prepend and animate in
            feedList.insertBefore(li, feedList.firstChild);
            gsap.from(li, { opacity: 0, x: -20, duration: 0.5 });
            
            // remove oldest
            if (feedList.children.length > 3) {
                const last = feedList.lastElementChild;
                gsap.to(last, { opacity: 0, duration: 0.5, onComplete: () => last.remove() });
            }
        }
    }, 4500);
}

