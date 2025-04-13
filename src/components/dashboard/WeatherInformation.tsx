
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sun, Cloud, Wind, Droplets, Thermometer } from "lucide-react";

interface WeatherData {
  temperature: number;
  humidity: number;
  windSpeed: number;
  condition: "sunny" | "cloudy" | "rainy" | "partly-cloudy";
  sunlightIntensity: number;
}

const WeatherInformation = () => {
  const [weather, setWeather] = useState<WeatherData>({
    temperature: 24,
    humidity: 65,
    windSpeed: 8,
    condition: "partly-cloudy",
    sunlightIntensity: 70,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // In a real app, this would fetch from a weather API
    // using the user's location
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case "sunny":
        return <Sun className="h-6 w-6 text-yellow-500" />;
      case "cloudy":
        return <Cloud className="h-6 w-6 text-gray-500" />;
      case "rainy":
        return <Droplets className="h-6 w-6 text-blue-500" />;
      case "partly-cloudy":
        return (
          <div className="relative">
            <Sun className="h-6 w-6 text-yellow-500" />
            <Cloud className="h-4 w-4 text-gray-500 absolute top-0 right-0" />
          </div>
        );
      default:
        return <Sun className="h-6 w-6 text-yellow-500" />;
    }
  };

  const getConditionText = (condition: string) => {
    switch (condition) {
      case "sunny":
        return "Sunny";
      case "cloudy":
        return "Cloudy";
      case "rainy":
        return "Rainy";
      case "partly-cloudy":
        return "Partly Cloudy";
      default:
        return "Unknown";
    }
  };

  const getSunlightAdvice = (intensity: number) => {
    if (intensity >= 80) {
      return "High sunlight - perfect for sun-loving plants!";
    } else if (intensity >= 50) {
      return "Moderate sunlight - good growing conditions";
    } else {
      return "Low sunlight - focus on shade plants today";
    }
  };

  return (
    <Card className="h-full shadow-md">
      <CardHeader>
        <CardTitle>Weather Conditions</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center items-center h-[200px]">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-primary/10 rounded-full">
                  {getWeatherIcon(weather.condition)}
                </div>
                <div>
                  <div className="text-2xl font-bold">{weather.temperature}°C</div>
                  <div className="text-muted-foreground">
                    {getConditionText(weather.condition)}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm">Today</div>
                <div className="text-sm text-muted-foreground">
                  {new Date().toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "short",
                    day: "numeric",
                  })}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-blue-100 rounded-full">
                  <Droplets className="h-4 w-4 text-blue-500" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Humidity</div>
                  <div className="font-medium">{weather.humidity}%</div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-gray-100 rounded-full">
                  <Wind className="h-4 w-4 text-gray-500" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Wind</div>
                  <div className="font-medium">{weather.windSpeed} km/h</div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-yellow-100 rounded-full">
                  <Sun className="h-4 w-4 text-yellow-500" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Sunlight</div>
                  <div className="font-medium">{weather.sunlightIntensity}%</div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-red-100 rounded-full">
                  <Thermometer className="h-4 w-4 text-red-500" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Feels Like</div>
                  <div className="font-medium">{weather.temperature + 2}°C</div>
                </div>
              </div>
            </div>

            <div className="mt-4 p-3 bg-primary/5 rounded-md">
              <div className="text-sm font-medium">Gardening Tip:</div>
              <div className="text-sm text-muted-foreground">
                {getSunlightAdvice(weather.sunlightIntensity)}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default WeatherInformation;
