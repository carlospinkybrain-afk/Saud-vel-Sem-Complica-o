import React, { useState, useEffect } from 'react';
import { ActivityLevel, Gender, UserMetrics } from '../types';
import { Calculator as CalcIcon, ArrowRight, CheckCircle2 } from 'lucide-react';

interface CalculatorProps {
  onCalculate: (metrics: UserMetrics) => void;
}

const STORAGE_KEY = 'nutriplan_user_metrics';

const Calculator: React.FC<CalculatorProps> = ({ onCalculate }) => {
  const [weight, setWeight] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [age, setAge] = useState<string>('');
  const [gender, setGender] = useState<Gender>(Gender.MALE);
  const [activityLevel, setActivityLevel] = useState<ActivityLevel>(ActivityLevel.SEDENTARY);

  // Load saved metrics on mount
  useEffect(() => {
    const savedMetrics = localStorage.getItem(STORAGE_KEY);
    if (savedMetrics) {
      try {
        const parsed = JSON.parse(savedMetrics);
        if (parsed.weight) setWeight(parsed.weight.toString());
        if (parsed.height) setHeight(parsed.height.toString());
        if (parsed.age) setAge(parsed.age.toString());
        if (parsed.gender) setGender(parsed.gender);
        if (parsed.activityLevel) setActivityLevel(parsed.activityLevel);
      } catch (error) {
        console.error("Erro ao carregar métricas salvas:", error);
      }
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!weight || !height || !age) return;

    const metrics = {
      weight: parseFloat(weight),
      height: parseFloat(height),
      age: parseFloat(age),
      gender,
      activityLevel
    };

    // Save to localStorage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(metrics));

    onCalculate(metrics);
  };

  const activityOptions = Object.values(ActivityLevel);

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8 border border-green-100">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-green-100 p-3 rounded-full">
          <CalcIcon className="w-6 h-6 text-green-700" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Calculadora TMB</h2>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Gender */}
          <div className="col-span-1 md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Sexo Biológico</label>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setGender(Gender.MALE)}
                className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all ${
                  gender === Gender.MALE 
                    ? 'border-green-500 bg-green-50 text-green-700 font-semibold' 
                    : 'border-gray-200 text-gray-600 hover:border-green-200'
                }`}
              >
                Masculino
              </button>
              <button
                type="button"
                onClick={() => setGender(Gender.FEMALE)}
                className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all ${
                  gender === Gender.FEMALE 
                    ? 'border-green-500 bg-green-50 text-green-700 font-semibold' 
                    : 'border-gray-200 text-gray-600 hover:border-green-200'
                }`}
              >
                Feminino
              </button>
            </div>
          </div>

          {/* Weight */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Peso (kg)</label>
            <input
              type="number"
              min="30"
              max="300"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="Ex: 70"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-colors"
              required
            />
          </div>

          {/* Height */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Altura (cm)</label>
            <input
              type="number"
              min="100"
              max="250"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder="Ex: 175"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-colors"
              required
            />
          </div>

          {/* Age */}
          <div className="col-span-1 md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Idade (anos)</label>
            <input
              type="number"
              min="10"
              max="120"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="Ex: 30"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-colors"
              required
            />
          </div>

          {/* Activity Level */}
          <div className="col-span-1 md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-3">Nível de Atividade Física</label>
            <div className="space-y-3">
              {activityOptions.map((level, index) => {
                const isSelected = activityLevel === level;
                // Split label from description for styling
                const parts = level.split('(');
                const title = parts[0].trim();
                const desc = parts.length > 1 ? '(' + parts[1] : '';

                return (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setActivityLevel(level)}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-center justify-between group ${
                      isSelected
                        ? 'border-green-500 bg-green-50 shadow-sm'
                        : 'border-gray-100 hover:border-green-200 hover:bg-gray-50'
                    }`}
                  >
                    <div>
                      <span className={`block font-semibold ${isSelected ? 'text-green-800' : 'text-gray-700'}`}>
                        {title}
                      </span>
                      {desc && (
                        <span className={`text-sm ${isSelected ? 'text-green-600' : 'text-gray-500'}`}>
                          {desc}
                        </span>
                      )}
                    </div>
                    
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ml-4 ${
                      isSelected ? 'border-green-500 bg-green-500' : 'border-gray-300'
                    }`}>
                      {isSelected && <CheckCircle2 className="w-4 h-4 text-white" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={!weight || !height || !age}
          className={`w-full font-bold py-4 px-6 rounded-lg shadow-lg transform transition-all flex items-center justify-center gap-2 ${
            !weight || !height || !age
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-green-600 hover:bg-green-700 text-white hover:-translate-y-1'
          }`}
        >
          Calcular TMB e Continuar <ArrowRight className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
};

export default Calculator;