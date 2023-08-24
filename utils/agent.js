import axios from "axios";

const agentAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_ENVIRONMENT_URL,
});

const agent = {
  getAllSymbols: async () => {
    return await agentAxios.get("/symbols/all-symbols").then((res) => res.data);
  },
  getlatestRate: async ({ symbol }) => {
    return agentAxios
      .post("/symbols/latest-rate", symbol)
      .then((res) => res.data);
  },
  getProgessRate: async ({ symbol, dateFrom, dateTo }) => {
    return agentAxios
      .post("/symbols/progess-rate", symbol)
      .then((res) => res.data);
  },
};

export default agent;
