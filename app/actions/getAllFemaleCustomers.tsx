'use server'

import femaleCustomers from "@/data/femaleCustomers.json"

export async function getFemaleCustomers() {
  return femaleCustomers
}
