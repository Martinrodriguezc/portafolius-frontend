import Card from "../../common/Card/Card";

interface StatsCardProps {
    icon: React.ReactNode;
    title: string;
    value: string | number;
    gradientFrom: string;
    gradientTo: string;
    border: string;
    textColor: string;
}
export const StatsCard: React.FC<StatsCardProps> = ({
    icon, title, value, gradientFrom, gradientTo, border, textColor,
}) => (
    <Card className={`bg-gradient-to-br from-${gradientFrom} to-${gradientTo} p-6 rounded-[16px] shadow-sm border ${border}`}>
        <div className="flex items-center">
            <div className="p-3 rounded-full mr-4 shadow-sm bg-opacity-100">
                {icon}
            </div>
            <div>
                <p className={`text-${textColor} text-sm font-medium`}>{title}</p>
                <p className="text-3xl font-bold text-[#333333]">{value}</p>
            </div>
        </div>
    </Card>
);
