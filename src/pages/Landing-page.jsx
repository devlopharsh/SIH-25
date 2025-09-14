import React, { useState } from "react";
import { Button } from "../components/ui/button";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
// If you want to use a local image, place it in /public and reference like "/example.png"
// import exampleImage from './assets/example.png';

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen h-full bg-gradient-to-br from-blue-100 via-blue-50 to-white relative overflow-hidden ">
      {/* Background Bubbles */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-10 w-16 h-16 bg-blue-200/30 rounded-full blur-sm"
          animate={{ y: [0, -20, 0], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-40 right-20 w-24 h-24 bg-blue-300/20 rounded-full blur-sm"
          animate={{ y: [0, -30, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-60 left-1/4 w-8 h-8 bg-blue-400/40 rounded-full blur-sm"
          animate={{ x: [0, 15, 0], y: [0, -15, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-40 right-10 w-32 h-32 bg-blue-200/25 rounded-full blur-sm"
          animate={{ y: [0, -25, 0], opacity: [0.5, 0.9, 0.5] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 left-1/3 w-12 h-12 bg-blue-300/35 rounded-full blur-sm"
          animate={{ x: [0, -20, 0], y: [0, 20, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/2 right-1/4 w-20 h-20 bg-blue-400/20 rounded-full blur-sm"
          animate={{ scale: [1, 1.2, 1], y: [0, -15, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-10 right-1/3 w-14 h-14 bg-blue-300/25 rounded-full blur-sm"
          animate={{ y: [0, -25, 0], x: [0, 10, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-10 left-1/4 w-28 h-28 bg-blue-200/20 rounded-full blur-sm"
          animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/3 left-1/5 w-10 h-10 bg-blue-400/30 rounded-full blur-sm"
          animate={{ x: [0, 18, 0], y: [0, -18, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/5 w-16 h-16 bg-blue-300/30 rounded-full blur-sm"
          animate={{
            y: [0, -20, 0],
            scale: [1, 1.1, 1],
            opacity: [0.5, 0.9, 0.5],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="px-6 py-4">
          <nav className="flex items-center justify-between max-w-7xl mx-auto">
            <div className="flex items-center space-x-2">
              <img src="./Logo.svg" alt="Logo" height={100} width={200} />
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#projects"
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                Projects
              </a>
              <a
                href="#resources"
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                Resources
              </a>
              <a
                href="#latest"
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                Latest
              </a>
              <a
                href="#about"
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                About
              </a>
              <a
                href="#contact"
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                Contact
              </a>
            </div>

            <Button
              onClick={() => {
                navigate("/company/signup");
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full"
            >
              Get Started
            </Button>
          </nav>
        </header>

        {/* Hero Section */}
        <section className="px-6 py-16 text-center">
          <div className="max-w-4xl mx-auto">
            {/* <div className="flex items-center justify-center mb-8">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mr-4">
                <div className="w-8 h-8 bg-white rounded-full"></div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-blue-900">
                CABLAB
              </h1>
            </div> */}
            <div className="flex items-center justify-center mb-8">
              <img src="./Logo.svg" alt="Logo" />
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Secure. Transparent. Sustainable
            </h2>

            <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
              A trusted platform for coastal restoration that leverages
              innovative technology to create verified Blue Carbon
              recommendations and investment opportunities focused on value and
              impact.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full">
                Know More
              </Button>
              <Button
                onClick={() => {
                  navigate("/company/signup");
                }}
                variant="outline"
                className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-full"
              >
                Join Now
              </Button>
            </div>
          </div>
        </section>

        {/* What is Blue Carbon Section */}
        <section className="px-6 py-16 bg-white/50 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
              What is Blue Carbon?
            </h2>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Blue Carbon is the carbon stored by coastal ecosystems like
                  mangroves, salt marshes, and sea marshes. These ecosystems
                  absorb and lock away large amounts of carbon from the
                  atmosphere over long periods. They also protect shorelines,
                  support marine life, and sustain local communities, making
                  them crucial for both climate action and people.
                </p>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="rounded-lg overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1652008337370-db6d3d014b2e"
                      alt="Mangrove ecosystem"
                      className="w-full h-32 object-cover"
                    />
                  </div>
                  <div className="rounded-lg overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1648694693077-77537352883a"
                      alt="Seagrass underwater"
                      className="w-full h-32 object-cover"
                    />
                  </div>
                </div>

                <div className="rounded-lg overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1563120388-dddda5f1bfc7"
                    alt="Salt marsh coastal wetland"
                    className="w-full h-40 object-cover"
                  />
                </div>
              </div>

              <div className="space-y-8">
                <div className="bg-red-50 p-6 rounded-lg border-l-4 border-red-400">
                  <h3 className="text-xl font-bold text-red-600 mb-2">
                    Alarming Rate of Emission
                  </h3>
                  <p className="text-red-700">
                    Global CO2 emissions from fossil fuel combustion reached a
                    record high of 36.8 billion tons in 2022, representing a 1%
                    increase from 2021.
                  </p>
                </div>

                <div className="bg-orange-50 p-6 rounded-lg border-l-4 border-orange-400">
                  <h3 className="text-xl font-bold text-orange-600 mb-2">
                    Alarming Rate of Deforestation
                  </h3>
                  <p className="text-orange-700">
                    Global deforestation rate has increased by about 50% in the
                    past decade. The world lost 11.1 million hectares of forest
                    cover in 2021.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What do we do Section */}
        <section className="px-6 py-16">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-12">
              What do we do?
            </h2>

            <p className="text-gray-600 text-lg mb-12 max-w-4xl mx-auto leading-relaxed">
              We provide a blockchain-based and carbon data collection platform
              to measure, verify, and manage blue carbon — the carbon stored in
              coastal ecosystems such as mangroves, seagrasses, and salt
              marshes.
            </p>

            <p className="text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
              Our solution helps organizations reduce their environmental
              footprint and corporate markets by using blockchain technology,
              mobile data collection, and drone integration to ensure every
              carbon credit is real, verifiable, and traceable.
            </p>

            <div className="flex flex-col items-center mb-12 gap-5">
              <h4 className="font-semibold text-gray-800">What We Offer</h4>
              {/* <div className="bg-white/60 backdrop-blur-sm p-6 rounded-lg shadow-sm">
                <h3 className="font-bold text-gray-800 mb-3">Trustworthy</h3>
                <p className="text-gray-600">Tamper-proof certification</p>
              </div>

              <div className="bg-white/60 backdrop-blur-sm p-6 rounded-lg shadow-sm">
                <h3 className="font-bold text-gray-800 mb-3">Inclusive</h3>
                <p className="text-gray-600">
                  Designed for NGOs, universities, and local governments
                </p>
              </div> */}

              <div className="flex justify-center items-center gap-5">
                <p className="border border-gray-300 bg-white p-5 shadow-sm rounded-lg text-sm text-gray-600">
                  Immutable Data Registry
                </p>
                <p className="border border-gray-300 bg-white p-5 shadow-sm rounded-lg text-sm text-gray-600">
                  Verified Carbon Credits
                </p>
                <p className="border border-gray-300 bg-white p-5 shadow-sm rounded-lg text-sm text-gray-600">
                  Community & NGO Onboarding
                </p>
                <p className="border border-gray-300 bg-white p-5 shadow-sm rounded-lg text-sm text-gray-600">
                  Integrated Field & Drone Data
                </p>
                <p className="border border-gray-300 bg-white p-5 shadow-sm rounded-lg text-sm text-gray-600">
                  Transparent Credit
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="relative px-6 py-16  flex flex-col justify-center items-center gap-16">
          <div className="absolute w-1/2 h-2/3 border-4 border-dashed border-gray-600 rounded-full" />

          <div className="flex  justify-center gap-20">
            <div className="bg-white/60 backdrop-blur-sm p-6 rounded-lg shadow-sm w-1/5 text-center h-fit">
              <h3 className="font-bold text-gray-800 mb-1">Inclusive</h3>
              <p className="text-gray-600">
                Designed for NGOs, universities, and local governments
              </p>
            </div>
            <div className="bg-white/60 backdrop-blur-sm p-6 rounded-lg shadow-sm w-1/5 text-center h-fit">
              <h3 className="font-bold text-gray-800 mb-1">Trustworthy</h3>
              <p className="text-gray-600">
                Tamper-proof certification provided by the block chain
                reliability and verification.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-20">
            <div className="bg-white/60 backdrop-blur-sm p-6 rounded-lg shadow-sm w-1/5 text-center h-fit">
              <h3 className="font-bold text-gray-800 mb-1">Scientific </h3>
              <p className="text-gray-600">
                MRV based on field data + drone imagery + global standards
              </p>
            </div>
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
              Features Provided
            </h2>
            <div className="bg-white/60 backdrop-blur-sm p-6 rounded-lg shadow-sm w-1/5 text-center h-fit">
              <h3 className="font-bold text-gray-800 mb-1">Impactful</h3>
              <p className="text-gray-600">
                Converts local conservation efforts into global climate action
              </p>
            </div>
          </div>

          <div className="flex  justify-center gap-20">
            <div className="bg-white/60 backdrop-blur-sm p-6 rounded-lg shadow-sm w-2/3 text-center h-fit">
              <h3 className="font-bold text-gray-800 mb-1">Inclusive</h3>
              <p className="text-gray-600">
                Designed for NGOs, universities, and local governments
              </p>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="px-6 py-16 bg-white/40 backdrop-blur-sm grid grid-cols-2 justify-center">
          <div className="grid w-full justify-center">
            <img src="./join_us.svg" alt="join_us " height={200} width={300} />
          </div>
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
              Why Choose us?
            </h2>

            <div className="flex flex-col justify-center items-center gap-12">
              <div className="flex flex-col justify-center items-center w-full">
                <p className="text-gray-600 leading-relaxed mb-8 text-center">
                  We help turn real coastal restoration projects into certified,
                  verifiable carbon credits, enhancing climate impact, community
                  benefit, and investor trust — all powered by blockchain.
                </p>

                <div className="flex gap-4 mb-8">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full">
                    Know More
                  </Button>
                  <Button
                    variant="outline"
                    className="border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-2 rounded-full"
                  >
                    Learn More
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="px-6 py-5 bg-blue-900/10 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto text-center">
            <div className="flex items-center justify-center mb-4">
              <img src="./Logo.svg" alt="Logo" height={100} width={150} />
            </div>
            <p className="text-gray-600 text-sm">
              © 2025 CabLab. Secure. Transparent. Sustainable.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
