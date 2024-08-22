import React from "react";

const About = () => {
  return (
    <section className="bg-winter dark:bg-dracula py-12 mt-10">
      <div className="container mx-auto text-center px-4">
        <h2 className="text-6xl font-bold text-gray-600 dark:text-dracula-light mb-4">
          We love
          <span className="bg-blue-500 text-white rounded-md px-4 text-4xl ml-4 font-bold">
            comfy
          </span>
        </h2>
        <p className="text-lg text-gray-600 dark:text-dracula-light max-w-xl mx-auto">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tempore quae quam
          blanditiis vitae, dolor non eveniet ipsum voluptatibus, quia optio aut!
          Perferendis ipsa cumque ipsam nostrum reprehenderit ad illo sed officiis ea tempore!
          Similique eos minima sit porro, ratione aspernatur!
        </p>
      </div>
    </section>
  );
};

export default About;