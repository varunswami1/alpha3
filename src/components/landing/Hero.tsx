import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/dashboard');
  };

  const handleDemo = () => {
    navigate('/plant-recommendation');
  };

  return (
    <header className="relative min-h-screen">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?q=80&w=2940&auto=format&fit=crop')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-neutral-900/30" />
      </div>

      {/* Hero content */}
      <div className="container relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-4">
        <motion.div
          className="max-w-4xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Transform Your Garden with Smart Technology
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-neutral-100 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Join thousands of gardeners who are revolutionizing their gardening experience with Plantona's smart tools and expert guidance.
          </motion.p>
          <motion.div
            className="flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <button 
              onClick={handleGetStarted}
              className="px-8 py-4 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold text-lg transition-colors"
            >
              Start Growing Today
            </button>
            <button 
              onClick={handleDemo}
              className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white rounded-lg font-semibold text-lg transition-colors backdrop-blur-sm"
            >
              Demo
            </button>
          </motion.div>
        </motion.div>

        {/* Decorative Elements */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-neutral-100 to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        />
      </div>
    </header>
  );
};

export default Hero;
