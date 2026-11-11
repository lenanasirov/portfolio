
import { motion, useReducedMotion } from "framer-motion";
import "./AboutSection.css";

import aboutIllustration from "../../assets/about-illustration.png";

function AboutSection() {
  const shouldReduceMotion = useReducedMotion();

  const reveal = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 24 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section
      className="portfolio-section about-section"
      data-theme="dark"
      id="about"
    >
      <div className="about-container">
        <motion.div
          className="about-intro"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={reveal}
          transition={{ duration: 0.65, ease: "easeOut" }}
        >
          <span className="about-eyebrow">
            <span className="about-status-dot" />
            A LITTLE ABOUT ME
          </span>

          <h2 className="about-heading">
            It's not just how it works.
            <span> It's how it feels.</span>
          </h2>

          <p className="about-description">
            I'm a Software and Information Systems Engineering graduate
            with an appreciation for both the technical and visual sides
            of building products. I notice the little things — how a layout
            flows, how an interaction feels, and how all the pieces come together.
          </p>

          <p className="about-description about-description-secondary">
            I want to build more than something that works. I want to create
            something that feels right to use, serves a purpose, and leaves
            a lasting impression.
          </p>
        </motion.div>

        <motion.div
          className="about-visual"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={reveal}
          transition={{
            duration: 0.8,
            delay: 0.15,
            ease: "easeOut",
          }}
        >
          <div className="about-visual-orbit about-visual-orbit-one" />
          <div className="about-visual-orbit about-visual-orbit-two" />

          <span className="about-visual-spark about-spark-one">✳</span>
          <span className="about-visual-spark about-spark-two">✦</span>

          <img
            src={aboutIllustration}
            alt="Illustrated character representing my curious and creative approach to development"
            className="about-illustration"
          />

        </motion.div>

      </div>
    </section>
  );
}

export default AboutSection;
