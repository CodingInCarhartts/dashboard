import type { ChatModel } from '../../../types';

export const getPerplexityModels = (): ChatModel[] => {
  return [
    { id: 'sonar', name: 'Sonar' },
    { id: 'sonar-pro', name: 'Sonar Pro' },
    { id: 'sonar-reasoning', name: 'Sonar Reasoning' },
    { id: 'sonar-reasoning-pro', name: 'Sonar Reasoning Pro' },
    { id: 'sonar-deep-research', name: 'Sonar Deep Research' },
    { id: 'r1-1776', name: 'R1 1776' },
  ];
};
