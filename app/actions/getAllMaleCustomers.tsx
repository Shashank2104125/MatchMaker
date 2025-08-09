'use server'

import maleCustomers from '@/data/maleCustomers.json';

export async function getMaleCustomers() {
  return maleCustomers;
}
