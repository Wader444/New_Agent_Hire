import React, { useState } from "react";
import { sendPayment, PaymentResponse } from "../services/apiService";

export const PaymentForm: React.FC = () => {
  const [receiver, setReceiver] = useState<string>(
    "AX3UQMME6IS4QVKYC6GECWVUD57P7PODIGLPC46XHIKRUGMEYUHEKZKUYM"
  );
  const [amount, setAmount] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [response, setResponse] = useState<PaymentResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      // Convert ALGO to microAlgos (1 ALGO = 1,000,000 microAlgos)
      const microAlgos = Math.floor(amount * 1_000_000);

      const result = await sendPayment(receiver, microAlgos);
      setResponse(result);

      if (result.status === "error") {
        setError(result.error || "Payment failed");
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="payment-form-container" style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>💰 Algorand Payment</h1>

        <form onSubmit={handleSubmit} style={styles.form}>
          {/* Receiver Address */}
          <div style={styles.formGroup}>
            <label style={styles.label}>Receiver Address:</label>
            <input
              type="text"
              value={receiver}
              onChange={(e) => setReceiver(e.target.value)}
              placeholder="Enter Algorand address"
              required
              style={styles.input}
            />
          </div>

          {/* Amount */}
          <div style={styles.formGroup}>
            <label style={styles.label}>Amount (ALGO):</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
              placeholder="Enter amount in ALGO"
              min="0.001"
              step="0.001"
              required
              style={styles.input}
            />
            <small style={styles.small}>
              = {(amount * 1_000_000).toLocaleString()} microAlgos
            </small>
          </div>

          {/* Submit Button */}
          <button type="submit" disabled={loading} style={styles.button}>
            {loading ? "Processing..." : "Send Payment"}
          </button>
        </form>

        {/* Error Message */}
        {error && (
          <div style={styles.errorBox}>
            <h3 style={styles.errorTitle}>❌ Error</h3>
            <p>{error}</p>
          </div>
        )}

        {/* Success Response */}
        {response && response.status === "success" && (
          <div style={styles.successBox}>
            <h3 style={styles.successTitle}>✅ Payment Successful!</h3>
            <p>
              <strong>Transaction ID:</strong>{" "}
              <code style={styles.code}>{response.txId}</code>
            </p>
            <p>
              <strong>Amount:</strong> {response.amountAlgo} ALGO
            </p>
            {response.confirmedRound && (
              <p>
                <strong>Confirmed Round:</strong> {response.confirmedRound}
              </p>
            )}
            {response.explorer && (
              <p>
                <a
                  href={response.explorer}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={styles.link}
                >
                  View on Explorer →
                </a>
              </p>
            )}
          </div>
        )}

        {/* Error Response from Backend */}
        {response && response.status === "error" && response.error && (
          <div style={styles.errorBox}>
            <h3 style={styles.errorTitle}>❌ Payment Failed</h3>
            <p>
              <strong>Error:</strong> {response.error}
            </p>
            {response.suggestion && (
              <p>
                <strong>Suggestion:</strong> {response.suggestion}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#f5f5f5",
    padding: "20px",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  } as React.CSSProperties,

  card: {
    backgroundColor: "white",
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    padding: "40px",
    maxWidth: "500px",
    width: "100%",
  } as React.CSSProperties,

  title: {
    fontSize: "28px",
    marginBottom: "30px",
    textAlign: "center",
    color: "#333",
  } as React.CSSProperties,

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  } as React.CSSProperties,

  formGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  } as React.CSSProperties,

  label: {
    fontWeight: "600",
    fontSize: "14px",
    color: "#555",
  } as React.CSSProperties,

  input: {
    padding: "12px",
    fontSize: "14px",
    border: "1px solid #ddd",
    borderRadius: "4px",
    fontFamily: "Menlo, monospace",
    boxSizing: "border-box",
  } as React.CSSProperties,

  small: {
    fontSize: "12px",
    color: "#777",
    marginTop: "4px",
  } as React.CSSProperties,

  button: {
    padding: "12px",
    fontSize: "16px",
    fontWeight: "600",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "background-color 0.3s",
    marginTop: "10px",
  } as React.CSSProperties,

  successBox: {
    backgroundColor: "#d4edda",
    border: "1px solid #c3e6cb",
    borderRadius: "4px",
    padding: "15px",
    marginTop: "20px",
    fontSize: "14px",
  } as React.CSSProperties,

  successTitle: {
    color: "#155724",
    marginTop: "0",
    marginBottom: "10px",
  } as React.CSSProperties,

  errorBox: {
    backgroundColor: "#f8d7da",
    border: "1px solid #f5c6cb",
    borderRadius: "4px",
    padding: "15px",
    marginTop: "20px",
    fontSize: "14px",
  } as React.CSSProperties,

  errorTitle: {
    color: "#721c24",
    marginTop: "0",
    marginBottom: "10px",
  } as React.CSSProperties,

  code: {
    backgroundColor: "#f0f0f0",
    padding: "2px 6px",
    borderRadius: "3px",
    fontFamily: "Menlo, monospace",
    fontSize: "12px",
    wordBreak: "break-all",
  } as React.CSSProperties,

  link: {
    color: "#0066cc",
    textDecoration: "none",
    fontWeight: "600",
  } as React.CSSProperties,
};
