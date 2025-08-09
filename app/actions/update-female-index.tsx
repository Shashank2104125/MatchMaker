'use server';

import { updatePineConeFemaleCustomerIndex } from '@/utils';

export async function updateFemaleIndex() {
  await updatePineConeFemaleCustomerIndex();
  return { success: true };
}
