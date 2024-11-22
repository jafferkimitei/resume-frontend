import React, { useState, useEffect } from "react";
import axios from "axios";
import AOS from 'aos';
import 'aos/dist/aos.css'; // import the AOS styles

const Skills = () => {
  const [skills, setSkills] = useState([]);  // Initialize state with an empty array

  useEffect(() => {
    const fetchSkillsData = async () => {
      try {
        const response = await axios.get("https://resume-backend-production-3426.up.railway.app/api/skills");
        // Check if the response contains the data
        if (response.data && Array.isArray(response.data)) {
          setSkills(response.data);  // Update state with fetched skills
        } else {
          setSkills([]);  // Ensure skills is always an array, even if no data
        }
      } catch (error) {
        console.error("Error fetching skills data:", error);
        setSkills([]);  // Set skills to an empty array in case of error
      }
    };
    fetchSkillsData();

    // Initialize AOS
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,  // Animate only once when scrolled into view
    });
  }, []);

  return (
    <section className="skills bg-gray-900 text-white py-20">
      <div className="container mx-auto px-4">
        <h3 className='text-center mb-4 uppercase tracking-[20px] text-gray-500 text-2xl md:text-3xl lg:text-4xl'>
          Skills
        </h3>
        <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {skills.length === 0 ? (
            <p className="text-xl text-center">No skills data available</p>
          ) : (
            skills.map((skill, index) => (
              <div
                key={skill._id}
                className={`skill-item text-center ${index % 2 === 0 ? "skill-left" : "skill-right"}`}
                data-aos={index % 2 === 0 ? "fade-left" : "fade-right"} // Apply animation direction based on position
              >
                <img
                  src={`https://resume-backend-production-3426.up.railway.app/${skill.image}`}  
                  alt={skill.name}
                  className="w-16 h-16 mx-auto mb-4"
                />
                <p className="text-lg">{skill.name}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Skills;
