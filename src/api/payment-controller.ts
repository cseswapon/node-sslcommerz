import httpCall from "./fetch";
import paymentInitDataProcess, {
  InitPaymentPayload,
} from "./payment-init-data-process";

type Method = "GET" | "POST";

export class SslCommerzPayment {
  private baseURL: string;
  private initURL: string;
  private validationURL: string;
  private refundURL: string;
  private refundQueryURL: string;
  private transactionQueryBySessionIdURL: string;
  private transactionQueryByTransactionIdURL: string;

  private store_id: string;
  private store_passwd: string;

  constructor(store_id: string, store_passwd: string, live = false) {
    this.baseURL = `https://${live ? "securepay" : "sandbox"}.sslcommerz.com`;
    this.initURL = this.baseURL + "/gwprocess/v4/api.php";
    this.validationURL =
      this.baseURL + "/validator/api/validationserverAPI.php?";
    this.refundURL =
      this.baseURL + "/validator/api/merchantTransIDvalidationAPI.php?";
    this.refundQueryURL =
      this.baseURL + "/validator/api/merchantTransIDvalidationAPI.php?";
    this.transactionQueryBySessionIdURL =
      this.baseURL + "/validator/api/merchantTransIDvalidationAPI.php?";
    this.transactionQueryByTransactionIdURL =
      this.baseURL + "/validator/api/merchantTransIDvalidationAPI.php?";

    this.store_id = store_id;
    this.store_passwd = store_passwd;
  }

  init(data: InitPaymentPayload, url = "", method: Method = "POST") {
    data.store_id = this.store_id;
    data.store_passwd = this.store_passwd;
    return httpCall({
      url: url || this.initURL,
      method,
      data: paymentInitDataProcess(data),
    });
  }

  validate(data: { val_id: string }, url = "", method: Method = "GET") {
    const fullUrl =
      url ||
      `${this.validationURL}val_id=${data.val_id}&store_id=${this.store_id}&store_passwd=${this.store_passwd}&v=1&format=json`;
    return httpCall({ url: fullUrl, method });
  }

  initiateRefund(
    data: {
      refund_amount: string;
      refund_remarks: string;
      bank_tran_id: string;
      refe_id: string;
    },
    url = "",
    method: Method = "GET"
  ) {
    const fullUrl =
      url ||
      `${this.refundURL}refund_amount=${data.refund_amount}&refund_remarks=${data.refund_remarks}&bank_tran_id=${data.bank_tran_id}&refe_id=${data.refe_id}&store_id=${this.store_id}&store_passwd=${this.store_passwd}&v=1&format=json`;
    return httpCall({ url: fullUrl, method });
  }

  refundQuery(
    data: { refund_ref_id: string },
    url = "",
    method: Method = "GET"
  ) {
    const fullUrl =
      url ||
      `${this.refundQueryURL}refund_ref_id=${data.refund_ref_id}&store_id=${this.store_id}&store_passwd=${this.store_passwd}&v=1&format=json`;
    return httpCall({ url: fullUrl, method });
  }

  transactionQueryBySessionId(
    data: { sessionkey: string },
    url = "",
    method: Method = "GET"
  ) {
    const fullUrl =
      url ||
      `${this.transactionQueryBySessionIdURL}sessionkey=${data.sessionkey}&store_id=${this.store_id}&store_passwd=${this.store_passwd}&v=1&format=json`;
    return httpCall({ url: fullUrl, method });
  }

  transactionQueryByTransactionId(
    data: { tran_id: string },
    url = "",
    method: Method = "GET"
  ) {
    const fullUrl =
      url ||
      `${this.transactionQueryByTransactionIdURL}tran_id=${data.tran_id}&store_id=${this.store_id}&store_passwd=${this.store_passwd}&v=1&format=json`;
    return httpCall({ url: fullUrl, method });
  }
}

export default SslCommerzPayment;
