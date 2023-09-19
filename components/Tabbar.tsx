import React, { useState } from "react";
import Card from "components/Card";
import { renderTimeSince } from "utils/time";
import { usePollData } from "utils/usePollData";

function TabBar() {
  const [activeTab, setActiveTab] = useState<string>("select1");

  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
  };

    // Backend data (leaderboard)
    const { data: leaderboard, lastChecked } = usePollData(
      "/api/stats/leaderboard",
      15 * 1000
    );

  return (
    <Card title="Discover" updated={`${renderTimeSince(lastChecked)} ago`}>
      <div className="flex justify-center flex-col"> 
        <div className="flex space-x-4">
          <button
            className={`${
              activeTab === "select1"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-800"
            } px-4 py-2 rounded-lg hover:bg-blue-600`}
            onClick={() => handleTabClick("select1")}
          >
            Top Trade
          </button>
          <button
            className={`${
              activeTab === "select2"
                ? "bg-green-500 text-white"
                : "bg-gray-200 text-gray-800"
            } px-4 py-2 rounded-lg hover:bg-green-600`}
            onClick={() => handleTabClick("select2")}
          >
            Trending
          </button>
          <button
            className={`${
              activeTab === "select3"
                ? "bg-red-500 text-white"
                : "bg-gray-200 text-gray-800"
            } px-4 py-2 rounded-lg hover:bg-red-600`}
            onClick={() => handleTabClick("select3")}
          >
            Newest User
          </button>
        </div>
        <div className="mt-4">
          {/* Hiển thị nội dung tương ứng với tab được chọn */}
          {activeTab === "select1" && <div>Nội dung của Select 1</div>}
          {activeTab === "select2" && <div>Nội dung của Select 2</div>}
          {activeTab === "select3" && <div>Nội dung của Select 3</div>}
        </div>
      </div>
    </Card>
  );
}

export default TabBar;
