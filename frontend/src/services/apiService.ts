/**
 * API Service - Handles all backend communication
 */

const API_URL =
  (import.meta.env.VITE_API_URL as string) || "https://agenthire-backend-ar3d.onrender.com";

export interface PaymentRequest {
  receiver: string;
  amount?: number;
}

export interface PaymentResponse {
  status: "success" | "error";
  txId?: string | null;
  confirmedRound?: number;
  amountAlgo?: string;
  explorer?: string;
  error?: string | null;
  suggestion?: string;
}

/**
 * Send a payment via the backend
 */
export async function sendPayment(
  receiver: string,
  amount: number = 200000
): Promise<PaymentResponse> {
  try {
    const response = await fetch(`${API_URL}/api/pay`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        receiver,
        amount,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data: PaymentResponse = await response.json();
    return data;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    console.error("Payment error:", errorMessage);
    return {
      status: "error",
      error: errorMessage,
      txId: null,
    };
  }
}

/**
 * Get backend health status
 */
export async function getBackendHealth() {
  try {
    const response = await fetch(`${API_URL}/health`);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Health check error:", error);
    return null;
  }
}

/**
 * Get account information from blockchain
 */
export async function getAccountInfo() {
  try {
    const response = await fetch(`${API_URL}/account`);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Account info error:", error);
    return null;
  }
}
