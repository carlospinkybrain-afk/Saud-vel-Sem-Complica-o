import { GoogleGenAI, Type } from "@google/genai";
import { FoodItem, MealPlanResponse } from "../types";

const apiKey = process.env.API_KEY;
if (!apiKey) {
  console.error("ERRO CRÍTICO: API_KEY não encontrada. Verifique as variáveis de ambiente no Vercel.");
}

// Use a dummy key if missing to prevent immediate crash on load, but real calls will fail/log
const ai = new GoogleGenAI({ apiKey: apiKey || 'dummy-key-to-prevent-crash' });

export const generateMealPlan = async (
  bmr: number,
  tdee: number,
  selectedFoods: FoodItem[],
  goal: 'maintenance' | 'weight_loss' | 'muscle_gain' = 'maintenance'
): Promise<MealPlanResponse | null> => {
  
  if (!process.env.API_KEY) {
    console.error("Tentativa de gerar plano sem API KEY configurada.");
    return null;
  }

  const foodNames = selectedFoods.map(f => f.name).join(", ");
  
  let ingredientsInstruction = "";
  if (selectedFoods.length > 0) {
    ingredientsInstruction = `Priorize estes ingredientes: ${foodNames}.`;
  } else {
    ingredientsInstruction = `Escolha ingredientes saudáveis e variados.`;
  }

  let targetCalories = Math.round(tdee);
  let goalText = "Manutenção";
  let specificInstruction = "";

  if (goal === 'weight_loss') {
    targetCalories = Math.round(tdee - 500);
    goalText = "Perda de Peso (-500kcal)";
  } else if (goal === 'muscle_gain') {
    targetCalories = Math.round(tdee + 500);
    goalText = "Ganho de Massa (+500kcal)";
    specificInstruction = "Foco em proteínas.";
  }

  // Optimized prompt for brevity to avoid token limits (truncation)
  const prompt = `
    Atue como nutricionista. TMB: ${Math.round(bmr)}. Meta: ${targetCalories} kcal/dia. Objetivo: ${goalText}.
    
    Gere um plano semanal (7 dias) JSON.
    ${ingredientsInstruction}
    ${specificInstruction}
    
    CRÍTICO PARA GERAR O JSON COMPLETO:
    1. Mantenha as descrições das refeições MUITO BREVES e objetivas (máximo 10-15 palavras).
    2. Liste apenas os 3-5 ingredientes principais por refeição.
    3. O 'weeklySummary' e 'summary' diário devem ser curtos.
    4. Varie o cardápio ao longo da semana.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            weeklySummary: { type: Type.STRING, description: "Resumo curto da semana" },
            days: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  day: { type: Type.STRING, description: "Dia (ex: Segunda)" },
                  summary: { type: Type.STRING, description: "Foco curto do dia" },
                  totalCalories: { type: Type.NUMBER },
                  macros: {
                    type: Type.OBJECT,
                    properties: {
                      protein: { type: Type.STRING },
                      carbs: { type: Type.STRING },
                      fats: { type: Type.STRING }
                    }
                  },
                  meals: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        name: { type: Type.STRING },
                        description: { type: Type.STRING },
                        ingredients: { type: Type.ARRAY, items: { type: Type.STRING } },
                        calories: { type: Type.NUMBER }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    });

    let jsonText = response.text;
    if (!jsonText) return null;
    
    // Clean up markdown code blocks if present (e.g., ```json ... ```)
    jsonText = jsonText.replace(/^```json\s*/, "").replace(/```$/, "").trim();
    
    return JSON.parse(jsonText) as MealPlanResponse;

  } catch (error) {
    console.error("Error generating meal plan:", error);
    throw error;
  }
};