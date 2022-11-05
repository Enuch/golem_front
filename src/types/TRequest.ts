export type TRequest = {
  id: number;
  active: boolean;
  requested_user_id: number;
  status: number;
  requested_user: {
    id: number;
    username: string;
  };
  material_request: [
    {
      id: number;
      amount_requested: number;
      amount_received: number;
      material_id: number;
      request_id: number;
      material: {
        id: number;
        name: string;
        origin: string;
        active: boolean;
        amount: number;
        category_id: number;
      };
    }
  ];
  created_date: Date;
  update_at: Date;
};
