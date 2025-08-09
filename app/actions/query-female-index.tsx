'use server'

import { queryFemaleCustomerIndex } from '@/utils';

export async function getFemaleRecommendation(maleProfile: any) {
  const result = await queryFemaleCustomerIndex(maleProfile);
  return result;
}
