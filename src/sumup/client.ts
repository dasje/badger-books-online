import SumUp from "@sumup/sdk";

export const client = new SumUp({
  apiKey: process.env.REACT_APP_SUMUP_API_KEY,
});
