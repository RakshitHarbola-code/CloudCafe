import React from 'react';

const photos = [
  {
    src: '/images/food-share.webp',
    alt: 'Illustrative photograph of Indian-inspired shared plates with bright chutneys.',
    label: 'MADE TO SHARE',
    title: 'Bring everyone together.',
    placement: 'food-card-share',
  },
  {
    src: '/images/food-comfort.webp',
    alt: 'Illustrative photograph of a comforting curry-and-bread meal on a cafe table.',
    label: 'A SLOWER KIND OF EVENING',
    title: 'Take your time over it.',
    placement: 'food-card-comfort',
  },
  {
    src: '/images/food-chai.webp',
    alt: 'Illustrative photograph of chai and a small dessert in warm cafe light.',
    label: 'ONE LAST MOMENT',
    title: 'Leave room to linger.',
    placement: 'food-card-chai',
  },
];

const menuMessage = 'https://wa.me/919953412300?text=Hi%2C%20could%20you%20please%20share%20today%27s%20menu%3F';

export default function FoodGallery() {
  return (
    <section className="food-section section-pad" id="menu" aria-labelledby="food-title">
      <div className="food-heading" data-reveal>
        <div className="food-heading-main">
          <p className="eyebrow"><span className="eyebrow-line" /> FOOD &amp; DRINK · OLD DELHI</p>
          <h2 id="food-title">A little room<br /><em>for good food.</em></h2>
        </div>
        <p className="food-heading-side">Find a place at the table. Settle into a slower evening, away from the Old Delhi bustle.</p>
      </div>

      <div className="food-gallery-grid">
        {photos.map((photo, index) => (
          <article className={`food-card ${photo.placement}`} data-reveal key={photo.placement}>
            <img className="food-card-image" src={photo.src} alt={photo.alt} loading="lazy" decoding="async" />
            <div className="food-card-shade" aria-hidden="true" />
            <div className="food-photo-meta"><span>0{index + 1}</span><span>{photo.label}</span></div>
            <div className="food-card-caption"><h3>{photo.title}</h3></div>
          </article>
        ))}
      </div>

      <div className="food-gallery-footer">
        <div className="food-note">
          <span className="food-note-mark" aria-hidden="true">✳</span>
          <p><strong>A quick note</strong><span>These food photos are illustrative, not confirmed menu items. Ask the cafe what’s available today.</span></p>
        </div>
        <a className="button button-gold food-menu-cta" href={menuMessage} target="_blank" rel="noopener noreferrer">
          Ask for today’s menu <span className="arrow" aria-hidden="true">↗</span>
        </a>
      </div>

      <div className="food-service-row" aria-label="Service options">
        <span>DINE IN</span><i aria-hidden="true" /><span>KERBSIDE PICKUP</span><i aria-hidden="true" /><span>NO-CONTACT DELIVERY</span>
      </div>
    </section>
  );
}
