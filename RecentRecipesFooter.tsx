import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { Clock } from 'lucide-react';

interface Props {
  onLoadRecipe: (id: string) => void;
}

export const RecentRecipesFooter: React.FC<Props> = ({ onLoadRecipe }) => {
  const [recipes, setRecipes] = useState<any[]>([]);

  useEffect(() => {
    const fetchRecent = async () => {
      try {
        const { data } = await supabase
          .from('production_recipes')
          .select('id, recipe_code, client_name, status, created_at')
          .order('created_at', { ascending: false })
          .limit(4);
        
        if (data) setRecipes(data);
      } catch (error) {
        console.error("Error fetching recent recipes:", error);
      }
    };
    fetchRecent();
  }, []);

  if (recipes.length === 0) return null;

  return (
    <div className="mt-10 pt-6 border-t border-gray-200">
      <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
        <Clock className="w-4 h-4" /> Historial Reciente
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {recipes.map((r) => (
          <button
            key={r.id}
            onClick={() => onLoadRecipe(r.id)}
            className="flex flex-col text-left p-3 bg-white border border-gray-200 rounded-lg hover:border-indigo-400 hover:shadow-md transition-all group w-full"
          >
            <div className="flex justify-between items-center w-full mb-1">
               <span className="font-bold text-indigo-700 text-sm group-hover:text-indigo-800">{r.recipe_code || 'Sin Código'}</span>
               <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                 r.status === 'APPROVED' ? 'bg-green-100 text-green-800' :
                 r.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                 'bg-gray-100 text-gray-600'
               }`}>
                 {r.status === 'DRAFT' ? 'BORR' : r.status === 'PENDING' ? 'REV' : 'OK'}
               </span>
            </div>
            <span className="text-xs text-gray-600 truncate w-full">{r.client_name || 'Cliente desconocido'}</span>
            <span className="text-[10px] text-gray-400 mt-2">{new Date(r.created_at).toLocaleDateString()}</span>
          </button>
        ))}
      </div>
    </div>
  );
};