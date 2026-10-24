"use client";

import { FormEvent, useState } from "react";
import { joinWaitlist } from "@/lib/api";
import styles from "./WaitlistForm.module.css";

export default function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">(
    "idle",
  );
  const [message, setMessage] = useState("");

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");
    try {
      const res = await joinWaitlist(email);
      setStatus("ok");
      setMessage(res.message);
      setEmail("");
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <form className={styles.form} onSubmit={onSubmit} noValidate>
      <label className={styles.label} htmlFor="waitlist-email">
        Email for early access
      </label>
      <div className={styles.row}>
        <input
          id="waitlist-email"
          className={styles.input}
          type="email"
          name="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={status === "loading"}
        />
        <button
          className={styles.button}
          type="submit"
          disabled={status === "loading"}
        >
          {status === "loading" ? "Joining…" : "Join waitlist"}
        </button>
      </div>
      {message ? (
        <p
          className={status === "ok" ? styles.ok : styles.error}
          role="status"
        >
          {message}
        </p>
      ) : null}
    </form>
  );
}
