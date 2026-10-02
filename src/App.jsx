import React, { useEffect, useRef, useState } from 'react';
import OrbitalScene from './OrbitalScene.jsx';
import FoodGallery from './FoodGallery.jsx';

const reviewThemes = [
  {
    text: 'Guests call out the peaceful atmosphere, comfortable sofas and an Arabian-night feeling—an evening away from the rush.',
    label: 'AMBIENCE & COMFORT',
  },
  {
    text: 'Flavourful hookah, varied drinks, good food and warm, attentive service. The details visitors return to mention.',
    label: 'FOOD, DRINKS & SERVICE',
  },
  {
    text: 'A hidden second-floor find with stylish interiors, space to stretch out and prices guests describe as reasonable.',
    label: 'A HIDDEN CORNER OF DELHI',
  },
];

const address = '2nd floor, 3601-15, Netaji Subhash Marg, opposite 24/7, Old Delhi, Kucha Alam, Khabas Pura, Daryaganj, New Delhi, Delhi 110002';
const directionsUrl = 'https://www.google.com/maps/search/?api=1&query=The+Cloud+Factory+Cafe+and+Lounge%2C+3601-15+Netaji+Subhash+Marg%2C+Daryaganj%2C+Delhi+110002';

function Arrow() { return <span className="arrow" aria-hidden="true">↗</span>; }

function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuButton = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    document.addEventListener('keydown', onKeyDown);
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('keydown', onKeyDown);
      document.body.classList.remove('menu-open');
    };
  }, []);

  useEffect(() => {
    document.body.classList.toggle('menu-open', open);
    if (open) document.querySelector('#site-nav a')?.focus();
    return () => document.body.classList.remove('menu-open');
  }, [open]);

  const closeMenu = () => setOpen(false);
  return (
    <header className={`site-header${scrolled ? ' is-scrolled' : ''}`} id="top">
      <a className="brand" href="#top" aria-label="The Cloud Factory home" onClick={closeMenu}>
        <img className="brand-mark" src="/images/brand-mark.webp" alt="" width="42" height="42" />
        <span className="brand-lockup">
          <span className="brand-name">The Cloud Factory</span>
          <span className="brand-sub">CAFE &amp; LOUNGE <i aria-hidden="true">·</i> OLD DELHI</span>
        </span>
      </a>
      <button ref={menuButton} className="menu-toggle" type="button" aria-label={open ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={open} aria-controls="site-nav" onClick={() => setOpen(value => !value)}>
        <span /><span />
      </button>
      <nav className={`site-nav${open ? ' is-open' : ''}`} id="site-nav" aria-label="Main navigation">
        <a href="#story" onClick={closeMenu}>Our space</a>
        <a href="#menu" onClick={closeMenu}>Food &amp; drink</a>
        <a href="#reviews" onClick={closeMenu}>Guest notes</a>
        <a href="#visit" onClick={closeMenu}>Visit</a>
      </nav>
      <a className="header-cta" href="https://wa.me/919953412300" target="_blank" rel="noopener noreferrer">
        <span>Plan a visit</span><Arrow />
      </a>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <img className="hero-image" src="/images/hero-food.webp" alt="Illustrative cafe table with an Indian-inspired shared meal." fetchPriority="high" />
      <div className="hero-vignette" aria-hidden="true" />
      <div className="hero-grain" aria-hidden="true" />
      <OrbitalScene />
      <div className="hero-orbit orbit-one" aria-hidden="true" />
      <div className="hero-orbit orbit-two" aria-hidden="true" />
      <div className="hero-content">
        <p className="eyebrow hero-eyebrow"><span className="eyebrow-line" /> CAFE &amp; LOUNGE · OLD DELHI</p>
        <h1 id="hero-title">A table above<br /><em>the bustle.</em></h1>
        <p className="hero-lede">Good food, warm company, and a little room to linger—tucked upstairs in Daryaganj.</p>
        <div className="hero-actions">
          <a className="button button-gold" href="#menu">Explore food &amp; drink <Arrow /></a>
          <a className="text-link text-link-light" href="#visit">Plan a visit <Arrow /></a>
        </div>
      </div>
      <div className="hero-side-note"><span className="vertical-rule" /><span>UPSTAIRS IN DARYAGANJ<br />OLD DELHI · INDIA</span></div>
      <div className="hero-bottom">
        <p className="hero-illustrative"><span className="tiny-star" aria-hidden="true">✳</span> FOOD IMAGES ARE ILLUSTRATIVE <span>·</span> ASK FOR TODAY’S MENU</p>
        <a className="scroll-cue" href="#welcome"><span className="scroll-line" aria-hidden="true" /> SCROLL TO YOUR TABLE</a>
      </div>
      <div className="hero-stamp" aria-label="The Cloud Factory Cafe and Lounge, Old Delhi">
        <span className="stamp-top">THE CLOUD FACTORY</span>
        <span className="stamp-symbol" aria-hidden="true">☁</span>
        <span className="stamp-bottom">CAFE · LOUNGE · DARYAGANJ</span>
      </div>
    </section>
  );
}

function Welcome() {
  return (
    <section className="welcome section-pad" id="welcome" aria-label="The Cloud Factory at a glance">
      <div className="welcome-label" data-reveal><span className="section-index">01</span> TAKE A SEAT ABOVE THE CITY</div>
      <div className="welcome-copy" data-reveal>
        <h2>Good food.<br /><em>Slow evenings.</em></h2>
        <p>Tucked upstairs in Daryaganj, The Cloud Factory is a cafe and lounge for a good meal, easy conversation, and a little time away from the Old Delhi bustle.</p>
        <a className="text-link" href="#menu">Explore food &amp; drink <span className="arrow" aria-hidden="true">↘</span></a>
      </div>
      <div className="welcome-orbit" aria-hidden="true"><span /><i /></div>
      <div className="bilingual-mark" data-reveal>
        <span>YOUR OLD DELHI HIDEAWAY</span>
        <strong lang="hi">थे क्लाउड फैक्ट्री कैफे एंड लाउंज</strong>
        <span>एक शाम, थोड़ी सुकून भरी</span>
      </div>
    </section>
  );
}

function FactsBar() {
  return (
    <section className="facts-bar" aria-label="Guest rating and details">
      <div className="fact"><span className="fact-symbol" aria-hidden="true">✳</span><span className="fact-number">4.9</span><span className="fact-caption">GUEST RATING</span></div>
      <span className="fact-divider" aria-hidden="true" />
      <div className="fact"><span className="fact-number">587</span><span className="fact-caption">GOOGLE REVIEWS</span></div>
      <span className="fact-divider" aria-hidden="true" />
      <div className="fact"><span className="fact-number fact-price">₹200 <i>—</i> ₹1,200</span><span className="fact-caption">TYPICAL SPEND / PERSON</span></div>
      <span className="fact-divider" aria-hidden="true" />
      <div className="fact fact-cats"><span className="fact-number">Cafe <i>·</i> Lounge</span><span className="fact-caption">MAKE AN EVENING OF IT</span></div>
    </section>
  );
}

function Story() {
  return (
    <section className="story" id="story">
      <div className="story-visual">
        <img className="story-photo" src="/images/lounge-ambience.webp" alt="Illustrative warmly lit cafe lounge interior; not a photograph of this venue." loading="lazy" decoding="async" />
        <div className="story-photo-overlay" aria-hidden="true" />
        <div className="story-visual-caption"><span className="caption-dot" /> ATMOSPHERE INSPIRATION <span>·</span> NOT A VENUE PHOTO</div>
      </div>
      <div className="story-copy" data-reveal>
        <p className="eyebrow"><span className="eyebrow-line" /> A MOMENT OF YOUR OWN</p>
        <h2 id="story-title">A small pause<br />in a <em>big city.</em></h2>
        <p className="story-intro">There’s the Old Delhi outside. Then there’s the little pocket of calm you find upstairs.</p>
        <p className="story-detail">Guests describe stylish interiors, generous comfortable seating and a peaceful, Arabian-night kind of ambience. Add warm, attentive service and a seat that’s yours for the evening—it’s easy to see why people come back.</p>
        <div className="story-signoff"><span className="signoff-rule" /><span>THE CLOUD FACTORY<br /><i>CAFE &amp; LOUNGE · DARYAGANJ</i></span></div>
      </div>
    </section>
  );
}

function Reviews() {
  return (
    <section className="reviews section-pad" id="reviews">
      <div className="reviews-head" data-reveal>
        <div><p className="eyebrow"><span className="eyebrow-line" /> WORD GETS AROUND</p><h2>Kind words<br /><em>carry softly.</em></h2></div>
        <div className="review-score"><span className="score-star" aria-hidden="true">★</span><span className="score-number">4.9</span><span className="score-outof">/ 5</span><span className="score-caption">FROM 587 GOOGLE REVIEWS</span></div>
      </div>
      <div className="review-grid">{reviewThemes.map((review, index) => (
        <article className={`review-card${index === 1 ? ' review-card-featured' : ''}`} data-reveal key={review.label}>
          <span className="review-open" aria-hidden="true">“</span>
          <p>{review.text}</p>
          <div className="review-meta"><span className="review-stars" aria-label="Five stars">★★★★★</span><span>{review.label}</span></div>
        </article>
      ))}</div>
      <p className="fine-note review-disclaimer">A summary of themes shared in guest reviews, not direct customer quotes.</p>
    </section>
  );
}

function LocationIcon() {
  return <span className="address-pin" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d="M19 10c0 5-7 12-7 12S5 15 5 10a7 7 0 1 1 14 0Z" /><circle cx="12" cy="10" r="2.2" /></svg></span>;
}

function Visit() {
  return (
    <section className="visit" id="visit">
      <div className="visit-topline"><span className="section-index">02</span><span>THE WAY TO YOUR NEXT EVENING</span><span className="visit-topline-line" /></div>
      <div className="visit-layout">
        <div className="visit-main" data-reveal>
          <p className="eyebrow"><span className="eyebrow-line" /> WE’RE UPSTAIRS</p>
          <h2>Take the little<br />way <em>up.</em></h2>
          <p className="visit-lede">Find us on the second floor, tucked just off the lively lanes of Daryaganj.</p>
          <a className="address-link" href={directionsUrl} target="_blank" rel="noopener noreferrer">
            <LocationIcon />
            <span>2nd floor, 3601-15, Netaji Subhash Marg,<br />opposite 24/7, Old Delhi, Kucha Alam,<br />Khabas Pura, Daryaganj, New Delhi,<br />Delhi 110002</span>
            <span className="address-arrow" aria-hidden="true">↗</span>
          </a>
          <div className="visit-buttons"><a className="button button-gold" href={directionsUrl} target="_blank" rel="noopener noreferrer">Get directions <Arrow /></a><a className="button button-outline" href="https://wa.me/919953412300" target="_blank" rel="noopener noreferrer">WhatsApp us <Arrow /></a></div>
        </div>
        <div className="visit-details" data-reveal>
          <div className="detail-row"><span className="detail-label">COME ON IN</span><span className="detail-value">Dine-in</span></div>
          <div className="detail-row"><span className="detail-label">TAKE IT WITH YOU</span><span className="detail-value">Kerbside pickup</span></div>
          <div className="detail-row"><span className="detail-label">DELIVER TO YOUR DOOR</span><span className="detail-value">No-contact delivery</span></div>
          <div className="detail-row detail-hours"><span className="detail-label">OPENING HOURS</span><span className="detail-value">Please call ahead <span className="status-note">Hours not confirmed</span></span></div>
          <p className="source-hours">The supplied listing capture showed “Closed · Opens 1 pm.” Its current hours weren’t provided; please confirm directly before visiting.</p>
          <div className="detail-row detail-phone"><span className="detail-label">SAY HELLO</span><a href="tel:+919953412300" className="detail-value">+91 99534 12300 <Arrow /></a></div>
          <div className="welcome-chip"><span aria-hidden="true">✳</span> A welcoming space, including for LGBTQ+ guests.</div>
        </div>
      </div>
      <div className="visit-watermark" aria-hidden="true">THE CLOUD<br /><em>FACTORY</em></div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <a className="brand footer-brand" href="#top" aria-label="Back to the top">
        <img className="brand-mark" src="/images/brand-mark.webp" alt="" width="38" height="38" />
        <span className="brand-lockup"><span className="brand-name">The Cloud Factory</span><span className="brand-sub">CAFE &amp; LOUNGE <i aria-hidden="true">·</i> OLD DELHI</span></span>
      </a>
      <p className="footer-hindi" lang="hi">थे क्लाउड फैक्ट्री कैफे एंड लाउंज</p>
      <div className="footer-end"><span>AN OLD DELHI HIDEAWAY</span><a href="#top" className="back-top">BACK TO THE TOP ↑</a><span>© 2026 THE CLOUD FACTORY</span></div>
    </footer>
  );
}

export default function App() {
  const page = useRef(null);
  useEffect(() => {
    let context;
    let cancelled = false;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(([gsapModule, triggerModule]) => {
      if (cancelled || !page.current) return;
      const gsap = gsapModule.gsap;
      const ScrollTrigger = triggerModule.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);
      context = gsap.context(() => {
        gsap.utils.toArray('[data-reveal]').forEach((element, index) => {
          gsap.fromTo(element, { autoAlpha: 0, y: 24 }, {
            autoAlpha: 1, y: 0, duration: 0.8, delay: (index % 3) * 0.055,
            ease: 'power3.out', clearProps: 'transform,opacity,visibility',
            scrollTrigger: { trigger: element, start: 'top 88%', once: true },
          });
        });
        gsap.to('.story-photo', {
          yPercent: -3, scale: 1.08, ease: 'none',
          scrollTrigger: { trigger: '.story', start: 'top bottom', end: 'bottom top', scrub: 1 },
        });
        gsap.to('.hero-stamp', {
          rotate: 365, ease: 'none',
          scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 },
        });
      }, page.current);
    }).catch(error => console.warn('Motion enhancement unavailable; static content remains visible.', error));
    return () => { cancelled = true; context?.revert(); };
  }, []);

  return (
    <div className="app-shell" ref={page}>
      <a className="skip-link" href="#main">Skip to content</a>
      <Header />
      <main id="main">
        <Hero />
        <Welcome />
        <FactsBar />
        <FoodGallery />
        <Story />
        <Reviews />
        <Visit />
      </main>
      <Footer />
    </div>
  );
}
