import React from "react";
import { X, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export default function ProcessItem({ process, onKill }) {
  const isHeavy = process.cpuUsage > 15 || process.ramUsage > 150;

  return (
    <div className={`bg-black/40 backdrop-blur-xl border ${
      isHeavy ? 'border-red-500/30' : 'border-white/10'
    } rounded-2xl p-4 transition-all ${!process.isRunning && 'opacity-50'}`}>
      <div className="flex items-start gap-4">
        <div className="text-4xl">{process.icon}</div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div>
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                {process.name}
                {isHeavy && process.isRunning && (
                  <AlertCircle className="w-4 h-4 text-red-500" />
                )}
              </h3>
              <p className="text-sm text-gray-400">{process.category}</p>
            </div>
            
            {process.isRunning && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onKill(process.id)}
                className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
              >
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>

          {process.isRunning && (
            <>
              <div className="grid grid-cols-2 gap-4 mb-2">
                <div>
                  <div className="flex justify-between text-xs text-gray-400 mb-1">
                    <span>CPU</span>
                    <span className={isHeavy && process.cpuUsage > 15 ? 'text-red-400' : ''}>
                      {process.cpuUsage.toFixed(1)}%
                    </span>
                  </div>
                  <Progress value={process.cpuUsage} className="h-1" />
                </div>
                <div>
                  <div className="flex justify-between text-xs text-gray-400 mb-1">
                    <span>RAM</span>
                    <span className={isHeavy && process.ramUsage > 150 ? 'text-red-400' : ''}>
                      {process.ramUsage.toFixed(0)} MB
                    </span>
                  </div>
                  <Progress value={(process.ramUsage / 300) * 100} className="h-1" />
                </div>
              </div>

              {isHeavy && (
                <div className="text-xs text-red-400 bg-red-500/10 px-2 py-1 rounded">
                  Este app está consumindo muitos recursos
                </div>
              )}
            </>
          )}

          {!process.isRunning && (
            <div className="text-sm text-gray-500">Processo encerrado</div>
          )}
        </div>
      </div>
    </div>
  );
}