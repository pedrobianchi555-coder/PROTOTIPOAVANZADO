
import { Recipe, RecipeStatus, UserRole } from "./types";

export const LIMITS = {
  MAX_MOLD: 0.20,
  MAX_IMPURITIES: 0.20,
  MAX_INSECT_DAMAGE: 0.20,
  MAX_EXPECTED_LOSS: 3.79
};

export const createInitialRecipe = (): Recipe => ({
  // id is undefined initially
  format_code: 'CSJ-CAL-FT-06',
  client_name: '',
  sample_number: '',
  recipe_code: '',
  contract_id: '', // New field initialized
  
  instructions: '',
  
  spec_max_mold: 0,
  spec_max_imp: 0,
  spec_max_insect: 0,
  spec_exp_loss: 0,
  
  ingredients: [],
  status: RecipeStatus.DRAFT,
  
  approvals: {
    [UserRole.QA]: null,
    [UserRole.PROD]: null,
    [UserRole.LEAD]: null,
    [UserRole.ADMIN]: null,
    [UserRole.USER]: null
  }
});

export const INSTRUCTION_TEMPLATES = [
  "20 minutos a capacidad máxima",
  "40 minutos de enfriamiento",
  "Limpieza doble requerida",
  "Inactivación de esporas"
];
