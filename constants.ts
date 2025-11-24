import { FoodItem } from './types';

export const FOOD_CATEGORIES = [
  "Proteínas",
  "Carboidratos",
  "Verduras e Legumes",
  "Gorduras Saudáveis",
  "Bebidas",
  "Doces e Snacks",
  "Outros"
];

export const FOOD_DATABASE: FoodItem[] = [
  // Proteínas
  { id: 'p1', name: 'Frango', category: 'Proteínas' },
  { id: 'p2', name: 'Peru', category: 'Proteínas' },
  { id: 'p3', name: 'Carne Bovina', category: 'Proteínas' },
  { id: 'p4', name: 'Carne de Porco', category: 'Proteínas' },
  { id: 'p5', name: 'Salmão', category: 'Proteínas' },
  { id: 'p6', name: 'Atum', category: 'Proteínas' },
  { id: 'p7', name: 'Sardinha', category: 'Proteínas' },
  { id: 'p8', name: 'Camarão', category: 'Proteínas' },
  { id: 'p9', name: 'Ovos Inteiros', category: 'Proteínas' },
  { id: 'p10', name: 'Clara de Ovo', category: 'Proteínas' },
  { id: 'p11', name: 'Iogurte Natural', category: 'Proteínas' },
  { id: 'p12', name: 'Queijo Fresco', category: 'Proteínas' },
  { id: 'p13', name: 'Leite', category: 'Proteínas' },
  { id: 'p14', name: 'Feijão', category: 'Proteínas' },
  { id: 'p15', name: 'Lentilhas', category: 'Proteínas' },
  { id: 'p16', name: 'Grão-de-bico', category: 'Proteínas' },
  { id: 'p17', name: 'Ervilhas', category: 'Proteínas' },
  { id: 'p18', name: 'Whey Protein', category: 'Proteínas' },
  { id: 'p19', name: 'Cordeiro', category: 'Proteínas' },
  { id: 'p20', name: 'Pato', category: 'Proteínas' },
  { id: 'p21', name: 'Linguado', category: 'Proteínas' },
  { id: 'p22', name: 'Truta', category: 'Proteínas' },
  { id: 'p23', name: 'Mexilhões', category: 'Proteínas' },
  { id: 'p24', name: 'Ovos Caipiras', category: 'Proteínas' },
  { id: 'p25', name: 'Queijo Cottage', category: 'Proteínas' },
  { id: 'p26', name: 'Kefir', category: 'Proteínas' },
  { id: 'p27', name: 'Favas', category: 'Proteínas' },
  { id: 'p28', name: 'Soja', category: 'Proteínas' },

  // Carboidratos
  { id: 'c1', name: 'Arroz Integral', category: 'Carboidratos' },
  { id: 'c13', name: 'Arroz Branco', category: 'Carboidratos' },
  { id: 'c2', name: 'Quinoa', category: 'Carboidratos' },
  { id: 'c3', name: 'Aveia', category: 'Carboidratos' },
  { id: 'c4', name: 'Macarrão Integral', category: 'Carboidratos' },
  { id: 'c14', name: 'Macarrão Tradicional', category: 'Carboidratos' },
  { id: 'c5', name: 'Couscous', category: 'Carboidratos' },
  { id: 'c6', name: 'Batata Doce', category: 'Carboidratos' },
  { id: 'c7', name: 'Batata Normal', category: 'Carboidratos' },
  { id: 'c8', name: 'Bananas', category: 'Carboidratos' },
  { id: 'c9', name: 'Maçãs', category: 'Carboidratos' },
  { id: 'c10', name: 'Laranjas', category: 'Carboidratos' },
  { id: 'c11', name: 'Frutas Vermelhas', category: 'Carboidratos' },
  { id: 'c12', name: 'Abacate', category: 'Carboidratos' },
  { id: 'c15', name: 'Trigo Sarraceno', category: 'Carboidratos' },
  { id: 'c16', name: 'Milho', category: 'Carboidratos' },
  { id: 'c17', name: 'Macarrão de Legumes', category: 'Carboidratos' },
  { id: 'c18', name: 'Batata Roxa', category: 'Carboidratos' },
  { id: 'c19', name: 'Mandioca', category: 'Carboidratos' },
  { id: 'c20', name: 'Kiwi', category: 'Carboidratos' },
  { id: 'c21', name: 'Pêssego', category: 'Carboidratos' },
  { id: 'c22', name: 'Manga', category: 'Carboidratos' },
  { id: 'c23', name: 'Melancia', category: 'Carboidratos' },

  // Verduras e Legumes
  { id: 'v1', name: 'Espinafre', category: 'Verduras e Legumes' },
  { id: 'v2', name: 'Couve', category: 'Verduras e Legumes' },
  { id: 'v3', name: 'Alface', category: 'Verduras e Legumes' },
  { id: 'v4', name: 'Acelga', category: 'Verduras e Legumes' },
  { id: 'v5', name: 'Cenoura', category: 'Verduras e Legumes' },
  { id: 'v6', name: 'Brócolis', category: 'Verduras e Legumes' },
  { id: 'v7', name: 'Couve-flor', category: 'Verduras e Legumes' },
  { id: 'v8', name: 'Berinjela', category: 'Verduras e Legumes' },
  { id: 'v9', name: 'Pimentão', category: 'Verduras e Legumes' },
  { id: 'v10', name: 'Cebola Roxa', category: 'Verduras e Legumes' },
  { id: 'v11', name: 'Cebola Branca', category: 'Verduras e Legumes' },
  { id: 'v12', name: 'Alho', category: 'Verduras e Legumes' },
  { id: 'v13', name: 'Rúcula', category: 'Verduras e Legumes' },
  { id: 'v14', name: 'Agrião', category: 'Verduras e Legumes' },
  { id: 'v15', name: 'Aspargos', category: 'Verduras e Legumes' },
  { id: 'v16', name: 'Beterraba', category: 'Verduras e Legumes' },
  { id: 'v17', name: 'Cebolinha', category: 'Verduras e Legumes' },
  { id: 'v18', name: 'Alho-poró', category: 'Verduras e Legumes' },

  // Gorduras Saudáveis
  { id: 'g1', name: 'Azeite de Oliva', category: 'Gorduras Saudáveis' },
  { id: 'g2', name: 'Óleo de Abacate', category: 'Gorduras Saudáveis' },
  { id: 'g3', name: 'Amêndoas', category: 'Gorduras Saudáveis' },
  { id: 'g4', name: 'Nozes', category: 'Gorduras Saudáveis' },
  { id: 'g5', name: 'Castanhas', category: 'Gorduras Saudáveis' },
  { id: 'g6', name: 'Sementes de Chia', category: 'Gorduras Saudáveis' },
  { id: 'g7', name: 'Sementes de Linhaça', category: 'Gorduras Saudáveis' },
  { id: 'g8', name: 'Óleo de Coco', category: 'Gorduras Saudáveis' },
  { id: 'g9', name: 'Avelãs', category: 'Gorduras Saudáveis' },
  { id: 'g10', name: 'Pistaches', category: 'Gorduras Saudáveis' },
  { id: 'g11', name: 'Sementes de Abóbora', category: 'Gorduras Saudáveis' },
  { id: 'g12', name: 'Sementes de Gergelim', category: 'Gorduras Saudáveis' },

  // Bebidas
  { id: 'b1', name: 'Água Mineral', category: 'Bebidas' },
  { id: 'b2', name: 'Água com Gás', category: 'Bebidas' },
  { id: 'b3', name: 'Chá Verde', category: 'Bebidas' },
  { id: 'b4', name: 'Chá de Ervas', category: 'Bebidas' },
  { id: 'b5', name: 'Leite de Amêndoa', category: 'Bebidas' },
  { id: 'b6', name: 'Leite de Soja', category: 'Bebidas' },
  { id: 'b7', name: 'Água de Coco', category: 'Bebidas' },
  { id: 'b8', name: 'Chá de Hibisco', category: 'Bebidas' },
  { id: 'b9', name: 'Chá de Camomila', category: 'Bebidas' },
  { id: 'b10', name: 'Leite de Coco', category: 'Bebidas' },
  { id: 'b11', name: 'Leite de Aveia', category: 'Bebidas' },

  // Doces e Snacks
  { id: 's1', name: 'Damasco Seco', category: 'Doces e Snacks' },
  { id: 's2', name: 'Uva Passa', category: 'Doces e Snacks' },
  { id: 's3', name: 'Figo', category: 'Doces e Snacks' },
  { id: 's4', name: 'Barras Naturais', category: 'Doces e Snacks' },
  { id: 's5', name: 'Barras de Cereais', category: 'Doces e Snacks' },
  { id: 's6', name: 'Tâmara', category: 'Doces e Snacks' },
  { id: 's7', name: 'Chips de Batata Doce', category: 'Doces e Snacks' },
  { id: 's8', name: 'Mix de Frutas Secas e Nuts', category: 'Doces e Snacks' },

  // Outros (Temperos e Condimentos)
  { id: 'o1', name: 'Açafrão', category: 'Outros' },
  { id: 'o2', name: 'Gengibre', category: 'Outros' },
  { id: 'o3', name: 'Canela', category: 'Outros' },
  { id: 'o4', name: 'Pimenta do Reino', category: 'Outros' },
  { id: 'o5', name: 'Cominho', category: 'Outros' },
  { id: 'o6', name: 'Vinagre Balsâmico', category: 'Outros' },
  { id: 'o7', name: 'Mostarda', category: 'Outros' },
  { id: 'o8', name: 'Molho de Soja', category: 'Outros' },
  { id: 'o9', name: 'Pasta de Tahine', category: 'Outros' }
];

export const ACTIVITY_MULTIPLIERS = {
  [0]: 1.2,   // Sedentary
  [1]: 1.375, // Lightly active
  [2]: 1.55,  // Moderately active
  [3]: 1.725, // Very active
  [4]: 1.9    // Extra active
};