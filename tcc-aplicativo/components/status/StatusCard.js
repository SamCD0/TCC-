import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export default function StatusCard({ title, value, icon: Icon, color, progress }) {
  return (
    <Card className="bg-black/40 backdrop-blur-xl border-white/10 overflow-hidden">
      <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${color} opacity-10 rounded-full blur-2xl`} />
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium text-gray-400 flex items-center gap-2">
          <Icon className="w-4 h-4" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold mb-3 bg-gradient-to-r ${color} bg-clip-text text-transparent">
          {value}
        </div>
        <Progress value={progress} className="h-2" />
      </CardContent>
    </Card>
  );
}