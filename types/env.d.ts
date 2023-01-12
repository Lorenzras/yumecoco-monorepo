declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV_FORCED: string;
      KT_BASE_URL: string;
      KT_PORTAL: string;
      KT_CUSTOMER: string;
      KT_STORE: string;
      KT_EMPLOYEE: string;
      KT_CUST_GROUP: string;
      KT_CUST_MEMOS: string;
      KT_PROJECT_TYPE: string;
      KT_PROJECT: string;
      KT_ESTIMATE_MAJORITEMS: string;
      KT_ESTIMATE_MIDDLEITEMS: string;
      KT_ESTIMATE_ELEMENTS: string;
      KT_ESTIMATE: string;
      KT_INVOICE: string;
      KT_LOGIN_AUTH: string;
      KT_CLIENT_ID: string;
      KT_CLIENT_SECRET: string;
      KT_REDIRECT_URI: string;
      KT_AUTH_CODE: string;
      KT_REFRESH_TOKEN: string;
      DS_INTEGRATOR_KEY: string;
      DS_USER_ID: string;
      DS_ACCOUNT_ID: string;
      DS_USER_ID_PROD: string;
      DS_ACCOUNT_ID_PROD: string;
      DS_SECRET_KEY: string;
      NX_CLOUD_AUTH_TOKEN: string;
      CW_TOKEN_RAS: string;
      CW_TOKEN_REPORTER: string;
      BASE_URL: string;
      LOCAL_URL: string;
    }
  }
}

export {}
