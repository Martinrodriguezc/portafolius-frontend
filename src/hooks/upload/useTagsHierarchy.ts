import { useState, useMemo } from 'react';
import { useTags } from './useTags';
import { Tag, TagSelectorState } from '../../types/tag';

export const useTagsHierarchy = () => {
  const { tags: backendTags, loading, error } = useTags();
  
  const hierarchy = useMemo(() => {
    if (backendTags.length === 0) {
      return {
        organs: [],
        structures: {},
        conditions: {},
        loading,
        error: null
      };
    }

    const organs = new Set<string>();
    const structures: Record<string, Set<string>> = {};
    const conditions: Record<string, Set<string>> = {};
    const tagMap: Record<string, Tag> = {};

    backendTags.forEach(tag => {
      tagMap[tag.name] = tag;
      const match = tag.name.match(/(.+) \((.+)\)/);
      if (match) {
        const condition = match[1];
        const structure = match[2];
        
        let organ = "";
        if (structure.includes("Lóbulo")) organ = "Hígado";
        else if (structure.includes("Parénquima renal") || structure.includes("Seno renal")) organ = "Riñón";
        else if (structure.includes("Pared") || structure.includes("Lumen")) organ = "Vesícula biliar";
        else if (structure.includes("Parénquima esplénico")) organ = "Bazo";
        else if (structure.includes("Cabeza") || structure.includes("Cuerpo") || structure.includes("Cola")) organ = "Páncreas";
        
        if (organ) {
          organs.add(organ);
          if (!structures[organ]) structures[organ] = new Set<string>();
          structures[organ].add(structure);
          
          if (!conditions[structure]) conditions[structure] = new Set<string>();
          conditions[structure].add(condition);
        }
      }
    });

    return {
      organs: Array.from(organs).sort(),
      structures: Object.fromEntries(
        Object.entries(structures).map(([organ, structSet]) => [
          organ,
          Array.from(structSet).sort(),
        ])
      ),
      conditions: Object.fromEntries(
        Object.entries(conditions).map(([structure, condSet]) => [
          structure,
          Array.from(condSet).sort(),
        ])
      ),
      loading,
      error
    };
  }, [backendTags, loading, error]);

  const [selection, setSelection] = useState<TagSelectorState>({
    selectedOrgan: '',
    selectedStructure: '',
    selectedCondition: '',
    tags: []
  });

  const setSelectedOrgan = (organ: string) => {
    setSelection(prev => ({
      ...prev,
      selectedOrgan: organ,
      selectedStructure: '',
      selectedCondition: ''
    }));
  };

  const setSelectedStructure = (structure: string) => {
    setSelection(prev => ({
      ...prev,
      selectedStructure: structure,
      selectedCondition: ''
    }));
  };

  const setSelectedCondition = (condition: string) => {
    setSelection(prev => ({
      ...prev,
      selectedCondition: condition
    }));
  };

  const addTag = () => {
    const { selectedOrgan, selectedStructure, selectedCondition, tags } = selection;
    
    if (!selectedOrgan || !selectedStructure || !selectedCondition) return;
    
    const tagText = `${selectedCondition} (${selectedStructure})`;
    if (tags.some(tag => tag.text === tagText)) return;
    
    const backendTag = backendTags.find(tag => tag.name === tagText);
    if (backendTag) {
      setSelection(prev => ({
        ...prev,
        tags: [...prev.tags, { id: backendTag.id, text: tagText }]
      }));
    } else {
      const tempId = `temp-${Date.now()}`;
      setSelection(prev => ({
        ...prev,
        tags: [...prev.tags, { id: tempId, text: tagText }]
      }));
    }
  };

  const removeTag = (id: string) => {
    setSelection(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag.id !== id)
    }));
  };

  return {
    ...hierarchy,
    ...selection,
    setSelectedOrgan,
    setSelectedStructure,
    setSelectedCondition,
    addTag,
    removeTag
  };
};

export default useTagsHierarchy; 