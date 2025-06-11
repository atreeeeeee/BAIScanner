import { TokenData } from "@/structs/ApiData";
import { useEffect, useState } from "react";

/**
 * Generates API token, stores token in browser cache, and refreshes token every 15 minutes.
 */
export default function useApiToken() {
  const [tokenUrl, setTokenUrl] = useState("https://techhounds.club/api/oauth/token");
  const clientId = process.env.NEXT_PUBLIC_CLIENT_ID
  const [clientSecret, setClientSecret] = useState(process.env.NEXT_PUBLIC_CLIENT_SECRET);

  // Generate initial token.
  useEffect(() => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        clientName: "TechHOUNDS",
        clientId: clientId,
        clientSecret: clientSecret
      })
    }

    fetch(tokenUrl, requestOptions).then(response => response.json() as unknown as TokenData).then(data => {
      localStorage.setItem("apiToken", data.token);
      setClientSecret(data.refreshToken);
      setTokenUrl("https://techhounds.club/api/oauth/refresh_token");
    });
  }, []);

  // Generate refresh token every 15 minutes, since tokens expire after 15 minutes.
  useEffect(() => {
    const interval = setInterval(async () => {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientName: "TechHOUNDS",
          clientId: clientId,
          clientSecret: clientSecret
        })
      }

      const response = await fetch(tokenUrl, requestOptions);
      const data: TokenData = await response.json();
      localStorage.setItem("apiToken", data.token)
      setClientSecret(data.refreshToken);
    }, 15 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);
}

/**
 * Helper function that returns token from browser cache.
 * @returns API token
 */
export const getApiToken = () => localStorage.getItem("apiToken");