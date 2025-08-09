'use server';

import { queryMaleCustomerIndex } from '@/utils';

export async function getMaleRecommendation(femaleProfile: any) {
  const result = await queryMaleCustomerIndex(femaleProfile);
  return result;
}
