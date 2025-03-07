import {
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  clusterApiUrl,
} from "@solana/web3.js";
import * as fs from "fs";
import * as path from "path";

// Function to create a new Solana account
async function createSolanaAccount() {
  // Step 1: Connect to the Solana network (Testnet in this case)
  const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

  // Step 2: Generate a new keypair (account)
  const keypair = Keypair.fromSecretKey(
    Uint8Array.from(JSON.parse(fs.readFileSync("solana-keypair.json", "utf-8")))
  );

  console.log("New Solana Account Public Key:", keypair.publicKey.toString());

  // Step 3: Request an airdrop of SOL to fund the account
  console.log("Requesting airdrop...");
  const retryAirdrop = async (retries = 5, delay = 1000) => {
    for (let i = 0; i < retries; i++) {
      try {
        const airdropSignature = await connection.requestAirdrop(
          keypair.publicKey,
          1 * LAMPORTS_PER_SOL // 1 SOL
        );

        // Step 4: Confirm the airdrop transaction
        await connection.confirmTransaction(airdropSignature);
        console.log("Airdrop confirmed. Account funded with 1 SOL.");
        return;
      } catch (error) {
        console.error(`Airdrop attempt ${i + 1} failed:`, error.message);
        if (i < retries - 1) {
          console.log(`Retrying in ${delay}ms...`);
          await new Promise((resolve) => setTimeout(resolve, delay));
          delay *= 2; // Exponential backoff
        } else {
          throw new Error("Airdrop failed after multiple attempts.");
        }
      }
    }
  };

  await retryAirdrop();

  // Step 5: Save the keypair to a file for later use
  const keypairPath = path.join(__dirname, "solana-keypair.json");
  fs.writeFileSync(keypairPath, JSON.stringify(Array.from(keypair.secretKey)));

  console.log("Keypair saved to:", keypairPath);

  // Step 6: Fetch and display the account balance
  const balance = await connection.getBalance(keypair.publicKey);
  console.log("Account Balance:", balance / LAMPORTS_PER_SOL, "SOL");

  return keypair;
}

// Run the function
createSolanaAccount().catch((err) => {
  console.error("Error creating Solana account:", err);
});
