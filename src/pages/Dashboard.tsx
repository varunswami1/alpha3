
import { useState } from "react";
import { motion } from "framer-motion";
import TodoCalendar from "@/components/dashboard/TodoCalendar";
import TodaysTasks from "@/components/dashboard/TodaysTasks";
import PlantInformation from "@/components/dashboard/PlantInformation";
import WeatherInformation from "@/components/dashboard/WeatherInformation";
import DiseaseAlerts from "@/components/dashboard/DiseaseAlerts";
import DashboardLayout from "@/components/dashboard/DashboardLayout";

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="col-span-1 md:col-span-2"
        >
          <TodoCalendar />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <TodaysTasks />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <PlantInformation />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <WeatherInformation />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="col-span-1 md:col-span-2"
        >
          <DiseaseAlerts />
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
