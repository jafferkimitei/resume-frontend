import React, { useState, useEffect } from "react";
import axios from "axios";

const About = () => {
  const [aboutData, setAboutData] = useState({ title: "", description: "", image: "" });
  const [isLoading, setIsLoading] = useState(true);  // Add loading state

  useEffect(() => {
    // Fetch the About data from the backend API
    const fetchAboutData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/about');
        setAboutData(response.data);  // Update the state with fetched data
        setIsLoading(false);  // Set loading state to false when data is fetched
      } catch (error) {
        console.error("Error fetching About data:", error);
        setIsLoading(false);  // Set loading state to false even in case of error
      }
    };
    fetchAboutData();
  }, []);

  // Render a loading message if data is not yet fetched
  if (isLoading) {
    return (
      <section className="about bg-gray-900 text-white py-20">
        <div className="container mx-auto px-4">
          <p>Loading...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="about bg-gray-900 text-white py-20">
      <div className="container mx-auto px-4">
      <h3 className='text-center mb-4 uppercase tracking-[20px] text-gray-500 text-2xl md:text-3xl lg:text-4xl'>
                About
            </h3>
            <p className="mb-16 text-center uppercase tracking-[3px] text-gray-500 text-sm md:text-base lg:text-lg mt-4">{aboutData.title}
        </p>
           
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Left side: Title and Description */}
          <div className="text-center md:text-left">
            <p className="mt-4 text-base">{aboutData.description}</p>
          </div>

          {/* Right side: Image */}
          {aboutData.image && (
            <div className="mt-6 md:mt-0 flex justify-center">
              <img
                src={`http://localhost:5000/${aboutData.image}`}
                alt="About Me"
                className="rounded-lg shadow-lg w-full max-w-md"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default About;
