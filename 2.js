import {
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  clusterApiUrl,
} from "@solana/web3.js";
import fs from "fs";

async function createSolanaAccount() {
  try {
    // Connect to Solana devnet
    console.log("Connecting to Solana devnet...");
    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

    // Generate a new keypair (wallet)
    const newAccount = Keypair.generate();
    console.log("Generated new keypair");

    // Save keypair to a file
    const keypairData = {
      publicKey: newAccount.publicKey.toString(),
      privateKey: Array.from(newAccount.secretKey),
    };

    fs.writeFileSync(
      "solana-wallet.json",
      JSON.stringify(keypairData, null, 2)
    );
    console.log("Keypair saved to solana-wallet.json");

    // Display the wallet address
    console.log(`Wallet Address: ${newAccount.publicKey.toString()}`);

    // Request an airdrop of 2 SOL to the new wallet
    console.log("Requesting airdrop of 2 SOL...");
    const signature = await connection.requestAirdrop(
      newAccount.publicKey,
      2 * LAMPORTS_PER_SOL
    );

    // Wait for confirmation
    await connection.confirmTransaction(signature, "confirmed");

    // Check the balance
    const balance = await connection.getBalance(newAccount.publicKey);
    console.log(`Airdrop completed successfully!`);
    console.log(`Current balance: ${balance / LAMPORTS_PER_SOL} SOL`);

    return {
      publicKey: newAccount.publicKey.toString(),
      balance: balance / LAMPORTS_PER_SOL,
    };
  } catch (error) {
    console.error("Error creating Solana account:", error);
    throw error;
  }
}

// Execute the function
createSolanaAccount()
  .then((account) => {
    console.log("Account creation completed!");
    console.log(`Use this public key for your dApp: ${account.publicKey}`);
  })
  .catch((err) => {
    console.error("Failed to create account:", err);
  });
