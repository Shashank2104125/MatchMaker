'use server'

import { createPineConeFemaleCustomerIndex } from "@/utils"

export async function createFemaleIndex() {
    await createPineConeFemaleCustomerIndex();
    return { success : true};
}