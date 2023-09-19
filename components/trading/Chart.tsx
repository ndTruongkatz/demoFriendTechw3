import React, { useEffect, useState } from "react";
import Card from "components/Card";
import { truncateAddress } from "utils";
import { LineChart } from "@tremor/react";
import { renderTimeSince } from "utils/time";
import axios from "axios"; // Thêm import axios

export default function Chart() {
  // Token address
  const userAddress = "0x4e5f7e4a774bd30b9bdca7eb84ce3681a71676e1"; // Địa chỉ token cần lấy dữ liệu
  const [data, setData] = useState<{ timestamp: number; "Price (ETH)": number }[]>([]);
  const [lastChecked, setLastChecked] = useState<Date | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Gửi yêu cầu API để lấy dữ liệu
        const response = await axios.get<{ timestamp: number; "Price (ETH)": number }[]>(
          `http://34.87.173.121:3001/api/chart?address=${userAddress}`
        );

        console.log('response:', response);
        
        // Lấy dữ liệu từ phản hồi
        const chartData = response.data;

        // Cập nhật state với dữ liệu mới
        setData(chartData);

        // Cập nhật thời gian cập nhật lần cuối
        setLastChecked(new Date());
      } catch (error) {
        console.error("Lỗi khi gọi API:", error);
      }
    };

    // Gọi hàm fetchData để lấy dữ liệu khi component được render
    fetchData();
  }, [userAddress]);

  return (
    <Card
      title="Token Chart"
      updated={`${
        lastChecked
          ? `Cập nhật lần cuối: ${renderTimeSince(lastChecked.getTime())} trước`
          : "Đang tải..."
      }`}
    >
      <div className="w-full h-full p-4">
        {/* Sử dụng data để hiển thị biểu đồ */}
        <LineChart
          className="h-full"
          data={data}
          index="timestamp"
          categories={["Price (ETH)"]}
        />
      </div>
    </Card>
  );
}
