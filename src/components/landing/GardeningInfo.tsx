import { motion } from "framer-motion";
import { Sprout, Calendar, Droplets, Sun, Smartphone, Leaf } from "lucide-react";

const GardeningInfo = () => {
  const features = [
    {
      icon: <Sprout className="w-10 h-10 text-green-600" />,
      title: "Smart Plant Recommendations",
      description: "Get personalized plant suggestions based on your location, climate, and gardening experience level."
    },
    {
      icon: <Calendar className="w-10 h-10 text-green-600" />,
      title: "Seasonal Planting Calendar",
      description: "Never miss the perfect planting time with our smart calendar that adapts to your local growing seasons."
    },
    {
      icon: <Droplets className="w-10 h-10 text-green-600" />,
      title: "Watering Reminders",
      description: "Receive timely notifications when your plants need water, preventing both under and over-watering."
    },
    {
      icon: <Sun className="w-10 h-10 text-green-600" />,
      title: "Sunlight Tracking",
      description: "Monitor how much sunlight your garden receives and get recommendations for optimal plant placement."
    },
    {
      icon: <Smartphone className="w-10 h-10 text-green-600" />,
      title: "Mobile Gardening Assistant",
      description: "Access your garden information anywhere with our mobile app, making gardening management effortless."
    },
    {
      icon: <Leaf className="w-10 h-10 text-green-600" />,
      title: "Plant Health Monitoring",
      description: "Identify plant diseases and nutrient deficiencies early with our AI-powered plant health scanner."
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container-padding">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="heading-lg mb-4">Garden Smarter, Not Harder</h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            Modern gardening is evolving with technology. Our smart gardening app helps you grow a thriving garden with less effort and more success.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-neutral-50 p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-neutral-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-semibold mb-4">Why Choose Smart Gardening?</h3>
          <p className="text-neutral-600 max-w-3xl mx-auto mb-8">
            Smart gardening apps like Plantona combine traditional gardening knowledge with modern technology to help you create and maintain a beautiful garden. Whether you're a beginner or an experienced gardener, our app provides the tools and guidance you need to succeed.
          </p>
          <button className="button-primary">Start Your Smart Gardening Journey</button>
        </motion.div>
      </div>
    </section>
  );
};

export default GardeningInfo; 