import Card from "../../../components/common/Card/Card";
import { OverviewTabProps } from "../../../types/Props/Tabs/OverviewTabProps";
import NoDataMessage from "./NoDataMessage";
import monthlyProgressIcon from "../../../assets/monthly-progress-icon.svg";
import distributionIcon from "../../../assets/distribution-icon.svg";

export const OverviewTab = ({
  monthlyProgress,
  protocolPerformance,
}: OverviewTabProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {!monthlyProgress?.length ? (
        <NoDataMessage 
          title="No hay evolución mensual" 
          message="Aún no hay datos de progreso mensual para mostrar"
          icon={monthlyProgressIcon}
        />
      ) : (
        <Card className="rounded-[16px] p-6">
          <h3 className="text-[16px] font-medium text-[#333333] mb-4">
            Evolución Mensual
          </h3>
          <div className="mt-4 grid grid-cols-3 gap-4">
            {monthlyProgress.slice(-3).map((month, index) => (
              <div key={index} className="text-center">
                <p className="text-[13px] text-[#A0A0A0]">{month.month}</p>
                <p className="text-[16px] font-medium text-[#333333]">
                  {month.score}/10
                </p>
              </div>
            ))}
          </div>
        </Card>
      )}

      {!protocolPerformance?.length ? (
        <NoDataMessage 
          title="No hay distribución de protocolos" 
          message="Aún no hay datos de distribución para mostrar"
          icon={distributionIcon}
        />
      ) : (
        <Card className="rounded-[16px] p-6">
          <h3 className="text-[16px] font-medium text-[#333333] mb-4">
            Distribución por Protocolos
          </h3>
          <div className="mt-4 space-y-2">
            {protocolPerformance.map((protocol, index) => (
              <div key={index} className="flex justify-between items-center">
                <div className="flex items-center">
                  <div
                    className="w-3 h-3 rounded-full mr-2"
                    style={{
                      backgroundColor:
                        index === 0
                          ? "#4E81BD"
                          : index === 1
                          ? "#A0A0A0"
                          : "#F4F4F4",
                    }}
                  />
                  <span className="text-[14px] text-[#333333]">
                    {protocol.protocol}
                  </span>
                </div>
                <span className="text-[14px] font-medium text-[#333333]">
                  {protocol.score}/10 ({protocol.studies} estudios)
                </span>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};
