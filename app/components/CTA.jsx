'use client';
import Link from 'next/link';

const CTA = () => {
  return (
    <section className="cta">
      <p className="cta-text">
        Have a project in mind? <br className="sm:block hidden" /> Let&apos;s
        build something together
      </p>
      <Link className="btn" href="/contact">
        Contact
      </Link>
    </section>
  );
};
export default CTA;
