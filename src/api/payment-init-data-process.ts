import FormData from "form-data";

export interface InitPaymentPayload {
  store_id: string;
  store_passwd: string;
  productcategory?: string;
  tran_id: string;
  total_amount: number;
  currency: string;
  success_url: string;
  fail_url: string;
  cancel_url: string;
  ipn_url?: string;
  multi_card_name?: string;
  allowed_bin?: string;
  emi_option?: number;
  emi_max_inst_option?: number;
  emi_selected_inst?: number;
  cus_name: string;
  cus_email: string;
  cus_add1: string;
  cus_add2?: string;
  cus_city: string;
  cus_state: string;
  cus_postcode: string;
  cus_country: string;
  cus_phone: string;
  cus_fax?: string;
  shipping_method: string;
  num_of_item: number;
  ship_name?: string;
  shipcity?: string;
  ship_add1?: string;
  ship_add2?: string;
  ship_city?: string;
  ship_state?: string;
  ship_postcode?: string;
  ship_country?: string;
  product_name: string;
  product_category: string;
  product_profile: string;
  hours_till_departure?: string;
  flight_type?: string;
  pnr?: string;
  journey_from_to?: string;
  third_party_booking?: string;
  hotel_name?: string;
  length_of_stay?: string;
  check_in_time?: string;
  hotel_city?: string;
  product_type?: string;
  topup_number?: string;
  country_topup?: string;
  cart?: string;
  product_amount?: string;
  discount_amount?: string;
  convenience_fee?: string;
  value_a?: string;
  value_b?: string;
  value_c?: string;
  value_d?: string;
}

const paymentInitDataProcess = (data: InitPaymentPayload): FormData => {
  const postData: Record<string, string | number> = {};

  for (const key in data) {
    if (data[key as keyof InitPaymentPayload] !== undefined) {
      postData[key] = data[key as keyof InitPaymentPayload]!;
    }
  }

  const fdata = new FormData();
  for (const key in postData) {
    fdata.append(key, String(postData[key] ?? ""));
  }

  return fdata;
};

export default paymentInitDataProcess;
