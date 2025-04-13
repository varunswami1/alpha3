
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Info, MapPin, Bell, BellOff } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface DiseaseAlert {
  id: string;
  name: string;
  affectedPlants: string[];
  location: string;
  distance: string;
  riskLevel: "high" | "medium" | "low";
  date: string;
  description: string;
  subscribedToAlerts: boolean;
}

const alerts: DiseaseAlert[] = [
  {
    id: "1",
    name: "Late Blight",
    affectedPlants: ["Tomato", "Potato"],
    location: "North Garden District",
    distance: "1.2 km",
    riskLevel: "high",
    date: "2023-06-10",
    description: "Late blight is a devastating disease that affects tomatoes and potatoes. It can spread rapidly in humid conditions.",
    subscribedToAlerts: true,
  },
  {
    id: "2",
    name: "Powdery Mildew",
    affectedPlants: ["Squash", "Cucumber", "Zucchini"],
    location: "Riverside Gardens",
    distance: "3.5 km",
    riskLevel: "medium",
    date: "2023-06-08",
    description: "Powdery mildew is a fungal disease that appears as white powdery spots on leaves and stems.",
    subscribedToAlerts: false,
  },
  {
    id: "3",
    name: "Aphid Infestation",
    affectedPlants: ["Roses", "Vegetable seedlings"],
    location: "Downtown Community Gardens",
    distance: "2.8 km",
    riskLevel: "low",
    date: "2023-06-12",
    description: "Aphids are small sap-sucking insects that can cause stunted growth and distorted leaves.",
    subscribedToAlerts: true,
  },
];

const DiseaseAlerts = () => {
  const [alertsList, setAlertsList] = useState<DiseaseAlert[]>(alerts);
  const [openItem, setOpenItem] = useState<string | null>(null);

  const toggleOpenItem = (id: string) => {
    setOpenItem(openItem === id ? null : id);
  };

  const toggleSubscription = (id: string) => {
    setAlertsList(
      alertsList.map((alert) =>
        alert.id === id
          ? { ...alert, subscribedToAlerts: !alert.subscribedToAlerts }
          : alert
      )
    );
  };

  const getRiskBadge = (risk: string) => {
    switch (risk) {
      case "high":
        return <Badge variant="destructive">High Risk</Badge>;
      case "medium":
        return <Badge variant="default">Medium Risk</Badge>;
      case "low":
        return <Badge variant="outline">Low Risk</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  return (
    <Card className="shadow-md">
      <CardHeader>
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-amber-500" />
          <CardTitle>Nearby Disease Alerts</CardTitle>
        </div>
        <CardDescription>
          Current disease and pest alerts in your area
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Disease/Pest</TableHead>
              <TableHead>Affected Plants</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Risk Level</TableHead>
              <TableHead>Alerts</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {alertsList.map((alert) => (
              <Collapsible
                key={alert.id}
                open={openItem === alert.id}
                onOpenChange={() => toggleOpenItem(alert.id)}
              >
                <TableRow>
                  <TableCell className="font-medium">{alert.name}</TableCell>
                  <TableCell>
                    {alert.affectedPlants.map((plant, idx) => (
                      <span key={idx}>
                        {plant}
                        {idx < alert.affectedPlants.length - 1 ? ", " : ""}
                      </span>
                    ))}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3 text-muted-foreground" />
                      <span>{alert.distance}</span>
                    </div>
                  </TableCell>
                  <TableCell>{getRiskBadge(alert.riskLevel)}</TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={() => toggleSubscription(alert.id)}
                    >
                      {alert.subscribedToAlerts ? (
                        <Bell className="h-4 w-4 text-primary" />
                      ) : (
                        <BellOff className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                  </TableCell>
                  <TableCell>
                    <CollapsibleTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Info className="h-4 w-4" />
                      </Button>
                    </CollapsibleTrigger>
                  </TableCell>
                </TableRow>
                <CollapsibleContent>
                  <TableRow>
                    <TableCell colSpan={6} className="bg-muted/50">
                      <div className="p-2">
                        <div className="text-sm font-medium mb-1">
                          Location: {alert.location}
                        </div>
                        <div className="text-sm text-muted-foreground mb-2">
                          Reported on: {new Date(alert.date).toLocaleDateString()}
                        </div>
                        <p className="text-sm">
                          {alert.description}
                        </p>
                        <div className="mt-2">
                          <Button variant="outline" size="sm">
                            View Prevention Tips
                          </Button>
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                </CollapsibleContent>
              </Collapsible>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default DiseaseAlerts;
