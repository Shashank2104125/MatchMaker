'use server';

import { updatePineConeMaleCustomerIndex } from '@/utils';

export async function updateMaleIndex() {
  await updatePineConeMaleCustomerIndex();
  return { success: true };
}
