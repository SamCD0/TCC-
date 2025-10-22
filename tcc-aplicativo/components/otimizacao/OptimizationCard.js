import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Clock, Loader2 } from "lucide-react";

export default function OptimizationCard({
  title,
  description,
  icon: Icon,
  color,
  features,
  estimatedTime,
  isOptimizing,
  onOptimize,
  highlight
}) {
  return (
    <Card className={`bg-black/40 backdrop-blur-xl border-white/10 overflow-hidden ${
      highlight ? 'ring-2 ring-pink-500/50' : ''
    }`}>
      <div className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-br ${color} opacity-10 rounded-full blur-3xl`} />
      
      <CardHeader>
        <div className={`w-16 h-16 bg-gradient-to-br ${color} rounded-2xl flex items-center justify-center mb-4`}>
          <Icon className="w-8 h-8 text-white" />
        </div>
        <CardTitle className="text-xl font-bold text-white">{title}</CardTitle>
        <p className="text-sm text-gray-400">{description}</p>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-2">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-2 text-sm text-gray-300">
              <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
              <span>{feature}</span>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2 text-xs text-gray-500">
          <Clock className="w-3 h-3" />
          <span>Tempo estimado: {estimatedTime}</span>
        </div>

        <Button
          onClick={onOptimize}
          disabled={isOptimizing}
          className={`w-full h-12 bg-gradient-to-r ${color} hover:opacity-90 transition-all`}
        >
          {isOptimizing ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Otimizando...
            </>
          ) : (
            <>Iniciar Otimização</>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}