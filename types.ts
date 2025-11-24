export enum Gender {
  MALE = 'Masculino',
  FEMALE = 'Feminino'
}

export enum ActivityLevel {
  SEDENTARY = 'Sedentário (pouco ou nenhum exercício)',
  LIGHTLY_ACTIVE = 'Levemente ativo (exercício leve 1-3 dias/semana)',
  MODERATELY_ACTIVE = 'Moderadamente ativo (exercício moderado 3-5 dias/semana)',
  VERY_ACTIVE = 'Muito ativo (exercício pesado 6-7 dias/semana)',
  EXTRA_ACTIVE = 'Extremamente ativo (exercício muito pesado/trabalho físico)'
}

export interface UserMetrics {
  weight: number; // kg
  height: number; // cm
  age: number; // years
  gender: Gender;
  activityLevel: ActivityLevel;
}

export interface FoodItem {
  id: string;
  name: string;
  category: string;
}

export interface Meal {
  name: string;
  description: string;
  ingredients: string[];
  calories: number;
}

export interface DayPlan {
  day: string; // e.g., "Segunda-feira"
  summary: string;
  totalCalories: number;
  macros: {
    protein: string;
    carbs: string;
    fats: string;
  };
  meals: Meal[];
}

export interface MealPlanResponse {
  weeklySummary: string;
  days: DayPlan[];
}