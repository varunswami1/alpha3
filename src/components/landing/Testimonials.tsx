import { motion } from "framer-motion";
import { Star } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Urban Apartment Gardener",
      image: "https://randomuser.me/api/portraits/women/32.jpg",
      content: "Plantona transformed my tiny balcony into a thriving garden. The app's smart recommendations helped me choose plants that actually survive in my space, and the watering reminders ensure I never forget to care for them.",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Beginner Gardener",
      image: "https://randomuser.me/api/portraits/men/45.jpg",
      content: "As someone who killed every plant I touched, this app has been a game-changer. The step-by-step guidance and plant health monitoring features helped me identify issues before they became fatal. Now I have a beautiful garden!",
      rating: 5
    },
    {
      name: "Emma Rodriguez",
      role: "Vegetable Garden Enthusiast",
      image: "https://randomuser.me/api/portraits/women/68.jpg",
      content: "The seasonal planting calendar is my favorite feature. It tells me exactly when to plant each vegetable for maximum yield. My harvest has doubled since I started using Plantona's smart gardening tools.",
      rating: 5
    }
  ];

  return (
    <section className="py-20 bg-neutral-50">
      <div className="container-padding">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="heading-lg mb-4">What Our Gardeners Say</h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            Join thousands of successful gardeners who have transformed their gardening experience with smart technology.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="bg-white p-8 rounded-xl shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center mb-4">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name} 
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h3 className="font-semibold">{testimonial.name}</h3>
                  <p className="text-sm text-neutral-500">{testimonial.role}</p>
                </div>
              </div>
              
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              
              <p className="text-neutral-600 italic">"{testimonial.content}"</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials; 