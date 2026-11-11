
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import portrait from '../../assets/portrait2.png'

const fullName = 'Lena Nasirov.'
const fullRole = 'Full Stack Developer'

const NAME_TYPE_SPEED = 100
const NAME_PAUSE = 1000
const SLIDE_DURATION = 1.25

const SLIDE_EASE = [0.65, 0, 0.35, 1]
const REVEAL_EASE = [0.22, 1, 0.36, 1]

const headlineLines = [
  'Creative by instinct.',
  'Technical by training.',
  'Curious by nature.',
]

function HomeSection({ onTransitionStarted }) {
  const prefersReducedMotion = useReducedMotion()

  const finalNameRef = useRef(null)
  const callbackRef = useRef(onTransitionStarted)
  const finishedRef = useRef(false)

  const [target, setTarget] = useState(null)
  const [typedName, setTypedName] = useState('')
  const [greetingVisible, setGreetingVisible] = useState(false)
  const [transitionStarted, setTransitionStarted] = useState(false)
  const [pageRevealStarted, setPageRevealStarted] = useState(false)
  const [nameSettled, setNameSettled] = useState(false)
  const [heroTextVisible, setHeroTextVisible] = useState(false)
  const [buttonsVisible, setButtonsVisible] = useState(false)

  useEffect(() => {
    callbackRef.current = onTransitionStarted
  }, [onTransitionStarted])

  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // Prevent scrolling while the intro is running.
  useEffect(() => {
    if (pageRevealStarted) return

    const previous = document.documentElement.style.overflow
    document.documentElement.style.overflow = 'hidden'

    return () => {
      document.documentElement.style.overflow = previous
    }
  }, [pageRevealStarted])

  // Measure where the name should finish.
  useLayoutEffect(() => {
    let cancelled = false
    let frame

    const measure = () => {
      if (cancelled || !finalNameRef.current) return

      const rect = finalNameRef.current.getBoundingClientRect()

      setTarget(previous => {
        const next = {
          x: rect.left,
          y: rect.top,
          width: rect.width,
          height: rect.height,
          viewportWidth: window.innerWidth,
          viewportHeight: window.innerHeight,
        }

        if (
          previous &&
          Object.keys(next).every(
            key => previous[key] === next[key]
          )
        ) {
          return previous
        }

        return next
      })
    }

    const schedule = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(measure)
    }

    const observer = new ResizeObserver(schedule)

    if (finalNameRef.current) {
      observer.observe(finalNameRef.current)
    }

    window.addEventListener('resize', schedule)

    document.fonts?.ready?.then(() => {
      if (!cancelled) schedule()
    })

    schedule()

    return () => {
      cancelled = true
      cancelAnimationFrame(frame)
      observer.disconnect()
      window.removeEventListener('resize', schedule)
    }
  }, [])

  // Reduced-motion accessibility.
  useEffect(() => {
    if (!prefersReducedMotion) return

    setTypedName(fullName)
    setGreetingVisible(true)
    setTransitionStarted(true)
    setNameSettled(true)
    setPageRevealStarted(true)
    setHeroTextVisible(true)
    setButtonsVisible(true)

    if (!finishedRef.current) {
      finishedRef.current = true
      callbackRef.current?.()
    }
  }, [prefersReducedMotion])

  // Typewriter animation.
  useEffect(() => {
    if (
      prefersReducedMotion ||
      !target ||
      finishedRef.current
    ) {
      return
    }

    let typingTimer
    let pauseTimer
    let index = 0

    const greetingTimer = window.setTimeout(() => {
      setGreetingVisible(true)
    }, 350)

    const typingStartTimer = window.setTimeout(() => {
      const typeNext = () => {
        index += 1
        setTypedName(fullName.slice(0, index))

        if (index < fullName.length) {
          typingTimer = window.setTimeout(
            typeNext,
            NAME_TYPE_SPEED
          )
        } else {
          pauseTimer = window.setTimeout(() => {
            setTransitionStarted(true)
          }, NAME_PAUSE)
        }
      }

      typeNext()
    }, 1100)

    return () => {
      clearTimeout(greetingTimer)
      clearTimeout(typingStartTimer)
      clearTimeout(typingTimer)
      clearTimeout(pauseTimer)
    }
  }, [prefersReducedMotion, Boolean(target)])

  // The name and the portrait-panel assembly
  // complete their slide at the same time.
  useEffect(() => {
    if (!transitionStarted || prefersReducedMotion) return

    const timer = window.setTimeout(() => {
      if (finishedRef.current) return

      finishedRef.current = true
      setNameSettled(true)
      setPageRevealStarted(true)

      callbackRef.current?.()
    }, SLIDE_DURATION * 1000 + 30)

    return () => clearTimeout(timer)
  }, [transitionStarted, prefersReducedMotion])

  // Stagger the remaining content.
  useEffect(() => {
    if (!pageRevealStarted || prefersReducedMotion) return

    const textTimer = window.setTimeout(() => {
      setHeroTextVisible(true)
    }, 120)

    const buttonTimer = window.setTimeout(() => {
      setButtonsVisible(true)
    }, 850)

    return () => {
      clearTimeout(textTimer)
      clearTimeout(buttonTimer)
    }
  }, [pageRevealStarted, prefersReducedMotion])

  const initialX = target
    ? (target.viewportWidth - target.width) / 2
    : 0

  const initialY = target
    ? (target.viewportHeight - target.height) / 2 - 24
    : 0

  return (
    <main
      data-theme="light"
      id="home"
      className={[
        'portfolio',
        transitionStarted ? 'transition-started' : '',
        pageRevealStarted ? 'page-revealed' : '',
        nameSettled ? 'name-settled' : '',
      ].filter(Boolean).join(' ')}
    >
      {/*
        The cream panel and portrait are ONE moving assembly.
        The portrait stays attached to the panel as it slides.
      */}
      <div className="portrait-stage" aria-hidden="true">
        <div className="portrait-panel" />

        <div className="portrait-positioner">
          <div className="portrait-motion-wrapper">
            <div className="portrait-circle">
              <div className="portrait-background" />

              <img
                className="portrait-image portrait-image-base"
                src={portrait}
                alt=""
              />
            </div>

            <div className="portrait-hair-overlay">
              <img
                className="portrait-image portrait-image-hair"
                src={portrait}
                alt=""
              />
            </div>
          </div>
        </div>
      </div>

      {/* Centered typing name, then sliding name */}
      {target && !nameSettled && !prefersReducedMotion && (
        <motion.div
          className="intro-overlay"
          initial={false}
          style={{ width: target.width }}
          animate={{
            x: transitionStarted ? target.x : initialX,
            y: transitionStarted ? target.y : initialY,
          }}
          transition={{
            duration: SLIDE_DURATION,
            ease: SLIDE_EASE,
          }}
          aria-hidden="true"
        >
          <div className="intro-copy">
            <p
              className={`intro-greeting ${
                greetingVisible && !transitionStarted
                  ? 'greeting-visible'
                  : ''
              }`}
            >
              <span
                className="status-dot"
                aria-hidden="true"
              />
              HELLO, WORLD. I'M
            </p>

            <h1 className="intro-name">
              {typedName.endsWith('.')
                ? typedName.slice(0, -1)
                : typedName}

              {typedName.endsWith('.') && (
                <span className="name-period">.</span>
              )}

              {!transitionStarted && (
                <span className="typing-cursor" />
              )}
            </h1>
          </div>
        </motion.div>
      )}

      {/* Right-side content */}
      <section className="content-panel">
        <div className="hero-content">
          {/* Role */}
          <motion.p
            className="hero-role"
            initial={false}
            animate={{
              opacity: heroTextVisible ? 1 : 0,
              y: heroTextVisible ? 0 : 16,
            }}
            transition={{
              duration: prefersReducedMotion ? 0 : 0.65,
              delay: prefersReducedMotion ? 0 : 0.04,
              ease: REVEAL_EASE,
            }}
          >
            {fullRole}
          </motion.p>

          {/* Final name position */}
          <div
            className={`intro-placeholder ${
              nameSettled ? 'intro-placeholder-visible' : ''
            }`}
          >
            <h1
              ref={finalNameRef}
              className="intro-name"
            >
              Lena Nasirov
              <span className="name-period">.</span>
            </h1>
          </div>

          <div className="hero-copy">
            <div className="hero-description">
              {/* Staggered headline */}
              <div className="hero-headline">
                {headlineLines.map((line, index) => (
                  <motion.span
                    key={line}
                    className={
                      index === 2
                        ? 'hero-headline-accent'
                        : ''
                    }
                    initial={false}
                    animate={{
                      opacity: heroTextVisible ? 1 : 0,
                      y: heroTextVisible ? 0 : 20,
                    }}
                    transition={{
                      duration: prefersReducedMotion
                        ? 0
                        : 0.7,
                      delay: prefersReducedMotion
                        ? 0
                        : 0.18 + index * 0.13,
                      ease: REVEAL_EASE,
                    }}
                  >
                    {line}
                  </motion.span>
                ))}
              </div>

              {/* Supporting text */}
              <motion.p
                className="hero-supporting-text"
                initial={false}
                animate={{
                  opacity: heroTextVisible ? 1 : 0,
                  y: heroTextVisible ? 0 : 16,
                }}
                transition={{
                  duration: prefersReducedMotion ? 0 : 0.7,
                  delay: prefersReducedMotion ? 0 : 0.62,
                  ease: REVEAL_EASE,
                }}
              >
                I enjoy tackling challenges, exploring different approaches, 
                and paying attention to the details that make a difference.
              </motion.p>
            </div>

            {/* Buttons */}
            <motion.div
              className="hero-actions"
              initial={false}
              animate={{
                opacity: buttonsVisible ? 1 : 0,
                y: buttonsVisible ? 0 : 18,
              }}
              transition={{
                duration: prefersReducedMotion ? 0 : 0.75,
                ease: REVEAL_EASE,
              }}
              aria-hidden={!buttonsVisible}
              inert={!buttonsVisible}
            >
              <a
                className="button button-primary"
                href="/Lena-Nasirov-CV.pdf"
                target="_blank"
                rel="noreferrer"
              >
                Download CV
              </a>

              <a
                className="button button-secondary"
                href="#contact"
              >
                Contact
              </a>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default HomeSection
