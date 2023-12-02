import CTA from '../components/CTA';
import { projects } from '../constants';
import Link from 'next/link';

const Projects = () => {
  return (
    <section className="max-container">
      <h1 className="head-text">
        My&nbsp;
        <span className="blue-gradient_text font-semibold drop-shadow">
          Projects
        </span>
      </h1>
      <div className="mt-5 flex flex-col gap-3 text-slate-500">
        <p>
          Embark on a journey through my diverse portfolio, where innovation
          meets functionality. From Koding Kombat, an educational coding
          platform tailored for adolescents, to a dynamic Revision App that
          gamifies computer science study, each project is a testament to
          creativity and learning. Promptopia, an open-source AI prompting tool,
          and the MERN stack-powered Bookstore App provide cutting-edge
          experiences, while the Meme Generator unleashes creativity with humor.
          Explore a YouTube Clone, meticulously crafted with HTML and CSS, and
          an Exercise Tracker app that effortlessly blends Vanilla JS,
          LeafletJS, Local Storage, and Geolocation API for a personalized
          workout experience. Dive into the world of technology and creativity
          through my projects.
        </p>
      </div>
      <div className="flex flex-wrap my-20 gap-16">
        {projects.map((project) => (
          <div className="lg:w-[400px] w-full" key={project.name}>
            <div className="block-container w-12 h-12">
              <div className={`btn-back rounded-xl ${project.theme}`} />
              <div className="btn-front rounded-xl flex justify-center items-center">
                <img
                  src={project.iconUrl.src}
                  alt={project.name}
                  className="w-1/2 h-1/2 object-contain"
                />
              </div>
            </div>
            <div className="mt-5 flex flex-col">
              <h4 className="text-2xl font-poppins font-semibold">
                {project.name}
              </h4>
              <p className="mt-2 text-slate-500">{project.description}</p>
              <div className="mt-5 flex items-center gap-2 font-poppins">
                <Link
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-blue-600"
                >
                  Live Link
                </Link>

                {/* <img src="" alt=""  className='w-4 h-4 object-contain' /> Arrow icon */}
              </div>
            </div>
          </div>
        ))}
      </div>
      <hr className="border-slate-200" />
      <CTA />
    </section>
  );
};
export default Projects;
