import { SslCommerzPayment } from "./api/payment-controller";

export class SSLCommerzPayment extends SslCommerzPayment {
  constructor(store_id: string, store_password: string, live = false) {
    super(store_id, store_password, live);
  }
}

export default SSLCommerzPayment;
