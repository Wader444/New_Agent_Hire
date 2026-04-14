/**
 * Integration Test Script
 * Tests the complete payment flow: Backend → Blockchain → Algorand
 */

async function testPaymentAPI() {
  const baseURL = process.env.BACKEND_URL || "http://localhost:8000";
  const receiverAddress = "AX3UQMME6IS4QVKYC6GECWVUD57P7PODIGLPC46XHIKRUGMEYUHEKZKUYM";
  const amount = 100000; // 0.1 ALGO in microAlgos (reduced from 1 ALGO)

  console.log("🧪 Testing AgentHire Integration\n");
  console.log(`Backend URL: ${baseURL}`);
  console.log(`Receiver: ${receiverAddress}`);
  console.log(`Amount: ${amount / 1e6} ALGO\n`);

  // Test 1: Health Check
  console.log("📋 Test 1: Backend Health");
  try {
    const healthRes = await fetch(`${baseURL}/health`);
    const health = await healthRes.json();
    console.log("✅ Backend health:", health.backend);
    console.log("   Blockchain:", health.blockchain.status || "unhealthy");
  } catch (err) {
    console.error("❌ Health check failed:", err.message);
    process.exit(1);
  }

  // Test 2: Payment API
  console.log("\n📋 Test 2: Payment API (/api/pay)");
  try {
    const payRes = await fetch(`${baseURL}/api/pay`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        receiver: receiverAddress,
        amount: amount,
      }),
    });

    const payData = await payRes.json();

    if (payData.status === "success") {
      console.log("✅ Payment successful!");
      console.log("   TX ID:", payData.txId);
      console.log("   Amount:", payData.amountAlgo, "ALGO");
      console.log("   Confirmed Round:", payData.confirmedRound);
      console.log("   Explorer:", payData.explorer);
    } else {
      console.error("❌ Payment failed:");
      console.error("   Error:", payData.error);
      if (payData.suggestion) {
        console.error("   Suggestion:", payData.suggestion);
      }
    }
  } catch (err) {
    console.error("❌ Payment request failed:", err.message);
  }

  // Test 3: Hire Endpoint with smaller amount
  console.log("\n📋 Test 3: Hire Endpoint (/hire)");
  try {
    const hireRes = await fetch(`${baseURL}/hire`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        freelancer: "John",
        amount: 50000, // 0.05 ALGO (smaller amount)
      }),
    });

    const hireData = await hireRes.json();

    if (hireData.message && hireData.payment) {
      console.log("✅ Hire successful!");
      console.log("   Message:", hireData.message);
      console.log("   TX ID:", hireData.payment.tx_id);
      console.log("   Amount:", hireData.payment.amount_algo, "ALGO");
    } else {
      console.error("❌ Hire failed:", hireData.error);
    }
  } catch (err) {
    console.error("❌ Hire request failed:", err.message);
  }

  console.log("\n✅ Integration tests complete!");
}

// Run tests
testPaymentAPI().catch(console.error);
