import React, { useState } from 'react';
import Calculator from './components/Calculator';
import FoodSelector from './components/FoodSelector';
import MealPlanDisplay from './components/MealPlanDisplay';
import { generateMealPlan } from './services/geminiService';
import { ACTIVITY_MULTIPLIERS } from './constants';
import { ActivityLevel, Gender, UserMetrics, FoodItem, MealPlanResponse } from './types';
import { Loader2 } from 'lucide-react';

enum Step {
  CALCULATOR = 0,
  FOOD_SELECTION = 1,
  LOADING = 2,
  RESULT = 3,
  ERROR = 4
}

type GoalType = 'maintenance' | 'weight_loss' | 'muscle_gain';

const App: React.FC = () => {
  const [step, setStep] = useState<Step>(Step.CALCULATOR);
  const [bmr, setBmr] = useState<number>(0);
  const [tdee, setTdee] = useState<number>(0);
  const [mealPlan, setMealPlan] = useState<MealPlanResponse | null>(null);
  const [savedFoods, setSavedFoods] = useState<FoodItem[]>([]);
  const [currentGoal, setCurrentGoal] = useState<GoalType>('maintenance');

  // Calculate Harris-Benedict BMR
  const handleCalculate = (metrics: UserMetrics) => {
    let calculatedBmr = 0;
    
    // Harris-Benedict Formulas
    if (metrics.gender === Gender.MALE) {
      calculatedBmr = 88.362 + (13.397 * metrics.weight) + (4.799 * metrics.height) - (5.677 * metrics.age);
    } else {
      calculatedBmr = 447.593 + (9.247 * metrics.weight) + (3.098 * metrics.height) - (4.330 * metrics.age);
    }

    // Determine Activity Multiplier Index
    const activityValues = Object.values(ActivityLevel);
    const activityIndex = activityValues.indexOf(metrics.activityLevel);
    // @ts-ignore - Index is valid key
    const multiplier = ACTIVITY_MULTIPLIERS[activityIndex] || 1.2;
    
    setBmr(calculatedBmr);
    setTdee(calculatedBmr * multiplier);
    setStep(Step.FOOD_SELECTION);
  };

  const handleGeneratePlan = async (selectedFoods: FoodItem[]) => {
    setSavedFoods(selectedFoods);
    setCurrentGoal('maintenance');
    setStep(Step.LOADING);
    try {
      const plan = await generateMealPlan(bmr, tdee, selectedFoods, 'maintenance');
      if (plan) {
        setMealPlan(plan);
        setStep(Step.RESULT);
      } else {
        setStep(Step.ERROR);
      }
    } catch (error) {
      console.error(error);
      setStep(Step.ERROR);
    }
  };

  const handleWeightLossPlan = async () => {
    setCurrentGoal('weight_loss');
    setStep(Step.LOADING);
    try {
      // Use saved foods but change goal to weight loss
      const plan = await generateMealPlan(bmr, tdee, savedFoods, 'weight_loss');
      if (plan) {
        setMealPlan(plan);
        setStep(Step.RESULT);
      } else {
        setStep(Step.ERROR);
      }
    } catch (error) {
      console.error(error);
      setStep(Step.ERROR);
    }
  };

  const handleMuscleGainPlan = async () => {
    setCurrentGoal('muscle_gain');
    setStep(Step.LOADING);
    try {
      // Use saved foods but change goal to muscle gain
      const plan = await generateMealPlan(bmr, tdee, savedFoods, 'muscle_gain');
      if (plan) {
        setMealPlan(plan);
        setStep(Step.RESULT);
      } else {
        setStep(Step.ERROR);
      }
    } catch (error) {
      console.error(error);
      setStep(Step.ERROR);
    }
  };

  const handleRegeneratePlan = async () => {
    setStep(Step.LOADING);
    try {
      // Regenerate using the current goal and saved foods
      const plan = await generateMealPlan(bmr, tdee, savedFoods, currentGoal);
      if (plan) {
        setMealPlan(plan);
        setStep(Step.RESULT);
      } else {
        setStep(Step.ERROR);
      }
    } catch (error) {
      console.error(error);
      setStep(Step.ERROR);
    }
  };

  const resetApp = () => {
    setStep(Step.CALCULATOR);
    setBmr(0);
    setMealPlan(null);
    setSavedFoods([]);
    setCurrentGoal('maintenance');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 py-12 px-4 sm:px-6 lg:px-8">
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-green-800 mb-4 tracking-tight">
          Saudável Sem <span className="text-green-600">Complicação</span>
        </h1>
        <p className="text-lg text-green-700 max-w-2xl mx-auto opacity-80">
          Calcule sua Taxa Metabólica Basal e receba um plano alimentar personalizado instantaneamente.
        </p>
      </header>

      <main className="w-full">
        {step === Step.CALCULATOR && (
          <Calculator onCalculate={handleCalculate} />
        )}

        {step === Step.FOOD_SELECTION && (
          <FoodSelector onGenerate={handleGeneratePlan} bmr={bmr} />
        )}

        {step === Step.LOADING && (
          <div className="flex flex-col items-center justify-center h-64 space-y-4">
            <Loader2 className="w-16 h-16 text-green-600 animate-spin" />
            <p className="text-xl font-medium text-gray-600">Nossa IA está criando seu cardápio ideal...</p>
            <p className="text-sm text-gray-500">Analisando calorias, macros e suas preferências.</p>
          </div>
        )}

        {step === Step.RESULT && mealPlan && (
          <MealPlanDisplay 
            plan={mealPlan} 
            onReset={resetApp} 
            onWeightLoss={handleWeightLossPlan}
            onMuscleGain={handleMuscleGainPlan}
            onRegenerate={handleRegeneratePlan}
          />
        )}

        {step === Step.ERROR && (
          <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-lg text-center border border-red-100">
            <div className="text-red-500 text-5xl mb-4">⚠️</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Ops! Algo deu errado.</h3>
            <p className="text-gray-600 mb-6">Não foi possível gerar o plano no momento. Verifique sua conexão ou tente novamente.</p>
            <button 
              onClick={() => setStep(Step.FOOD_SELECTION)}
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              Tentar Novamente
            </button>
          </div>
        )}
      </main>

      <footer className="mt-16 text-center text-gray-500 text-sm">
        <p>© {new Date().getFullYear()} Saudável Sem Complicação. Baseado na fórmula de Harris-Benedict.</p>
      </footer>
    </div>
  );
};

export default App;