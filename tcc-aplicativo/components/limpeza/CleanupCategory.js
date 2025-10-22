import React from "react";
import { Checkbox } from "@/components/ui/checkbox";

export default function CleanupCategory({
  title,
  description,
  icon: Icon,
  size,
  selected,
  onToggle,
  color
}) {
  return (
    <div
      onClick={onToggle}
      className={`bg-black/40 backdrop-blur-xl border ${
        selected ? 'border-pink-500/50 bg-pink-500/5' : 'border-white/10'
      } rounded-2xl p-4 cursor-pointer transition-all hover:border-pink-500/30`}
    >
      <div className="flex items-center gap-4">
        <div className={`w-14 h-14 bg-gradient-to-br ${color} rounded-xl flex items-center justify-center flex-shrink-0`}>
          <Icon className="w-7 h-7 text-white" />
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-white mb-1">{title}</h3>
          <p className="text-sm text-gray-400">{description}</p>
          <div className="text-sm font-medium text-pink-400 mt-1">
            {size > 0 ? `${size} MB disponível` : 'Já limpo'}
          </div>
        </div>

        <Checkbox
          checked={selected}
          onCheckedChange={onToggle}
          className="data-[state=checked]:bg-pink-500 data-[state=checked]:border-pink-500"
        />
      </div>
    </div>
  );
}