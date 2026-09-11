import missionBg from '../../assets/images/mission-bg.png'

const operatorIlm = ['Well Data', 'Equipment Logs', 'Sensor Streams', 'Documents & SOPs', 'Historical Operations']
const domainIntelligence = ['Understand', 'Reason', 'Predict', 'Recommend', 'Act']
const bottomTrackLeft = ['DATA', 'CONTEXT', 'INTELLIGENCE', 'DECISIONS', 'IMPACT']
const topTrackRight = ['OBSERVE', 'UNDERSTAND', 'REASON', 'ACT', 'DELIVER']
const bottomTrackRight = ['PEOPLE', 'INFRASTRUCTURE', 'RESOURCES', 'RESILIENCE', 'TOMORROW']

/**
 * Mission / Vision — mission-bg.png as the full-section background image,
 * with all text overlaid in code (not a visible image element).
 */
export function Mission() {
  return (
    <section
      id="mission"
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '600px',
        backgroundImage: `url(${missionBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'grid',
        gridTemplateColumns: '60fr 40fr',
      }}
    >
      {/* LEFT — MISSION — dark mountain/network side */}
      <div style={{ padding: '60px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        {/* Top */}
        <div>
          <p style={{ color: '#B8D900', fontFamily: 'JetBrains Mono', fontSize: '13px', letterSpacing: '0.08em', marginBottom: '16px' }}>
            MISSION
          </p>
          <div style={{ width: '40px', height: '2px', background: '#B8D900', marginBottom: '32px' }} />
          <h2 style={{ color: '#ffffff', fontSize: '36px', fontWeight: 700, lineHeight: 1.2, maxWidth: '480px' }}>
            Give every industrial operator a private intelligence trained on their data, on their infrastructure —{' '}
            <em style={{ color: '#B8D900', fontStyle: 'italic' }}>answerable to no one else.</em>
          </h2>
        </div>

        {/* Glass cards - OPERATOR'S ILM and DOMAIN INTELLIGENCE */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '320px', alignSelf: 'flex-end', marginBottom: '80px' }}>
          <div
            style={{
              background: 'rgba(20,23,18,0.75)',
              border: '1px solid rgba(184,217,0,0.2)',
              borderRadius: '12px',
              padding: '20px',
              backdropFilter: 'blur(8px)',
            }}
          >
            <p style={{ color: '#B8D900', fontFamily: 'JetBrains Mono', fontSize: '11px', letterSpacing: '0.08em', marginBottom: '12px' }}>
              OPERATOR&rsquo;S ILM
            </p>
            {operatorIlm.map((item) => (
              <p key={item} style={{ color: '#E0DDD5', fontSize: '14px', marginBottom: '4px' }}>
                &bull; {item}
              </p>
            ))}
          </div>
          <div
            style={{
              background: 'rgba(20,23,18,0.75)',
              border: '1px solid rgba(184,217,0,0.2)',
              borderRadius: '12px',
              padding: '20px',
              backdropFilter: 'blur(8px)',
            }}
          >
            <p style={{ color: '#B8D900', fontFamily: 'JetBrains Mono', fontSize: '11px', letterSpacing: '0.08em', marginBottom: '12px' }}>
              DOMAIN INTELLIGENCE
            </p>
            {domainIntelligence.map((item) => (
              <p key={item} style={{ color: '#E0DDD5', fontSize: '14px', marginBottom: '4px' }}>
                &bull; {item}
              </p>
            ))}
          </div>
        </div>

        {/* Bottom left */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            {bottomTrackLeft.map((item) => (
              <p key={item} style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'JetBrains Mono', fontSize: '11px', letterSpacing: '0.06em', marginBottom: '2px' }}>
                {item}
              </p>
            ))}
          </div>
          <div style={{ textAlign: 'right' }}>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'JetBrains Mono', fontSize: '11px', letterSpacing: '0.06em' }}>
              BUILT FOR REAL OPERATORS.
            </p>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'JetBrains Mono', fontSize: '11px', letterSpacing: '0.06em' }}>
              SAME DATA. DEEPER ANSWERS.
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT — VISION — misty mountain side */}
      <div style={{ padding: '60px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        {/* Top right */}
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <div style={{ textAlign: 'right' }}>
            {topTrackRight.map((item) => (
              <p key={item} style={{ color: 'rgba(30,30,25,0.5)', fontFamily: 'JetBrains Mono', fontSize: '11px', letterSpacing: '0.06em', marginBottom: '2px' }}>
                {item}
              </p>
            ))}
            <div style={{ width: '32px', height: '2px', background: '#B8D900', marginTop: '8px', marginLeft: 'auto' }} />
          </div>
        </div>

        {/* Vision content */}
        <div>
          <p style={{ color: '#4A5A10', fontFamily: 'JetBrains Mono', fontSize: '13px', letterSpacing: '0.08em', marginBottom: '16px' }}>
            VISION
          </p>
          <div style={{ width: '40px', height: '2px', background: '#B8D900', marginBottom: '32px' }} />
          <h2 style={{ color: '#111111', fontSize: '36px', fontWeight: 700, lineHeight: 1.2 }}>
            A future where every critical operation&rsquo;s intelligence layer is{' '}
            <span style={{ color: '#4A5A10' }}>sovereign</span>
            {' '}— not rented, not shared, not controlled by a contractor.
          </h2>
        </div>

        {/* Bottom right */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <p style={{ color: 'rgba(30,30,25,0.5)', fontFamily: 'JetBrains Mono', fontSize: '11px', letterSpacing: '0.06em' }}>
              SAME PRINCIPLES.
            </p>
            <p style={{ color: 'rgba(30,30,25,0.5)', fontFamily: 'JetBrains Mono', fontSize: '11px', letterSpacing: '0.06em' }}>
              A STRONGER TOMORROW.
            </p>
          </div>
          <div style={{ textAlign: 'right' }}>
            {bottomTrackRight.map((item) => (
              <p key={item} style={{ color: 'rgba(30,30,25,0.4)', fontFamily: 'JetBrains Mono', fontSize: '11px', letterSpacing: '0.06em', marginBottom: '2px' }}>
                {item}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
