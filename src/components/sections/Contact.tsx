import contactBgImage from '../../assets/images/contact-bg.png'

export function Contact() {
  return (
    <section
      id="contact"
      style={{
        position: 'relative',
        minHeight: '100vh',
        backgroundImage: `url(${contactBgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {/* Dark overlay */}
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(8,12,8,0.55)', pointerEvents: 'none' }} />

      <div
        style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '80px 40px',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '80px',
          alignItems: 'center',
          width: '100%',
        }}
      >
        {/* LEFT — Info */}
        <div>
          <p style={{ color: '#B8D900', fontFamily: 'JetBrains Mono', fontSize: '13px', letterSpacing: '0.08em', marginBottom: '12px' }}>
            — CONTACT
          </p>
          <h2 style={{ color: '#ffffff', fontSize: '52px', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: '20px' }}>
            Let&rsquo;s talk <span style={{ color: '#B8D900' }}>deployment.</span>
          </h2>
          <p style={{ color: 'rgba(220,218,210,0.75)', fontSize: '18px', lineHeight: 1.65, maxWidth: '420px', marginBottom: '40px' }}>
            Tell us about your operation and where you&rsquo;d like an on-premise intelligence layer. We&rsquo;ll
            respond within one business day.
          </p>

          {/* Contact details */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '40px' }}>
            <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
              <span style={{ color: '#B8D900', fontSize: '18px' }}>&#9993;</span>
              <div>
                <p style={{ color: '#B8D900', fontFamily: 'JetBrains Mono', fontSize: '11px', letterSpacing: '0.06em', marginBottom: '2px' }}>
                  EMAIL
                </p>
                <p style={{ color: '#ffffff', fontSize: '16px' }}>info@amcule.in</p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
              <span style={{ color: '#B8D900', fontSize: '18px' }}>&#128222;</span>
              <div>
                <p style={{ color: '#B8D900', fontFamily: 'JetBrains Mono', fontSize: '11px', letterSpacing: '0.06em', marginBottom: '2px' }}>
                  PHONE
                </p>
                <p style={{ color: '#ffffff', fontSize: '16px' }}>+91 9022651817</p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
              <span style={{ color: '#B8D900', fontSize: '18px' }}>&#128205;</span>
              <div>
                <p style={{ color: '#B8D900', fontFamily: 'JetBrains Mono', fontSize: '11px', letterSpacing: '0.06em', marginBottom: '2px' }}>
                  HEADQUARTERS
                </p>
                <p style={{ color: '#ffffff', fontSize: '15px', lineHeight: 1.5 }}>
                  Flat No. 24, Silvermoon, S. No. 1/2A/2,
                  <br />
                  Bavdhan, Pune &ndash; 411021,
                  <br />
                  Maharashtra, India
                </p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
              <span style={{ color: '#B8D900', fontSize: '18px' }}>&#127760;</span>
              <div>
                <p style={{ color: '#B8D900', fontFamily: 'JetBrains Mono', fontSize: '11px', letterSpacing: '0.06em', marginBottom: '2px' }}>
                  REGIONAL PRESENCE
                </p>
                <p style={{ color: '#ffffff', fontSize: '16px' }}>GCC via Dubai</p>
              </div>
            </div>
          </div>

          {/* Pills */}
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {['ON-PREMISE', 'SECURE', 'INDUSTRY-GRADE'].map((tag) => (
              <span
                key={tag}
                style={{
                  padding: '6px 16px',
                  border: '1px solid rgba(184,217,0,0.3)',
                  borderRadius: '9999px',
                  color: 'rgba(184,217,0,0.8)',
                  fontFamily: 'JetBrains Mono',
                  fontSize: '11px',
                  letterSpacing: '0.06em',
                }}
              >
                &bull; {tag}
              </span>
            ))}
          </div>
        </div>

        {/* RIGHT — Glass form */}
        <div
          style={{
            background: 'rgba(10,16,10,0.7)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(184,217,0,0.2)',
            borderRadius: '16px',
            padding: '40px',
          }}
        >
          <form action="https://formsubmit.co/info@arqaya.in" method="POST">
            {/* Formsubmit config */}
            <input type="hidden" name="_subject" value="New Amcule Demo Request" />
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_next" value="https://amcule.vercel.app" />

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
              <div>
                <label
                  style={{
                    color: 'rgba(184,217,0,0.8)',
                    fontFamily: 'JetBrains Mono',
                    fontSize: '11px',
                    letterSpacing: '0.06em',
                    display: 'block',
                    marginBottom: '8px',
                  }}
                >
                  FIRST NAME
                </label>
                <input
                  name="first_name"
                  type="text"
                  required
                  style={{
                    width: '100%',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(184,217,0,0.2)',
                    borderRadius: '8px',
                    padding: '12px 14px',
                    color: '#ffffff',
                    fontSize: '15px',
                    outline: 'none',
                  }}
                />
              </div>
              <div>
                <label
                  style={{
                    color: 'rgba(184,217,0,0.8)',
                    fontFamily: 'JetBrains Mono',
                    fontSize: '11px',
                    letterSpacing: '0.06em',
                    display: 'block',
                    marginBottom: '8px',
                  }}
                >
                  LAST NAME
                </label>
                <input
                  name="last_name"
                  type="text"
                  required
                  style={{
                    width: '100%',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(184,217,0,0.2)',
                    borderRadius: '8px',
                    padding: '12px 14px',
                    color: '#ffffff',
                    fontSize: '15px',
                    outline: 'none',
                  }}
                />
              </div>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label
                style={{
                  color: 'rgba(184,217,0,0.8)',
                  fontFamily: 'JetBrains Mono',
                  fontSize: '11px',
                  letterSpacing: '0.06em',
                  display: 'block',
                  marginBottom: '8px',
                }}
              >
                ORGANISATION
              </label>
              <input
                name="organisation"
                type="text"
                required
                style={{
                  width: '100%',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(184,217,0,0.2)',
                  borderRadius: '8px',
                  padding: '12px 14px',
                  color: '#ffffff',
                  fontSize: '15px',
                  outline: 'none',
                }}
              />
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label
                style={{
                  color: 'rgba(184,217,0,0.8)',
                  fontFamily: 'JetBrains Mono',
                  fontSize: '11px',
                  letterSpacing: '0.06em',
                  display: 'block',
                  marginBottom: '8px',
                }}
              >
                AREA OF INTEREST
              </label>
              <select
                name="area_of_interest"
                style={{
                  width: '100%',
                  background: 'rgba(10,16,10,0.9)',
                  border: '1px solid rgba(184,217,0,0.2)',
                  borderRadius: '8px',
                  padding: '12px 14px',
                  color: '#ffffff',
                  fontSize: '15px',
                  outline: 'none',
                }}
              >
                <option value="">Select an area</option>
                <option>TENETDrill &mdash; Drilling Intelligence</option>
                <option>TENETFlow &mdash; Formation Intelligence</option>
                <option>TENETEdge &mdash; Edge Deployment</option>
                <option>Full ILM Deployment</option>
                <option>Research Partnership</option>
                <option>Investment Enquiry</option>
              </select>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label
                style={{
                  color: 'rgba(184,217,0,0.8)',
                  fontFamily: 'JetBrains Mono',
                  fontSize: '11px',
                  letterSpacing: '0.06em',
                  display: 'block',
                  marginBottom: '8px',
                }}
              >
                MESSAGE
              </label>
              <textarea
                name="message"
                rows={4}
                placeholder="Tell us about your operation..."
                style={{
                  width: '100%',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(184,217,0,0.2)',
                  borderRadius: '8px',
                  padding: '12px 14px',
                  color: '#ffffff',
                  fontSize: '15px',
                  outline: 'none',
                  resize: 'vertical',
                }}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <button
                type="submit"
                style={{
                  background: '#B8D900',
                  color: '#111',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '14px 32px',
                  fontSize: '15px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  fontFamily: 'JetBrains Mono',
                  letterSpacing: '0.02em',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                Send message &rarr;
              </button>
              <p style={{ color: 'rgba(184,217,0,0.5)', fontSize: '12px', fontFamily: 'JetBrains Mono', textAlign: 'right' }}>
                &#128274; Your information is secure
                <br />
                and confidential.
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
