import { CheckCircle } from "lucide-react";

interface ComplianceBadgeProps {
  name: string;
  description: string;
  color: string;
}

export default function ComplianceBadge({ name, description, color }: ComplianceBadgeProps) {
  return (
    <div className={`${color} p-6 rounded-xl text-center transform hover:scale-105 transition cursor-pointer`}>
      <CheckCircle className="w-10 h-10 mx-auto mb-3 text-white" />
      <h3 className="text-white font-bold text-lg mb-2">{name}</h3>
      <p className="text-white/80 text-sm">{description}</p>
    </div>
  );
}
