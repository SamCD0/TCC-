
import React, { useState, useEffect } from "react";
import { Search, X } from "lucide-react";
import ProcessItem from "../Components/processos/ProcessItem.js";

const generateMockProcesses = () => {
  const apps = [
    { name: "Spotify", category: "Música", icon: "🎵", ramUsage: 180, cpuUsage: 15 },
    { name: "WhatsApp", category: "Comunicação", icon: "💬", ramUsage: 120, cpuUsage: 5 },
    { name: "Instagram", category: "Social", icon: "📷", ramUsage: 200, cpuUsage: 20 },
    { name: "Chrome", category: "Navegador", icon: "🌐", ramUsage: 250, cpuUsage: 25 },
    { name: "YouTube", category: "Vídeo", icon: "▶️", ramUsage: 190, cpuUsage: 18 },
    { name: "Gmail", category: "Email", icon: "📧", ramUsage: 95, cpuUsage: 3 },
    { name: "Maps", category: "Navegação", icon: "🗺️", ramUsage: 140, cpuUsage: 12 },
    { name: "TikTok", category: "Social", icon: "🎬", ramUsage: 170, cpuUsage: 22 },
    { name: "Facebook", category: "Social", icon: "👥", ramUsage: 210, cpuUsage: 16 },
    { name: "Twitter", category: "Social", icon: "🐦", ramUsage: 130, cpuUsage: 8 },
    { name: "Netflix", category: "Streaming", icon: "🎬", ramUsage: 160, cpuUsage: 14 },
    { name: "Telegram", category: "Comunicação", icon: "✈️", ramUsage: 110, cpuUsage: 4 }
  ];

  return apps.map((app, index) => ({
    ...app,
    id: index + 1,
    ramUsage: app.ramUsage + Math.random() * 50 - 25,
    cpuUsage: app.cpuUsage + Math.random() * 10 - 5,
    isRunning: true
  }));
};

export default function Processos() {
  const [processes, setProcesses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("cpu");

  useEffect(() => {
    setProcesses(generateMockProcesses());
  }, []);

  const handleKillProcess = (processId) => {
    setProcesses(prev =>
      prev.map(p =>
        p.id === processId ? { ...p, isRunning: false, cpuUsage: 0, ramUsage: 0 } : p
      )
    );
  };

  const handleKillAll = () => {
    setProcesses(prev =>
      prev.map(p => ({ ...p, isRunning: false, cpuUsage: 0, ramUsage: 0 }))
    );
  };

  const filteredProcesses = processes
    .filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === "cpu") return b.cpuUsage - a.cpuUsage;
      if (sortBy === "ram") return b.ramUsage - a.ramUsage;
      return a.name.localeCompare(b.name);
    });

  const runningProcesses = processes.filter(p => p.isRunning);
  const totalRamUsage = runningProcesses.reduce((sum, p) => sum + p.ramUsage, 0);
  const totalCpuUsage = runningProcesses.length > 0 ? runningProcesses.reduce((sum, p) => sum + p.cpuUsage, 0) / runningProcesses.length : 0;


  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Gerenciador de Processos
        </h1>
        <p className="text-gray-400">Monitore e controle aplicativos em execução</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
          <div className="text-sm text-gray-400 mb-2">Apps Ativos</div>
          <div className="text-3xl font-bold text-blue-400">{runningProcesses.length}</div>
        </div>
        <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
          <div className="text-sm text-gray-400 mb-2">RAM Total</div>
          <div className="text-3xl font-bold text-purple-400">{totalRamUsage.toFixed(0)} MB</div>
        </div>
        <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
          <div className="text-sm text-gray-400 mb-2">CPU Média</div>
          <div className="text-3xl font-bold text-pink-400">{totalCpuUsage.toFixed(1)}%</div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar aplicativo..."
            className="pl-10 bg-black/40 border-white/10 text-white h-12 rounded-xl focus:ring-pink-500"
          />
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={() => setSortBy("cpu")}
            className={`text-white bg-white/5 hover:bg-white/10 px-4 py-2 rounded-xl ${sortBy === "cpu" ? "ring-1 ring-white/20" : ""}`}
          >
            CPU
          </button>
          <button
            onClick={() => setSortBy("ram")}
            className={`text-white bg-white/5 hover:bg-white/10 px-4 py-2 rounded-xl ${sortBy === "ram" ? "ring-1 ring-white/20" : ""}`}
          >
            RAM
          </button>
          <button
            onClick={() => setSortBy("name")}
            className={`text-white bg-white/5 hover:bg-white/10 px-4 py-2 rounded-xl ${sortBy === "name" ? "ring-1 ring-white/20" : ""}`}
          >
            Nome
          </button>
        </div>

        <button
          onClick={handleKillAll}
          className="bg-red-600/80 hover:bg-red-600 text-white rounded-xl px-4"
        >
          <X className="w-4 h-4 mr-2" />
          Fechar Todos
        </button>
      </div>

      <div className="space-y-3">
        {filteredProcesses.map((process) => (
          <ProcessItem
            key={process.id}
            process={process}
            onKill={handleKillProcess}
          />
        ))}
      </div>
    </div>
  );
}
