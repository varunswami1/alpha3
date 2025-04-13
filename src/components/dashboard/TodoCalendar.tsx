
import { useState } from "react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Bell, Plus, Calendar as CalendarIcon, Clock } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

interface Reminder {
  id: string;
  title: string;
  date: Date;
  time?: string;
  isCompleted: boolean;
}

const TodoCalendar = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [reminders, setReminders] = useState<Reminder[]>([
    {
      id: "1",
      title: "Water tomato plants",
      date: new Date(),
      time: "08:00",
      isCompleted: false,
    },
    {
      id: "2",
      title: "Apply fertilizer to roses",
      date: new Date(new Date().setDate(new Date().getDate() + 2)),
      time: "17:00",
      isCompleted: false,
    },
  ]);
  const [newReminder, setNewReminder] = useState<string>("");
  const [newReminderTime, setNewReminderTime] = useState<string>("12:00");
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const { toast } = useToast();

  const handleAddReminder = () => {
    if (newReminder.trim() === "") return;

    const reminder: Reminder = {
      id: Date.now().toString(),
      title: newReminder,
      date: date,
      time: newReminderTime,
      isCompleted: false,
    };

    setReminders([...reminders, reminder]);
    setNewReminder("");
    setIsDialogOpen(false);

    toast({
      title: "Reminder added",
      description: `${newReminder} for ${format(date, "MMMM d, yyyy")} at ${newReminderTime}`,
    });
  };

  const handleToggleComplete = (id: string) => {
    setReminders(
      reminders.map((reminder) =>
        reminder.id === id
          ? { ...reminder, isCompleted: !reminder.isCompleted }
          : reminder
      )
    );
  };

  const remindersForSelectedDate = reminders.filter(
    (reminder) => format(reminder.date, "yyyy-MM-dd") === format(date, "yyyy-MM-dd")
  );

  const dateHasReminder = (date: Date) => {
    return reminders.some(
      (reminder) => format(reminder.date, "yyyy-MM-dd") === format(date, "yyyy-MM-dd")
    );
  };

  return (
    <Card className="shadow-md">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Task Calendar</CardTitle>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Add Task
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Task</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <label htmlFor="task">Task description</label>
                  <Input
                    id="task"
                    value={newReminder}
                    onChange={(e) => setNewReminder(e.target.value)}
                    placeholder="e.g., Water the plants"
                  />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="time">Time</label>
                  <Input
                    id="time"
                    type="time"
                    value={newReminderTime}
                    onChange={(e) => setNewReminderTime(e.target.value)}
                  />
                </div>
                <div className="mt-4">
                  <Button onClick={handleAddReminder}>Add Task</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        <CardDescription>
          Manage your gardening tasks and set reminders
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="calendar">
          <TabsList className="mb-4">
            <TabsTrigger value="calendar">
              <CalendarIcon className="mr-2 h-4 w-4" />
              Calendar
            </TabsTrigger>
            <TabsTrigger value="list">
              <Bell className="mr-2 h-4 w-4" />
              Reminders
            </TabsTrigger>
          </TabsList>
          <TabsContent value="calendar" className="space-y-4">
            <div className="flex justify-center">
              <Calendar
                mode="single"
                selected={date}
                onSelect={(date) => date && setDate(date)}
                modifiers={{
                  booked: (date) => dateHasReminder(date),
                }}
                modifiersClassNames={{
                  booked: "bg-primary text-primary-foreground font-bold",
                }}
                className="rounded-md border p-3 pointer-events-auto"
              />
            </div>
          </TabsContent>
          <TabsContent value="list">
            <div className="space-y-4">
              <h3 className="font-medium">
                {format(date, "MMMM d, yyyy")} - Tasks
              </h3>
              {remindersForSelectedDate.length === 0 ? (
                <p className="text-muted-foreground text-center py-6">
                  No tasks for this day. Add a new task to get started.
                </p>
              ) : (
                <ul className="space-y-2">
                  {remindersForSelectedDate.map((reminder) => (
                    <li
                      key={reminder.id}
                      className={`flex items-center justify-between p-3 rounded-md border ${
                        reminder.isCompleted ? "bg-muted line-through" : ""
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={reminder.isCompleted}
                          onChange={() => handleToggleComplete(reminder.id)}
                          className="h-4 w-4"
                        />
                        <span>{reminder.title}</span>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="h-3 w-3 mr-1" />
                        {reminder.time}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default TodoCalendar;
