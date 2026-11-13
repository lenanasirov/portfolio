
import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  FiMail,
  FiPhone,
  FiGithub,
  FiLinkedin,
  FiFileText,
  FiSend,
  FiRefreshCw,
  FiCheckCircle,
  FiAlertCircle,
} from "react-icons/fi";

import "./ContactSection.css";

// Contact details
const EMAIL = "lenanasirov@gmail.com";
const PHONE = "054-559-7137";

const GITHUB_URL = "https://github.com/lenanasirov";
const LINKEDIN_URL = "https://www.linkedin.com/in/lena-nasirov/";
const RESUME_URL = `${import.meta.env.BASE_URL}Lena_Nasirov_Full_Stack_Developer_CV.pdf`;

// Example: https://formspree.io/f/abcdefgh
const FORMSPREE_FORM_ID = "mgaaqlpv";

// Import animation frames
const frameModules = import.meta.glob(
  "../../assets/contact-animation4/frame_*.png",
  {
    eager: true,
    query: "?url",
    import: "default",
  }
);

const frames = Object.entries(frameModules)
  .sort(([a], [b]) =>
    a.localeCompare(b, undefined, { numeric: true })
  )
  .map(([, url]) => url);

const FRAME_DURATION = 110;

function ContactSection() {
  const [frameIndex, setFrameIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [formStatus, setFormStatus] = useState("idle");
  const [formError, setFormError] = useState("");

  const intervalRef = useRef(null);
  const hasPlayedRef = useRef(false);

  const reducedMotion = useReducedMotion();

  // ANIMATION
  const playAnimation = useCallback(() => {
    if (reducedMotion || frames.length === 0) return;

    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    setFrameIndex(0);
    setIsPlaying(true);

    let currentFrame = 0;

    intervalRef.current = setInterval(() => {
      currentFrame += 1;

      if (currentFrame >= frames.length) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;

        setFrameIndex(frames.length - 1);
        setIsPlaying(false);
        return;
      }

      setFrameIndex(currentFrame);
    }, FRAME_DURATION);
  }, [reducedMotion]);

  useEffect(() => {
    frames.forEach((src) => {
      const img = new Image();
      img.src = src;
    });

    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const handleInView = () => {
    if (hasPlayedRef.current) return;

    hasPlayedRef.current = true;
    playAnimation();
  };

  const handleHover = () => {
    if (!isPlaying) {
      playAnimation();
    }
  };

  const handleReplay = (event) => {
    event.stopPropagation();
    playAnimation();
  };

  // FORM
  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    if (formStatus !== "idle") {
      setFormStatus("idle");
      setFormError("");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (formStatus === "sending") return;

    if (!FORMSPREE_FORM_ID) {
      setFormStatus("error");
      setFormError(
        "The contact form isn't connected yet. Please email me directly."
      );
      return;
    }

    setFormStatus("sending");
    setFormError("");

    try {
      const response = await fetch(
        `https://formspree.io/f/${FORMSPREE_FORM_ID}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            name: formData.name.trim(),
            email: formData.email.trim(),
            message: formData.message.trim(),
            _replyto: formData.email.trim(),
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Message could not be sent");
      }

      setFormStatus("success");
      setFormData({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      console.error("Contact form error:", error);

      setFormStatus("error");
      setFormError(
        "Something went wrong. Please try again or email me directly."
      );
    }
  };

  return (
    <section
      className="portfolio-section contact-section"
      data-theme="dark"
      id="contact"
    >
      <div className="contact-content">
        {/* LEFT SIDE */}
        <motion.div
          className="contact-copy"
          initial={
            reducedMotion ? false : { opacity: 0, y: 30 }
          }
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{
            duration: reducedMotion ? 0 : 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <div className="contact-eyebrow">
            <span
              className="contact-status-dot"
              aria-hidden="true"
            />
            HAVE SOMETHING IN MIND?
          </div>

          <h2 className="contact-heading">
            Good things start with
            <span>hello.</span>
          </h2>

          <p className="contact-description">
            Have a question, an opportunity, or just want
            to say hi? I'd love to hear from you.
          </p>

          {/* CONTACT FORM */}
          <form
            className="contact-form"
            onSubmit={handleSubmit}
          >
            <fieldset className="contact-field">
              <legend>Name</legend>

              <input
                type="text"
                name="name"
                placeholder="Your name"
                autoComplete="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                maxLength={100}
              />
            </fieldset>

            <fieldset className="contact-field">
              <legend>Email</legend>

              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                autoComplete="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                maxLength={254}
              />
            </fieldset>

            <fieldset className="contact-field contact-message-field">
              <legend>Message</legend>

              <textarea
                name="message"
                placeholder="Tell me what's on your mind..."
                value={formData.message}
                onChange={handleInputChange}
                required
                minLength={2}
                maxLength={5000}
                rows={5}
              />
            </fieldset>

            <div className="contact-form-bottom">
              <button
                type="submit"
                className="contact-submit-button"
                disabled={formStatus === "sending"}
              >
                <span>
                  {formStatus === "sending"
                    ? "Sending..."
                    : "Send message"}
                </span>

                <FiSend aria-hidden="true" />
              </button>
            </div>

            <div
              className={`contact-form-feedback ${
                formStatus === "success"
                  ? "contact-feedback-success"
                  : ""
              }`}
              role="status"
              aria-live="polite"
            >
              {formStatus === "success" && (
                <>
                  <FiCheckCircle aria-hidden="true" />
                  <span>
                    Message sent! I'll get back to you soon.
                  </span>
                </>
              )}

              {formStatus === "error" && (
                <>
                  <FiAlertCircle aria-hidden="true" />
                  <span>
                    {formError}{" "}
                    <a href={`mailto:${EMAIL}`}>
                      Email me
                    </a>
                  </span>
                </>
              )}
            </div>
          </form>
        </motion.div>

        {/* RIGHT SIDE — ANIMATED PORTRAIT */}
        <motion.div
          className="contact-visual"
          initial={
            reducedMotion ? false : { opacity: 0, y: 35 }
          }
          whileInView={{ opacity: 1, y: 0 }}
          onViewportEnter={handleInView}
          viewport={{ once: true, amount: 0.2 }}
          transition={{
            duration: reducedMotion ? 0 : 0.75,
            delay: reducedMotion ? 0 : 0.15,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <div className="contact-portrait-wrap">
            <div
              className="contact-animation"
              onMouseEnter={handleHover}
            >
              {frames.length > 0 && (
                <img
                  src={
                    frames[
                      reducedMotion
                        ? frames.length - 1
                        : frameIndex
                    ]
                  }
                  alt="Illustration of a woman working on a laptop"
                  draggable="false"
                />
              )}
            </div>

            {frames.length > 1 && !reducedMotion && (
              <button
                type="button"
                className={`contact-replay-button ${
                  isPlaying ? "contact-replay-playing" : ""
                }`}
                onClick={handleReplay}
                aria-label="Replay contact animation"
                title="Replay animation"
              >
                <FiRefreshCw aria-hidden="true" />
              </button>
            )}
          </div>
        </motion.div>
      </div>

      {/* CONTACT STRIP */}
      <div className="contact-bottom">
        <div className="contact-direct-links">
          <a href={`mailto:${EMAIL}`}>
            <FiMail aria-hidden="true" />
            <span>{EMAIL}</span>
          </a>

          <a
            href={`tel:${PHONE.replace(/[^\d+]/g, "")}`}
          >
            <FiPhone aria-hidden="true" />
            <span>{PHONE}</span>
          </a>
        </div>

        <div className="contact-socials">
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FiGithub aria-hidden="true" />
            <span>GitHub</span>
          </a>

          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FiLinkedin aria-hidden="true" />
            <span>LinkedIn</span>
          </a>

          <a
            href={RESUME_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FiFileText aria-hidden="true" />
            <span>Resume</span>
          </a>
        </div>
      </div>

      {/* FOOTER */}
      <div className="contact-footer">
        <span>
          © {new Date().getFullYear()} · Made with care by Lena
        </span>

        <a href="#home">
          Back to top ↑
        </a>
      </div>
    </section>
  );
}

export default ContactSection;
