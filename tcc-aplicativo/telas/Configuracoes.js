
import React, { useState, useEffect } from "react";
import { Bell, Shield, Palette, Zap } from "lucide-react";

export default function Configuracoes() {
  const [user, setUser] = useState(null);
  const [settings, setSettings] = useState({
    notifications: true,
    autoOptimize: false,
    darkMode: true,
    gameModeAuto: false,
    batteryOptimization: true
  });

  useEffect(() => {
    // sem backend: permanece no estado padrão
  }, []);

  const handleSettingChange = (key, value) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
          Configurações
        </h1>
        <p className="text-gray-400">Personalize o PulseX de acordo com suas preferências</p>
      </div>

      <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl">
        <div className="p-6">
          <div className="text-white flex items-center gap-2">
            <Bell className="w-5 h-5 text-pink-500" />
            Notificações
          </div>
        </div>
        <div className="space-y-4 p-6 pt-0">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <label htmlFor="notifications" className="text-white">Notificações do Sistema</label>
              <p className="text-sm text-gray-400">Receba alertas sobre otimizações e limpezas</p>
            </div>
            <input
              id="notifications"
              type="checkbox"
              checked={settings.notifications}
              onChange={(e) => handleSettingChange("notifications", e.target.checked)}
              className="w-11 h-6 rounded-full appearance-none bg-white/10 checked:bg-pink-500 relative cursor-pointer"
            />
          </div>
        </div>
      </div>

      <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl">
        <div className="p-6">
          <div className="text-white flex items-center gap-2">
            <Zap className="w-5 h-5 text-purple-500" />
            Otimização Automática
          </div>
        </div>
        <div className="space-y-4 p-6 pt-0">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <label htmlFor="autoOptimize" className="text-white">Otimização Automática</label>
              <p className="text-sm text-gray-400">Execute otimização básica diariamente</p>
            </div>
            <input
              id="autoOptimize"
              type="checkbox"
              checked={settings.autoOptimize}
              onChange={(e) => handleSettingChange("autoOptimize", e.target.checked)}
              className="w-11 h-6 rounded-full appearance-none bg-white/10 checked:bg-purple-500 relative cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex-1">
              <label htmlFor="batteryOptimization" className="text-white">Otimização de Bateria</label>
              <p className="text-sm text-gray-400">Ative economia de energia automática</p>
            </div>
            <input
              id="batteryOptimization"
              type="checkbox"
              checked={settings.batteryOptimization}
              onChange={(e) => handleSettingChange("batteryOptimization", e.target.checked)}
              className="w-11 h-6 rounded-full appearance-none bg-white/10 checked:bg-purple-500 relative cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex-1">
              <label htmlFor="gameModeAuto" className="text-white">Game Mode Automático</label>
              <p className="text-sm text-gray-400">Ative automaticamente ao detectar jogos</p>
            </div>
            <input
              id="gameModeAuto"
              type="checkbox"
              checked={settings.gameModeAuto}
              onChange={(e) => handleSettingChange("gameModeAuto", e.target.checked)}
              className="w-11 h-6 rounded-full appearance-none bg-white/10 checked:bg-purple-500 relative cursor-pointer"
            />
          </div>
        </div>
      </div>

      <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl">
        <div className="p-6">
          <div className="text-white flex items-center gap-2">
            <Palette className="w-5 h-5 text-blue-500" />
            Aparência
          </div>
        </div>
        <div className="space-y-4 p-6 pt-0">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <label htmlFor="darkMode" className="text-white">Modo Escuro</label>
              <p className="text-sm text-gray-400">Interface otimizada para ambientes com pouca luz</p>
            </div>
            <input
              id="darkMode"
              type="checkbox"
              checked={settings.darkMode}
              onChange={(e) => handleSettingChange("darkMode", e.target.checked)}
              className="w-11 h-6 rounded-full appearance-none bg-white/10 checked:bg-blue-500 relative cursor-pointer"
            />
          </div>
        </div>
      </div>

      <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl">
        <div className="p-6">
          <div className="text-white flex items-center gap-2">
            <Shield className="w-5 h-5 text-green-500" />
            Sobre
          </div>
        </div>
        <div className="space-y-3 text-sm text-gray-400 p-6 pt-0">
          <div className="flex justify-between">
            <span>App</span>
            <span className="text-white">PulseX</span>
          </div>
          <div className="flex justify-between">
            <span>Versão</span>
            <span className="text-white">1.0.0 Pro</span>
          </div>
          <div className="flex justify-between">
            <span>Usuário</span>
            <span className="text-white">{user?.email}</span>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-pink-500/10 to-purple-500/10 border border-pink-500/20 rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-white mb-2">Permissões do Sistema</h3>
        <p className="text-sm text-gray-400 mb-4">
          Para funcionamento completo, o PulseX precisa de permissões especiais do Android.
        </p>
        <button className="bg-pink-600 hover:bg-pink-700 rounded-xl px-4 py-2 text-white">
          Conceder Permissões
        </button>
      </div>
    </div>
  );
}
