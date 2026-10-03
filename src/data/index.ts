import type { Unit } from './types';
import { unit1 } from './units/unit1';

import { unit2 } from './units/unit2';
import { unit3 } from './units/unit3';
import { unit4 } from './units/unit4';
import { unit5 } from './units/unit5';

export const units: Unit[] = [unit1, unit2, unit3, unit4, unit5];

export const getUnitById = (id: string) => units.find(u => u.id === id);
export const getTopicById = (unitId: string, topicId: string) => {
  const unit = getUnitById(unitId);
  return unit?.topics.find(t => t.id === topicId);
};
