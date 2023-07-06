/*  {
"valid": true,
"result": "4177.877381",
"to-type": "COP",
"from-value": "1",
"from-type": "USD",
"result-float": 4177.877381
} */

export type ResponseCurrencyConvert = {
  valid: boolean;
  result: string;
  "top-type": string;
  "from-value": string;
  "from-type": string;
  "result-float": number;
};

export type CurrencyReponseAPI = {
  "VEFTOUSD": number;
  "USDTOCOP": number;
  "COPTOVEF": number;
};
