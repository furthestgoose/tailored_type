import type { NextPage } from 'next';
import Layout from '/Users/adambyford/Desktop/Portfolio_Projects/Web stuff/Websites/tailored_type/app/Components/Layout';

const Test: NextPage = () => {
  return (
    <Layout>
      <section className="w-full py-12 px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-semibold mb-8 text-center text-black">Why Choose Custom Keys?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-black">Unparalleled Customization</h3>
            <p className="text-gray-800">Create a keyboard that&#39;s uniquely yours with our extensive options.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-black">Premium Quality</h3>
            <p className="text-gray-800">We use only the finest materials and components in our keyboards.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-black">Expert Support</h3>
            <p className="text-gray-800">Our team of keyboard enthusiasts is here to help you every step of the way.</p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Test;