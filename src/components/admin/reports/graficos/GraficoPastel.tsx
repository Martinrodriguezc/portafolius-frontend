import React from "react";
import { DistribucionUsuarios } from "../../../../hooks/admin/metricsServices";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
  TooltipItem,
} from "chart.js";
import ChartDataLabels, { Context as ChartDataLabelsContext } from "chartjs-plugin-datalabels";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

interface GraficoPastelProps {
  data: DistribucionUsuarios[];
}

type DatalabelsPluginOptions = {
  color?: string;
  font?: {
    weight?: "normal" | "bold" | "bolder" | "lighter" | number;
    size?: number;
  };
  formatter?: (value: number, ctx: ChartDataLabelsContext) => string;
};

const GraficoPastel: React.FC<GraficoPastelProps> = ({ data }) => {
  const total = data.reduce((sum, item) => {
    const n = Number(item.cantidad);
    return sum + (isNaN(n) ? 0 : n);
  }, 0);

  const processed = data.map((item, i) => {
    const n = Number(item.cantidad) || 0;
    const pct = total > 0 ? (n / total) * 100 : 0;
    const palette = [
      "rgba(54,162,235,0.8)",
      "rgba(75,192,192,0.8)",
      "rgba(255,206,86,0.8)",
      "rgba(153,102,255,0.8)",
      "rgba(255,99,132,0.8)",
      "rgba(255,159,64,0.8)",
      "rgba(199,199,199,0.8)",
    ];
    return {
      role:       item.role,
      cantidad:   n,
      percentage: pct,
      color:      palette[i % palette.length],
    };
  });

  const chartData = {
    labels: processed.map((p) => p.role),
    datasets: [
      {
        data:            processed.map((p) => p.cantidad),
        backgroundColor: processed.map((p) => p.color),
        borderColor:     processed.map((p) => p.color.replace("0.8", "1")),
        borderWidth:     1,
      },
    ],
  };

  const options: ChartOptions<"pie"> & {
    plugins: {
      legend: ChartOptions<"pie">["plugins"] extends infer P
        ? P extends { legend: infer L } ? L : unknown
        : unknown;
      tooltip: ChartOptions<"pie">["plugins"] extends infer P
        ? P extends { tooltip: infer T } ? T : unknown
        : unknown;
      datalabels?: DatalabelsPluginOptions;
    };
  } = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend:   { display: false },
      tooltip:  {
        callbacks: {
          label(context: TooltipItem<"pie">) {
            const label = context.label ?? "";
            const value = Number(context.raw) || 0;
            const ds = context.dataset.data as number[];
            const sum = ds.reduce((a, b) => a + b, 0);
            const pct = sum > 0 ? Math.round((value / sum) * 100) : 0;
            return `${label}: ${value} (${pct}%)`;
          },
        },
      },
      datalabels: {
        color: "#fff",
        font:  { weight: "bold", size: 10 },
        formatter(value: number, ctx: ChartDataLabelsContext) {
          const vals = ctx.chart.data.datasets[0].data as number[];
          const sum  = vals.reduce((a, b) => a + b, 0);
          return sum > 0 ? ((value / sum) * 100).toFixed(1) + "%" : "0%";
        },
      },
    },
  };

  return (
    <div className="flex flex-col md:flex-row h-full">
      <div className="w-full md:w-[65%] h-48 md:h-full flex justify-center items-center p-2">
        <div className="w-40 h-40 md:w-56 md:h-56 lg:w-64 lg:h-64">
          <Pie data={chartData} options={options} />
        </div>
      </div>
      <div className="w-full md:w-[35%] overflow-y-auto px-2">
        <div className="space-y-2">
          {processed.map((item) => (
            <div key={item.role} className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
              <div className="flex-1 text-sm">
                <div className="flex justify-between">
                  <span className="font-medium">{item.role}</span>
                  <div className="text-right">
                    <span className="text-gray-700">{item.cantidad}</span>
                    <span className="text-gray-500 ml-2">({item.percentage.toFixed(1)}%)</span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                  <div
                    className="h-1.5 rounded-full"
                    style={{ width: `${item.percentage}%`, backgroundColor: item.color }}
                  />
                </div>
              </div>
            </div>
          ))}
          <div className="pt-2 border-t border-gray-200 mt-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Total</span>
              <span className="text-sm font-bold">{total}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GraficoPastel;