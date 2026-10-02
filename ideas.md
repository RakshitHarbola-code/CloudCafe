# Design direction — The Cloud Factory Cafe & Lounge

## Direction
An elegant, cinematic, editorial “cloud lounge” for a distinctive Old Delhi cafe. The intended feeling is stepping above the bustle into a warm, intimate, atmospheric retreat. The confirmed direction favors contemporary premium restraint—not a generic restaurant template.

## Design movement
Contemporary hospitality editorial: art-directed food-and-interior photography, carefully typeset magazine-like layouts, and tactile digital interactions. Ground the experience in the venue's peaceful, Arabian-night ambiance while avoiding costume-like motifs or unsupported claims.

## Core principles
- Atmosphere before ornament: generous negative space, one purposeful visual per section, and a luminous hero.
- Honest hospitality: show only supplied facts; no invented menu dishes, prices, hours, awards, or testimonials.
- Easy to visit: phone, WhatsApp, directions, contact/reservation, and the full address are always simple to find.
- Designed for every screen: graceful editorial composition on desktop that condenses into a legible, accessible mobile experience.
- Motion with purpose: reveals and depth make transitions feel soft and tactile, never impede reading or reduced-motion preferences.

## Color philosophy
Warm parchment/ivory grounds provide a calm counterpoint to very deep ink/espresso surfaces; muted antique brass/gold appears sparingly for highlights and rules; a restrained ember/terracotta accent draws attention to primary actions. Maintain AA-minded contrast rather than relying on gold-on-cream text.

## Layout paradigm
A responsive one-page story: refined sticky header and compact mobile menu; full-bleed cinematic hero; proof-point strip; menu categories and dining modes; atmosphere/about editorial feature; restrained review cards; high-intent visit/location block; and an elegant footer. Alternate light and dark surfaces and offset large imagery with concise copy.

## Signature elements
A soft halo/haze treatment in the hero; a quiet orbital/cloud-ring brand mark; slender brass rules and fine grain; image cards with subtle perspective on pointer movement; an understated image-to-copy parallax; serif editorial display type paired with crisp modern sans text; small uppercase labels with generous tracking. Avoid faux-3D typography, noisy gradients, or ornamental clutter.

## Interaction philosophy
Keyboard-accessible navigation, visible focus, semantic section anchors, reduced-motion support, and large tap targets. Buttons feel tactile via restrained lift and shadow. An optional hover tilt is pointer-only, low-amplitude, bounded, and disabled for touch or reduced motion. No false interactive map or unsupported live availability.
The cloud-ring identity can be experienced as a lightweight, decorative Three.js scene that responds softly to pointer position and hero scroll progress. Keep the page content and contact actions natively accessible and fully present in server-rendered HTML, independent of WebGL support.

## Animation
Brief, eased GSAP/ScrollTrigger section reveals with a graceful no-JS default; restrained Three.js cloud-orbit rotation tied to hero scroll position, subtle pointer parallax, ambient drift, perspective card tilt, and elegant section transitions. Use React for structured page components, render the full page to HTML for search and no-JS readers, respect `prefers-reduced-motion`, support touch with reduced GPU load, and never hide essential content pending animation.

## Typography system
Editorial high-contrast display serif for headlines and pull quotes; clean neutral sans-serif for body, navigation, and controls; selective monospaced/uppercase labels for time/location-style metadata. Keep Hindi name text legible with a font fallback supporting Devanagari.

## Brand essence
An intimate cloud-lit hideaway in Old Delhi: peaceful, warm, stylish, welcoming.

## Brand voice
Warm, inviting, assured, concise, sensory without overclaiming. Let users know exactly how to call, message, or find the venue.

## Wordmark / logo
The Cloud Factory name set as an editorial wordmark beside a distinctive cloud and rising-crescent/steam mark. Create a separate flat, square app icon with a full-bleed ink background and a strong cream/brass abstract cloud-shaped emblem; simple filled geometry, negative space, centered, no lettering.

## Signature brand color
Deep cloud-ink (#181714), lifted by restrained antique brass (#B99A65), soft parchment (#F3EFE7), and ember (#A75D3C).

## Restaurant-first refresh — September 2026
The user feedback is to make the page unmistakably read as a restaurant/cafe and feel more premium. Lead with an inviting, original food photograph rather than an empty lounge scene, then replace decorative plate/glass/moon drawings with a photo-led editorial food-and-drink gallery. Keep the existing warm ink/parchment/brass identity and subtle 3D motion, but let the food photography own the visual hierarchy. Because the actual menu and venue photography were not supplied, clearly label generated dishes as illustrative and do not name or imply specific menu items, prices, or current availability. Include an easy “ask for today’s menu” contact link without claiming what is currently served.
