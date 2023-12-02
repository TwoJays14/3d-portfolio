'use client';

import {
  VerticalTimeline,
  VerticalTimelineElement,
} from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { skills, experiences } from '../constants';
import CTA from '../components/CTA';

const About = () => {
  return (
    <section className="max-container">
      <h1 className="head-text">
        Hello, I&apos;m&nbsp;
        <span className="blue-gradient_text font-semibold drop-shadow">
          Jermaine
        </span>
      </h1>
      <div className="mt-5 flex flex-col gap-3 text-slate-500">
        <p>
          Software Engineer based in England, specializing in full stack
          development through hands-on learning and building applications
        </p>
      </div>
      <div className="py-10 flex flex-col">
        <h3 className="subhead-text">My Skills</h3>
        <div className="mt-16 flex flex-wrap gap-12">
          {skills.map((skill) => {
            return (
              <div className="block-container w-20 h-20" key={skill.name}>
                <div className="btn-back rounded-xl" />
                <div className="btn-front rounded-xl flex justify-center items-center">
                  <img
                    src={skill.imageUrl.src}
                    alt={skill.name}
                    className="w-1/2 h-1/2 object-contain"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="py-16">
        <h3 className="subhead-text">Work Experience</h3>
        <div className="mt-5 flex flex-col gap-3 text-slate-500">
          <p>
            As a junior software developer&comma; I&apos;ve embarked on an
            enriching journey&comma; collaborating with various companies to
            kickstart my career in the dynamic field of software
            development&period; These experiences have been invaluable&comma;
            providing me with hands-on opportunities to contribute to real-world
            projects. Working alongside talented and supportive teams&comma;
            I&apos;ve had the chance to immerse myself in the intricacies of
            software development&comma; rapidly advancing my skills and
            knowledge.
            <br />
            <br />
            My journey has been marked by a commitment to learning&comma; a
            passion for problem-solving&comma; and a dedication to creating
            meaningful and efficient solutions&period; Each project has been a
            stepping stone&comma; allowing me to gain practical insights into
            the industry and fostering a deep appreciation for collaboration and
            innovation&period; I look forward to continuing this exciting
            adventure&comma; leveraging my skills to contribute to even more
            remarkable products and furthering my growth as a dedicated software
            developer&period;
          </p>
        </div>
        <div className="mt-12 flex">
          <VerticalTimeline>
            {experiences.map((experience) => {
              console.log(experience);
              return (
                <VerticalTimelineElement
                  key={experience.company_name}
                  date={experience.date}
                  icon={
                    <div className="flex justify-center items-center w-full h-full">
                      <img
                        src={experience.icon.src}
                        alt={experience.company_name}
                        className="w-[60%] h-[60%] object-contain"
                      />
                    </div>
                  }
                  iconStyle={{ background: experience.iconBg }}
                  contentStyle={{
                    borderBottom: `8px solid ${experience.iconBg}`,
                    boxShadow: 'none',
                  }}
                  visible={true}
                >
                  <div>
                    <h3 className="text-black text-xl font-poppins font-semibold">
                      {experience.title}
                    </h3>
                    <p
                      className="text-black-500 font-medium font-base"
                      style={{ margin: 0 }}
                    >
                      {experience.company_name}
                    </p>
                  </div>
                  <ul className="my-5 list-disc ml-5 space-y-2">
                    {experience.points.map((point, i) => (
                      <li
                        key={`experience-point-${i}`}
                        className="text-black-500/50 font-normal pl-1 text-sm"
                      >
                        {point}
                      </li>
                    ))}
                  </ul>
                </VerticalTimelineElement>
              );
            })}
          </VerticalTimeline>
        </div>
      </div>
      <hr className="border-slate-200" />
      <CTA />
    </section>
  );
};
export default About;
