import objectivesBgImage from '../../assets/images/objectives-bg.png'
import objectivesImage from '../../assets/images/objectives.png'

export function Objectives() {
  return (
    <section
      id="objectives"
      style={{
        position: 'relative',
        backgroundImage: `url(${objectivesBgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        overflow: 'hidden',
      }}
    >
      {/* Subtle dark overlay — just enough to make headline readable, not hiding the bg */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(8,12,8,0.45) 0%, rgba(8,12,8,0.25) 40%, rgba(8,12,8,0.5) 100%)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: '1240px', margin: '0 auto', padding: '80px 40px' }}>
        {/* Section label */}
        <p
          style={{
            color: '#B8D900',
            fontFamily: 'JetBrains Mono',
            fontSize: '13px',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            marginBottom: '12px',
          }}
        >
          — OUR OBJECTIVES &amp; PLATFORM TECHNOLOGY
        </p>

        {/* Headline */}
        <h2
          style={{
            color: '#ffffff',
            fontSize: 'clamp(36px, 4vw, 64px)',
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: '-0.025em',
            marginBottom: '16px',
            maxWidth: '700px',
          }}
        >
          One intelligence layer for many <span style={{ color: '#B8D900' }}>critical industries.</span>
        </h2>

        {/* Subline */}
        <p
          style={{
            color: 'rgba(220,218,210,0.7)',
            fontFamily: 'JetBrains Mono',
            fontSize: '13px',
            letterSpacing: '0.06em',
            marginBottom: '48px',
          }}
        >
          REAL DATA. REAL OPERATIONS. REAL IMPACT.
        </p>

        {/* objectives.png — the infographic image, full width, rounded */}
        <img
          src={objectivesImage}
          alt="Amcule objectives — one intelligence layer for many critical industries"
          style={{
            width: '100%',
            height: 'auto',
            display: 'block',
            borderRadius: '16px',
            boxShadow: '0 0 60px rgba(0,0,0,0.4)',
          }}
          loading="lazy"
        />

        {/* Bottom caption */}
        <p
          style={{
            textAlign: 'center',
            color: 'rgba(184,217,0,0.5)',
            fontFamily: 'JetBrains Mono',
            fontSize: '11px',
            letterSpacing: '0.08em',
            marginTop: '24px',
          }}
        >
          DIFFERENT INDUSTRIES. SAME PRINCIPLES.
        </p>
      </div>
    </section>
  )
}
