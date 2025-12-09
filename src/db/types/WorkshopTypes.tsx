export type WorkshopType = {
  id: string;
  created_at?: Date;
  type: string;
  location: string;
  date_from: Date;
  date_to: Date;
  title: string;
  description: string;
  cost: number;
  main_img?: string;
};
