import whyamculeImage from '../../assets/images/whyamcule.png'

/**
 * Why Amcule — the image already contains the headline, the three-tier
 * progression, the mossy volcanic rock imagery, and all the text. It IS
 * the section: full-bleed background, no container, no box.
 */
export function Moat() {
  return (
    <section
      id="why-amcule"
      style={{
        width: '100%',
        minHeight: '100vh',
        backgroundImage: `url(${whyamculeImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center top',
        backgroundRepeat: 'no-repeat',
      }}
    />
  )
}
