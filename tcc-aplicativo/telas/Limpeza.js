
import React, { useState } from "react";
import { Sparkles, Trash2, FolderOpen, ImageIcon, FileText } from "lucide-react";
import CleanupCategory from "../Components/limpeza/CleanupCategory.js";

export default function PulseX() { // Renamed from Limpeza to PulseX
  const [cleaning, setCleaning] = useState(null);
  const [cleanupData, setCleanupData] = useState({
    cache: { size: 842, selected: false },
    temporaryFiles: { size: 456, selected: false },
    downloads: { size: 1230, selected: false },
    images: { size: 2150, selected: false },
    videos: { size: 3400, selected: false },
    apkFiles: { size: 680, selected: false }
  });

  const toggleSelection = (category) => {
    setCleanupData(prev => ({
      ...prev,
      [category]: { ...prev[category], selected: !prev[category].selected }
    }));
  };

  const selectAll = () => {
    const allSelected = Object.values(cleanupData).every(item => item.selected);
    const newState = {};
    Object.keys(cleanupData).forEach(key => {
      newState[key] = { ...cleanupData[key], selected: !allSelected };
    });
    setCleanupData(newState);
  };

  const runCleanup = async () => {
    setCleaning(true);
    
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const newData = {};
    Object.keys(cleanupData).forEach(key => {
      if (cleanupData[key].selected) {
        newData[key] = { size: 0, selected: false };
      } else {
        newData[key] = cleanupData[key];
      }
    });
    
    setCleanupData(newData);
    setCleaning(false);
  };

  const totalSize = Object.values(cleanupData).reduce((sum, item) => sum + item.size, 0);
  const selectedSize = Object.values(cleanupData)
    .filter(item => item.selected)
    .reduce((sum, item) => sum + item.size, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
          Limpeza Profunda
        </h1>
        <p className="text-gray-400">Libere espaço removendo arquivos desnecessários</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
          <div className="text-sm text-gray-400 mb-2">Espaço Disponível</div>
          <div className="text-3xl font-bold text-green-400">{totalSize} MB</div>
          <div className="text-xs text-gray-500 mt-1">Pode ser liberado</div>
        </div>
        <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
          <div className="text-sm text-gray-400 mb-2">Selecionado</div>
          <div className="text-3xl font-bold text-pink-400">{selectedSize} MB</div>
          <div className="text-xs text-gray-500 mt-1">Será removido</div>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={selectAll}
          className="flex-1 border border-white/10 hover:bg-white/5 text-white rounded-xl px-4 py-2"
        >
          {Object.values(cleanupData).every(item => item.selected) ? "Desmarcar Tudo" : "Selecionar Tudo"}
        </button>
        <button
          onClick={runCleanup}
          disabled={selectedSize === 0 || cleaning}
          className="flex-1 bg-gradient-to-r from-pink-600 to-purple-600 hover:opacity-90 rounded-xl px-4 py-2 disabled:opacity-50"
        >
          <Trash2 className="w-4 h-4 mr-2" />
          {cleaning ? "Limpando..." : `Limpar ${selectedSize} MB`}
        </button>
      </div>

      <div className="space-y-3">
        <CleanupCategory
          title="Cache de Apps"
          description="Arquivos temporários de aplicativos"
          icon={FolderOpen}
          size={cleanupData.cache.size}
          selected={cleanupData.cache.selected}
          onToggle={() => toggleSelection("cache")}
          color="from-blue-500/80 to-cyan-600/80"
        />

        <CleanupCategory
          title="Arquivos Temporários"
          description="Arquivos de sistema não utilizados"
          icon={FileText}
          size={cleanupData.temporaryFiles.size}
          selected={cleanupData.temporaryFiles.selected}
          onToggle={() => toggleSelection("temporaryFiles")}
          color="from-purple-500/80 to-pink-600/80"
        />

        <CleanupCategory
          title="Downloads Antigos"
          description="Arquivos baixados há mais de 30 dias"
          icon={Sparkles}
          size={cleanupData.downloads.size}
          selected={cleanupData.downloads.selected}
          onToggle={() => toggleSelection("downloads")}
          color="from-green-500/80 to-emerald-600/80"
        />

        <CleanupCategory
          title="Imagens Duplicadas"
          description="Fotos e screenshots duplicados"
          icon={ImageIcon}
          size={cleanupData.images.size}
          selected={cleanupData.images.selected}
          onToggle={() => toggleSelection("images")}
          color="from-pink-500/80 to-rose-600/80"
        />

        <CleanupCategory
          title="Vídeos em Cache"
          description="Vídeos temporários de redes sociais"
          icon={FileText}
          size={cleanupData.videos.size}
          selected={cleanupData.videos.selected}
          onToggle={() => toggleSelection("videos")}
          color="from-orange-500/80 to-red-600/80"
        />

        <CleanupCategory
          title="Arquivos APK"
          description="Instaladores de apps já instalados"
          icon={FolderOpen}
          size={cleanupData.apkFiles.size}
          selected={cleanupData.apkFiles.selected}
          onToggle={() => toggleSelection("apkFiles")}
          color="from-indigo-500/80 to-purple-600/80"
        />
      </div>

      <div className="bg-yellow-600/10 border border-yellow-500/20 rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-yellow-400 mb-2">Atenção</h3>
        <p className="text-sm text-gray-400">
          A limpeza é segura e reversível. Apenas arquivos temporários e duplicados serão removidos. 
          Seus dados importantes permanecerão intactos.
        </p>
      </div>
    </div>
  );
}
