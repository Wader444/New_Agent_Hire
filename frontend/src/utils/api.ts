const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export interface PostProjectData {
  title: string;
  description: string;
  budget: string;
}

export interface PostProjectResponse {
  id: string;
  message: string;
}

export interface FreelancerRecommendation {
  id: string;
  name: string;
  matchPercentage: number;
  reason: string;
}

export interface HireResponse {
  transactionId: string;
  freelancerId: string;
  status: string;
  network: string;
}

export async function postProject(
  _data: PostProjectData,
): Promise<PostProjectResponse> {
  await delay(800);
  return {
    id: `proj_${Math.random().toString(36).slice(2, 9)}`,
    message: "Project posted successfully!",
  };
}

export async function getRecommendations(): Promise<
  FreelancerRecommendation[]
> {
  await delay(800);
  return [
    {
      id: "fl_1",
      name: "Marcus Chen",
      matchPercentage: 92,
      reason:
        "Strong React & TypeScript skills match your project requirements",
    },
    {
      id: "fl_2",
      name: "Priya Patel",
      matchPercentage: 87,
      reason: "Expert in full-stack development with proven track record",
    },
  ];
}

export async function hireFreelancer(id: string): Promise<HireResponse> {
  await delay(800);
  return {
    transactionId: `txn_${Math.random().toString(36).slice(2, 11).toUpperCase()}`,
    freelancerId: id,
    status: "success",
    network: "Algorand Testnet",
  };
}
