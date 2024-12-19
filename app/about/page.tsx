import type { NextPage } from 'next';
import Layout from '/Users/adambyford/Desktop/Portfolio_Projects/Web stuff/Websites/tailored_type/app/Components/Layout';
import Image from 'next/image';
import { Keyboard, Medal, Wrench, Users } from 'lucide-react';
import React from "react";

const AboutUs: NextPage = () => {
  return (
    <Layout>
      <div className="text-center mt-6 mb-6">
      <h2 className="text-5xl font-bold mb-6 text-black">About Us</h2>
      </div>
      <div className="bg-gray-50">
        {/* Hero Section */}
        <section className="relative h-96 bg-black">
          <Image
            src="/images/keyboard1.jpg"
            alt="Keyboard enthusiasts working"
            layout="fill"
            objectFit="cover"
            className="opacity-50"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white text-center">
              Crafting Your Perfect Typing Experience
            </h1>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="w-full py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-semibold mb-6 text-black">Our Story</h2>
            <p className="text-gray-700 mb-8">
              Tailored Type was born from a passion for exceptional keyboards. We started as a small group of enthusiasts who believed that every keystroke should be a satisfying experience. Today, we&#39;re proud to offer custom keyboards that blend aesthetics, functionality, and personal expression.
            </p>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="w-full py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <h2 className="text-3xl font-semibold mb-12 text-center text-black">Why Choose Tailored Type?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <FeatureCard
              icon={<Keyboard className="w-10 h-10 text-black" />}
              title="Unparalleled Customization"
              description="Create a keyboard that's uniquely yours with our extensive options for switches, keycaps, and layouts."
            />
            <FeatureCard
              icon={<Medal className="w-10 h-10 text-black" />}
              title="Premium Quality"
              description="We use only the finest materials and components to ensure durability and performance in every keyboard."
            />
            <FeatureCard
              icon={<Wrench className="w-10 h-10 text-black" />}
              title="Expert Support"
              description="Our team of keyboard enthusiasts is here to help you design and build your dream keyboard."
            />
            <FeatureCard
              icon={<Users className="w-10 h-10 text-black" />}
              title="Community-Driven"
              description="Join our vibrant community of keyboard enthusiasts to share ideas and get inspired."
            />
          </div>
        </section>

        {/* Team Section */}
        <section className="w-full py-16 px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-semibold mb-12 text-center text-black">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <TeamMember
              name="Alex Johnson"
              role="Founder & Lead Designer"
              imageSrc="/api/placeholder/300/300"
            />
            <TeamMember
              name="Sarah Lee"
              role="Chief Technical Officer"
              imageSrc="/api/placeholder/300/300"
            />
            <TeamMember
              name="Mike Chen"
              role="Customer Experience Manager"
              imageSrc="/api/placeholder/300/300"
            />
          </div>
        </section>
      </div>
    </Layout>
  );
};

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => (
  <div className="bg-gray-50 p-6 rounded-lg shadow-md text-center">
    <div className="flex justify-center mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-2 text-black">{title}</h3>
    <p className="text-gray-700">{description}</p>
  </div>
);

const TeamMember: React.FC<{ name: string; role: string; imageSrc: string }> = ({ name, role, imageSrc }) => (
  <div className="text-center">
    <div className="relative w-48 h-48 mx-auto mb-4 rounded-full overflow-hidden">
      <Image
        src={imageSrc}
        alt={name}
        layout="fill"
        objectFit="cover"
      />
    </div>
    <h3 className="text-xl font-semibold text-black">{name}</h3>
    <p className="text-gray-700">{role}</p>
  </div>
);

export default AboutUs;