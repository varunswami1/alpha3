
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";

interface Task {
  id: string;
  title: string;
  completed: boolean;
}

const TodaysTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: "1", title: "Water the vegetable garden", completed: false },
    { id: "2", title: "Prune rose bushes", completed: false },
    { id: "3", title: "Check soil moisture for houseplants", completed: true },
    { id: "4", title: "Harvest ripe tomatoes", completed: false },
  ]);
  const [newTask, setNewTask] = useState("");
  const { toast } = useToast();

  const handleAddTask = () => {
    if (newTask.trim() === "") return;
    
    const task: Task = {
      id: Date.now().toString(),
      title: newTask,
      completed: false,
    };
    
    setTasks([...tasks, task]);
    setNewTask("");
    
    toast({
      title: "Task added",
      description: "New task has been added to today's list",
    });
  };

  const handleToggleTask = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
    
    toast({
      title: "Task removed",
      description: "Task has been removed from your list",
    });
  };

  const completedCount = tasks.filter((task) => task.completed).length;
  const totalCount = tasks.length;
  const percentComplete = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <Card className="h-full shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="flex justify-between items-center">
          <span>Today's Tasks</span>
          <span className="text-sm font-normal text-muted-foreground">
            {completedCount}/{totalCount} ({percentComplete}%)
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2 mb-4">
          <Input
            placeholder="Add a new task..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAddTask()}
          />
          <Button size="icon" onClick={handleAddTask}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="h-[280px] overflow-hidden">
          <ScrollArea className="h-full pr-4">
            <div className="space-y-3">
              {tasks.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">
                  No tasks for today. Add a new task to get started.
                </p>
              ) : (
                tasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex items-center justify-between p-2 rounded-md hover:bg-muted group"
                  >
                    <div className="flex items-center gap-2">
                      <Checkbox
                        checked={task.completed}
                        onCheckedChange={() => handleToggleTask(task.id)}
                        id={`task-${task.id}`}
                      />
                      <label
                        htmlFor={`task-${task.id}`}
                        className={`text-sm ${
                          task.completed ? "line-through text-muted-foreground" : ""
                        }`}
                      >
                        {task.title}
                      </label>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 opacity-0 group-hover:opacity-100"
                      onClick={() => handleDeleteTask(task.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))
              )}
            </div>
          </ScrollArea>
        </div>
      </CardContent>
    </Card>
  );
};

export default TodaysTasks;
