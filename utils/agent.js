import axios from "axios";

const agentAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_ENVIRONMENT_URL,
});

const agent = {
  getAllSymbols: async () => {
    return await agentAxios.get("/symbols").then((res) => res.data);
  },
  getlatestRate: async ({ symbol }) => {
    return agentAxios
      .get("/rates/latest", {
        params: {
          symbol,
        },
      })
      .then((res) => res.data);
  },
  getHistoryRate: async ({ symbol, dateFrom, dateTo }) => {
    return agentAxios
      .get("/rates/history", { params: { symbol, dateFrom, dateTo } })
      .then((res) => res.data);
  },
  getPerformance: async ({ symbol }) => {
    return agentAxios
      .get("/performance", { params: { symbol } })
      .then((res) => res.data);
  },
};

export default agent;
