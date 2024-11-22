import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [status, setStatus] = useState(null); // For showing submission status

  // Handle form data changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Validate email format
  const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  // Handle form submission (mailto)
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isValidEmail(formData.email)) {
      setStatus('error');
      return;
    }

    // Encode form data for mailto
    const subject = encodeURIComponent('Contact Form Submission');
    const body = encodeURIComponent(`
      Name: ${formData.name}
      Email: ${formData.email}
      Message: ${formData.message}
    `);

    // Construct mailto URL
    const mailtoLink = `mailto:jafferkimitei@gmail.com?subject=${subject}&body=${body}`;

    // Redirect to mailto URL (this opens the user's email client)
    window.location.href = mailtoLink;

    // Reset form after submission
    setFormData({
      name: '',
      email: '',
      message: '',
    });

    // Set success status (for now, consider removing it if mailto fails)
    setStatus('success');
  };

  return (
    <section className="contact bg-gray-800 text-white py-20">
      <div className="container mx-auto px-4">
        <h3 className="text-center mb-4 uppercase tracking-[20px] text-gray-500 text-2xl md:text-3xl lg:text-4xl">
          Contact
        </h3>
        <p className="text-center uppercase tracking-[3px] text-gray-500 text-sm md:text-base lg:text-lg mt-4">
          I have got just what you need.{" "}
          <span className="decoration-[#F7AB0A]/50">Let&apos;s Talk.</span>
        </p>

        <form onSubmit={handleSubmit} className="mt-8 max-w-lg mx-auto">
          <div className="mb-4">
            <label htmlFor="name" className="block text-lg font-medium">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-3 mt-2 bg-gray-700 text-white rounded-md"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-lg font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 mt-2 bg-gray-700 text-white rounded-md"
            />
            {status === 'error' && (
              <p className="text-red-500 text-sm mt-2">Please enter a valid email address.</p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="message" className="block text-lg font-medium">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full p-3 mt-2 bg-gray-700 text-white rounded-md"
              rows="6"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 mt-4 bg-orange-500 text-white rounded-md hover:bg-orange-600"
          >
            Send Message
          </button>

          {status === 'success' && (
            <p className="mt-4 text-center text-green-500">Message sent successfully!</p>
          )}
        </form>
      </div>
    </section>
  );
};

export default Contact;
