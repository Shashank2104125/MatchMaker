import { GoogleGenAI } from "@google/genai";
import { Pinecone } from "@pinecone-database/pinecone";
import maleCustomers from "./data/maleCustomers.json";
import femaleCustomers from "./data/femaleCustomers.json";
import { maleCustomerIndex, femaleCustomerIndex, timeOut } from "./config";

const genAI = new GoogleGenAI({});
const pinecone = new Pinecone({
    apiKey:process.env.PINECONE_API_KEY || '',
});

// Helper to get embedding using Gemini
// async function getEmbeddingFromGemini(input: string): Promise<number[]> {
//   const result = await genAI.models.embedContent({
//     model: "text-embedding-004",
//     contents: input,
//   });

//   return result.embeddings?.values
// }

async function getEmbeddingFromGemini(input: string): Promise<number[]> {
  const result = await genAI.models.embedContent({
    model: "text-embedding-004",
    contents: input,
  });

  // Make sure we return a proper 768-length embedding
  const embedding = result.embeddings?.[0]?.values;
  if (!embedding || embedding.length !== 768) {
    throw new Error(`Invalid embedding length: ${embedding?.length || 0}`);
  }

  return embedding;
}

export const createPineConeMaleCustomerIndex = async () => {
  const existingIndexes = await pinecone.listIndexes();
  const indexNames = existingIndexes.indexes?.map((idx) => idx.name) ?? [];
  if (!indexNames.includes(maleCustomerIndex)) {
    await pinecone.createIndex({
      name: maleCustomerIndex,
      dimension: 768,
      metric: "cosine",
      spec: { serverless: { cloud: "aws", region: "us-east-1" } },
    });
    await new Promise((resolve) => setTimeout(resolve, timeOut));
  }
};

export const createPineConeFemaleCustomerIndex = async () => {
  const existingIndexes = await pinecone.listIndexes();
   const indexNames = existingIndexes.indexes?.map((idx) => idx.name) ?? [];
  if (!indexNames.includes(femaleCustomerIndex)) {
    await pinecone.createIndex({
      name: femaleCustomerIndex,
      dimension: 768,
      metric: "cosine",
      spec: { serverless: { cloud: "aws", region: "us-east-1" } },
    });
    await new Promise((resolve) => setTimeout(resolve, timeOut));
  }
};

export const updatePineConeMaleCustomerIndex = async () => {
  const index = pinecone.Index(maleCustomerIndex);
  console.log("shanksyd: " + index)
  const vectors = await Promise.all(
    maleCustomers.map(async (user) => {
      const values = await getEmbeddingFromGemini(JSON.stringify(user));
      return {
        id: user.id.toString(),
        values,
        metadata: user,
      };
    })
  );
  await index.upsert(vectors);
};

export const updatePineConeFemaleCustomerIndex = async () => {
  const index = pinecone.Index(femaleCustomerIndex);
  const vectors = await Promise.all(
    femaleCustomers.map(async (user) => {
      const values = await getEmbeddingFromGemini(JSON.stringify(user));
      return {
        id: user.id.toString(),
        values,
        metadata: user,
      };
    })
  );
  await index.upsert(vectors);
};

export const queryMaleCustomerIndex = async (femaleProfile: any) => {
  const index = pinecone.Index(maleCustomerIndex);
  const queryEmbedding = await getEmbeddingFromGemini(
    JSON.stringify(femaleProfile)
  );

  const result = await index.query({
    topK: 10,
    vector: queryEmbedding,
    includeMetadata: true,
  });

  return result.matches?.map((match) => match.metadata);
};

export const queryFemaleCustomerIndex = async (maleProfile: any) => {
  const index = pinecone.Index(femaleCustomerIndex);
  const queryEmbedding = await getEmbeddingFromGemini(
    JSON.stringify(maleProfile)
  );

  const result = await index.query({
    topK: 10,
    vector: queryEmbedding,
    includeMetadata: true,
  });

  return result.matches?.map((match) => match.metadata);
};


//in freee plain of pinecone it not allow to scan all vectors

export const maleCustomersList = async () => {
  const record =pinecone.Index(maleCustomerIndex);
  return record;
}

export const femaleCustomersList = async () => {
  const record =pinecone.Index(femaleCustomerIndex);
  return record;
}

