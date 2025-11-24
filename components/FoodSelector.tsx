import React, { useState } from 'react';
import { FOOD_CATEGORIES, FOOD_DATABASE } from '../constants';
import { FoodItem } from '../types';
import { Check, ChefHat, Sparkles } from 'lucide-react';

interface FoodSelectorProps {
  onGenerate: (selectedFoods: FoodItem[]) => void;
  bmr: number;
}

const FoodSelector: React.FC<FoodSelectorProps> = ({ onGenerate, bmr }) => {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const toggleFood = (id: string) => {
    const newSelected = new Set(selectedIds);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedIds(newSelected);
  };

  const handleGenerate = () => {
    const selectedFoods = FOOD_DATABASE.filter(f => selectedIds.has(f.id));
    onGenerate(selectedFoods);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-green-100 mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <ChefHat className="text-green-600" />
              Preferências Alimentares
            </h2>
            <p className="text-gray-600 mt-1">
              Sua TMB é <strong className="text-green-700">{bmr.toFixed(0)} kcal</strong>. 
              Selecione o que você gosta ou deixe em branco para uma sugestão livre.
            </p>
          </div>
          <div className="text-sm font-medium text-green-700 bg-green-50 px-4 py-2 rounded-full">
            {selectedIds.size} itens selecionados
          </div>
        </div>

        <div className="space-y-8">
          {FOOD_CATEGORIES.map((category) => (
            <div key={category}>
              <h3 className="text-lg font-semibold text-gray-700 mb-3 border-b border-gray-100 pb-2">{category}</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {FOOD_DATABASE.filter(f => f.category === category).map((food) => {
                  const isSelected = selectedIds.has(food.id);
                  return (
                    <button
                      key={food.id}
                      onClick={() => toggleFood(food.id)}
                      className={`relative group flex items-center justify-center p-3 rounded-xl border text-sm font-medium transition-all duration-200 ${
                        isSelected
                          ? 'bg-green-600 border-green-600 text-white shadow-md transform scale-105'
                          : 'bg-white border-gray-200 text-gray-600 hover:border-green-400 hover:shadow-sm'
                      }`}
                    >
                      {food.name}
                      {isSelected && (
                        <div className="absolute -top-2 -right-2 bg-white text-green-600 rounded-full p-0.5 shadow-sm border border-green-100">
                          <Check className="w-3 h-3" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="sticky bottom-6 flex justify-center">
        <button
          onClick={handleGenerate}
          className={`
            flex items-center gap-2 py-4 px-8 rounded-full shadow-2xl text-lg font-bold transition-all transform
            ${selectedIds.size > 0 
              ? 'bg-gradient-to-r from-green-600 to-teal-600 text-white hover:scale-105 hover:shadow-green-500/30' 
              : 'bg-white text-green-700 border-2 border-green-600 hover:bg-green-50 hover:scale-105'}
          `}
        >
          <Sparkles className="w-5 h-5" />
          {selectedIds.size > 0 
            ? `Gerar Plano Personalizado (${selectedIds.size})`
            : 'Gerar Plano Surpresa (Sem Seleção)'
          }
        </button>
      </div>
    </div>
  );
};

export default FoodSelector;