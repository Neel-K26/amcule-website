import whyamculeImage from '../../assets/images/whyamcule.png'

/**
 * Why Amcule — the image already contains the headline, the three-tier
 * progression, the mossy volcanic rock imagery, and all the text. It IS
 * the section.
 */
export function Moat() {
  return (
    <section id="moat" className="bg-[#F3F1E8] py-20">
      <div className="mx-auto max-w-[1200px] px-10">
        <img src={whyamculeImage} alt="Why Amcule — Independence is the architecture" className="w-full rounded-2xl" loading="lazy" />
      </div>
    </section>
  )
}
