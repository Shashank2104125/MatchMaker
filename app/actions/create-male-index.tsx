'use server';

import { createPineConeMaleCustomerIndex } from '@/utils';

export async function createMaleIndex() {
  await createPineConeMaleCustomerIndex();
  return { success: true };
}
