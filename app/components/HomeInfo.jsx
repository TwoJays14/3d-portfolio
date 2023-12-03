import { div } from 'three/examples/jsm/nodes/Nodes.js';
import Link from 'next/link';
// import { Arrow } from '../icons';

const InfoBox = ({ text, link, btnText }) => (
  <div className="info-box">
    <p className="font-medium sm:text-xl text-center">{text}</p>
    <Link className="neo-brutalism-white neo-btn" href={link}>
      {btnText}
      {/* <img src={Arrow} alt="arrow" className="w-4 h-4 object-contain " /> */}
    </Link>
  </div>
);

const renderContent = {
  1: (
    <h1 className="sm:text-xl sm:leading-snug text-center neo-brutalism-blue py-4 px-8 text-white mx-5">
      Hi, I am <span className="font-semibold">Jermaine</span> 👋
      <br />A Software Engineer from England
    </h1>
  ),
  2: (
    <InfoBox
      text="Collaborated with diverse teams on multifaceted projects, gaining a spectrum of skills as I navigated my journey as a junior full stack developer."
      link="/about"
      btnText="Learn More"
    />
  ),
  3: (
    <InfoBox
      text="As a junior full stack developer, I've enthusiastically acquired a diverse skill set through hands-on experiences with various projects and collaborations."
      link="/projects"
      btnText="Visit my portfolio"
    />
  ),
  4: (
    <InfoBox
      text="Ready to elevate your project or in need of a skilled developer? I'm just a few keystrokes away..."
      link="/contact"
      btnText="Let's talk"
    />
  ),
};

const HomeInfo = ({ currentStage }) => {
  return renderContent[currentStage] || null;
};
export default HomeInfo;
