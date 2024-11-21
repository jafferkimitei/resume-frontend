import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css"; 
import React, { useState, useEffect } from "react";
import axios from "axios";
import Slider from "react-slick";

const Experience = () => {
  const [experiences, setExperiences] = useState([]); // Initialize with an empty array

  useEffect(() => {
    // Fetch the Experience data from the backend API
    const fetchExperienceData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/experience");
        setExperiences(response.data || []); // Fallback to an empty array if no data
      } catch (error) {
        console.error("Error fetching Experience data:", error);
        setExperiences([]); // Ensure experiences is always an array on error
      }
    };
    fetchExperienceData();
  }, []);

  const settings = {
    dots: true,        // Show navigation dots
    infinite: true,    // Infinite scroll
    speed: 500,        // Speed of slide transition
    slidesToShow: 1,   // Show 1 slide at a time
    slidesToScroll: 1, // Scroll 1 slide at a time
    autoplay: true,    // Auto play slides
    autoplaySpeed: 3000, // Slide change speed
  };

  // Function to split description into bullet points
  const getBulletPoints = (description) => {
    return description
      .split('.') // Split the description at each full stop (.)
      .filter((sentence) => sentence.trim() !== '') // Remove any empty strings
      .map((sentence, index) => <li key={index}>{sentence.trim()}.</li>); // Trim whitespace and add a full stop
  };

  return (
    <section className="experience bg-gray-900 text-white py-20">
      <div className="container mx-auto px-4">
        <h3 className='text-center mb-4 uppercase tracking-[20px] text-gray-500 text-2xl md:text-3xl lg:text-4xl'>
          Experience
        </h3>
        <p className="text-center uppercase tracking-[3px] text-gray-500 text-sm md:text-base lg:text-lg mt-4">
          Journey of my proficiencies
        </p>
        <div className="mt-8">
          {experiences.length === 0 ? (
            <p className="text-xl text-center">No experience data available</p>
          ) : (
            <Slider {...settings}>
              {experiences.map((exp) => (
                <div key={exp._id} className="mb-8 p-4 bg-gray-900 rounded-lg shadow-lg flex flex-col items-start">
                  {/* Display Company Logo/Image if available */}
                  {exp.companyImage && (
                    <img
                      src={`http://localhost:5000/${exp.companyImage}`}
                      alt={exp.company}
                      className="w-20 h-20 rounded-full mb-4"
                    />
                  )}
                  <h3 className="text-2xl font-semibold text-left">{exp.jobTitle}</h3>
                  {exp.miniTitle && (
                    <p className="mt-2 text-lg italic text-left">{exp.miniTitle}</p>
                  )}
                  <p className="text-xl text-gray-400 text-left">{exp.company}</p>
                  <p className="mt-2 text-lg text-left">Duration: {exp.duration}</p>
                  
                  {/* Description in bullet points */}
                  <ul className="mt-4 list-inside list-disc text-lg text-gray-300 text-left">
                    {getBulletPoints(exp.description)}
                  </ul>
                </div>
              ))}
            </Slider>
          )}
        </div>
      </div>
    </section>
  );
};

export default Experience;
