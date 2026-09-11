import whyamculeImage from '../../assets/images/whyamcule.png'

/**
 * Why Amcule — the image already contains the headline, the three-tier
 * progression, the mossy volcanic rock imagery, and all the text. It IS
 * the section. Plain <img> at width: 100% / height: auto — not a
 * background-image — so it scales proportionally with no cropping.
 */
export function Moat() {
  return (
    <section id="why-amcule" style={{ width: '100%', overflow: 'hidden' }}>
      <img
        src={whyamculeImage}
        alt="Why Amcule — Independence is the architecture"
        style={{ width: '100%', height: 'auto', display: 'block' }}
        loading="lazy"
      />
    </section>
  )
}
