import React, { useState } from 'react';
import { MealPlanResponse } from '../types';
import { Utensils, RefreshCw, Flame, CalendarDays, ChevronRight, Dumbbell, ChevronLeft, Share2, Shuffle } from 'lucide-react';

interface MealPlanDisplayProps {
  plan: MealPlanResponse;
  onReset: () => void;
  onWeightLoss: () => void;
  onMuscleGain: () => void;
  onRegenerate: () => void;
}

const MealPlanDisplay: React.FC<MealPlanDisplayProps> = ({ plan, onReset, onWeightLoss, onMuscleGain, onRegenerate }) => {
  const [activeDayIndex, setActiveDayIndex] = useState(0);

  // Safety check if days array is empty or undefined
  if (!plan || !plan.days || plan.days.length === 0) {
    return (
       <div className="text-center p-8 text-red-500">
         Erro ao carregar o plano. Tente gerar novamente.
         <button onClick={onReset} className="block mx-auto mt-4 text-blue-500 underline">Voltar</button>
       </div>
    );
  }

  const activeDay = plan.days[activeDayIndex];

  // Helper function to get abbreviated day name for mobile
  const getShortDayName = (dayName: string) => {
    if (!dayName) return 'DIA';
    // Splits "Segunda-feira" to "Segunda" and takes first 3 letters "SEG"
    return dayName.split('-')[0].substring(0, 3).toUpperCase();
  };

  const handleShare = async () => {
    let text = `🥗 *Meu Plano Alimentar - Saudável Sem Complicação*\n\n`;
    text += `📌 *Resumo da Semana:* ${plan.weeklySummary || 'Sem resumo'}\n\n`;

    plan.days.forEach(day => {
      text += `📅 *${day.day || 'Dia'}* (~${day.totalCalories || 0} kcal)\n`;
      text += `   Macros: P:${day.macros?.protein || '?'} | C:${day.macros?.carbs || '?'} | G:${day.macros?.fats || '?'}\n`;
      if (day.meals) {
        day.meals.forEach(meal => {
          text += `   • ${meal.name || 'Refeição'}: ${meal.description || ''}\n`;
        });
      }
      text += `\n`;
    });

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Meu Plano Alimentar - Saudável Sem Complicação',
          text: text,
        });
      } catch (err) {
        console.log('User cancelled share', err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(text);
        alert('Plano copiado para a área de transferência!');
      } catch (err) {
        alert('Não foi possível compartilhar o plano neste dispositivo.');
      }
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto animate-fade-in-up pb-12">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-green-100">
        
        {/* Weekly Header */}
        <div className="bg-green-600 p-6 md:p-8 text-white relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-start gap-6">
            <div className="flex-1">
              <h2 className="text-3xl font-bold mb-2 flex items-center gap-2">
                <CalendarDays className="w-8 h-8" />
                Seu Plano Semanal
              </h2>
              <p className="opacity-90 text-lg">{plan.weeklySummary}</p>
            </div>
            
            <button
              onClick={handleShare}
              className="flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/40 text-white px-4 py-2 rounded-lg font-semibold transition-all hover:scale-105 active:scale-95 shrink-0"
            >
              <Share2 className="w-5 h-5" />
              Compartilhar
            </button>
          </div>
          {/* Decorative background element */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full transform translate-x-1/3 -translate-y-1/3 blur-3xl"></div>
        </div>

        {/* Interactive Tabs */}
        <div className="bg-gray-50 border-b border-gray-100 p-4">
          <div className="flex items-center justify-start md:justify-center overflow-x-auto gap-2 pb-2 scrollbar-hide snap-x">
            {plan.days.map((day, index) => {
              const isActive = activeDayIndex === index;
              return (
                <button
                  key={index}
                  onClick={() => setActiveDayIndex(index)}
                  className={`
                    relative flex-shrink-0 px-4 py-2.5 rounded-full font-bold text-sm transition-all duration-300 ease-out snap-center
                    ${isActive 
                      ? 'bg-green-600 text-white shadow-lg scale-105 ring-2 ring-green-200 ring-offset-2' 
                      : 'bg-white text-gray-500 hover:text-green-600 hover:bg-green-50 border border-gray-200 hover:border-green-200'}
                  `}
                >
                  <span className="md:hidden">{getShortDayName(day.day)}</span>
                  <span className="hidden md:inline">{day.day || 'Dia ' + (index + 1)}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Day Content with Animation Key to trigger re-render animation */}
        {activeDay && (
        <div key={activeDayIndex} className="p-6 md:p-8 animate-fade-in">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 border-b border-gray-100 pb-4 gap-4">
            <div>
              <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                {activeDay.day || `Dia ${activeDayIndex + 1}`}
                <span className="text-xs font-normal text-white bg-green-500 px-2 py-0.5 rounded-full md:hidden">
                   {activeDay.totalCalories} kcal
                </span>
              </h3>
              <p className="text-gray-500 mt-1">{activeDay.summary}</p>
            </div>
            
            {/* Daily Macros */}
            <div className="flex w-full md:w-auto gap-2 md:gap-4 overflow-x-auto pb-1 md:pb-0">
              <div className="flex-1 md:flex-none text-center px-4 py-2 bg-yellow-50 rounded-xl border border-yellow-100 min-w-[80px]">
                <div className="text-[10px] text-yellow-700 font-bold uppercase tracking-wider">Calorias</div>
                <div className="font-bold text-gray-800 text-lg">{activeDay.totalCalories}</div>
              </div>
              <div className="flex-1 md:flex-none text-center px-4 py-2 bg-orange-50 rounded-xl border border-orange-100 min-w-[80px]">
                <div className="text-[10px] text-orange-700 font-bold uppercase tracking-wider">Prot</div>
                <div className="font-bold text-gray-800 text-lg">{activeDay.macros?.protein || '-'}</div>
              </div>
              <div className="flex-1 md:flex-none text-center px-4 py-2 bg-amber-50 rounded-xl border border-amber-100 min-w-[80px]">
                <div className="text-[10px] text-amber-700 font-bold uppercase tracking-wider">Carb</div>
                <div className="font-bold text-gray-800 text-lg">{activeDay.macros?.carbs || '-'}</div>
              </div>
            </div>
          </div>

          {/* Meals List */}
          <div className="space-y-6">
            {activeDay.meals && activeDay.meals.map((meal, index) => (
              <div key={index} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 relative overflow-hidden group hover:-translate-y-1">
                <div className="absolute top-0 left-0 w-1 h-full bg-green-500/50 group-hover:bg-green-500 group-hover:w-1.5 transition-all"></div>
                <div className="pl-4">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 gap-2">
                    <h4 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                      <div className="p-1.5 bg-green-100 rounded-lg text-green-600">
                        <Utensils className="w-4 h-4" />
                      </div>
                      {meal.name}
                    </h4>
                    <span className="text-xs font-bold text-gray-500 bg-gray-100 px-3 py-1 rounded-full border border-gray-200">
                      {meal.calories} kcal
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4 leading-relaxed">{meal.description}</p>
                  
                  <div className="flex flex-wrap gap-2">
                    {meal.ingredients && meal.ingredients.map((ing, i) => (
                      <span key={i} className="text-xs font-medium bg-green-50 text-green-700 px-3 py-1.5 rounded-lg border border-green-100">
                        {ing}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        )}

        {/* Footer Navigation Hints */}
        <div className="px-6 py-6 bg-gray-50 border-t border-gray-100 flex flex-col xl:flex-row justify-between items-center gap-6">
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full xl:w-auto order-3 xl:order-1 justify-start">
               <button
                  onClick={onReset}
                  className="flex items-center gap-2 text-gray-500 hover:text-red-500 font-medium transition-colors text-sm px-4 py-2 rounded-lg hover:bg-red-50 w-full sm:w-auto justify-center"
              >
                  <RefreshCw className="w-4 h-4" />
                  Novo Plano
              </button>
              <button
                  onClick={onRegenerate}
                  className="flex items-center gap-2 text-green-700 bg-green-100 hover:bg-green-200 font-semibold transition-colors text-sm px-4 py-2 rounded-lg w-full sm:w-auto justify-center"
              >
                  <Shuffle className="w-4 h-4" />
                  Variar Cardápio
              </button>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full xl:w-auto order-1 xl:order-2 justify-center">
              <button 
                  onClick={onWeightLoss}
                  className="flex items-center gap-2 px-6 py-3 bg-white border-2 border-orange-100 text-orange-600 rounded-xl font-bold hover:bg-orange-50 hover:border-orange-300 hover:scale-105 transition-all text-sm justify-center flex-1 shadow-sm"
              >
                  <Flame className="w-5 h-5" />
                  Perda de Peso (-500)
              </button>

              <button 
                  onClick={onMuscleGain}
                  className="flex items-center gap-2 px-6 py-3 bg-white border-2 border-blue-100 text-blue-600 rounded-xl font-bold hover:bg-blue-50 hover:border-blue-300 hover:scale-105 transition-all text-sm justify-center flex-1 shadow-sm"
              >
                  <Dumbbell className="w-5 h-5" />
                  Ganho de Massa (+500)
              </button>
            </div>

            <div className="order-2 xl:order-3 flex items-center gap-3 w-full xl:w-auto justify-between xl:justify-end">
              <button
                  onClick={() => setActiveDayIndex(Math.max(0, activeDayIndex - 1))}
                  disabled={activeDayIndex === 0}
                  className={`flex items-center gap-1 font-bold transition-colors text-sm px-4 py-2 rounded-lg
                    ${activeDayIndex === 0 ? 'text-gray-300 cursor-not-allowed' : 'text-green-600 hover:bg-green-50'}`}
              >
                  <ChevronLeft className="w-4 h-4" /> Anterior
              </button>
              
              <button
                  onClick={() => setActiveDayIndex(Math.min(plan.days.length - 1, activeDayIndex + 1))}
                  disabled={activeDayIndex === plan.days.length - 1}
                  className={`flex items-center gap-1 font-bold transition-colors text-sm px-4 py-2 rounded-lg
                    ${activeDayIndex === plan.days.length - 1 ? 'text-gray-300 cursor-not-allowed' : 'text-green-600 hover:bg-green-50'}`}
              >
                  Próximo <ChevronRight className="w-4 h-4" />
              </button>
            </div>
        </div>
      </div>
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
        .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.4s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default MealPlanDisplay;