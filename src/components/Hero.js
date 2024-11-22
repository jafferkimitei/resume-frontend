import React, { useState, useEffect } from "react";
import axios from "axios";
import BackgroundCircles from './BackgroundCircles';
import { Typewriter } from 'react-simple-typewriter';

const Hero = () => {
  const [heroData, setHeroData] = useState(null);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    // Fetch the Hero data from the backend API
    const fetchHeroData = async () => {
      try {
        const response = await axios.get("https://resume-backend-production-3426.up.railway.app/api/hero");
        setHeroData(response.data); 
        setLoading(false);
      } catch (error) {
        console.error("Error fetching Hero data:", error);
        setLoading(false);
      }
    };
    fetchHeroData();
  }, []);


  // Check if heroData is loaded
  if (loading) {
    return (
      <section className="hero bg-gray-900 text-white h-screen flex flex-col justify-center items-center">
        <BackgroundCircles />
        <div className="text-orange-500">Loading...</div>
      </section>
    );
  }

  return (
    <section className="hero bg-gray-900 text-white h-screen flex flex-col justify-center items-center">
      <BackgroundCircles />
      <div className="rounded-full w-32 h-32 bg-orange-500">
        {/* Profile Image */}
        <img
          src={`http://localhost:5000/${heroData.profileImage}`}
          alt="Your Name"
          className="rounded-full w-full h-full object-cover"
        />
      </div>
      <h2 className="z-20 text-xs sm:text-sm md:text-base mt-4 uppercase text-gray-500 pb-2 tracking-[5px] sm:tracking-[10px] md:tracking-[15px]">{heroData.role || "Software Developer"}</h2>
     {/* Typewriter Component */}
     <h1 className="z-20 text-base mt-2">
        <Typewriter
          words={heroData.typewriterStrings} 
          loop={true}  
          cursor
          cursorStyle="_"  
          typeSpeed={70}  
          deleteSpeed={50}  
          delaySpeed={2000} 
        />
      </h1>

      {/* Social media links */}
      <div className="z-20 mt-4 flex space-x-6">
        {heroData.socialLinks &&
          heroData.socialLinks.map((link) => (
            <a
              key={link._id} // Use the unique _id for the key
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-500 hover:text-orange-300"
            >
              {/* Display the platform name (LinkedIn, GitHub, etc.) */}
              {link.platform}
            </a>
          ))}
      </div>
    </section>
  );
};

export default Hero;
