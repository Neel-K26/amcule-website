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
        backgroundAttachment: 'fixed',
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
          maxWidth: '1280px',
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
          <p
            style={{
              color: '#B8D900',
              fontFamily: 'JetBrains Mono',
              fontSize: '15px',
              fontWeight: 700,
              letterSpacing: '0.08em',
              marginBottom: '16px',
            }}
          >
            — CONTACT
          </p>
          <h2
            style={{
              color: '#ffffff',
              fontSize: 'clamp(44px, 5.5vw, 72px)',
              fontWeight: 800,
              lineHeight: 1.08,
              letterSpacing: '-0.02em',
              marginBottom: '24px',
            }}
          >
            Let&rsquo;s talk <span style={{ color: '#B8D900' }}>deployment.</span>
          </h2>
          <p style={{ color: 'rgba(230,228,220,0.88)', fontSize: '21px', fontWeight: 500, lineHeight: 1.65, maxWidth: '460px', marginBottom: '44px' }}>
            Tell us about your operation and where you&rsquo;d like an on-premise intelligence layer. We&rsquo;ll
            respond within one business day.
          </p>

          {/* Contact details */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginBottom: '44px' }}>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
              <span style={{ color: '#B8D900', fontSize: '22px' }}>&#9993;</span>
              <div>
                <p
                  style={{
                    color: '#B8D900',
                    fontFamily: 'JetBrains Mono',
                    fontSize: '12px',
                    fontWeight: 700,
                    letterSpacing: '0.06em',
                    marginBottom: '4px',
                  }}
                >
                  EMAIL
                </p>
                <p style={{ color: '#ffffff', fontSize: '19px', fontWeight: 600 }}>info@amcule.in</p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
              <span style={{ color: '#B8D900', fontSize: '22px' }}>&#128222;</span>
              <div>
                <p
                  style={{
                    color: '#B8D900',
                    fontFamily: 'JetBrains Mono',
                    fontSize: '12px',
                    fontWeight: 700,
                    letterSpacing: '0.06em',
                    marginBottom: '4px',
                  }}
                >
                  PHONE
                </p>
                <p style={{ color: '#ffffff', fontSize: '19px', fontWeight: 600 }}>+91 9022651817</p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
              <span style={{ color: '#B8D900', fontSize: '22px' }}>&#128205;</span>
              <div>
                <p
                  style={{
                    color: '#B8D900',
                    fontFamily: 'JetBrains Mono',
                    fontSize: '12px',
                    fontWeight: 700,
                    letterSpacing: '0.06em',
                    marginBottom: '4px',
                  }}
                >
                  HEADQUARTERS
                </p>
                <p style={{ color: '#ffffff', fontSize: '17px', fontWeight: 500, lineHeight: 1.55 }}>
                  Flat No. 24, Silvermoon, S. No. 1/2A/2,
                  <br />
                  Bavdhan, Pune &ndash; 411021,
                  <br />
                  Maharashtra, India
                </p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
              <span style={{ color: '#B8D900', fontSize: '22px' }}>&#127760;</span>
              <div>
                <p
                  style={{
                    color: '#B8D900',
                    fontFamily: 'JetBrains Mono',
                    fontSize: '12px',
                    fontWeight: 700,
                    letterSpacing: '0.06em',
                    marginBottom: '4px',
                  }}
                >
                  REGIONAL PRESENCE
                </p>
                <p style={{ color: '#ffffff', fontSize: '19px', fontWeight: 600 }}>GCC via Dubai</p>
              </div>
            </div>
          </div>

          {/* Pills */}
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            {['ON-PREMISE', 'SECURE', 'INDUSTRY-GRADE'].map((tag) => (
              <span
                key={tag}
                style={{
                  padding: '8px 18px',
                  border: '1px solid rgba(184,217,0,0.35)',
                  borderRadius: '9999px',
                  color: 'rgba(196,227,38,0.95)',
                  fontFamily: 'JetBrains Mono',
                  fontSize: '12px',
                  fontWeight: 700,
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
            padding: '44px',
          }}
        >
          <form action="https://formsubmit.co/info@arqaya.in" method="POST">
            {/* Formsubmit config */}
            <input type="hidden" name="_subject" value="New Amcule Demo Request" />
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_next" value="https://amcule.vercel.app" />

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px', marginBottom: '18px' }}>
              <div>
                <label
                  style={{
                    color: 'rgba(196,227,38,0.9)',
                    fontFamily: 'JetBrains Mono',
                    fontSize: '12px',
                    fontWeight: 700,
                    letterSpacing: '0.06em',
                    display: 'block',
                    marginBottom: '9px',
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
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(184,217,0,0.25)',
                    borderRadius: '8px',
                    padding: '14px 16px',
                    color: '#ffffff',
                    fontSize: '17px',
                    fontWeight: 500,
                    outline: 'none',
                  }}
                />
              </div>
              <div>
                <label
                  style={{
                    color: 'rgba(196,227,38,0.9)',
                    fontFamily: 'JetBrains Mono',
                    fontSize: '12px',
                    fontWeight: 700,
                    letterSpacing: '0.06em',
                    display: 'block',
                    marginBottom: '9px',
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
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(184,217,0,0.25)',
                    borderRadius: '8px',
                    padding: '14px 16px',
                    color: '#ffffff',
                    fontSize: '17px',
                    fontWeight: 500,
                    outline: 'none',
                  }}
                />
              </div>
            </div>

            <div style={{ marginBottom: '18px' }}>
              <label
                style={{
                  color: 'rgba(196,227,38,0.9)',
                  fontFamily: 'JetBrains Mono',
                  fontSize: '12px',
                  fontWeight: 700,
                  letterSpacing: '0.06em',
                  display: 'block',
                  marginBottom: '9px',
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
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(184,217,0,0.25)',
                  borderRadius: '8px',
                  padding: '14px 16px',
                  color: '#ffffff',
                  fontSize: '17px',
                  fontWeight: 500,
                  outline: 'none',
                }}
              />
            </div>

            <div style={{ marginBottom: '18px' }}>
              <label
                style={{
                  color: 'rgba(196,227,38,0.9)',
                  fontFamily: 'JetBrains Mono',
                  fontSize: '12px',
                  fontWeight: 700,
                  letterSpacing: '0.06em',
                  display: 'block',
                  marginBottom: '9px',
                }}
              >
                AREA OF INTEREST
              </label>
              <select
                name="area_of_interest"
                style={{
                  width: '100%',
                  background: 'rgba(10,16,10,0.9)',
                  border: '1px solid rgba(184,217,0,0.25)',
                  borderRadius: '8px',
                  padding: '14px 16px',
                  color: '#ffffff',
                  fontSize: '17px',
                  fontWeight: 500,
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

            <div style={{ marginBottom: '28px' }}>
              <label
                style={{
                  color: 'rgba(196,227,38,0.9)',
                  fontFamily: 'JetBrains Mono',
                  fontSize: '12px',
                  fontWeight: 700,
                  letterSpacing: '0.06em',
                  display: 'block',
                  marginBottom: '9px',
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
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(184,217,0,0.25)',
                  borderRadius: '8px',
                  padding: '14px 16px',
                  color: '#ffffff',
                  fontSize: '17px',
                  fontWeight: 500,
                  outline: 'none',
                  resize: 'vertical',
                }}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
              <button
                type="submit"
                style={{
                  background: '#B8D900',
                  color: '#111',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '16px 36px',
                  fontSize: '17px',
                  fontWeight: 800,
                  cursor: 'pointer',
                  fontFamily: 'JetBrains Mono',
                  letterSpacing: '0.02em',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                }}
              >
                Send message &rarr;
              </button>
              <p style={{ color: 'rgba(196,227,38,0.75)', fontSize: '13px', fontWeight: 600, fontFamily: 'JetBrains Mono', textAlign: 'right' }}>
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
