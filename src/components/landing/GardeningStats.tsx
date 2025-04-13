import { motion } from "framer-motion";
import { Leaf, Droplet, Sun, Clock, Heart, DollarSign } from "lucide-react";

const GardeningStats = () => {
  const stats = [
    {
      icon: <Leaf className="w-8 h-8 text-green-600" />,
      value: "85%",
      label: "Higher Plant Survival Rate",
      description: "Smart gardening apps help reduce plant mortality by providing optimal care instructions."
    },
    {
      icon: <Droplet className="w-8 h-8 text-green-600" />,
      value: "40%",
      label: "Water Conservation",
      description: "Smart watering schedules and reminders help reduce water waste in gardens."
    },
    {
      icon: <Sun className="w-8 h-8 text-green-600" />,
      value: "3x",
      label: "Faster Growth",
      description: "Plants grow up to 3 times faster with proper care guidance from smart gardening apps."
    },
    {
      icon: <Clock className="w-8 h-8 text-green-600" />,
      value: "60%",
      label: "Less Time Spent",
      description: "Smart gardening tools help you spend less time worrying and more time enjoying your garden."
    },
    {
      icon: <Heart className="w-8 h-8 text-green-600" />,
      value: "90%",
      label: "Gardener Satisfaction",
      description: "Most users report higher satisfaction with their gardening experience using smart apps."
    },
    {
      icon: <DollarSign className="w-8 h-8 text-green-600" />,
      value: "50%",
      label: "Cost Savings",
      description: "Reduce plant replacement costs with better care guidance and early problem detection."
    }
  ];

  return (
    <section className="py-20 bg-green-50">
      <div className="container-padding">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="heading-lg mb-4">The Impact of Smart Gardening</h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            Discover how technology is transforming gardening success rates and making it easier than ever to grow a beautiful garden.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="bg-white p-8 rounded-xl shadow-sm text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="flex justify-center mb-4">{stat.icon}</div>
              <h3 className="text-4xl font-bold text-green-600 mb-2">{stat.value}</h3>
              <h4 className="text-xl font-semibold mb-2">{stat.label}</h4>
              <p className="text-neutral-600">{stat.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="mt-16 bg-white p-8 rounded-xl shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-semibold mb-4 text-center">The Future of Gardening is Smart</h3>
          <p className="text-neutral-600 max-w-3xl mx-auto text-center">
            As technology continues to advance, smart gardening apps are becoming essential tools for both beginners and experienced gardeners. By combining traditional gardening knowledge with modern technology, these apps help you make informed decisions, save time, and achieve better results with less effort.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default GardeningStats; 