import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';  // Import Framer Motion for animations

const Projects = () => {
  const [projects, setProjects] = useState([]); // Initialize with an empty array

  useEffect(() => {
    const fetchProjectsData = async () => {
      try {
        const response = await axios.get('https://resume-backend-production-3426.up.railway.app/api/projects');
        
        if (response.data && Array.isArray(response.data)) {
          setProjects(response.data);
        } else {
          setProjects([]);
        }
      } catch (error) {
        console.error('Error fetching projects data:', error);
        setProjects([]);
      }
    };

    fetchProjectsData();
  }, []);

  return (
    <>
    <div className="w-full absolute top-[30%] bg-[#F7AB0A]/10 left-0 h-[500px] -skew-y-12 z-[-1]" />
    <section className="projects bg-gray-900 text-white py-20 relative">
      {/* Skewed background div */}
      
      
      <div className="container mx-auto px-4 relative">
      <h3 className='text-center mb-4 uppercase tracking-[20px] text-gray-500 text-2xl md:text-3xl lg:text-4xl'>
          Projects
        </h3>

        <div className="relative w-full flex overflow-x-scroll overflow-y-hidden snap-x snap-mandatory z-20 scrollbar-thin scrollbar-track-gray-400/20 scrollbar-thumb-[#F7AB0A]/80">
          {projects.map((project, i) => (
            <div key={i} className="w-screen flex-shrink-0 snap-center flex flex-col items-center justify-center p-20 md:p-37 h-screen">
              <motion.div
                initial={{ y: -300, opacity: 0 }}
                transition={{ duration: 1.2 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative w-full max-w-[300px] max-h-[200px] flex justify-center"
              >
                {project.viewLink ? (
                  <a href={project.viewLink} target="_blank" rel="noopener noreferrer" aria-label={`View ${project.title}`}>
                    <img
                      src={`https://resume-backend-production-3426.up.railway.app/${project.image}`} 
                      alt={project.title}
                      className="w-full h-48 object-cover rounded-t-lg mb-4 cursor-pointer"
                    />
                  </a>
                ) : (
                  <img
                    src={`https://resume-backend-production-3426.up.railway.app/${project.image}`} 
                    alt={project.title}
                    className="w-full h-48 object-cover rounded-t-lg mb-4"
                  />
                )}
              </motion.div>

              <div className="space-y-10 px-0 md:px-10 max-w-6xl">
                <motion.h4
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 1.2 }}
                  className="text-2xl md:text-4xl lg:text-5xl font-semibold text-center"
                >
                  <span className="underline decoration-[#F7AB0A]/50">
                    Case Study {i + 1} of {projects.length}:
                  </span> {project.title}
                 
                </motion.h4>
                <p className="text-xs sm:text-base md:text-lg lg:text-xl text-center md:text-left">
                  {project.description || project.summary}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
    </>
  );
};

export default Projects;
