export interface VisitModelTs {
  id: number;
  purpose: string;
  visit_date: string;
  visit_time: string;
  status: string;
  created_at: Date | null;
  updated_at: Date | null;
  user_id: number;

  

  doctor: Doctor[];
  tools: Tool[];
}

export interface GroupedVisits {
  [date: string]: VisitModelTs[];
}

export interface Tool {
  tool_name: string;
}

export interface Doctor {
  doctor_name: string;
  city: string;
  state: string;
  street: string;
}


