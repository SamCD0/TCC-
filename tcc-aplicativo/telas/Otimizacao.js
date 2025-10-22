
import React, { useState } from "react";
import { Zap, Gamepad2, Rocket, CheckCircle } from "lucide-react";
import OptimizationCard from "../Components/otimizacao/OptimizationCard.js";

export default function Otimizacao() {
  const [optimizing, setOptimizing] = useState(null);
  const [lastOptimization, setLastOptimization] = useState(null);

  const runOptimization = async (type) => {
    setOptimizing(type);
    
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setOptimizing(null);
    setLastOptimization({
      type,
      timestamp: new Date(),
      improvements: {
        ram: Math.floor(Math.random() * 500 + 200),
        cpu: Math.floor(Math.random() * 30 + 10),
        battery: Math.floor(Math.random() * 15 + 5)
      }
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
          Otimização do Sistema
        </h1>
        <p className="text-gray-400">Escolha o nível de otimização ideal para suas necessidades</p>
      </div>

      {lastOptimization && (
        <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-2xl p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
              <CheckCircle className="w-6 h-6 text-green-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-white mb-2">Otimização Concluída!</h3>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <div className="text-gray-400">RAM Liberada</div>
                  <div className="text-xl font-bold text-green-400">
                    {lastOptimization.improvements.ram} MB
                  </div>
                </div>
                <div>
                  <div className="text-gray-400">CPU Reduzida</div>
                  <div className="text-xl font-bold text-blue-400">
                    {lastOptimization.improvements.cpu}%
                  </div>
                </div>
                <div>
                  <div className="text-gray-400">Bateria Economizada</div>
                  <div className="text-xl font-bold text-purple-400">
                    ~{lastOptimization.improvements.battery}%
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <OptimizationCard
          title="Otimização Básica"
          description="Limpeza rápida e fechamento de apps em segundo plano"
          icon={Zap}
          color="from-blue-500/80 to-cyan-600/80"
          features={[
            "Fecha apps inativos",
            "Libera memória cache",
            "Otimiza bateria básica",
            "Rápido e seguro"
          ]}
          estimatedTime="30 segundos"
          isOptimizing={optimizing === "basic"}
          onOptimize={() => runOptimization("basic")}
        />

        <OptimizationCard
          title="Game Booster"
          description="Máximo desempenho para jogos e apps pesados"
          icon={Gamepad2}
          color="from-purple-500/80 to-pink-600/80"
          features={[
            "Prioriza recursos para jogos",
            "Desativa notificações",
            "Overclock de GPU",
            "Modo turbo ativado"
          ]}
          estimatedTime="1 minuto"
          isOptimizing={optimizing === "game"}
          onOptimize={() => runOptimization("game")}
          highlight
        />

        <OptimizationCard
          title="Otimização Extrema"
          description="Limpeza profunda e máxima performance"
          icon={Rocket}
          color="from-pink-500/80 to-red-600/80"
          features={[
            "Fecha todos os apps",
            "Limpeza profunda de cache",
            "Desfragmenta memória",
            "Reinicia serviços críticos"
          ]}
          estimatedTime="2 minutos"
          isOptimizing={optimizing === "extreme"}
          onOptimize={() => runOptimization("extreme")}
        />
      </div>

      <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Dicas de Otimização</h3>
        <div className="space-y-3 text-sm text-gray-400">
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-pink-500 rounded-full mt-2 flex-shrink-0" />
            <p>Execute a Otimização Básica diariamente para manter o dispositivo ágil</p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0" />
            <p>Use o Game Booster antes de iniciar jogos para melhor experiência</p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
            <p>A Otimização Extrema é recomendada semanalmente ou quando o sistema estiver lento</p>
          </div>
        </div>
      </div>
    </div>
  );
}
